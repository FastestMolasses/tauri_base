import { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Paths } from '@/lib/constants';
import { Menu } from '@/components/nav/Menu';
import MainNav from '@/components/nav/MainNav';
import appUpdater from './services/app-updater';

import Home from '@/views/Home';
import Settings from '@/views/Settings';
import platform from '@/services/platform';

import './assets/scss/main.scss';

function App() {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    // TODO: USE REACT QUERY
    useEffect(() => {
        appUpdater.checkForUpdates().then((updateAvailable) => {
            if (updateAvailable) {
                setUpdateDialogOpen(true);
            }
        });
    }, []);

    return (
        <>
            {/* Drag region for macOS menu bar */}
            {platform.osType === 'macOS' && (
                <div
                    className='h-8 bg-black border-b text-center fixed top-0 left-0 right-0 z-50'
                    data-tauri-drag-region
                >
                    <p className='h-full flex items-center justify-center pointer-events-none text-xs text-gray-500'>
                        Project title
                    </p>
                </div>
            )}

            {/* Menu bar */}
            {platform.osType === 'windows' && <Menu />}

            {/* Update dialog */}
            <AlertDialog open={updateDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Available</AlertDialogTitle>
                        <AlertDialogDescription>
                            A new version of the app is available.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Quit</AlertDialogCancel>
                        <AlertDialogAction>Install and Restart</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Main content */}
            <MemoryRouter>
                <Routes>
                    <Route
                        element={
                            <div className='mt-9'>
                                <MainNav />
                            </div>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path={Paths.Settings} element={<Settings />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </>
    );
}

export default App;
