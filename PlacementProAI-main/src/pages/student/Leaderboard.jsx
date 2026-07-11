import { useState } from 'react';
import { leaderboard, currentUser } from '../../mockData';
import { Trophy, Medal, Search, Plus, TrendingUp, BarChart3 } from 'lucide-react';
import { BadgePill } from '../../components/BadgePill';
import { Button } from '../../components/Button';

export function Leaderboard() {
  const [scope, setScope] = useState('Class');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1 flex items-center gap-2">
            <Trophy className="text-warning" /> Leaderboard
          </h2>
          <p className="text-text-secondary">See how you rank among your peers.</p>
        </div>
        <div className="bg-surface-alt p-1 rounded-lg border border-border flex">
          {['Class', 'Department', 'College'].map(s => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${scope === s ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-alt flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-semibold text-text-primary">Top Performers ({scope})</h3>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
              <input type="text" placeholder="Search student..." className="w-full sm:w-48 bg-surface border border-border rounded-md pl-8 pr-3 py-1.5 text-sm focus:ring-1 focus:ring-primary outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm text-text-secondary bg-surface-alt/50">
                  <th className="py-3 px-4 sm:px-6 font-medium w-16 text-center">Rank</th>
                  <th className="py-3 px-4 sm:px-6 font-medium">Student</th>
                  <th className="py-3 px-4 sm:px-6 font-medium text-center">Readiness</th>
                  <th className="py-3 px-6 font-medium text-center hidden md:table-cell">Coding</th>
                  <th className="py-3 px-6 font-medium text-center hidden md:table-cell">Aptitude</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user.rank} className={`border-b border-border/50 hover:bg-surface-alt transition-colors ${user.isSelf ? 'bg-primary-light/30' : ''}`}>
                    <td className="py-4 px-4 sm:px-6 text-center">
                      {user.rank === 1 ? <span className="text-2xl drop-shadow-sm">🥇</span> : 
                       user.rank === 2 ? <span className="text-2xl drop-shadow-sm">🥈</span> : 
                       user.rank === 3 ? <span className="text-2xl drop-shadow-sm">🥉</span> : 
                       <span className="font-medium text-text-secondary">#{user.rank}</span>}
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-medium text-text-primary flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        {user.name} 
                        {user.isSelf && <BadgePill variant="primary" className="py-0 px-2 text-[10px] w-fit">You</BadgePill>}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-center font-bold text-primary">{user.score}%</td>
                    <td className="py-4 px-6 text-center hidden md:table-cell text-sm text-text-secondary">{user.coding}%</td>
                    <td className="py-4 px-6 text-center hidden md:table-cell text-sm text-text-secondary">{user.aptitude}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-primary-light border-4 border-surface shadow-sm flex items-center justify-center mx-auto mb-4 relative">
              <span className="text-2xl font-bold text-primary">12</span>
              <div className="absolute -bottom-2 -right-2 bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-surface shadow-sm">
                <TrendingUp size={10} /> 3
              </div>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-1">{currentUser.name}</h3>
            <p className="text-sm text-text-secondary mb-6">Class Rank</p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <div className="text-xs text-text-secondary mb-1">Dept Rank</div>
                <div className="font-bold text-text-primary">34 / 210</div>
              </div>
              <div>
                <div className="text-xs text-text-secondary mb-1">College Rank</div>
                <div className="font-bold text-text-primary">89 / 1200</div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-text-primary mb-4">Compare with Friends</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <BadgePill variant="neutral" className="py-1 px-3 text-sm flex items-center gap-1 cursor-pointer hover:bg-surface-alt border border-border">Arjun <span className="text-text-muted ml-1">×</span></BadgePill>
              <BadgePill variant="neutral" className="py-1 px-3 text-sm flex items-center gap-1 cursor-pointer hover:bg-surface-alt border border-border">Priya <span className="text-text-muted ml-1">×</span></BadgePill>
              <BadgePill variant="neutral" className="py-1 px-3 text-sm flex items-center gap-1 border-dashed border-border cursor-pointer hover:bg-surface-alt text-primary bg-transparent"><Plus size={14} /> Add</BadgePill>
            </div>
            <div className="h-48 border border-dashed border-border rounded-lg flex items-center justify-center bg-surface-alt text-text-muted text-sm flex-col gap-2">
              <BarChart3 size={24} className="text-primary/50" />
              <span className="text-text-secondary">Radar Chart Visualization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
