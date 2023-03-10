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
            {/* Menu bar */}
            {platform.osType === 'windows' && (
                // TODO: DONT HARDCODE THIS
                <div className='mb-[36px]'>
                    <Menu />
                </div>
            )}

            <MemoryRouter>
                <Routes>
                    <Route element={<MainNav />}>
                        <Route index element={<Home />} />
                        <Route path={Paths.Settings} element={<Settings />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </>
    );
}

export default App;
