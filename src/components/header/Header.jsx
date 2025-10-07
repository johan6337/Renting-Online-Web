import React from "react";
import { Search, ShoppingCart, UserRound, ChevronDown } from "lucide-react";

export default function BorrowitHeader() {
  return (
    <header className="w-full bg-white">
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
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Cart"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <UserRound className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}