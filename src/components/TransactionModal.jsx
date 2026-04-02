import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../store/transactionsSlice";

export default function TransactionModal({ isOpen, onClose, editingTransaction }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    sub: "",
    category: "Technology",
    status: "Completed",
    amountValue: "",
    amountSign: "-",
  });

  const categories = ["Technology", "Travel", "Income", "Dining", "Uncategorized"];
  const statuses = ["Completed", "Pending", "Hold"];

  const catColorsMap = {
    Technology: "bg-[#57dffe] text-[#006172] dark:bg-[#44474f] dark:text-[#ced0da]",
    Travel: "bg-[#f0dbff] text-[#2c0051] dark:bg-[#ffa5d9]/10 dark:text-[#ffa5d9]",
    Income: "bg-[#e1e0ff] text-[#07006c] dark:bg-[#a3a6ff]/10 dark:text-[#a3a6ff]",
    Dining: "bg-[#d3e4fe] text-[#464554] dark:bg-[#454850] dark:text-[#a9abb4]",
    Uncategorized: "bg-[#ffdad6] text-[#93000a] dark:bg-[#a70138] dark:text-[#ffb2b9]"
  };

  const statusColorsMap = {
    Completed: "bg-[#00687a] text-white dark:bg-[#a3a6ff] dark:text-[#001f26]",
    Pending: "bg-[#767586] text-white dark:bg-[#73757e] dark:text-white",
    Hold: "bg-[#ba1a1a] text-white dark:bg-[#ff6e84]"
  };

  useEffect(() => {
    if (isOpen) {
      if (editingTransaction) {
        // Parse amount sign and value
        const amtStr = editingTransaction.amount.toString();
        const sign = amtStr.startsWith("+") ? "+" : "-";
        const val = amtStr.replace(/[^\d.]/g, ""); // Extract just numbers and decimal

        setFormData({
          name: editingTransaction.name || "",
          sub: editingTransaction.sub || "",
          category: editingTransaction.category || "Technology",
          status: editingTransaction.status || "Completed",
          amountValue: val,
          amountSign: sign,
        });
      } else {
        setFormData({
          name: "",
          sub: "",
          category: "Technology",
          status: "Completed",
          amountValue: "",
          amountSign: "-",
        });
      }
    }
  }, [isOpen, editingTransaction]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formatting date and time
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Formatting Amount
    const parsedAmt = parseFloat(formData.amountValue || "0").toFixed(2);
    const amountStr = `${formData.amountSign}$${parsedAmt}`;

    // Status Colors (for table)
    const tableStatusColors = {
      Completed: "bg-[#00687a] dark:bg-[#a3a6ff]",
      Pending: "bg-[#767586] dark:bg-[#73757e]",
      Hold: "bg-[#ba1a1a] dark:bg-[#ff6e84]"
    };

    // Merchant Column Icons
    const categoryIcons = {
      Technology: "computer",
      Travel: "flight",
      Income: "account_balance",
      Dining: "restaurant",
      Uncategorized: "receipt_long"
    };

    const payload = {
      date: editingTransaction ? editingTransaction.date : date,
      time: editingTransaction ? editingTransaction.time : time,
      icon: categoryIcons[formData.category] || "receipt_long",
      name: formData.name,
      sub: formData.sub,
      category: formData.category,
      catColor: catColorsMap[formData.category] || catColorsMap.Uncategorized,
      status: formData.status,
      statusColor: tableStatusColors[formData.status] || tableStatusColors.Pending,
      amount: amountStr,
      amountColor: formData.amountSign === "+" ? "text-[#00687a] dark:text-[#a3a6ff]" : "",
    };

    if (editingTransaction) {
      dispatch(editTransaction({ ...payload, id: editingTransaction.id }));
    } else {
      dispatch(addTransaction(payload));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161a22] w-full max-w-md p-8 rounded-3xl shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold tracking-tight text-[#0b1c30] dark:text-white">
            {editingTransaction ? "Edit Transaction" : "New Transaction"}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Merchant */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#a9abb4]">Merchant Name</label>
            <input
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4648d4]/50 dark:focus:ring-[#a3a6ff]/50 text-[#0b1c30] dark:text-white transition-all outline-none"
              placeholder="e.g. Amazon"
            />
          </div>

          {/* Sub/Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#a9abb4]">Description</label>
            <input
              value={formData.sub}
              onChange={e => setFormData({ ...formData, sub: e.target.value })}
              className="w-full bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4648d4]/50 dark:focus:ring-[#a3a6ff]/50 text-[#0b1c30] dark:text-white transition-all outline-none"
              placeholder="e.g. Office Supplies"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#a9abb4]">Amount</label>
            <div className="flex gap-2">
              <select
                value={formData.amountSign}
                onChange={e => setFormData({ ...formData, amountSign: e.target.value })}
                className="bg-[#eff4ff] dark:bg-[#10131b] border-r-8 border-transparent rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4648d4]/50 text-[#0b1c30] dark:text-white dark:focus:ring-[#a3a6ff]/50 transition-all font-bold outline-none cursor-pointer appearance-none shadow-sm"
              >
                <option value="-">Expense (-)</option>
                <option value="+">Income (+)</option>
              </select>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={formData.amountValue}
                onChange={e => setFormData({ ...formData, amountValue: e.target.value })}
                className="flex-grow bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#4648d4]/50 dark:focus:ring-[#a3a6ff]/50 text-[#0b1c30] dark:text-white font-bold transition-all outline-none shadow-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#a9abb4]">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${formData.category === cat
                      ? catColorsMap[cat] + ' shadow-md scale-105'
                      : 'bg-[#eff4ff] text-[#464554] dark:bg-[#10131b] dark:text-[#a9abb4] hover:bg-[#dce9ff] dark:hover:bg-[#1c2029]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#a9abb4]">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map(stat => (
                <button
                  type="button"
                  key={stat}
                  onClick={() => setFormData({ ...formData, status: stat })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${formData.status === stat
                      ? statusColorsMap[stat] + ' shadow-md scale-105'
                      : 'bg-[#eff4ff] text-[#464554] dark:bg-[#10131b] dark:text-[#a9abb4] hover:bg-[#dce9ff] dark:hover:bg-[#1c2029]'
                    }`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-[#4648d4] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] font-bold py-3.5 rounded-xl shadow-lg shadow-[#4648d4]/20 hover:opacity-90 transition-all active:scale-95">
              {editingTransaction ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
