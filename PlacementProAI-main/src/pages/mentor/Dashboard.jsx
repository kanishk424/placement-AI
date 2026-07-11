import { Users, FileWarning, CalendarCheck, CheckCircle } from "lucide-react";
import { mentors, currentUser } from "../../mockData";
import { StatCard } from "../../components/StatCard";
import { Button } from "../../components/Button";
import { BadgePill } from "../../components/BadgePill";

export function MentorDashboard() {
  const mentor = mentors[0]; // Dr. Priya

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Welcome back, {mentor.name} 👋</h2>
          <p className="text-text-secondary">Here's what's happening with your students today.</p>
        </div>
        <div className="hidden md:flex gap-3">
          <Button variant="outline" size="sm">Mark Attendance</Button>
          <Button size="sm">Assign Task</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Students" value={mentor.studentsCount} icon={Users} />
        <StatCard title="Pending Reviews" value="12" icon={FileWarning} trend="down" trendValue="-3 from yesterday" />
        <StatCard title="Avg Readiness" value={`${mentor.avgScore}%`} icon={CheckCircle} trend="up" trendValue="+1.2%" />
        <StatCard title="Attendance Today" value="89%" icon={CalendarCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students Needing Attention */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <span className="text-xl">⚠️</span> Students Needing Attention
            </h3>
            <span className="text-xs text-text-secondary">AI-flagged</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-warning/30 bg-warning/5 rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Kiran M <span className="text-xs text-text-secondary">(CSE003)</span></div>
                <div className="text-sm text-text-secondary">Attendance 61% | Coding 38%</div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Message</Button>
            </div>
            <div className="flex items-center justify-between p-3 border border-warning/30 bg-warning/5 rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Deepa R <span className="text-xs text-text-secondary">(CSE005)</span></div>
                <div className="text-sm text-text-secondary">3 overdue assignments | No login 7 days</div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Message</Button>
            </div>
          </div>
        </div>

        {/* Homework Status */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-text-primary mb-6">Homework Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-surface-alt rounded-lg border border-border/50">
              <div>
                <div className="font-medium text-text-primary">Arrays Problem Set</div>
                <div className="text-xs text-text-secondary mt-1">Submitted: 28/34 • Due: Tomorrow</div>
              </div>
              <Button variant="outline" size="sm">Review (6)</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-alt rounded-lg border border-border/50">
              <div>
                <div className="font-medium text-text-primary">Aptitude Mock Test</div>
                <div className="text-xs text-text-secondary mt-1">Submitted: 34/34</div>
              </div>
              <BadgePill variant="success">Graded ✅</BadgePill>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-text-primary mb-6">Upcoming Schedule</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border-l-4 border-primary bg-surface-alt rounded-r-lg">
              <div className="text-sm font-medium text-text-secondary mb-1">Mon, 10:00 AM</div>
              <div className="font-semibold text-text-primary">Mock Test</div>
              <div className="text-sm text-text-secondary mt-1">Section A</div>
            </div>
            <div className="p-4 border-l-4 border-secondary bg-surface-alt rounded-r-lg">
              <div className="text-sm font-medium text-text-secondary mb-1">Wed, 2:00 PM</div>
              <div className="font-semibold text-text-primary">Group Discussion</div>
              <div className="text-sm text-text-secondary mt-1">Section B</div>
            </div>
            <div className="p-4 border-l-4 border-accent bg-surface-alt rounded-r-lg">
              <div className="text-sm font-medium text-text-secondary mb-1">Fri, 4:00 PM</div>
              <div className="font-semibold text-text-primary">Doubt Clearing</div>
              <div className="text-sm text-text-secondary mt-1">All Students</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
