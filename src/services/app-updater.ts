import {
    checkUpdate,
    installUpdate,
    onUpdaterEvent,
} from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';

class AppUpdater {
    private unlistenUpdater?: () => void;

    public init() {
        this.initUpdater();
    }

    private async initUpdater() {
        this.unlistenUpdater = await onUpdaterEvent(({ error, status }) => {
            // TODO: handle error and status
            console.log('Updater event', error, status);
        });
    }

    public async checkForUpdates(): Promise<boolean> {
        const { shouldUpdate, manifest } = await checkUpdate();

        // TODO: log info
        if (shouldUpdate)
            console.log(
                `Update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`,
            );
        else console.log('No update available');

        return shouldUpdate;
    }

    public async installUpdate(): Promise<void> {
        // TODO: LOGGING HERE
        // Install the update. This will also restart the app on Windows.
        await installUpdate();
        // On macOS and Linux you will need to restart the app manually
        await relaunch();
    }

    public dispose(): void {
        if (this.unlistenUpdater) {
            this.unlistenUpdater();
        }
    }
}

const appUpdater = new AppUpdater();
export default appUpdater;
