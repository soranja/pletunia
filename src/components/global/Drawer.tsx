'use client';

import { FC, useState } from 'react';
import { Navbar } from './Navbar';
import { CheckMobile } from '@/types';

export const Drawer: FC<CheckMobile> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className="lg:hidden">
      {/*burger menu button*/}
      <button
        className="sidebar-to-open text-layout-dark-green flex items-center"
        onClick={ToggleSidebar}
        aria-label="Open sidebar menu"
      >
        <svg
          className="block h-6 w-6 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      {/*burger menu drawer*/}
      <div className={`${isOpen === true ? 'sidebar-menu relative z-50' : 'hidden'}`}>
        <nav className="bg-layout-dark-green fixed top-0 right-0 flex w-[270px] max-w-sm flex-col border-r px-10 py-14 text-white md:bottom-0">
          <div className="mb-4 flex items-start justify-between">
            <Navbar isMobile={true}></Navbar>
            <button
              className="sidebar-to-close"
              onClick={ToggleSidebar}
              aria-label="Sidebar to close"
            >
              <svg
                className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
