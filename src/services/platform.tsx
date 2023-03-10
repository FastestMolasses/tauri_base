import { dialog, invoke, os, shell, path } from '@tauri-apps/api';

export type OperatingSystem = 'macOS' | 'windows' | 'linux' | 'unknown';

export type Platform = {
    appName: string;
    /// User-specific data. Persists through application updates and application uninstalls.
    appDataDir: string;
    appCacheDir: string;
    appConfigDir: string;
    /// Generally used for data that is local to the particular machine and application installation.
    /// Used for temporary files, and other non - critical data.
    appLocalDataDir: string;
    appLogDir: string;
    osType: OperatingSystem;
    openPath(path: string): void;
    openFilePickerDialog(): Promise<null | string | string[]>;
    saveFilePickerDialog(): Promise<string | null>;
    openDirectoryPickerDialog(): Promise<null | string | string[]>;
};

async function determineOsType(): Promise<OperatingSystem> {
    const osType = await os.type();
    switch (osType) {
        case 'Linux':
            return 'linux';
        case 'Windows_NT':
            return 'windows';
        case 'Darwin':
            return 'macOS';
        default:
            return 'unknown';
    }
}

// Initialize all promises in parallel
const [
    osType,
    appDataDir,
    appCacheDir,
    appConfigDir,
    appLocalDataDir,
    appLogDir,
    appName,
] = await Promise.all([
    determineOsType(),
    path.appDataDir(),
    path.appCacheDir(),
    path.appConfigDir(),
    path.appLocalDataDir(),
    path.appLogDir(),
    invoke('get_app_name'),
]);

const platform: Platform = {
    osType,
    appDataDir,
    appCacheDir,
    appConfigDir,
    appLocalDataDir,
    appLogDir,
    appName,
    openPath: (path: string) => shell.open(path),
    openFilePickerDialog: () => dialog.open(),
    saveFilePickerDialog: () => dialog.save(),
    openDirectoryPickerDialog: () => dialog.open({ directory: true }),
};

export default platform;
