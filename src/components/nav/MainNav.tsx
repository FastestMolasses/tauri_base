import { Outlet } from 'react-router-dom';

import { Search } from '@/components/nav/Search';
import { NavLinks } from '@/components/nav/NavLinks';

const MainNav = () => {
    return (
        <div className='flex-col flex h-full overflow-y-auto overflow-x-hidden'>
            {/* Top Nav */}
            <div className='border-b'>
                <div className='flex my-3 items-center px-4'>
                    <NavLinks className='mx-6' />
                    <div className='ml-auto flex items-center space-x-4'>
                        <Search />
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    );
};

export default MainNav;
