import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "grid_view", label: "Dashboard", path: "/" },
  { icon: "insights", label: "Analytics", path: "/insights" },
  { icon: "swap_horiz", label: "Transactions", path: "/transactions" },
  { icon: "description", label: "Access", path: "/access" },
];

const bottomItems = [
  { icon: "help", label: "Help", path: "#" },
  { icon: "logout", label: "Logout", path: "#" },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed z-50 flex bg-slate-200/80 dark:bg-slate-900/80 backdrop-blur-2xl transition-all duration-300 shadow-[0_-10px_40px_-10px_rgba(11,28,48,0.1)] dark:shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.4)] lg:shadow-[0_40px_40px_-10px_rgba(11,28,48,0.06)] lg:dark:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.3)] bottom-4 left-4 right-4 h-16 flex-row items-center justify-around px-2 md:px-6 rounded-full lg:bottom-auto lg:right-auto lg:left-6 lg:top-28 lg:w-20 lg:h-[calc(100vh-140px)] lg:min-h-[500px] lg:flex-col lg:justify-between lg:py-8 lg:px-0 overflow-hidden"
    >
      {/* Top section */}
      <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start lg:gap-3 w-full lg:px-3 h-full lg:h-auto">
        {/* Logo - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary dark:bg-gradient-to-br dark:from-[#a3a6ff] dark:to-[#6063ee] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-xl icon-filled">
              account_balance_wallet
            </span>
          </div>
        </div>

        {/* Nav items */}
        {navItems.map((item) => (
          <NavLink
            key={item.path + item.icon}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 lg:p-3 rounded-full transition-all duration-200 lg:w-full hover:scale-105 active:scale-95 justify-center ${
                isActive
                  ? "bg-indigo-600 dark:bg-indigo-500/20 text-white dark:text-indigo-400 shadow-md shadow-indigo-500/20"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800/50"
              }`
            }
            title={item.label}
          >
            <span className="material-symbols-outlined text-[24px] lg:text-[22px] shrink-0">
              {item.icon}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Bottom section - Hidden on mobile */}
      <div className="hidden lg:flex flex-col items-center gap-2 w-full px-3 mt-4">
        {bottomItems.map((item) => (
          <a
            key={item.icon}
            href={item.path}
            className={`flex items-center gap-4 p-3 rounded-full transition-all duration-200 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800/50 justify-center ${
              item.icon === "logout" ? "dark:text-red-400" : ""
            }`}
            title={item.label}
          >
            <span
              className={`material-symbols-outlined text-[22px] shrink-0 ${
                item.icon === "logout" ? "dark:text-[#ff6e84]" : ""
              }`}
            >
              {item.icon}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}
