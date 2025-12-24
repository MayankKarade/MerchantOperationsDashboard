import { Bell, Menu } from "lucide-react";
import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className=" bg-white border-b border-gray-200 px-4 py-3 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md bg-blue-400 hover:bg-gray-100 transition-all duration-200"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            Merchant Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ">
            <Bell size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold ">
              A
            </div>
            <span className="hidden md:inline text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
