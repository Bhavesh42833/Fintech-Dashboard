import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../store/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  
  // We'll track the "selected" user in local state before they hit login
  const [selectedUser, setSelectedUser] = useState(users[0] || null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Typewriter effect state
  const phrases = ["Institutional Control.", "Total Liquidity.", "Real-time Metrics.", "Enterprise Scalability."];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };
    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  // Handle Login
  const handleLogin = (e) => {
    e.stopPropagation();
    if (selectedUser) {
      dispatch(authenticate(selectedUser));
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 min-h-screen bg-slate-50 dark:bg-[#0b0e15] overflow-hidden">
      
      {/* 2/5 Left Panel - Login Area */}
      <div className="relative md:col-span-2 w-full h-[50vh] md:h-screen flex flex-col items-center justify-center p-8 bg-white dark:bg-[#161a22] shadow-2xl z-50">
        
        <div className="w-full max-w-sm">
          {/* Brand Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Aero Ledger</h1>
            <p className="text-[#464554] dark:text-[#a9abb4] text-sm">Select an active testing profile to continue.</p>
          </div>

          {/* User Selector Box */}
          {selectedUser && (
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#464554] dark:text-[#a9abb4] mb-3 ml-1">Authenticate As</label>
              
              {/* Active Selection Block */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`bg-[#eff4ff] dark:bg-[#10131b] border-2 ${isDropdownOpen ? 'border-[#4648d4] dark:border-[#a3a6ff]' : 'border-transparent'} rounded-2xl p-4 flex items-center justify-between cursor-pointer group transition-all`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full ${selectedUser.avatarBg} flex items-center justify-center ${selectedUser.avatarText} font-bold text-lg shadow-sm group-hover:scale-105 transition-transform`}>
                    {selectedUser.initials}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#0b1c30] dark:text-white text-base leading-tight">{selectedUser.name}</p>
                    <p className="text-[10px] text-primary dark:text-[#a3a6ff] uppercase tracking-wider font-bold mt-1">{selectedUser.role}</p>
                  </div>
                </div>
                
                {/* Login Arrow Trigger */}
                <button 
                  onClick={handleLogin}
                  className="h-10 w-10 bg-[#e1e0ff] dark:bg-[#1c2029] hover:bg-[#4648d4] dark:hover:bg-[#a3a6ff] text-[#4648d4] dark:text-[#a3a6ff] hover:text-white dark:hover:text-[#0f00a4] rounded-full flex items-center justify-center transition-colors shadow-sm"
                  title="Proceed to Dashboard"
                >
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>

              {/* Floating Dropdown List of other users */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-3 bg-white dark:bg-[#1c2029] border border-slate-100 dark:border-white/5 shadow-xl rounded-2xl flex flex-col overflow-hidden z-50 animate-fadeIn slideUp">
                  {users.map(u => (
                    <div 
                      key={u.id} 
                      onClick={() => { setSelectedUser(u); setIsDropdownOpen(false); }}
                      className={`flex items-center gap-3 p-4 hover:bg-[#eff4ff] dark:hover:bg-[#10131b] cursor-pointer transition-colors ${selectedUser.id === u.id ? 'bg-slate-50 dark:bg-[#161a22]' : ''}`}
                    >
                      <div className={`h-8 w-8 rounded-full ${u.avatarBg} flex items-center justify-center ${u.avatarText} font-bold text-xs`}>
                        {u.initials}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-[#0b1c30] dark:text-white text-sm">{u.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
          
        </div>
      </div>

      {/* 3/5 Right Panel - Cinematic Hero */}
      <div className="md:col-span-3 w-full h-[50vh] md:h-screen relative flex items-center justify-center overflow-hidden bg-[#0b0e15]">
        {/* Dynamic Sweeping Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0e15] via-[#161a22] to-[#0b0e15] z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#4648d4] blur-[150px] opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#57dffe] blur-[120px] opacity-10 rounded-full animate-pulse z-0" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>

        {/* Floating Glassmorphic Branding Banner */}
        <div className="relative z-10 px-8 text-center md:text-left flex flex-col items-center md:items-start max-w-2xl">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#57dffe] animate-ping"></span>
            <span className="text-[#a9abb4] text-xs font-bold tracking-widest uppercase">System Online</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Aero Ledger: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4648d4] to-[#57dffe] inline-block mt-2 min-h-[1.2em]">
              {text}<span className="animate-blink text-white font-light text-5xl md:text-6xl inline-block -ml-1">|</span>
            </span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-lg max-w-xl font-medium leading-relaxed hidden md:block">
            Access your secure institutional fintech dashboard. Monitor cross-platform liquidity, dynamic charting, and advanced access controls with zero bottlenecks.
          </p>
        </div>
      </div>
      
    </div>
  );
}
