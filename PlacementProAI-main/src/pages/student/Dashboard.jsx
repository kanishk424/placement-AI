import { Flame, Brain, CheckCircle, Calendar, Trophy } from "lucide-react";
import { currentUser, codingHeatmap, events, homeworks, leaderboard } from "../../mockData";
import { StatCard } from "../../components/StatCard";
import { HeatmapGrid } from "../../components/HeatmapGrid";
import { ProgressRing } from "../../components/ProgressRing";
import { AIInsightWidget } from "../../components/AIInsightWidget";
import { BadgePill } from "../../components/BadgePill";
import { Button } from "../../components/Button";

export function StudentDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Good Morning, {currentUser.name.split(' ')[0]}! 👋</h2>
          <p className="text-text-secondary">Keep up the great work. You're getting closer to your goals.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm font-medium text-text-secondary mb-1">Placement Readiness</div>
            <div className="flex items-center gap-3">
              <div className="w-48 h-2.5 bg-surface-alt rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '74%' }}></div>
              </div>
              <span className="font-bold text-lg text-primary">74%</span>
            </div>
          </div>
          <BadgePill variant="primary" className="text-sm py-1 px-3">Intermediate</BadgePill>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Coding Streak" value="23 Days" icon={Flame} trend="up" trendValue="+2 from last week" />
        <StatCard title="Aptitude Accuracy" value="78%" icon={Brain} trend="up" trendValue="+5% this month" />
        <StatCard title="Attendance" value="91%" icon={Calendar} />
        <StatCard title="Assignments Done" value="8/10" icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Breakdown (Donut Placeholder & Heatmap) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
               <ProgressRing progress={74} size={160} strokeWidth={14} color="text-primary" />
            </div>
            <div className="flex-1 w-full">
              <h3 className="font-semibold text-text-primary mb-4">Readiness Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Coding (35%)</span>
                  <span className="font-medium">26.25</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Aptitude (25%)</span>
                  <span className="font-medium">19.50</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Communication (15%)</span>
                  <span className="font-medium">10.05</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary">Other (25%)</span>
                  <span className="font-medium">18.20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coding Activity Heatmap */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-text-primary">Coding Activity</h3>
              <div className="text-sm text-text-secondary">Total: 347 problems | Best Streak: 34 days</div>
            </div>
            <div className="overflow-x-auto">
              <HeatmapGrid data={codingHeatmap} className="min-w-[700px]" />
            </div>
          </div>
          
          <AIInsightWidget 
            message="You're weak in Dynamic Programming (42% accuracy). Focus on it this week to boost your Coding score by ~8%."
            actionText="Start DP Practice"
            onAction={() => {}}
          />
        </div>

        {/* Right Column: Events, Homework, Leaderboard */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-text-primary mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex gap-3 items-start border-l-2 border-primary/40 pl-3">
                  <div className="bg-primary-light p-2 rounded-lg text-primary mt-0.5">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{event.title}</h4>
                    <p className="text-xs text-text-secondary mt-0.5">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Homework */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-text-primary">Pending Homework</h3>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
            <div className="space-y-3">
              {homeworks.map((hw) => (
                <div key={hw.id} className="flex items-center justify-between p-3 bg-surface-alt rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{hw.status === 'Submitted' ? '✅' : hw.status === 'Pending' && hw.due === 'Tomorrow' ? '⚠️' : '⏳'}</span>
                    <div>
                      <h4 className="text-sm font-medium text-text-primary line-clamp-1">{hw.title}</h4>
                      <p className="text-xs text-text-secondary mt-0.5">{hw.status === 'Submitted' ? 'Submitted' : `Due: ${hw.due}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Snapshot */}
          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Trophy size={16} className="text-warning" />
                Leaderboard
              </h3>
              <Button variant="ghost" size="sm" className="text-xs">Full List</Button>
            </div>
            <div className="space-y-0">
              {leaderboard.slice(0, 4).map((user, idx) => (
                <div key={idx} className={`flex items-center justify-between p-2 rounded-lg ${user.isSelf ? 'bg-primary-light/50 border border-primary/20' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-4 text-center ${idx === 0 ? 'text-warning' : idx === 1 ? 'text-text-muted' : idx === 2 ? 'text-warning/70' : 'text-text-secondary'}`}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${user.rank}`}
                    </span>
                    <span className={`text-sm ${user.isSelf ? 'font-bold text-primary' : 'font-medium text-text-primary'}`}>
                      {user.name} {user.isSelf && '(You)'}
                    </span>
                  </div>
                  <span className="text-sm font-bold">{user.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
