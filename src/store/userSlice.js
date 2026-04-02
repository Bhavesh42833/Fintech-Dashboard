import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: {
    id: "1",
    initials: "JA", 
    name: "Julian Agraw",
    email: "julian@aeroledger.com",
    role: "Admin",
    roleBg: "bg-[#6063ee] dark:bg-[#9396ff]",
    roleText: "text-white dark:text-[#0a0081]",
    avatarBg: "bg-gradient-to-br from-[#4648d4] to-[#6063ee]",
    avatarText: "text-white",
  },
  users: [
    { id: "1", initials: "JA", name: "Julian Agraw", email: "julian@aeroledger.com", role: "Admin", roleBg: "bg-[#6063ee] dark:bg-[#9396ff]", roleText: "text-white dark:text-[#0a0081]", avatarBg: "bg-[#e1e0ff] dark:bg-[#a3a6ff]/10", avatarText: "text-[#4648d4] dark:text-[#a3a6ff]" },
    { id: "2", initials: "MK", name: "Marcus Knight", email: "m.knight@aeroledger.com", role: "Viewer", roleBg: "bg-[#57dffe] dark:bg-[#44474f]", roleText: "text-[#006172] dark:text-[#ced0da]", avatarBg: "bg-[#f0dbff] dark:bg-[#ffa5d9]/10", avatarText: "text-[#8127cf] dark:text-[#ffa5d9]" },
    { id: "3", initials: "SL", name: "Sarah Lopez", email: "sarah.l@aeroledger.com", role: "Viewer", roleBg: "bg-[#d3e4fe] dark:bg-[#454850]", roleText: "text-[#464554] dark:text-[#a9abb4]", avatarBg: "bg-[#d3e4fe] dark:bg-[#21262f]", avatarText: "text-[#464554] dark:text-[#a9abb4]" },
  ]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    addUser: (state, action) => {
      // Pick random background arrays for newly generated avatars to match original logic
      const bgColors = ["bg-[#e1e0ff] dark:bg-[#a3a6ff]/10", "bg-[#f0dbff] dark:bg-[#ffa5d9]/10", "bg-[#d3e4fe] dark:bg-[#21262f]"];
      const textColors = ["text-[#4648d4] dark:text-[#a3a6ff]", "text-[#8127cf] dark:text-[#ffa5d9]", "text-[#464554] dark:text-[#a9abb4]"];
      const r = Math.floor(Math.random() * bgColors.length);

      const parsedRoleBg = action.payload.role === "Admin" 
        ? "bg-[#6063ee] dark:bg-[#9396ff]" // Admin Colors
        : "bg-[#d3e4fe] dark:bg-[#454850]"; // Viewer Colors
      
      const parsedRoleText = action.payload.role === "Admin"
        ? "text-white dark:text-[#0a0081]"
        : "text-[#464554] dark:text-[#a9abb4]";

      const initials = action.payload.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

      state.users.push({
        id: Date.now().toString(),
        initials,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        roleBg: parsedRoleBg,
        roleText: parsedRoleText,
        avatarBg: bgColors[r],
        avatarText: textColors[r],
      });
    },
    deleteUser: (state, action) => {
      // Allow deletion assuming it isn't the active user itself
      if (state.currentUser.id !== action.payload) {
        state.users = state.users.filter(u => u.id !== action.payload);
      }
    },
    editUser: (state, action) => {
      const idx = state.users.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) {
        const u = state.users[idx];
        u.name = action.payload.name;
        u.email = action.payload.email;
        u.role = action.payload.role;
        u.initials = action.payload.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
        
        u.roleBg = action.payload.role === "Admin" 
          ? "bg-[#6063ee] dark:bg-[#9396ff]"
          : "bg-[#d3e4fe] dark:bg-[#454850]";
        
        u.roleText = action.payload.role === "Admin"
          ? "text-white dark:text-[#0a0081]"
          : "text-[#464554] dark:text-[#a9abb4]";

        // Auto-update global profile if edit is on actively logged-in user
        if (state.currentUser.id === u.id) {
          state.currentUser.name = u.name;
          state.currentUser.email = u.email;
          state.currentUser.role = u.role;
          state.currentUser.initials = u.initials;
        }
      }
    }
  }
});

export const { addUser, deleteUser, editUser, authenticate, logout } = userSlice.actions;
export default userSlice.reducer;
