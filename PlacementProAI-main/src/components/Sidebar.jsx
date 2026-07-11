import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, User, Code2, BrainCircuit, Mic, Map, 
  Building2, MonitorPlay, CalendarCheck, BookOpen, 
  FileText, CalendarDays, MessagesSquare, Trophy, Briefcase,
  Users, GraduationCap, UserCog, Calendar, BarChart3, ClipboardList
} from "lucide-react";
import { cn } from "../utils/cn";
import { PulseIndicator } from "./PulseIndicator";

const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
  { icon: User, label: "Profile", path: "/student/profile" },
  { icon: Code2, label: "Coding Practice", path: "/student/coding" },
  { icon: BrainCircuit, label: "Aptitude", path: "/student/aptitude" },
  { icon: Mic, label: "Communication", path: "/student/communication" },
  { icon: Map, label: "AI Roadmap", path: "/student/roadmap", hasPulse: true },
  { icon: Building2, label: "Companies", path: "/student/companies" },
  { icon: MonitorPlay, label: "Mock Interviews", path: "/student/interviews", hasPulse: true },
  { icon: CalendarCheck, label: "Attendance", path: "/student/attendance" },
  { icon: BookOpen, label: "Homework", path: "/student/homework" },
  { icon: FileText, label: "Notes", path: "/student/notes" },
  { icon: CalendarDays, label: "Events", path: "/student/events" },
  { icon: MessagesSquare, label: "Forum", path: "/student/forum" },
  { icon: Trophy, label: "Leaderboard", path: "/student/leaderboard" },
  { icon: Briefcase, label: "Interview Hub", path: "/student/experience" },
];

const mentorNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/mentor/dashboard" },
  { icon: Users, label: "My Students", path: "/mentor/students" },
  { icon: ClipboardList, label: "Tasks", path: "/mentor/tasks" },
  { icon: CalendarDays, label: "Schedule", path: "/mentor/schedule" },
];

const officerNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/officer/dashboard" },
  { icon: GraduationCap, label: "Students", path: "/officer/students" },
  { icon: Users, label: "Mentors", path: "/officer/mentors" },
  { icon: UserCog, label: "Staff", path: "/officer/staff" },
  { icon: CalendarDays, label: "Events", path: "/officer/events" },
  { icon: CalendarCheck, label: "Attendance", path: "/officer/attendance" },
  { icon: BarChart3, label: "Reports", path: "/officer/reports" },
];

function getNavItems(pathname) {
  if (pathname.startsWith("/officer")) return officerNavItems;
  if (pathname.startsWith("/mentor")) return mentorNavItems;
  return studentNavItems;
}

function getRoleLabel(pathname) {
  if (pathname.startsWith("/officer")) return "Placement Officer";
  if (pathname.startsWith("/mentor")) return "Mentor";
  return "Student";
}

export function Sidebar() {
  const location = useLocation();
  const navItems = getNavItems(location.pathname);
  const roleLabel = getRoleLabel(location.pathname);

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <span className="text-xl font-extrabold tracking-tight text-text-primary">
            Placement<span className="text-primary">Pro</span> <span className="text-secondary">AI</span>
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
              isActive 
                ? "bg-primary-light text-primary" 
                : "text-text-secondary hover:bg-surface-alt hover:text-text-primary"
            )}
          >
            <item.icon size={18} className="group-hover:scale-110 transition-transform" />
            <span className="flex-1">{item.label}</span>
            {item.hasPulse && <PulseIndicator />}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20 relative overflow-hidden">
           <div className="relative z-10">
             <h4 className="text-sm font-bold text-primary mb-1">{roleLabel}</h4>
             <p className="text-xs text-text-secondary">Full access to all features.</p>
           </div>
           <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/20 blur-xl rounded-full"></div>
        </div>
      </div>
    </aside>
  );
}