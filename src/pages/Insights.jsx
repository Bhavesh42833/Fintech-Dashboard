export default function Insights() {
  return (
    <div className="flex flex-col gap-8 mt-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#4648d4] dark:text-indigo-400 mb-2 block">
            Aero Premium Finance
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0b1c30] dark:text-white">
            Financial Insights
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#eff4ff] dark:bg-[#10131b] px-6 py-3 rounded-full flex flex-col">
            <span className="text-[10px] font-bold text-[#464554] dark:text-[#a9abb4] uppercase tracking-wider">Total Monthly Spending</span>
            <span className="text-xl font-bold text-[#0b1c30] dark:text-white">$12,480.00</span>
          </div>
          <div className="bg-[#4648d4] dark:bg-[#a3a6ff] px-6 py-3 rounded-full flex flex-col text-white dark:text-[#0f00a4] shadow-lg shadow-[#4648d4]/20">
            <span className="text-[10px] font-bold text-white/70 dark:text-[#0f00a4]/70 uppercase tracking-wider">Savings Rate</span>
            <span className="text-xl font-bold">24.5%</span>
          </div>
        </div>
      </header>

      {/* Insights Grid */}
      <section className="grid grid-cols-12 gap-8">
        {/* Area Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#161a22] rounded-xl p-8 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0b1c30] dark:text-white mb-1">Spending over Time</h2>
              <p className="text-[#464554] dark:text-[#a9abb4] text-sm">Visualizing your liquidity across the last 6 months</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#eff4ff] dark:bg-[#1c2029] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#dce9ff] dark:hover:bg-[#21262f] transition-all text-[#0b1c30] dark:text-[#a9abb4]">Monthly</button>
              <button className="bg-[#4648d4] dark:bg-[#a3a6ff]/20 text-white dark:text-[#a3a6ff] px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-[#4648d4]/10">Weekly</button>
            </div>
          </div>
          {/* Chart */}
          <div className="h-80 w-full relative">
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-[#c7c4d7]/10 dark:border-[#454850]/30 w-full h-0"></div>
              ))}
            </div>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="insightFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4648d4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4648d4" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="insightFillDark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#a3a6ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#a3a6ff" stopOpacity="0" />
                </linearGradient>
                <filter id="insightGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d="M0 250 Q 100 220 200 240 T 400 180 T 600 220 T 800 120 T 1000 150 V 300 H 0 Z" className="fill-[url(#insightFill)] dark:fill-[url(#insightFillDark)]" />
              <path d="M0 250 Q 100 220 200 240 T 400 180 T 600 220 T 800 120 T 1000 150" fill="none" className="stroke-[#4648d4] dark:stroke-[#a3a6ff]" strokeLinecap="round" strokeWidth="4" filter="url(#insightGlow)" />
              <circle cx="800" cy="120" r="6" className="fill-[#4648d4] dark:fill-[#a3a6ff] animate-pulse" />
              <circle cx="800" cy="120" r="12" className="fill-[#4648d4] dark:fill-[#a3a6ff]" fillOpacity="0.1" />
            </svg>
            {/* Tooltip */}
            <div className="absolute top-10 right-1/4 bg-[#0b1c30] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] p-3 rounded-lg shadow-xl text-xs flex flex-col gap-1 translate-x-1/2">
              <span className="opacity-70 font-medium">May 14 - 20</span>
              <span className="text-lg font-bold">$3,120.45</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 px-2 text-[10px] font-bold text-[#464554] dark:text-[#a9abb4] uppercase tracking-widest">
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Burn Rate */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-[#213145] dark:bg-[#1c2029] text-[#eaf1ff] dark:text-[#ecedf7] rounded-xl p-8 shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4648d4]/20 dark:bg-[#a3a6ff]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#acedff] dark:text-[#ef81c4] text-lg icon-filled">local_fire_department</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight">Burn Rate</h3>
              </div>
              <div className="mb-4">
                <span className="text-5xl font-extrabold block mb-2">142</span>
                <span className="text-[#acedff] dark:text-[#ef81c4] text-sm font-bold uppercase tracking-widest">Days of Runway</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">At your current spending velocity of $412/day.</p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-xs mb-3 font-bold">
                <span className="opacity-60">BUDGET EXHAUSTION</span>
                <span className="text-[#acedff] dark:text-[#ef81c4]">82% REMAINING</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#acedff] dark:bg-[#ef81c4] w-[82%] rounded-full"></div>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="bg-[#dce9ff] dark:bg-[#1c2029] rounded-xl p-6 flex items-center justify-between group cursor-pointer hover:bg-[#d3e4fe] dark:hover:bg-[#21262f] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#161a22] flex items-center justify-center text-[#4648d4] dark:text-[#a3a6ff]">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <span className="text-sm font-bold text-[#0b1c30] dark:text-white">Optimize Subscription Burn</span>
            </div>
            <span className="material-symbols-outlined text-[#0b1c30] dark:text-white group-hover:translate-x-1 transition-transform">chevron_right</span>
          </div>
        </div>

        {/* Top Spending Categories */}
        <div className="col-span-12 bg-[#eff4ff] dark:bg-[#10131b] rounded-xl p-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0b1c30] dark:text-white">Top Spending Categories</h2>
              <p className="text-[#464554] dark:text-[#a9abb4] text-sm">Where your money flows the most</p>
            </div>
            <button className="text-[#4648d4] dark:text-[#a3a6ff] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "restaurant", name: "Food & Dining", amount: "$2,410", pct: "32% TOTAL", limit: "$3,000", used: 80, color: "bg-[#4648d4] dark:bg-[#a3a6ff]", iconBg: "bg-[#4648d4]/10 dark:bg-[#a3a6ff]/10", iconColor: "text-[#4648d4] dark:text-[#a3a6ff]", badge: "bg-[#57dffe] text-[#006172] dark:bg-[#44474f] dark:text-[#ced0da]" },
              { icon: "home", name: "Housing", amount: "$3,500", pct: "28% TOTAL", limit: "$3,500", used: 100, color: "bg-[#8127cf] dark:bg-[#ffa5d9]", iconBg: "bg-[#f0dbff] dark:bg-[#ffa5d9]/10", iconColor: "text-[#2c0051] dark:text-[#ffa5d9]", badge: "bg-[#57dffe] text-[#006172] dark:bg-[#44474f] dark:text-[#ced0da]" },
              { icon: "commute", name: "Transport", amount: "$1,120", pct: "15% TOTAL", limit: "$1,500", used: 74, color: "bg-[#00687a] dark:bg-[#e0e2ec]", iconBg: "bg-[#acedff] dark:bg-[#e0e2ec]/10", iconColor: "text-[#001f26] dark:text-[#e0e2ec]", badge: "bg-[#57dffe] text-[#006172] dark:bg-[#44474f] dark:text-[#ced0da]" },
              { icon: "shopping_bag", name: "Shopping", amount: "$2,850", pct: "OVER LIMIT", limit: "$2,000", used: 100, color: "bg-[#ba1a1a] dark:bg-[#ff6e84]", iconBg: "bg-[#ffdad6] dark:bg-[#ff6e84]/10", iconColor: "text-[#93000a] dark:text-[#ff6e84]", badge: "bg-[#ba1a1a] dark:bg-[#a70138] text-white", isOver: true },
            ].map((cat, i) => (
              <div key={i} className="bg-white dark:bg-[#161a22] p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 ${cat.iconBg} ${cat.iconColor} rounded-2xl flex items-center justify-center`}>
                    <span className="material-symbols-outlined icon-filled">{cat.icon}</span>
                  </div>
                  <span className={`${cat.badge} text-[10px] font-extrabold px-2 py-1 rounded-md`}>{cat.pct}</span>
                </div>
                <h4 className="font-bold text-lg mb-1 text-[#0b1c30] dark:text-white">{cat.name}</h4>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-extrabold text-[#0b1c30] dark:text-white">{cat.amount}</span>
                  <span className="text-xs text-[#464554] dark:text-[#a9abb4] font-medium">/mo</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-[#464554] dark:text-[#a9abb4] uppercase">
                    <span>{cat.isOver ? "Limit" : "Limit"}</span>
                    <span>{cat.limit}</span>
                  </div>
                  <div className={`w-full h-2 ${cat.isOver ? "bg-[#ffdad6] dark:bg-[#a70138]/30" : "bg-[#e5eeff] dark:bg-[#161a22]"} rounded-full overflow-hidden`}>
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.used}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="col-span-12 lg:col-span-6 bg-[#6063ee] dark:bg-gradient-to-br dark:from-[#9396ff] dark:to-[#6063ee] rounded-xl p-8 text-white flex flex-col justify-between h-64 shadow-2xl shadow-[#4648d4]/30 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">AI Assistant</span>
            <h3 className="text-2xl font-bold tracking-tight mb-4">We found $450 in redundant streaming subscriptions.</h3>
            <p className="text-white/80 text-sm max-w-sm">Would you like Aero to automatically pause the least used services for 30 days?</p>
          </div>
          <div className="flex gap-4 relative z-10">
            <button className="bg-white text-[#4648d4] dark:text-[#6063ee] px-6 py-2 rounded-full font-bold text-sm shadow-xl active:scale-95 transition-all">Yes, optimize</button>
            <button className="bg-transparent border border-white/30 px-6 py-2 rounded-full font-bold text-sm hover:bg-white/10 active:scale-95 transition-all">Maybe later</button>
          </div>
        </div>

        {/* Market Correlation */}
        <div className="col-span-12 lg:col-span-6 bg-[#dce9ff] dark:bg-[#1c2029] rounded-xl p-8 flex flex-col justify-between h-64">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#0b1c30] dark:text-white mb-1">Market Correlation</h3>
              <p className="text-[#464554] dark:text-[#a9abb4] text-sm">Portfolio impact based on spending</p>
            </div>
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#dce9ff] dark:border-[#1c2029] bg-slate-200 dark:bg-[#161a22] flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8H55YbhRP-LOJ1kxlmAZ3qyA23Zq-LCPf1yr9hF7UVylUNjQ7nnrxI0ZBdpwPsknOd7P4Hrhf0y8w5-7Co7fTZsTVO17hk-hv8QR8l7J59VzQCLKplKGzaihvavkTHe4-s_Q95yGxXg21u2kYrHw1NVXJ4jS9avOEcpGwbhLrLfgCGcSb6mivF8Lh7NrySW2glDHRQK_YN5rJR5n08BsbA9bUFEXw_DgHUzQtz8MCNgJ-orZk6fyhFLItJsfAvU8v4aVSJ4W6n6Pr" alt="" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#dce9ff] dark:border-[#1c2029] bg-slate-200 dark:bg-[#161a22] flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5oJKbTeRsFzRmoSdGe3yYo8G14cQWbbYiGebbY6UdDGv-m5PSxuB1tuccSbMDat1HsbdS5UcFSMRGJA_YaBxh-5u15gYXfi5xIDpZdIYhjiD0s6U11WFAeeI3QsQFHf4z5qVf4enAOf1f4NqjVCrMJ3xVBW56sW73d9_oPPp2NcYM_Mmpzy6x9AbVk71hrt7eszKvdw3YiDZvIDf93MwQ2-BSmtDxvFnIEcTlJhh9h-89fsw2cIgx0_ljuq_P7mr40n06IGoMaTJ5" alt="" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#dce9ff] dark:border-[#1c2029] bg-[#4648d4] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] text-[10px] flex items-center justify-center font-bold">+12</div>
            </div>
          </div>
          <div className="flex items-end gap-1 mb-2">
            {[12, 20, 32, 24, 40, 28, 36].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-lg ${i === 4 ? "bg-[#4648d4] dark:bg-[#a3a6ff]" : i >= 2 ? `bg-[#4648d4]/${i === 2 ? "60" : i === 3 ? "40" : i === 5 ? "80" : "90"} dark:bg-[#a3a6ff]/${i === 2 ? "60" : i === 3 ? "40" : i === 5 ? "80" : "90"}` : "bg-[#c7c4d7]/20 dark:bg-white/5"}`} style={{ height: `${h * 2.5}px` }}></div>
            ))}
          </div>
          <p className="text-xs font-bold text-[#464554] dark:text-[#a9abb4] uppercase tracking-widest text-center">Last 7 Sessions Activity</p>
        </div>
      </section>
    </div>
  );
}
