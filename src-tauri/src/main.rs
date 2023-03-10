// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod config;

use window_shadows::set_shadow;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut main_window_builder =
                tauri::WindowBuilder::new(app, "main", tauri::WindowUrl::App("index.html".into()));

            #[cfg(target_os = "macos")]
            {
                main_window_builder = main_window_builder
                    // Overlays the traffic lights on the window contents
                    .title_bar_style(tauri::TitleBarStyle::Overlay)
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

            #[cfg(target_os = "macos")]
            {
                // Make the title bar visible
                let _ = main_window.set_decorations(true);
            }

            #[cfg(target_os = "windows")]
            {
                // Make the title bar invisible
                let _ = main_window.set_decorations(false);
            }

            #[cfg(feature = "updater")]
            tauri::updater::builder(app.handle()).should_install(|_current, _latest| true);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_app_name])
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_app_name() -> String {
    config::AppConfig::instance().app_name.clone()
}
