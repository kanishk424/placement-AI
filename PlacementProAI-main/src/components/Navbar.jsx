import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { currentUser } from "../mockData";
import { PulseIndicator } from "./PulseIndicator";

export function Navbar() {
  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center flex-1">
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search problems, companies, peers..." 
            className="w-full bg-surface-alt border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:bg-surface transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative text-text-secondary hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-danger text-[9px] text-white items-center justify-center font-bold">3</span>
          </span>
        </button>
        
        <div className="h-8 w-px bg-border hidden md:block"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{currentUser.name}</div>
            <div className="text-xs text-text-secondary">{currentUser.rollNo}</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden relative">
            <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
