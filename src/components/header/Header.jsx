import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  UserRound,
  ChevronDown,
  LogOut,
  HelpCircle,
  IdCard,
  User,
} from "lucide-react";

export default function BorrowitHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white relative">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="flex h-16 items-center gap-3">
          {/* Left: Logo */}
          <a href="#" className="shrink-0 select-none" aria-label="Borrowit home">
            <span className="text-2xl font-black tracking-tight leading-none">BORROWIT</span>
          </a>

          {/* Middle-left: Primary nav */}
          <nav className="hidden md:flex items-center gap-6 ml-2">
            <a href="#" className="text-sm font-medium text-gray-900 hover:opacity-80 flex items-center gap-1">
              Shop <ChevronDown className="h-4 w-4" />
            </a>
            <a href="#" className="text-sm text-gray-900 hover:opacity-80">On Sale</a>
            <a href="#" className="text-sm text-gray-900 hover:opacity-80">New Arrivals</a>
            <a href="#" className="text-sm text-gray-900 hover:opacity-80">Brands</a>
          </nav>

          {/* Middle: Search */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-2xl">
              <label htmlFor="site-search" className="sr-only">Search for products</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="site-search"
                  type="text"
                  placeholder="Search for products..."
                  className="w-full rounded-full bg-gray-100 pl-11 pr-4 h-10 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 relative" ref={userMenuRef}>
            <button
              type="button"
              aria-label="Cart"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
            </button>

            {/* User Icon + Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label="Account"
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <UserRound className="h-6 w-6" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <User className="h-5 w-5" /> Account Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <IdCard className="h-5 w-5" /> Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <HelpCircle className="h-5 w-5" /> Get Help
                      </a>
                    </li>
                    <hr className="my-1 border-gray-200" />
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <LogOut className="h-5 w-5" /> Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/*
USAGE
-----
1) Install icons: `npm i lucide-react`
2) Import and render: `import BorrowitHeader from './BorrowitHeader'`
3) Click the user icon to toggle the dropdown.
*/

// import React from "react";
// import { Search, ShoppingCart, UserRound, ChevronDown } from "lucide-react";

// export default function BorrowitHeader() {
//   return (
//     <header className="w-full bg-white">
//       <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
//         <div className="flex h-16 items-center gap-3">
//           {/* Left: Logo */}
//           <a href="#" className="shrink-0 select-none" aria-label="Borrowit home">
//             <span className="text-2xl font-black tracking-tight leading-none">BORROWIT</span>
//           </a>

//           {/* Middle-left: Primary nav */}
//           <nav className="hidden md:flex items-center gap-6 ml-2">
//             <a href="#" className="text-sm font-medium text-gray-900 hover:opacity-80 flex items-center gap-1">
//               Shop <ChevronDown className="h-4 w-4" />
//             </a>
//             <a href="#" className="text-sm text-gray-900 hover:opacity-80">On Sale</a>
//             <a href="#" className="text-sm text-gray-900 hover:opacity-80">New Arrivals</a>
//             <a href="#" className="text-sm text-gray-900 hover:opacity-80">Brands</a>
//           </nav>

//           {/* Middle: Search */}
//           <div className="flex-1 flex justify-center">
//             <div className="w-full max-w-2xl">
//               <label htmlFor="site-search" className="sr-only">Search for products</label>
//               <div className="relative">
//                 <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   id="site-search"
//                   type="text"
//                   placeholder="Search for products..."
//                   className="w-full rounded-full bg-gray-100 pl-11 pr-4 h-10 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-black/10"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right: Icons */}
//           <div className="flex items-center gap-4">
//             <button
//               type="button"
//               aria-label="Cart"
//               className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <ShoppingCart className="h-6 w-6" />
//             </button>
//             <button
//               type="button"
//               aria-label="Account"
//               className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <UserRound className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }