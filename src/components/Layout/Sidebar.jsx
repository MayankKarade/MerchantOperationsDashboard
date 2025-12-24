import React from "react";
import { Home, Users, BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, closeSidebar }) => {
  const navLinks = [
    {
      icons: Home,
      label: "Dashboard",
      path: "/",
    },
    { icons: Users, label: "Merchants", path: "/merchants" },
  ];
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-500 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">Axipays</h2>
                <p className="text-xs text-gray-500">Payment Processor</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex  items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <item.icons size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
