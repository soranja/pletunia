import React from "react";

// // Burger menus
// document.addEventListener("DOMContentLoaded", function () {
//   // open
//   const burger = document.querySelectorAll(".navbar-burger");
//   const menu = document.querySelectorAll(".navbar-menu");

//   if (burger.length && menu.length) {
//     for (let i = 0; i < burger.length; i++) {
//       burger[i].addEventListener("click", function () {
//         for (let j = 0; j < menu.length; j++) {
//           menu[j].classList.toggle("hidden");
//         }
//       });
//     }
//   }

//   // close
//   const close = document.querySelectorAll(".navbar-close");
//   const backdrop = document.querySelectorAll(".navbar-backdrop");

//   if (close.length) {
//     for (let i = 0; i < close.length; i++) {
//       close[i].addEventListener("click", function () {
//         for (let j = 0; j < menu.length; j++) {
//           menu[j].classList.toggle("hidden");
//         }
//       });
//     }
//   }

//   if (backdrop.length) {
//     for (let i = 0; i < backdrop.length; i++) {
//       backdrop[i].addEventListener("click", function () {
//         for (let j = 0; j < menu.length; j++) {
//           menu[j].classList.toggle("hidden");
//         }
//       });
//     }
//   }
// });

function Burger() {
  return (
    <div className="lg:hidden">
      {/*burger menu button*/}
      <div>
        <button className="navbar-burger flex items-center text-layout-dark-green">
          <svg
            className="block h-6 w-6 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      {/*burger menu drawer*/}
      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <button className="navbar-close">
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

export default Burger;
