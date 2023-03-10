import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Paths } from '@/lib/constants';

export function NavLinks({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn(
                'flex items-center space-x-4 lg:space-x-6',
                className,
            )}
            {...props}
        >
            <Link
                to={Paths.Home}
                className='text-sm font-medium transition-colors hover:text-primary'
            >
                Overview
            </Link>
            <Link
                to={Paths.Settings}
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
            >
                Settings
            </Link>
        </nav>
    );
}
