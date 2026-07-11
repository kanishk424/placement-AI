import { TrendingUp, Users, CheckCircle, Briefcase, AlertTriangle, GraduationCap, UserCog, CalendarDays, CalendarCheck, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { students, mentors, placementStats, placementEvents } from "../../mockData";
import { StatCard } from "../../components/StatCard";
import { BadgePill } from "../../components/BadgePill";
import { AIInsightWidget } from "../../components/AIInsightWidget";
import { Button } from "../../components/Button";

export function OfficerDashboard() {
  const navigate = useNavigate();

  const totalStudents = students.length;
  const placedCount = students.filter(s => s.placementStatus === 'Placed').length;
  const avgReadiness = Math.round(students.reduce((sum, s) => sum + s.readiness, 0) / totalStudents);
  const activeMentors = mentors.length;
  const upcomingDrives = placementEvents.filter(e => e.type === 'Drive' && e.status === 'Upcoming').length;
  const highRiskCount = students.filter(s => s.riskLevel === 'High').length;
  const lowAttendanceCount = students.filter(s => s.attendance < 75).length;

  const quickLinks = [
    { icon: GraduationCap, label: "Manage Students", path: "/officer/students", color: "text-primary" },
    { icon: Users, label: "Manage Mentors", path: "/officer/mentors", color: "text-secondary" },
    { icon: UserCog, label: "Assistant Staff", path: "/officer/staff", color: "text-accent" },
    { icon: CalendarDays, label: "Placement Events", path: "/officer/events", color: "text-success" },
    { icon: CalendarCheck, label: "Attendance", path: "/officer/attendance", color: "text-warning" },
    { icon: BarChart3, label: "Reports & Analytics", path: "/officer/reports", color: "text-danger" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary mb-1">Placement Overview</h2>
        <p className="text-text-secondary">High-level analytics for the current academic year.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Students" value={totalStudents} icon={Users} trend="up" trendValue="14 enrolled" className="lg:col-span-1" />
        <StatCard title="Placement Ready" value={`${avgReadiness}%`} icon={TrendingUp} trend="up" trendValue="avg readiness" className="lg:col-span-1" />
        <StatCard title="Placed Students" value={placedCount} icon={CheckCircle} trend="up" trendValue={`${((placedCount/totalStudents)*100).toFixed(1)}% of total`} className="lg:col-span-1" />
        <StatCard title="Active Mentors" value={activeMentors} icon={Briefcase} className="lg:col-span-1" />
        <StatCard title="Upcoming Drives" value={upcomingDrives} icon={CalendarDays} className="lg:col-span-1" />
      </div>

      {/* Quick Links */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary-light/30 transition-all group"
            >
              <link.icon size={22} className={`${link.color} group-hover:scale-110 transition-transform`} />
              <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary text-center">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-text-primary mb-6">Department-wise Readiness</h3>
          <div className="space-y-5">
            {Object.entries(placementStats.readiness).map(([dept, score]) => (
              <div key={dept}>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-medium text-text-primary">{dept}</span>
                  <span className="text-sm font-bold text-primary">{score}%</span>
                </div>
                <div className="w-full h-3 bg-surface-alt rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-text-primary flex items-center gap-2 mb-6">
            <AlertTriangle size={18} className="text-danger" /> Risk Alerts
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-danger/5 border border-danger/20 rounded-lg flex items-start gap-3">
               <div className="mt-0.5 text-danger">🔴</div>
               <div>
                 <div className="font-medium text-text-primary">{highRiskCount} students at High Risk</div>
                 <div className="text-xs text-text-secondary mt-1">Below 50% readiness — immediate action needed</div>
               </div>
            </div>
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg flex items-start gap-3">
               <div className="mt-0.5 text-warning">🟡</div>
               <div>
                 <div className="font-medium text-text-primary">{lowAttendanceCount} students below 75% attendance</div>
                 <div className="text-xs text-text-secondary mt-1">Action required by mentors</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <AIInsightWidget 
        message="MECH department readiness dropped 8% this month — recommend scheduling extra aptitude and coding sessions for the 4 at-risk students. Consider assigning a dedicated communication mentor."
        actionText="View MECH Students"
        onAction={() => navigate('/officer/students')}
      />

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-text-primary">Recent Placement Drives</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/officer/events')}>View All Events</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-text-secondary">
                <th className="py-3 font-medium">Company</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium text-right">Applied</th>
                <th className="py-3 font-medium text-right">Shortlisted</th>
                <th className="py-3 font-medium text-right">Selected</th>
              </tr>
            </thead>
            <tbody>
              {placementStats.drives.map((drive, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-surface-alt transition-colors">
                  <td className="py-4 font-medium text-text-primary">{drive.company}</td>
                  <td className="py-4 text-text-secondary text-sm">{drive.date}</td>
                  <td className="py-4 text-right">{drive.applied}</td>
                  <td className="py-4 text-right text-primary font-medium">{drive.shortlisted}</td>
                  <td className="py-4 text-right text-success font-bold">{drive.selected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}