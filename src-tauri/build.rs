fn main() {
    println!("cargo:rustc-env=APP_NAME=YourAppName");
    tauri_build::build();
}
