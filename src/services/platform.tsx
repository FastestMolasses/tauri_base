import { dialog, invoke, os, shell } from '@tauri-apps/api';

export type OperatingSystem = 'macOS' | 'windows' | 'linux' | 'unknown';

export type Platform = {
    appName: string;
    osType: OperatingSystem;
    openPath(path: string): void;
    openFilePickerDialog(): Promise<null | string | string[]>;
    saveFilePickerDialog(): Promise<string | null>;
    openDirectoryPickerDialog(): Promise<null | string | string[]>;
};

let osType: OperatingSystem = await os.type().then((osType) => {
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
});

const platform: Platform = {
    osType,
    appName: await invoke('get_app_name'),
    openPath: (path: string) => shell.open(path),
    openFilePickerDialog: () => dialog.open(),
    saveFilePickerDialog: () => dialog.save(),
    openDirectoryPickerDialog: () => dialog.open({ directory: true }),
};

export default platform;
