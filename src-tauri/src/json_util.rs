use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fs::{self, File};
use std::io::{self, Read, Write};
use serde::de::DeserializeOwned;
use tauri::api::path::{resolve_path, BaseDirectory, app_local_data_dir};
use tauri::PathResolver;
use tauri::AppHandle;

/// Define a result type for easier error handling
type JsonUtilsResult<T> = Result<T, JsonUtilsError>;

/// Define custom error type
#[derive(Debug)]
enum JsonUtilsError {
    IoError(io::Error),
    SerdeJsonError(serde_json::Error),
}

/// Implement the From trait to convert std::io::Error and serde_json::Error into JsonUtilsError
impl From<io::Error> for JsonUtilsError {
    fn from(err: io::Error) -> JsonUtilsError {
        JsonUtilsError::IoError(err)
    }
}

impl From<serde_json::Error> for JsonUtilsError {
    fn from(err: serde_json::Error) -> JsonUtilsError {
        JsonUtilsError::SerdeJsonError(err)
    }
}

/// Reads a JSON file into a serde_json::Value
pub fn read_json(filename: &str) -> JsonUtilsResult<Value> {
    // let path = resolve_path(filename, Some(BaseDirectory::AppLocalData))?;

    // let path = app_local_data_dir()?;
    // let path = PathResolver::app_data_dir();

    let file = File::open(&path)?;
    let value: Value = serde_json::from_reader(file)?;
    Ok(value)
}

/// Writes a serde_json::Value to a JSON file
pub fn write_json(filename: &str, value: &Value) -> JsonUtilsResult<()> {
    let path = resolve_path(filename, Some(BaseDirectory::AppLocalData))?;
    let file = File::create(&path)?;
    serde_json::to_writer(file, value)?;
    Ok(())
}

/// Deserialize a JSON file into a custom Rust type
pub fn from_json_file<T: DeserializeOwned>(filename: &str) -> JsonUtilsResult<T> {
    let path = resolve_path(filename, Some(BaseDirectory::AppLocalData))?;
    let file = File::open(&path)?;
    let object: T = serde_json::from_reader(file)?;
    Ok(object)
}

/// Serialize a custom Rust type into a JSON file
pub fn to_json_file<T: Serialize>(filename: &str, object: &T) -> JsonUtilsResult<()> {
    let path = resolve_path(filename, Some(BaseDirectory::AppLocalData))?;
    let file = File::create(&path)?;
    serde_json::to_writer(file, object)?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug, PartialEq)]
    struct TestStruct {
        name: String,
        age: u8,
    }

    /// Test reading and writing raw JSON
    #[test]
    fn test_read_write_raw_json() -> JsonUtilsResult<()> {
        let filename = "test_raw.json";
        let value = serde_json::json!({
          "name": "John",
          "age": 30
        });

        // Write raw JSON
        write_json(filename, &value)?;

        // Read raw JSON
        let read_value = read_json(filename)?;
        assert_eq!(value, read_value);

        // Cleanup
        fs::remove_file(resolve_path(filename, Some(BaseDirectory::AppLocalData))?)?;

        Ok(())
    }

    /// Test deserialization and serialization with custom Rust types
    #[test]
    fn test_serialize_deserialize_custom_type() -> JsonUtilsResult<()> {
        let filename = "test_custom.json";
        let test_struct = TestStruct {
            name: "Alice".to_string(),
            age: 25,
        };

        // Serialize to JSON file
        to_json_file(filename, &test_struct)?;

        // Deserialize from JSON file
        let read_test_struct: TestStruct = from_json_file(filename)?;
        assert_eq!(test_struct, read_test_struct);

        // Cleanup
        fs::remove_file(resolve_path(filename, Some(BaseDirectory::AppLocalData))?)?;

        Ok(())
    }
}
