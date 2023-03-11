use std::fs::{self, File};
use std::io::{self, Read, Write};
use std::path::Path;
use tauri::api::file::read_binary;
use tauri::api::path::{resolve_path, BaseDirectory};

// Define a result type for easier error handling
type FileUtilsResult<T> = Result<T, FileUtilsError>;

// Define custom error type
#[derive(Debug)]
enum FileUtilsError {
    IoError(io::Error),
}

// Implement the From trait to convert std::io::Error into FileUtilsError
impl From<io::Error> for FileUtilsError {
    fn from(err: io::Error) -> FileUtilsError {
        FileUtilsError::IoError(err)
    }
}

// Reads a file to a String
pub fn read_to_string(filename: &str) -> FileUtilsResult<String> {
    let path = resolve_path(filename, Some(BaseDirectory::App))?;
    let mut file = File::open(&path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Writes a String to a file
pub fn write_to_file(filename: &str, data: &str) -> FileUtilsResult<()> {
    let path = resolve_path(filename, Some(BaseDirectory::App))?;
    let mut file = File::create(&path)?;
    file.write_all(data.as_bytes())?;
    Ok(())
}

// Deletes a file
pub fn delete_file(filename: &str) -> FileUtilsResult<()> {
    let path = resolve_path(filename, Some(BaseDirectory::App))?;
    fs::remove_file(path)?;
    Ok(())
}

// Reads a binary file
pub async fn read_binary_file(filename: &str) -> FileUtilsResult<Vec<u8>> {
    let path = resolve_path(filename, Some(BaseDirectory::App))?;
    let data = read_binary(path).await?;
    Ok(data)
}

// Checks if a file exists
pub fn file_exists(filename: &str) -> FileUtilsResult<bool> {
    let path = resolve_path(filename, Some(BaseDirectory::App))?;
    Ok(Path::new(&path).exists())
}

// Creates a directory
pub fn create_directory(dirname: &str) -> FileUtilsResult<()> {
    let path = resolve_path(dirname, Some(BaseDirectory::App))?;
    fs::create_dir_all(path)?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs::File;

    // Test for writing and reading a string to/from a file
    #[test]
    fn test_read_write_string_file() -> FileUtilsResult<()> {
        let filename = "test_read_write_string.txt";
        let content = "Hello, Tauri!";

        // Write to the file
        write_to_file(filename, content)?;

        // Read from the file
        let read_content = read_to_string(filename)?;
        assert_eq!(content, read_content);

        // Delete the file
        delete_file(filename)?;

        Ok(())
    }

    // Test for writing and reading a binary file
    #[tokio::test]
    async fn test_read_write_binary_file() -> FileUtilsResult<()> {
        let filename = "test_read_write_binary.bin";
        let content = vec![0x41, 0x42, 0x43, 0x44]; // ABCD in ASCII

        // Write to the file
        let path = resolve_path(filename, Some(BaseDirectory::App))?;
        let mut file = File::create(&path)?;
        file.write_all(&content)?;

        // Read from the file
        let read_content = read_binary_file(filename).await?;
        assert_eq!(content, read_content);

        // Delete the file
        delete_file(filename)?;

        Ok(())
    }

    // Test for file existence
    #[test]
    fn test_file_exists() -> FileUtilsResult<()> {
        let filename = "test_file_exists.txt";
        let content = "Exists?";

        // Ensure the file does not exist
        assert!(!file_exists(filename)?);

        // Write to the file
        write_to_file(filename, content)?;

        // Check if the file exists
        assert!(file_exists(filename)?);

        // Delete the file
        delete_file(filename)?;

        // Ensure the file no longer exists
        assert!(!file_exists(filename)?);

        Ok(())
    }

    // Test for directory creation
    #[test]
    fn test_create_directory() -> FileUtilsResult<()> {
        let dirname = "test_create_directory";

        // Create directory
        create_directory(dirname)?;

        // Verify directory exists
        let path = resolve_path(dirname, Some(BaseDirectory::App))?;
        assert!(Path::new(&path).exists());

        // Clean up by removing directory
        fs::remove_dir_all(path)?;

        Ok(())
    }

    // Test for error handling
    #[test]
    fn test_error_handling() {
        // Try reading a non-existent file
        let read_result = read_to_string("non_existent_file.txt");
        assert!(read_result.is_err());

        // Try deleting a non-existent file
        let delete_result = delete_file("non_existent_file.txt");
        assert!(delete_result.is_err());
    }
}
