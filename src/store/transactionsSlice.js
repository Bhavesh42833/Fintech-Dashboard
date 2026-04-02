import { createSlice } from "@reduxjs/toolkit";

const defaultTransactions = [
  { id: 1, date: "Oct 24, 2023", time: "10:42 AM", icon: "computer", name: "Apple Store Online", sub: "Verified Merchant", subIcon: "verified", category: "Technology", catColor: "bg-[#57dffe] text-[#006172] dark:bg-[#44474f] dark:text-[#ced0da]", status: "Completed", statusColor: "bg-[#00687a] dark:bg-[#a3a6ff]", amount: "-$1,299.00", amountColor: "" },
  { id: 2, date: "Oct 22, 2023", time: "02:15 PM", icon: "flight", name: "Delta Air Lines", sub: "Atlanta, US", subIcon: "location_on", category: "Travel", catColor: "bg-[#f0dbff] text-[#2c0051] dark:bg-[#ffa5d9]/10 dark:text-[#ffa5d9]", status: "Completed", statusColor: "bg-[#00687a] dark:bg-[#a3a6ff]", amount: "-$842.15", amountColor: "" },
  { id: 3, date: "Oct 21, 2023", time: "09:00 AM", icon: "account_balance", name: "Stripe Payout", sub: "Instant Deposit", subIcon: "bolt", category: "Income", catColor: "bg-[#e1e0ff] text-[#07006c] dark:bg-[#a3a6ff]/10 dark:text-[#a3a6ff]", status: "Completed", statusColor: "bg-[#00687a] dark:bg-[#a3a6ff]", amount: "+$4,250.00", amountColor: "text-[#00687a] dark:text-[#a3a6ff]" },
  { id: 4, date: "Oct 20, 2023", time: "08:30 PM", icon: "restaurant", name: "Blue Hill Restaurant", sub: "Loyalty Reward", subIcon: "stars", category: "Dining", catColor: "bg-[#d3e4fe] text-[#464554] dark:bg-[#454850] dark:text-[#a9abb4]", status: "Pending", statusColor: "bg-[#767586] dark:bg-[#73757e]", amount: "-$156.40", amountColor: "" },
  { id: 5, date: "Oct 19, 2023", time: "01:12 PM", icon: "warning", name: "Unknown Merchant", sub: "Flagged for review", subIcon: "", category: "Uncategorized", catColor: "bg-[#ffdad6] text-[#93000a] dark:bg-[#a70138] dark:text-[#ffb2b9]", status: "Hold", statusColor: "bg-[#ba1a1a] dark:bg-[#ff6e84]", amount: "-$24.99", amountColor: "", flagged: true },
];

const calculateTotals = (items) => {
  let outflow = 0;
  let inflow = 0;
  items.forEach(tx => {
    const val = parseFloat(tx.amount.replace(/[^\d.]/g, "")) || 0;
    if (tx.amount.startsWith("+")) {
      inflow += val;
    } else {
      outflow += val;
    }
  });
  return { outflow, inflow };
};

const initialTotals = calculateTotals(defaultTransactions);

const initialState = {
  items: defaultTransactions,
  totalOutflow: initialTotals.outflow,
  totalInflow: initialTotals.inflow,
  filters: {
    search: "",       
    dateRange: "Last 30 Days",
  }
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    hydrateTotals: (state) => {
      const { outflow, inflow } = calculateTotals(state.items);
      state.totalOutflow = outflow;
      state.totalInflow = inflow;
    },
    addTransaction: (state, action) => {
      state.items.unshift({ ...action.payload, id: Date.now() });
      const { outflow, inflow } = calculateTotals(state.items);
      state.totalOutflow = outflow;
      state.totalInflow = inflow;
    },
    editTransaction: (state, action) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        const { outflow, inflow } = calculateTotals(state.items);
        state.totalOutflow = outflow;
        state.totalInflow = inflow;
      }
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
      const { outflow, inflow } = calculateTotals(state.items);
      state.totalOutflow = outflow;
      state.totalInflow = inflow;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
});

export const { addTransaction, editTransaction, deleteTransaction, setFilters } = transactionsSlice.actions;
export default transactionsSlice.reducer;
