use once_cell::sync::Lazy;

pub struct AppConfig {
    pub app_name: String,
}

pub static APP_CONFIG: Lazy<AppConfig> = Lazy::new(|| {
    AppConfig {
        app_name: env!("APP_NAME").to_string(),
    }
});

impl AppConfig {
    pub fn instance() -> &'static Self {
        &APP_CONFIG
    }
}
