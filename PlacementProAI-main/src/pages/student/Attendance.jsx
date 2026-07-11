import { Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { BadgePill } from '../../components/BadgePill';

export function Attendance() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">My Attendance</h2>
          <p className="text-text-secondary">Track your daily class attendance.</p>
        </div>
        <div className="flex items-center gap-4 bg-success/10 border border-success/20 px-4 py-3 rounded-lg">
          <CheckCircle2 className="text-success" size={24} />
          <div>
            <div className="font-bold text-success text-xl">90.8%</div>
            <div className="text-xs font-medium text-success/80 uppercase tracking-wider">Safe Zone</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Days" value="120" />
        <StatCard title="Present" value="109" className="border-l-4 border-l-success" />
        <StatCard title="Absent" value="8" className="border-l-4 border-l-danger" />
        <StatCard title="On Duty (OD)" value="3" className="border-l-4 border-l-primary" />
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-6 flex items-center gap-2"><CalendarIcon size={18}/> Monthly Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-text-secondary">
                <th className="py-3 font-medium">Month</th>
                <th className="py-3 font-medium text-center">Present</th>
                <th className="py-3 font-medium text-center">Absent</th>
                <th className="py-3 font-medium text-center">OD/Leave</th>
                <th className="py-3 font-medium text-right">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 hover:bg-surface-alt transition-colors">
                <td className="py-4 font-medium text-text-primary">January</td>
                <td className="py-4 text-center text-success font-medium">22</td>
                <td className="py-4 text-center text-danger font-medium">1</td>
                <td className="py-4 text-center text-text-secondary font-medium">0</td>
                <td className="py-4 text-right font-bold text-text-primary">95.6%</td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-surface-alt transition-colors">
                <td className="py-4 font-medium text-text-primary">February</td>
                <td className="py-4 text-center text-success font-medium">18</td>
                <td className="py-4 text-center text-danger font-medium">2</td>
                <td className="py-4 text-center text-text-secondary font-medium">1</td>
                <td className="py-4 text-right font-bold text-text-primary">90.0%</td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-surface-alt transition-colors">
                <td className="py-4 font-medium text-text-primary">March</td>
                <td className="py-4 text-center text-success font-medium">20</td>
                <td className="py-4 text-center text-danger font-medium">0</td>
                <td className="py-4 text-center text-text-secondary font-medium">2</td>
                <td className="py-4 text-right font-bold text-text-primary">90.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
