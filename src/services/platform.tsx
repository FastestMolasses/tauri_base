import { dialog, os, shell, path, app } from '@tauri-apps/api';

export type OperatingSystem = 'macOS' | 'windows' | 'linux' | 'unknown';

export type Platform = {
    appName: string;
    osType: OperatingSystem;
    /**
     * https://tauri.app/v1/api/js/path/#appdatadir
     *
     * 'Roaming' data is synced across all computers the user has logged into.
     * Roaming folder for application specific data, such as custom dictionaries,
     * which are machine independent and should roam with the user profile
     *
     * - **macOS**: Resolves to ${homeDir}/Library/Application Support/${bundleIdentifier}
     * - **Windows**: Resolves to ${homeDir}/AppData/Roaming/com.tauri.dev/${bundleIdentifier}
     */
    appDataDir: string;
    /**
     * https://tauri.app/v1/api/js/path/#appcachedir
     * 
     * 'Cache' data is temporary data that can be deleted at any time.
     * 
     * - **macOS**: Resolves to ${homeDir}/Library/Caches/${bundleIdentifier}
     * - **Windows**: Resolves to ${homeDir}/AppData/Local/com.tauri.dev/${bundleIdentifier}
     */
    appCacheDir: string;
    /**
     * https://tauri.app/v1/api/js/path/#appconfigdir
     * 
     * 'Config' data is data that is not machine specific but is also not roaming.
     * Usually this data is either machine specific or too large to "roam" (upload/download).
     * 
     * - **macOS**: Resolves to ${homeDir}/Library/Application Support/${bundleIdentifier}
     * - **Windows**: Resolves to ${homeDir}/AppData/Roaming/com.tauri.dev/${bundleIdentifier}
     */
    appConfigDir: string;
    /**
     * https://tauri.app/v1/api/js/path/#applogdir
     *
     * 'Local' stays with the user on that specific computer.
     * Usually this data is either machine specific or too large to "roam" (upload/download).
     *
     * - **macOS**: Resolves to ${homeDir}/Library/Application Support/${bundleIdentifier}
     * - **Windows**: Resolves to ${homeDir}/AppData/Local/com.tauri.dev/${bundleIdentifier}
     */
    appLocalDataDir: string;
    /**
     * https://tauri.app/v1/api/js/path/#applogdir
     *
     * - **Linux**: Resolves to ${configDir}/${bundleIdentifier}/logs
     * - **macOS**: Resolves to ${homeDir}/Library/Logs/{bundleIdentifier}
     * - **Windows**: Resolves to ${configDir}/${bundleIdentifier}/logs
     */
    appLogDir: string;
    appVersion: string;
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
    appName,
    osType,
    appDataDir,
    appCacheDir,
    appConfigDir,
    appLocalDataDir,
    appLogDir,
    appVersion,
] = await Promise.all([
    app.getName(),
    determineOsType(),
    path.appDataDir(),
    path.appCacheDir(),
    path.appConfigDir(),
    path.appLocalDataDir(),
    path.appLogDir(),
    app.getVersion(),
]);

const platform: Platform = {
    osType,
    appDataDir,
    appCacheDir,
    appConfigDir,
    appLocalDataDir,
    appLogDir,
    appName,
    appVersion,
    openPath: (path: string) => shell.open(path),
    openFilePickerDialog: () => dialog.open(),
    saveFilePickerDialog: () => dialog.save(),
    openDirectoryPickerDialog: () => dialog.open({ directory: true }),
};

export default platform;
