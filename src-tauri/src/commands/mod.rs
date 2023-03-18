use serde_json::Value;
use std::process::Command;

/// Runs a shell command and returns the output as a string.
///
/// # Arguments
///
/// * `command` - A string slice that holds the command to run
///
/// # Returns
///
/// * Result wrapped string which is the output of the shell command.
#[tauri::command]
fn run_command(command: String) -> tauri::Result<String> {
    let output = Command::new("sh").arg("-c").arg(command).output()?;
    let stdout = String::from_utf8(output.stdout)
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))?;
    Ok(stdout)
}

/// Evaluates JS code on the webview.
///
/// # Arguments
///
/// * `window` - A window reference
/// * `js_code` - JS code to evaluate
///
/// # Returns
///
/// * Result wrapped unit type
#[tauri::command]
fn eval_js(window: tauri::Window, js_code: String) -> tauri::Result<()> {
    window.eval(&js_code)?;
    Ok(())
}

/// Sends data back to the webview
///
/// # Arguments
///
/// * `window` - A window reference
/// * `event` - The event name to emit
/// * `payload` - Payload to send along with the event
///
/// # Returns
///
/// * Result wrapped unit type
#[tauri::command]
fn emit_to_webview(window: tauri::Window, event: String, payload: Value) -> tauri::Result<()> {
    window.emit(&event, Some(payload))?;
    Ok(())
}

/// Terminates the application.
#[tauri::command]
fn exit_app() {
    // std::process::exit(0);
    // TODO: USE AppHandle.exit
}
