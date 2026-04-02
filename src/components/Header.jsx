import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../store/userSlice";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-slate-50/80 dark:bg-[#0b0e15]/80 backdrop-blur-xl flex justify-between items-center px-4 lg:px-8 h-16 lg:h-20">
      <div className="flex items-center gap-4 lg:gap-8">
        <span className="text-base lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Aero Ledger
        </span>
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <a href="/" className="text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-4 py-2 rounded-full transition-colors">
            Overview
          </a>
          <a href="/insights" className="text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-4 py-2 rounded-full transition-colors">
            Analytics
          </a>
          <a href="/transactions" className="text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-4 py-2 rounded-full transition-colors">
            Transactions
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-[#a9abb4] hover:bg-slate-200/50 dark:hover:bg-[#1c2029] rounded-full transition-colors"
          title="Toggle theme"
        >
          <span className="material-symbols-outlined text-lg md:text-xl">
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>

        {/* Notifications */}
        <button className="hidden md:block p-2 text-slate-500 dark:text-[#a9abb4] hover:bg-slate-200/50 dark:hover:bg-[#1c2029] rounded-full transition-colors relative">
          <span className="material-symbols-outlined text-lg md:text-xl">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] dark:bg-[#ff6e84] rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="hidden md:block p-2 text-slate-500 dark:text-[#a9abb4] hover:bg-slate-200/50 dark:hover:bg-[#1c2029] rounded-full transition-colors">
          <span className="material-symbols-outlined text-lg md:text-xl">settings</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-slate-200 dark:border-white/10">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
            <p className="text-[10px] text-primary dark:text-indigo-400 uppercase tracking-wider font-bold">{currentUser.role}</p>
          </div>
          <div className={`rounded-full p-0.5 transition-all duration-500 ${currentUser.role === 'Admin' ? 'bg-gradient-to-tr from-[#4648d4] via-[#8127cf] to-[#57dffe] shadow-sm' : 'bg-transparent'}`}>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex flex-col justify-center ${currentUser.avatarBg} ${currentUser.role === 'Admin' ? 'border-2 border-slate-50 dark:border-[#0b0e15]' : 'border-2 border-white dark:border-white/10 shadow-sm'} transition-colors duration-500`}>
              <span className={`w-full h-full flex items-center justify-center font-bold text-sm md:text-base ${currentUser.avatarText}`}>
                {currentUser.initials}
              </span>
            </div>
          </div>
          
          {/* Logout Trigger */}
          <button 
            onClick={() => dispatch(logout())}
            className="p-1.5 md:p-2 ml-1 md:ml-2 text-[#ba1a1a] dark:text-[#ff6e84] hover:bg-[#ffdad6] dark:hover:bg-[#a70138]/20 rounded-full transition-colors flex items-center group shadow-sm"
            title="Log Out"
          >
            <span className="material-symbols-outlined text-[18px] md:text-xl group-hover:scale-110 transition-transform">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
