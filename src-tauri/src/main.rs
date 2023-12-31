// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;
mod window_ext;
// mod file_util;
// mod json_util;

use window_shadows::set_shadow;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;
#[cfg(target_os = "macos")]
use crate::window_ext::WindowExt;

// TODO: FILE UTILS
// TODO: APP UPDATER
// TODO: LOGGING
// TODO: cleanAppCacheOnCrash
// TODO: APP STATS - CHECK src/main/stats.ts
// TODO: SETTINGS PAGE UI
// TODO: ALWAYS ON TOP OPTION
// TODO: MINIMIZE ON CLOSE OPTION
// TODO: ALTERNATIVE TO ELECTRON'S crashReporter
// TODO: CRASH HANDLER
// TODO: REPORTS HANDLER - CHECK src/main/reports-hanlder.ts
// TODO: APP MENU
// TODO: ANALYTICS

fn main() {
    if build_is_expired() {
        return;
    }

    let mut app_builder = tauri::Builder::default();

    // Setup windows
    app_builder = app_builder.setup(|app| {
        let mut main_window_builder =
            tauri::WindowBuilder::new(app, "main", tauri::WindowUrl::App("index.html".into()));

        #[cfg(target_os = "macos")]
        {
            main_window_builder = main_window_builder
                // Overlays the traffic lights on the window contents
                .title_bar_style(tauri::TitleBarStyle::Overlay)
                .decorations(true)
                .hidden_title(true);
        }

        main_window_builder = main_window_builder
            .min_inner_size(800., 600.)
            .inner_size(1400., 1000.)
            .title(config::AppConfig::instance().app_name.clone())
            .resizable(true);

        let main_window = main_window_builder.build()?;

        // Add native window shadows
        set_shadow(&main_window, true).expect("Cannot set window shadows!");

        #[cfg(target_os = "windows")]
        {
            // Make the title bar invisible
            let _ = main_window.set_decorations(false);
        }

        #[cfg(target_os = "macos")]
        {
            // Adjust the traffic lights position
            main_window.position_traffic_lights(10., 16.);
        }

        #[cfg(feature = "updater")]
        tauri::updater::builder(app.handle()).should_install(|_current, _latest| true);

        Ok(())
    });

    // Adjust the traffic lights position on window resizing
    #[cfg(target_os = "macos")]
    {
        app_builder = app_builder.on_window_event(|e| {
            let apply_offset = || {
                let win = e.window();
                win.position_traffic_lights(10., 16.);
            };
            match e.event() {
                tauri::WindowEvent::Resized(..) => apply_offset(),
                tauri::WindowEvent::ThemeChanged(..) => apply_offset(),
                _ => {}
            }
        });
    }

    app_builder
        .invoke_handler(tauri::generate_handler![get_app_name])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_app_name() -> String {
    config::AppConfig::instance().app_name.clone()
}

fn build_is_expired() -> bool {
    if config::AppConfig::instance().expiry_date > 0 {
        let now = chrono::Utc::now();
        let expiry_date = chrono::NaiveDateTime::from_timestamp_opt(
            config::AppConfig::instance().expiry_date as i64,
            0,
        );

        if let Some(expiry_date) = expiry_date {
            if now > expiry_date.and_utc() {
                return true;
            }
        }
    }

    false
}
