import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Overview() {
  const transactions = useSelector(state => state.transactions.items);
  const recentActivity = transactions.slice(0, 3);

  return (
    <div className="grid grid-cols-12 gap-8 mt-4">
      {/* ── Left Column: Portfolio & Metrics ── */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Main Portfolio Card */}
        <section className="bg-white dark:bg-[#10131b] rounded-xl p-6 lg:p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4648d4]/5 dark:bg-[#a3a6ff]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
              <div>
                <p className="text-[#464554] dark:text-[#a9abb4] text-sm lg:text-base font-medium mb-1">
                  Total Portfolio Balance
                </p>
                <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#0b1c30] dark:text-white mt-1">
                  $124,592.84
                </h1>
                <div className="flex items-center gap-2 mt-3">
                  <span className="flex items-center text-xs font-bold text-[#00687a] dark:text-[#a3a6ff] bg-[#57dffe] dark:bg-[#a3a6ff]/20 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                    +12.4%
                  </span>
                  <span className="text-[#464554] dark:text-[#a9abb4] text-xs font-medium">vs last month</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-[#eff4ff] dark:bg-[#1c2029] hover:bg-[#dce9ff] dark:hover:bg-[#21262f] px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all text-[#0b1c30] dark:text-[#a9abb4]">1W</button>
                <button className="bg-[#4648d4] dark:bg-[#a3a6ff]/20 text-white dark:text-[#a3a6ff] px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all shadow-md shadow-[#4648d4]/20">1M</button>
                <button className="bg-[#eff4ff] dark:bg-[#1c2029] hover:bg-[#dce9ff] dark:hover:bg-[#21262f] px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all text-[#0b1c30] dark:text-[#a9abb4]">1Y</button>
              </div>
            </div>
            {/* SVG Chart */}
            <div className="h-48 lg:h-64 w-full relative">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradientLight" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4648d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4648d4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="chartGradientDark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#a3a6ff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a3a6ff" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path d="M0 200 Q 100 180, 200 220 T 400 150 T 600 180 T 800 100 T 1000 140 V 300 H 0 Z" className="fill-[url(#chartGradientLight)] dark:fill-[url(#chartGradientDark)]" />
                <path d="M0 200 Q 100 180, 200 220 T 400 150 T 600 180 T 800 100 T 1000 140" fill="none" className="stroke-[#4648d4] dark:stroke-[#a3a6ff]" strokeLinecap="round" strokeWidth="4" filter="url(#glow)" />
                <circle cx="800" cy="100" r="6" className="fill-[#4648d4] dark:fill-[#a3a6ff]" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Total Balance */}
          <div className="bg-[#eff4ff] dark:bg-[#10131b] rounded-lg p-5 lg:p-8 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#4648d4]/5 dark:bg-[#a3a6ff]/5 rounded-full blur-3xl group-hover:bg-[#4648d4]/10 transition-colors"></div>
            <p className="text-[#464554] dark:text-[#a9abb4] text-xs font-bold uppercase tracking-widest mb-2 lg:mb-4">Total Balance</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] dark:text-white tracking-tight">$124,592</h3>
            <p className="text-[#4648d4] dark:text-[#a3a6ff] text-xs mt-2 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +12.4%
            </p>
          </div>
          {/* Monthly Income */}
          <div className="bg-white dark:bg-[#10131b] rounded-lg p-5 lg:p-8">
            <p className="text-[#464554] dark:text-[#a9abb4] text-xs font-bold uppercase tracking-widest mb-2 lg:mb-4">Monthly Income</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] dark:text-white tracking-tight">$8,450</h3>
            <p className="text-[#00687a] dark:text-indigo-400 text-xs mt-2 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">payments</span> Recurring
            </p>
          </div>
          {/* Monthly Expenses */}
          <div className="bg-white dark:bg-[#10131b] rounded-lg p-5 lg:p-8">
            <p className="text-[#464554] dark:text-[#a9abb4] text-xs font-bold uppercase tracking-widest mb-2 lg:mb-4">Monthly Expenses</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] dark:text-white tracking-tight">$3,120</h3>
            <p className="text-[#ba1a1a] dark:text-[#ff6e84] text-xs mt-2 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_down</span> -2.1%
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <section className="bg-[#eff4ff] dark:bg-[#161a22] rounded-xl p-5 lg:p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#0b1c30] dark:text-white">Recent Activity</h3>
            <Link to="/transactions" className="text-[#4648d4] dark:text-indigo-400 font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-5 bg-white dark:bg-[#10131b] rounded-lg hover:bg-[#f8f9ff] dark:hover:bg-[#161a22] transition-all group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#e5eeff] dark:bg-[#161a22] flex items-center justify-center text-[#0b1c30] dark:text-[#ecedf7] group-hover:bg-[#4648d4] dark:group-hover:bg-[#a3a6ff] group-hover:text-white dark:group-hover:text-[#0f00a4] transition-colors">
                    <span className="material-symbols-outlined">{tx.icon || "receipt_long"}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#0b1c30] dark:text-white">{tx.name}</p>
                    <p className="text-xs text-[#464554] dark:text-[#a9abb4]">{tx.category} • {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-extrabold ${tx.amount.startsWith("-") ? "text-[#0b1c30] dark:text-white" : "text-[#00687a] dark:text-[#a3a6ff]"}`}>{tx.amount}</p>
                  <p className="text-[10px] font-bold text-[#464554] dark:text-[#a9abb4] uppercase tracking-tighter">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Right Column: Asset Allocation ── */}
      <div className="col-span-12 lg:col-span-4 space-y-8">
        {/* Asset Allocation Card */}
        <section className="bg-white dark:bg-[#1c2029] rounded-xl p-8 flex flex-col">
          <h3 className="text-xl font-bold text-[#0b1c30] dark:text-white mb-8">Asset Allocation</h3>
          <div className="relative flex-grow flex items-center justify-center py-8">
            {/* Donut Chart */}
            <div className="relative w-56 h-56">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="8" className="dark:stroke-white/5" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4648d4" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="113" strokeLinecap="round" className="dark:stroke-[#a3a6ff]" style={{ filter: "drop-shadow(0 0 8px rgba(70, 72, 212, 0.4))" }} />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#57dffe" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="176" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8127cf" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="213" strokeLinecap="round" className="dark:stroke-[#ef81c4]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-[#464554] dark:text-indigo-400 font-bold uppercase tracking-widest">Growth</p>
                <p className="text-3xl font-extrabold text-[#4648d4] dark:text-white">68%</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            {[
              { color: "bg-[#4648d4] dark:bg-[#a3a6ff]", label: "Equity & Stocks", val: "45%" },
              { color: "bg-[#57dffe]", label: "Real Estate", val: "30%" },
              { color: "bg-[#8127cf] dark:bg-[#ef81c4]", label: "Crypto", val: "15%" },
              { color: "bg-[#e5eeff] dark:bg-white/20", label: "Cash Reserve", val: "10%" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#eff4ff] dark:bg-[#161a22] rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                  <span className="text-sm font-medium text-[#0b1c30] dark:text-[#ecedf7]">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-[#0b1c30] dark:text-white">{item.val}</span>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-[#6063ee] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#4648d4]/20">
            <span className="material-symbols-outlined">add</span>
            Rebalance Portfolio
          </button>
        </section>

        {/* Quick Transfer */}
        <section className="bg-indigo-600 dark:bg-gradient-to-br dark:from-[#a3a6ff] dark:to-[#6063ee] rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="text-xl font-bold mb-6">Quick Transfer</h3>
          <div className="flex gap-3 mb-6">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuC7Q084HDL3en3qrfmRp9YlqFXVsTudld48Y-pybOovodXpngb6evwCEN3d4iEZRjsi5GSzAh-yZYnkwu2VobCY7EJETYT3-w7agDmlwzRTlzziXaLszRDJh6yonRVsK3X9lKd1VNL4X4EeGRwGQ8DgCBiB9BxpZqiGUwQbfW9T863xcrj7UToiquhSjXouGB_VG_3i4mXbMXGJn4WvmuJj4uCepGhBxbJXNS_bzB0fkTuqA-DJXxgikPnkHnwHXK_8Qk8HFa_vf7xn",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuDmPf2znBEb_CXqk99XTAZ5nsguIApwhS1dneKnZnfUfmUHDWKbH6rW4pQTHup72DgOOcv8BUbFE16suczcbYpkEeyiVdfZXgX8a5uAK0Y-vh3u1Eqt5kXWB2qQthqTY2rO-q9atMi9KnTXtMp8e2bem2I5DrgGVV_9Ln5spD6GYGJRzrWcbvdpOnQEhQdye_zOhm4cwMftM6-ZH7RanXxpy3Zn1S8AOKkmt-qTOMs-eOcQo-SVtwdHHiwucR_rL3Ld6z_h6psRMtst",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAAbKEIgkYaNzCJyCIafnMSvsNxLmEftiXieEGM8srY4UKhdpnH_dm9BVN0Q-lk-RuYnV5uz86z3DQlRKeIxH9cWw5YF143pT0V5uH3wAxR0wWRjy1q4Sz8ja3kmKVPmZgvb3_Kbnrlj1UOGJX1HN8SMfXQxWFe_BQbu4foMxTeIYDYsOYixW_J5MZD7XofQtXP8zLLkLEDe_xQ5z52hxYImoZxQ7pVjv8VpQaek24Gdozins2bCE725A6EiWsiyt49h_h5cMhC46ER",
            ].map((src, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-white/20 p-0.5 overflow-hidden">
                <img src={src} alt={`Contact ${i + 1}`} className="w-full h-full object-cover rounded-full" />
              </div>
            ))}
            <button className="w-12 h-12 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center hover:bg-white/10 transition-all">
              <span className="material-symbols-outlined text-white">add</span>
            </button>
          </div>
          <div className="relative mb-6">
            <input type="text" className="w-full bg-white/10 border-none rounded-lg py-4 px-4 text-white font-bold text-lg focus:ring-2 focus:ring-white/20" defaultValue="$500.00" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 text-sm">USD</span>
          </div>
          <button className="w-full py-4 bg-white text-indigo-600 dark:text-[#6063ee] rounded-full font-bold hover:bg-opacity-90 transition-all">Send Money</button>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center gap-3 p-6 bg-[#eff4ff] dark:bg-[#10131b] rounded-lg hover:bg-[#4648d4]/10 dark:hover:bg-[#a3a6ff]/10 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[#e5eeff] dark:bg-[#161a22] flex items-center justify-center text-[#464554] dark:text-[#a9abb4] group-hover:text-[#4648d4] dark:group-hover:text-[#a3a6ff] transition-colors">
              <span className="material-symbols-outlined">send</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] group-hover:text-[#0b1c30] dark:group-hover:text-white">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-3 p-6 bg-[#eff4ff] dark:bg-[#10131b] rounded-lg hover:bg-[#4648d4]/10 dark:hover:bg-[#a3a6ff]/10 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[#e5eeff] dark:bg-[#161a22] flex items-center justify-center text-[#464554] dark:text-[#a9abb4] group-hover:text-[#4648d4] dark:group-hover:text-[#a3a6ff] transition-colors">
              <span className="material-symbols-outlined">add_chart</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] group-hover:text-[#0b1c30] dark:group-hover:text-white">Invest</span>
          </button>
        </div>
      </div>
    </div>
  );
}
