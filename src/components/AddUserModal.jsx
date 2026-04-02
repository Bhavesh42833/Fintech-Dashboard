import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../store/userSlice";

export default function AddUserModal({ isOpen, onClose, editingUser = null }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        setName(editingUser.name || "");
        setEmail(editingUser.email || "");
        setRole(editingUser.role || "Viewer");
      } else {
        setName("");
        setEmail("");
        setRole("Viewer");
      }
    }
  }, [isOpen, editingUser]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingUser) {
      dispatch(editUser({ id: editingUser.id, name, email, role }));
    } else {
      dispatch(addUser({ name, email, role }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-[#161a22] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-[#eff4ff] dark:bg-[#10131b] px-6 py-4 flex items-center justify-between border-b border-white/50 dark:border-white/5">
          <h2 className="text-xl font-bold tracking-tight text-[#0b1c30] dark:text-white">
            {editingUser ? "Edit Member" : "Add Member"}
          </h2>
          <button onClick={onClose} className="p-2 text-[#464554] dark:text-[#a9abb4] hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] mb-2">Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              className="w-full bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-lg p-3 text-sm text-[#0b1c30] dark:text-[#ecedf7] outline-none focus:ring-2 focus:ring-[#4648d4] dark:focus:ring-[#a3a6ff] transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] mb-2">Email Address</label>
            <input
              required
              type="email"
              placeholder="e.g. john@aeroledger.com"
              className="w-full bg-[#eff4ff] dark:bg-[#10131b] border-none rounded-lg p-3 text-sm text-[#0b1c30] dark:text-[#ecedf7] outline-none focus:ring-2 focus:ring-[#4648d4] dark:focus:ring-[#a3a6ff] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] mb-2">Role Tag</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole('Viewer')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all border-2 ${role === 'Viewer' ? 'border-[#4648d4] dark:border-[#a3a6ff] bg-[#dce9ff] dark:bg-[#21262f] text-[#4648d4] dark:text-[#a3a6ff]' : 'border-transparent bg-[#eff4ff] dark:bg-[#10131b] text-[#464554] dark:text-[#a9abb4] hover:bg-[#dce9ff] dark:hover:bg-[#1c2029]'}`}
              >
                Viewer
              </button>
              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all border-2 ${role === 'Admin' ? 'border-[#4648d4] dark:border-[#a3a6ff] bg-[#dce9ff] dark:bg-[#21262f] text-[#4648d4] dark:text-[#a3a6ff]' : 'border-transparent bg-[#eff4ff] dark:bg-[#10131b] text-[#464554] dark:text-[#a9abb4] hover:bg-[#dce9ff] dark:hover:bg-[#1c2029]'}`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#eff4ff] dark:bg-[#1c2029] text-[#0b1c30] dark:text-[#ecedf7] py-3 rounded-xl font-bold text-sm hover:bg-[#dce9ff] dark:hover:bg-[#21262f] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#4648d4] dark:bg-[#a3a6ff] text-white dark:text-[#0f00a4] py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#4648d4]/20 hover:opacity-90 transition-opacity"
            >
              {editingUser ? "Save Changes" : "Confirm Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
