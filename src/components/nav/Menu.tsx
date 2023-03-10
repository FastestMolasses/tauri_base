import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import platform from '@/services/platform';
import { appWindow } from '@tauri-apps/api/window';

export function Menu() {
    return (
        <div className='fixed top-0 left-0 right-0 z-50' id='menu'>
            <Menubar
                className='rounded-none border-0 border-b px-2 lg:px-4'
                data-tauri-drag-region
                id='menu'
            >
                <MenubarMenu>
                    <MenubarTrigger className='font-bold'>
                        {platform.appName}
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>About {platform.appName}</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Settings... <MenubarShortcut>⌘,</MenubarShortcut>
                        </MenubarItem>
                        <MenubarShortcut />
                        <MenubarItem>
                            Quit <MenubarShortcut>⌘Q</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className='relative'>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>New</MenubarSubTrigger>
                            <MenubarSubContent className='w-[230px]'>
                                <MenubarItem>
                                    Playlist{' '}
                                    <MenubarShortcut>⌘N</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem disabled>
                                    Playlist from Selection{' '}
                                    <MenubarShortcut>⇧⌘N</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Smart Playlist...{' '}
                                    <MenubarShortcut>⌥⌘N</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>Playlist Folder</MenubarItem>
                                <MenubarItem disabled>
                                    Genius Playlist
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem>
                            Open Stream URL...{' '}
                            <MenubarShortcut>⌘U</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Close Window <MenubarShortcut>⌘W</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Library</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Update Cloud Library</MenubarItem>
                                <MenubarItem>Update Genius</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Organize Library...</MenubarItem>
                                <MenubarItem>Export Library...</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Import Playlist...</MenubarItem>
                                <MenubarItem disabled>
                                    Export Playlist...
                                </MenubarItem>
                                <MenubarItem>Show Duplicate Items</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Get Album Artwork</MenubarItem>
                                <MenubarItem disabled>
                                    Get Track Names
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem>
                            Import... <MenubarShortcut>⌘O</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>
                            Burn Playlist to Disc...
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Show in Finder{' '}
                            <MenubarShortcut>⇧⌘R</MenubarShortcut>{' '}
                        </MenubarItem>
                        <MenubarItem>Convert</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Page Setup...</MenubarItem>
                        <MenubarItem disabled>
                            Print... <MenubarShortcut>⌘P</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem disabled>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>
                            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem disabled>
                            Cut <MenubarShortcut>⌘X</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>
                            Copy <MenubarShortcut>⌘C</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>
                            Paste <MenubarShortcut>⌘V</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Select All <MenubarShortcut>⌘A</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>
                            Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            Smart Dictation...{' '}
                            <MenubarShortcut>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    className='h-4 w-4'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12' />
                                    <circle cx='17' cy='7' r='5' />
                                </svg>
                            </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Emoji & Symbols{' '}
                            <MenubarShortcut>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    className='h-4 w-4'
                                    viewBox='0 0 24 24'
                                >
                                    <circle cx='12' cy='12' r='10' />
                                    <path d='M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
                                </svg>
                            </MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                        <MenubarCheckboxItem>
                            Show Playing Next
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem checked>
                            Show Lyrics
                        </MenubarCheckboxItem>
                        <MenubarSeparator />
                        <MenubarItem inset disabled>
                            Show Status Bar
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Hide Sidebar</MenubarItem>
                        <MenubarItem disabled inset>
                            Enter Full Screen
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className='hidden md:block'>
                        Account
                    </MenubarTrigger>
                    <MenubarContent forceMount>
                        <MenubarLabel inset>Switch Account</MenubarLabel>
                        <MenubarSeparator />
                        <MenubarRadioGroup value='benoit'>
                            <MenubarRadioItem value='andy'>
                                Andy
                            </MenubarRadioItem>
                            <MenubarRadioItem value='benoit'>
                                Benoit
                            </MenubarRadioItem>
                            <MenubarRadioItem value='Luis'>
                                Luis
                            </MenubarRadioItem>
                        </MenubarRadioGroup>
                        <MenubarSeparator />
                        <MenubarItem inset>Manage Famliy...</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Add Account...</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <div className='flex justify-end absolute top-0 right-0'>
                <button
                    id='titlebar-minimize'
                    className='p-2 hover:bg-[#161a1d] focus:outline-none active:bg-[#0e1012]'
                    onClick={() => appWindow.minimize()}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                    >
                        <path fill='currentColor' d='M20 14H4v-4h16' />
                    </svg>
                </button>
                <button
                    id='titlebar-maximize'
                    className='p-2 hover:bg-[#161a1d] focus:outline-none active:bg-[#0e1012]'
                    onClick={() => {
                        appWindow.isMaximized().then((isMaximized) => {
                            if (isMaximized) {
                                appWindow.unmaximize();
                            } else {
                                appWindow.maximize();
                            }
                        });
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fill='currentColor'
                            d='M4 4h16v16H4V4m2 4v10h12V8H6Z'
                        />
                    </svg>
                </button>
                <button
                    id='titlebar-close'
                    className='p-2 hover:bg-[#161a1d] focus:outline-none active:bg-[#0e1012]'
                    onClick={() => appWindow.close()}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fill='currentColor'
                            d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
