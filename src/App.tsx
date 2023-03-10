import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Paths } from '@/lib/constants';
import { Menu } from '@/components/nav/Menu';
import MainNav from '@/components/nav/MainNav';

import Home from '@/views/Home';
import Settings from '@/views/Settings';
import platform from '@/services/platform';

import './assets/scss/main.scss';

function App() {
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
