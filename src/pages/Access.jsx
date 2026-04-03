import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import AddUserModal from "../components/AddUserModal";

export default function Access() {
  const users = useSelector(state => state.user.users);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteUser(id));
    setOpenMenuId(null);
  };
  return (
    <div className="mt-4">
      {/* Header */}
      <header className="mb-12 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#0b1c30] dark:text-white mb-2">Aero Access</h1>
            <p className="text-[#464554] dark:text-[#a9abb4] text-sm lg:text-lg">Manage your team's permissions and secure API keys.</p>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <section className="max-w-5xl mx-auto grid grid-cols-12 gap-4 lg:gap-8">
        {/* Active Users */}
        <div className="col-span-12 lg:col-span-8 bg-[#eff4ff] dark:bg-[#10131b] rounded-xl p-5 lg:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-[#0b1c30] dark:text-white">Active Users</h3>
            {currentUser.role === 'Admin' && (
              <button onClick={() => { setEditingUser(null); setIsModalOpen(true); }} className="bg-[#4648d4] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] px-4 lg:px-6 py-2 rounded-full font-semibold text-xs lg:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-[#4648d4]/20">
                <span className="material-symbols-outlined text-sm">add</span>
                Add Member
              </button>
            )}
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className={`bg-white dark:bg-[#161a22] rounded-lg p-4 lg:p-6 flex items-center justify-between group hover:shadow-md dark:hover:shadow-none dark:hover:bg-[#1c2029] transition-all flex-wrap gap-4 relative border-l-4 ${user.id === currentUser.id ? 'border-[#00687a] dark:border-[#57dffe]' : 'border-transparent'}`}>
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full ${user.avatarBg} flex items-center justify-center ${user.avatarText} font-bold`}>
                    {user.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0b1c30] dark:text-white text-sm lg:text-base">
                      {user.name} {user.id === currentUser.id && <span className="text-[10px] text-gray-500 font-normal ml-2">(You)</span>}
                    </p>
                    <p className="text-xs lg:text-sm text-[#464554] dark:text-[#a9abb4]">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 lg:gap-8 ml-auto relative">
                  <span className={`${user.roleBg} ${user.roleText} px-3 py-1 lg:px-4 lg:py-1 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider`}>{user.role}</span>
                  {currentUser.role === 'Admin' && (
                    <div className="relative">
                      <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === user.id ? null : user.id); }} className="p-1 lg:p-2 text-[#464554] dark:text-[#a9abb4] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                      
                      {openMenuId === user.id && (
                        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[#1c2029] shadow-xl rounded-lg py-2 px-2 w-40 h-39 z-50 animate-fadeIn border border-[#e5eeff] dark:border-[#21262f] overflow-hidden">
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingUser(user); setIsModalOpen(true); setOpenMenuId(null); }}
                            className="w-full text-left rounded-lg px-4 py-2 hover:bg-[#eff4ff] dark:hover:bg-[#10131b] text-sm font-bold text-[#0b1c30] dark:text-white transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                          </button>
                          <button
                           onClick={(e) => handleDelete(e, user.id)}
                            className="w-full text-left rounded-lg px-4 py-2 hover:bg-[#ffdad6] dark:hover:bg-[#a70138]/20 text-sm font-bold text-[#ba1a1a] dark:text-[#ffb2b9] transition-colors flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys & Security */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 lg:gap-8">
          {/* Key Management */}
          <div className="bg-[#dce9ff] dark:bg-[#1c2029] rounded-xl p-5 lg:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white dark:bg-[#161a22] flex items-center justify-center mb-4 lg:mb-6 shadow-sm">
                <span className="material-symbols-outlined text-[#4648d4] dark:text-[#a3a6ff]">vpn_key</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-[#0b1c30] dark:text-white mb-2">API Keys</h3>
              <p className="text-[#464554] dark:text-[#a9abb4] text-xs lg:text-sm mb-6 lg:mb-8 leading-relaxed">Secure access for your automated financial reporting integrations.</p>
              <div className="space-y-4">
                <div className="bg-white/60 dark:bg-[#10131b] backdrop-blur-md rounded-lg p-4 border border-white/40 dark:border-[#454850]">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] block mb-1">Production Key</label>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] lg:text-xs text-[#0b1c30] dark:text-[#ecedf7]">pk_live_••••839k2</span>
                    <button className="text-[#4648d4] dark:text-[#a3a6ff] hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[16px] lg:text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
                <div className="bg-white/60 dark:bg-[#10131b] backdrop-blur-md rounded-lg p-4 border border-white/40 dark:border-[#454850]">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] block mb-1">Staging Key</label>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] lg:text-xs text-[#0b1c30] dark:text-[#ecedf7]">pk_test_••••110z7</span>
                    <button className="text-[#4648d4] dark:text-[#a3a6ff] hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[16px] lg:text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-[#0b1c30] dark:bg-[#ecedf7] text-white dark:text-[#0b0e15] py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                Rotate All Keys
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 h-40 w-40 bg-[#4648d4]/10 dark:bg-[#a3a6ff]/10 rounded-full blur-3xl"></div>
          </div>

          {/* Security Status */}
          <div className="bg-[#eff4ff] dark:bg-[#10131b] rounded-xl p-5 lg:p-8 flex flex-col justify-center items-center text-center">
            <div className="h-12 w-12 lg:h-16 lg:w-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
              <span className="material-symbols-outlined text-2xl lg:text-3xl icon-filled">verified_user</span>
            </div>
            <h4 className="font-bold text-sm lg:text-base text-[#0b1c30] dark:text-white">Security Standard</h4>
            <p className="text-xs lg:text-sm text-[#464554] dark:text-[#a9abb4] mt-2 leading-tight">Your account meets 2FA compliance for institutional trading.</p>
          </div>
        </div>

        {/* Role Capabilities */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#161a22] rounded-xl p-5 lg:p-8 border border-[#c7c4d7]/10 dark:border-[#454850]/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#00687a] dark:text-[#a3a6ff]">admin_panel_settings</span>
            <h4 className="font-bold text-[#0b1c30] dark:text-white">Role Capabilities</h4>
          </div>
          <ul className="space-y-4">
            {[
              { label: "Financial Auditing", access: "ALL", color: "text-emerald-500" },
              { label: "Fund Transfers", access: "ADMIN", color: "text-[#0b1c30] dark:text-white" },
              { label: "API Generation", access: "ADMIN", color: "text-[#0b1c30] dark:text-white" },
            ].map((perm, i) => (
              <li key={i} className="flex items-center justify-between text-xs lg:text-sm">
                <span className="text-[#464554] dark:text-[#a9abb4]">{perm.label}</span>
                <span className={`${perm.color} font-bold`}>{perm.access}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Enterprise CTA */}
        <div className="col-span-12 lg:col-span-8 bg-[#eff4ff] dark:bg-[#10131b] rounded-xl p-5 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8 relative overflow-hidden group">
          <div className="flex-1 z-10 w-full">
            <h4 className="text-xl lg:text-2xl font-bold mb-2 text-[#0b1c30] dark:text-white">Need Custom Access?</h4>
            <p className="text-[#464554] dark:text-[#a9abb4] text-sm lg:text-base leading-relaxed">Enterprise plans support custom RBAC (Role Based Access Control) configurations for large teams.</p>
            <button className="mt-4 lg:mt-6 flex items-center gap-2 text-[#4648d4] dark:text-[#a3a6ff] font-bold hover:gap-4 transition-all">
              Talk to a Specialist <span className="material-symbols-outlined">trending_flat</span>
            </button>
          </div>
          <div className="hidden md:block w-32 h-32 lg:w-48 lg:h-48 rounded-lg overflow-hidden shrink-0 transform group-hover:scale-105 transition-transform duration-700">
            <img
              alt="Technical support"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpfzDuGepTQeWTScQopA2iydcK-r-qedNbZBWRmgkzakEBwWpVtS_4EbYLn1IVNyg4U83spbgACJEcy6ADz4X7hSwoYEu2iAzD0g_mutoZdNyELzN-xNB_Wf1Fmo5i6FbGvGPp93I953ZY4m7rdqshb_K_sYJAJdAp4clPd5B3pEeo77VMDMN1OJxVVHSHnB0K4XbeBSKXQprrtMTq5PByR3aQW3I6JApVE4ULzuah0JDxOfZVDZEs2zFDERUCwGJHjAh0jZ081mw0"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-12 py-12 flex justify-between items-center border-t border-[#c7c4d7]/10 dark:border-[#454850]/10 text-[#464554] dark:text-[#a9abb4] text-xs font-medium mt-12">
        <p>© 2024 Aero Ledger Inc. Institutional Grade Asset Management.</p>
        <div className="flex gap-6">
          <a className="hover:text-[#4648d4] dark:hover:text-[#a3a6ff] transition-colors" href="#">Privacy Protocol</a>
          <a className="hover:text-[#4648d4] dark:hover:text-[#a3a6ff] transition-colors" href="#">Compliance Certifications</a>
        </div>
      </footer>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editingUser={editingUser} />
    </div>
  );
}
