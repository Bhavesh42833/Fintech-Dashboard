import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../store/transactionsSlice";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const dispatch = useDispatch();
  const rawTransactions = useSelector(state => state.transactions.items);
  const role = useSelector(state => state.user.currentUser.role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Row Action Menu State
  const [openMenuId, setOpenMenuId] = useState(null);

  // Filters State
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    globalSearch: "",
    date: "",
    merchant: "",
    category: "",
    status: "",
    amount: "0"
  });

  // Handle clicking outside to close action menus
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleEditClick = (e, tx) => {
    e.stopPropagation();
    setEditingTransaction(tx);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTransaction(id));
    setOpenMenuId(null);
  };

  const openNewModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Applied Multi-filtering
  const transactions = useMemo(() => {
    return rawTransactions.filter(tx => {
      const g = filters.globalSearch.toLowerCase();
      if (g) {
        if (!tx.name.toLowerCase().includes(g) && !tx.category.toLowerCase().includes(g) && !tx.status.toLowerCase().includes(g)) {
          return false;
        }
      }
      if (filters.date && !tx.date.toLowerCase().includes(filters.date.toLowerCase())) return false;
      if (filters.merchant && !tx.name.toLowerCase().includes(filters.merchant.toLowerCase())) return false;
      if (filters.category && tx.category !== filters.category) return false;
      if (filters.status && tx.status !== filters.status) return false;

      const amtFilter = parseInt(filters.amount) || 0;
      if (amtFilter !== 0) {
        const val = parseFloat(tx.amount.replace(/[^\d.]/g, "")) || 0;
        const isIncome = tx.amount.startsWith("+");
        if (amtFilter > 0) {
          // Slide right -> show Income 
          if (!isIncome || val > amtFilter) return false;
        } else {
          // Slide left -> show Expense 
          if (isIncome || val > Math.abs(amtFilter)) return false;
        }
      }

      return true;
    });
  }, [rawTransactions, filters]);

  const categories = ["Technology", "Travel", "Income", "Dining", "Uncategorized"];
  const statuses = ["Completed", "Pending", "Hold"];

  // Stats (derived from Redux)
  const calculateTotalsList = (items) => {
    let out = 0; let inf = 0;
    items.forEach(tx => {
      const val = parseFloat(tx.amount.replace(/[^\d.]/g, "")) || 0;
      if (tx.amount.startsWith("+")) inf += val;
      else out += val;
    });
    return { out, inf };
  };
  const dynamicFallback = calculateTotalsList(rawTransactions);

  const totalOutflow = useSelector(state => state.transactions.totalOutflow) ?? dynamicFallback.out;
  const totalInflow = useSelector(state => state.transactions.totalInflow) ?? dynamicFallback.inf;

  const displayOutflow = `$${totalOutflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const displayInflow = `$${totalInflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleExportCSV = () => {
    const headers = ["ID", "Date", "Time", "Merchant", "Category", "Status", "Amount"];
    const rows = rawTransactions.map(tx => {
      const isNegative = tx.amount.includes('-');
      const rawVal = parseFloat(tx.amount.replace(/[^\d.]/g, '')) || 0;
      const numericAmount = isNegative ? -rawVal : rawVal;

      return [
        tx.id,
        tx.date,
        tx.time,
        `"${tx.name}"`,
        tx.category,
        tx.status,
        numericAmount
      ].join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aero_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 lg:space-y-8 mt-4 pb-20">
      {/* Hero header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0b1c30] dark:text-white">Aero Transactions</h1>
          <p className="text-[#464554] dark:text-[#a9abb4] text-sm lg:text-base font-medium">Monitoring {rawTransactions.length} transactions across 4 connected accounts.</p>
        </div>
        {role === "Admin" && (
          <button onClick={openNewModal} className="bg-[#4648d4] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] px-6 lg:px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-[#4648d4]/20 hover:opacity-90 transition-all active:scale-95 w-full md:w-auto justify-center">
            <span className="material-symbols-outlined text-sm">add</span>
            New Transaction
          </button>
        )}
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-[#eff4ff] dark:bg-[#10131b] p-5 lg:p-8 rounded-xl flex flex-col justify-between shadow-lg shadow-[#ba1a1a]/5 dark:shadow-[#ff6e84]/5 border-l-4 border-[#ba1a1a] dark:border-[#ff6e84]">
          <span className="text-[#464554] dark:text-[#a9abb4] text-xs font-bold uppercase tracking-widest">Total Outflow</span>
          <div className="mt-2 lg:mt-4">
            <span className="text-2xl lg:text-3xl font-bold text-[#0b1c30] dark:text-white">{displayOutflow}</span>
            <div className="flex items-center gap-1 text-[#ba1a1a] dark:text-[#ff6e84] text-xs font-bold mt-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> 12% vs last month
            </div>
          </div>
        </div>
        <div className="bg-[#eff4ff] dark:bg-[#10131b] p-5 lg:p-8 rounded-xl flex flex-col justify-between shadow-lg shadow-[#4648d4]/5 dark:shadow-[#a3a6ff]/5 border-l-4 border-[#4648d4] dark:border-[#a3a6ff]">
          <span className="text-[#464554] dark:text-[#a9abb4] text-xs font-bold uppercase tracking-widest">Total Inflow</span>
          <div className="mt-2 lg:mt-4">
            <span className="text-2xl lg:text-3xl font-bold text-[#0b1c30] dark:text-white">{displayInflow}</span>
            <div className="flex items-center gap-1 text-[#00687a] dark:text-[#a3a6ff] text-xs font-bold mt-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> 8% vs last month
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-[#4648d4] to-[#6063ee] dark:from-[#a3a6ff] dark:to-[#6063ee] p-5 lg:p-8 rounded-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Primary Account Balance</span>
            <div className="mt-4 flex justify-between items-end">
              <span className="text-4xl font-extrabold tracking-tighter">$142,890.12</span>
              <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold">Active Now</span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#161a22] p-4 rounded-lg shadow-sm flex flex-col items-stretch justify-between gap-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-grow lg:flex-grow-0">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#464554]/60 dark:text-[#a9abb4]/60">search</span>
              <input
                className="bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-full py-3 pl-12 pr-6 text-sm w-full lg:w-80 focus:ring-2 focus:ring-[#4648d4]/10 dark:focus:ring-[#a3a6ff]/10 text-[#0b1c30] dark:text-[#ecedf7] placeholder:text-[#464554]/60 dark:placeholder:text-[#a9abb4]/60"
                placeholder="Search transactions generically..."
                type="text"
                value={filters.globalSearch}
                onChange={e => setFilters({ ...filters, globalSearch: e.target.value })}
              />
            </div>

            <div
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors ${showFilters ? 'bg-[#dce9ff] text-[#4648d4] dark:bg-[#21262f] dark:text-[#a3a6ff]' : 'bg-[#eff4ff] text-[#464554] dark:bg-[#10131b] dark:text-[#a9abb4] hover:bg-[#e5eeff] dark:hover:bg-[#161a22]'}`}
            >
              <span className="material-symbols-outlined">filter_list</span>
              <span className="text-sm font-medium">Multi-Filters</span>
            </div>

            {(filters.globalSearch !== "" || filters.date !== "" || filters.merchant !== "" || filters.category !== "" || filters.status !== "" || parseInt(filters.amount) !== 0) && (
              <button
                onClick={() => setFilters({ globalSearch: "", date: "", merchant: "", category: "", status: "", amount: "0" })}
                className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-colors bg-[#ffdad6] text-[#93000a] dark:bg-[#a70138]/20 dark:text-[#ffb2b9] hover:bg-[#ffb4ab] dark:hover:bg-[#a70138]/40 animate-fadeIn"
              >
                <span className="material-symbols-outlined text-sm">close</span>
                <span className="text-sm font-bold">Reset</span>
              </button>
            )}

            <button onClick={handleExportCSV} className="bg-[#dce9ff] dark:bg-[#1c2029] text-[#0b1c30] dark:text-[#ecedf7] px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#d3e4fe] dark:hover:bg-[#21262f] transition-colors ml-auto lg:ml-0">
              <span className="material-symbols-outlined text-sm">file_download</span>
              Export CSV
            </button>
          </div>
        </div>

        {/* Multi-Filter Dropdown Area */}
        {showFilters && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100 dark:border-white/5 animate-fadeIn">
            <input
              type="date"
              className="bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-lg p-2.5 text-sm text-[#0b1c30] dark:text-[#ecedf7] outline-none focus:ring-2 focus:ring-[#4648d4]/30 w-full"
              value={filters.date}
              onChange={e => setFilters({ ...filters, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Filter Merchant"
              className="bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-lg p-2.5 text-sm text-[#0b1c30] dark:text-[#ecedf7] outline-none focus:ring-2 focus:ring-[#4648d4]/30 w-full"
              value={filters.merchant}
              onChange={e => setFilters({ ...filters, merchant: e.target.value })}
            />
            <select
              className="bg-[#eff4ff] dark:bg-[#10131b] border-r-8 border-transparent rounded-lg p-2.5 text-sm text-[#0b1c30] dark:text-[#ecedf7] outline-none focus:ring-2 focus:ring-[#4648d4]/30 cursor-pointer appearance-none w-full"
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              className="bg-[#eff4ff] dark:bg-[#10131b] border-r-8 border-transparent rounded-lg p-2.5 text-sm text-[#0b1c30] dark:text-[#ecedf7] outline-none focus:ring-2 focus:ring-[#4648d4]/30 cursor-pointer appearance-none w-full"
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="flex flex-col justify-center h-full gap-1.5 bg-[#eff4ff] dark:bg-[#10131b] px-3 py-2 rounded-lg">
              <div className="text-[10px] font-bold text-center tracking-wider uppercase transition-colors duration-300">
                {parseInt(filters.amount) === 0
                  ? <span className="text-[#464554] dark:text-[#a9abb4]">Amount: All</span>
                  : parseInt(filters.amount) > 0
                    ? <span className="text-[#00687a] dark:text-[#a3a6ff]">Income ≤ ${filters.amount}</span>
                    : <span className="text-[#ba1a1a] dark:text-[#ff6e84]">Expense ≤ ${Math.abs(parseInt(filters.amount))}</span>
                }
              </div>
              <input
                type="range"
                min="-10000"
                max="10000"
                step="50"
                className="w-full h-1 bg-[#c7c4d7] dark:bg-[#454850] rounded-lg appearance-none cursor-pointer accent-[#4648d4] dark:accent-[#a3a6ff]"
                value={filters.amount}
                onChange={e => setFilters({ ...filters, amount: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-[#161a22] rounded-xl overflow-visible shadow-[0_4px_24px_-4px_rgba(11,28,48,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#eff4ff]/50 dark:bg-[#10131b]">
                {role === "Admin" && <th className="px-4 py-5 w-12 text-center text-xs font-bold text-[#464554] dark:text-[#a9abb4]">ACT</th>}
                {["Date", "Merchant", "Category", "Status"].map((h) => (
                  <th key={h} className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4]">{h}</th>
                ))}
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff] dark:divide-[#10131b]">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-12 text-center text-slate-500 font-medium">No transactions found matching your filters.</td>
                </tr>
              ) : null}
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#eff4ff]/30 dark:hover:bg-[#10131b] transition-colors group">

                  {/* Extreme Left Menu for Admin */}
                  {role === "Admin" && (
                    <td className="px-4 py-6 relative select-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === tx.id ? null : tx.id);
                        }}
                        className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === tx.id && (
                        <div className="absolute left-6 top-10 bg-white dark:bg-[#1c2029] shadow-xl rounded-lg py-2 px-2 w-40 h-34 z-50 animate-fadeIn border border-[#e5eeff] dark:border-[#21262f]">
                          <button
                            onClick={(e) => handleEditClick(e, tx)}
                            className="w-full rounded-lg text-left px-4 py-2 hover:bg-[#eff4ff] dark:hover:bg-[#10131b] text-sm font-bold text-[#0b1c30] dark:text-white transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                          </button>
                          <button
                            onClick={(e) => handleDeleteClick(e, tx.id)}
                            className="w-full text-left rounded-lg px-4 py-2 hover:bg-[#ffdad6] dark:hover:bg-[#a70138]/20 text-sm font-bold text-[#ba1a1a] dark:text-[#ffb2b9] transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  )}

                  <td className="px-8 py-6">
                    <div className="flex flex-col cursor-default">
                      <span className="text-[#0b1c30] dark:text-white font-semibold text-sm">{tx.date}</span>
                      <span className="text-[#464554] dark:text-[#a9abb4] text-xs">{tx.time}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 cursor-default">
                      <div className={`w-10 h-10 rounded-full bg-[#e5eeff] dark:bg-[#161a22] flex items-center justify-center ${tx.flagged ? "text-[#ba1a1a] dark:text-[#ff6e84]" : "text-[#4648d4] dark:text-[#ecedf7]"} group-hover:bg-white dark:group-hover:bg-[#1c2029] transition-colors`}>
                        <span className="material-symbols-outlined">{tx.icon}</span>
                      </div>
                      <div>
                        <span className="text-[#0b1c30] dark:text-white font-bold text-sm">{tx.name}</span>
                        <div className={`flex items-center gap-1 text-xs mt-0.5 ${tx.flagged ? "text-[#ba1a1a] dark:text-[#ff6e84]" : "text-[#464554] dark:text-[#a9abb4]"}`}>
                          {tx.subIcon && <span className={`material-symbols-outlined text-[10px] ${tx.subIcon === "verified" ? "icon-filled" : ""}`}>{tx.subIcon}</span>}
                          {tx.sub}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 cursor-default">
                    <span className={`${tx.catColor} px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider`}>{tx.category}</span>
                  </td>
                  <td className="px-8 py-6 cursor-default">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${tx.statusColor}`}></div>
                      <span className="text-xs font-bold text-[#0b1c30] dark:text-white">{tx.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right cursor-default">
                    <span className={`font-extrabold text-base ${tx.amountColor || "text-[#0b1c30] dark:text-white"}`}>{tx.amount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 flex items-center justify-between bg-[#eff4ff]/20 dark:bg-[#10131b]/50">
          <span className="text-sm font-medium text-[#464554] dark:text-[#a9abb4]">Showing 1-{Math.min(10, transactions.length)} of {transactions.length} transactions</span>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#c7c4d7] dark:border-[#454850] hover:bg-white dark:hover:bg-[#1c2029] transition-all text-[#464554] dark:text-[#a9abb4]">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4648d4] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] font-bold text-sm shadow-md shadow-[#4648d4]/20">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#c7c4d7] dark:border-[#454850] hover:bg-white dark:hover:bg-[#1c2029] transition-all text-[#464554] dark:text-[#a9abb4]">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTransaction={editingTransaction}
      />

      {/* Smart Insight */}
      <section className="bg-[#dce9ff] dark:bg-[#1c2029] rounded-xl p-8 flex items-center justify-between relative overflow-hidden group">
        <div className="relative z-10 max-w-xl">
          <h3 className="text-xl font-bold text-[#0b1c30] dark:text-white mb-2">Smart Spending Insight</h3>
          <p className="text-[#464554] dark:text-[#a9abb4]">Your spending in <span className="font-bold text-[#4648d4] dark:text-[#a3a6ff]">Technology</span> has increased by 40% this week compared to your average. Most of this was allocated to your Apple Store purchase.</p>
        </div>
        <button className="relative z-10 bg-white dark:bg-[#161a22] text-[#4648d4] dark:text-[#a3a6ff] px-6 py-3 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all shrink-0">
          View Breakdown
        </button>
        <div className="absolute right-0 top-0 w-64 h-full bg-[#4648d4]/5 dark:bg-[#a3a6ff]/5 translate-x-12 -skew-x-12 group-hover:translate-x-8 transition-transform duration-700"></div>
      </section>
    </div>
  );
}
