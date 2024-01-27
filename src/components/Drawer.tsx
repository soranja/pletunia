import React, { useState } from "react";
import Navbar from "./Navbar";

function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className="lg:hidden">
      {/*burger menu button*/}
      <button
        className="sidebar-to-open flex items-center text-layout-dark-green"
        onClick={ToggleSidebar}
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
      <div
        className={`${
          isOpen === true ? "sidebar-menu relative z-50" : "hidden"
        }`}
      >
        <nav className="fixed top-0 right-0 flex flex-col w-[270px] max-w-sm py-14 px-10 text-white bg-layout-dark-green border-r ">
          <div className="flex justify-between items-start mb-4">
            <Navbar isMobile={true}></Navbar>
            <button className="sidebar-to-close" onClick={ToggleSidebar}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Drawer;
