import { Map, Calendar, Target, ChevronRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Button } from '../../components/Button';
import { PulseIndicator } from '../../components/PulseIndicator';
import { BadgePill } from '../../components/BadgePill';

export function AIRoadmap() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Card */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-end relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        <div className="flex-1 w-full relative z-10">
          <label className="block text-sm font-medium text-text-secondary mb-2">Target Company</label>
          <select className="w-full bg-surface-alt border border-border rounded-lg px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all">
            <option>Zoho</option>
            <option>TCS Digital</option>
            <option>Infosys HackWithInfy</option>
            <option>Google</option>
          </select>
        </div>
        <div className="flex-1 w-full relative z-10">
          <label className="block text-sm font-medium text-text-secondary mb-2">Interview Date</label>
          <input type="date" defaultValue="2026-08-02" className="w-full bg-surface-alt border border-border rounded-lg px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
        </div>
        <div className="flex-1 w-full relative z-10">
          <label className="block text-sm font-medium text-text-secondary mb-2">Current Level</label>
          <select className="w-full bg-surface-alt border border-border rounded-lg px-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all">
            <option>Intermediate</option>
            <option>Beginner</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="relative z-10 w-full md:w-auto mt-4 md:mt-0">
          <Button className="w-full md:w-auto py-2.5 whitespace-nowrap pr-8 relative">
            Generate My Roadmap
            <PulseIndicator className="absolute right-3 top-1/2 -translate-y-1/2" />
          </Button>
        </div>
      </div>

      {/* Header Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Target size={24} className="text-primary" /> Roadmap for Zoho
          </h2>
          <div className="flex items-center gap-4 text-sm text-text-secondary mt-2">
            <span className="flex items-center gap-1"><Calendar size={16} /> 45 Days Remaining</span>
            <span>•</span>
            <span>Interview: Aug 2, 2026</span>
          </div>
        </div>
        <div className="bg-surface-alt border border-border rounded-lg p-3 text-sm min-w-[250px] w-full md:w-auto">
          <div className="flex justify-between mb-1">
             <span className="font-medium text-text-primary">Overall Progress</span>
             <span className="font-bold text-primary">34%</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
             <div className="h-full bg-primary" style={{ width: '34%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Timeline View */}
        <div className="md:col-span-2 space-y-6">
          {/* Week 1 */}
          <div className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-0 last:pb-0 ml-2">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary-light"></div>
            <h3 className="font-bold text-lg text-text-primary mb-1 -mt-1.5">Week 1: Arrays, Strings, Basic Math</h3>
            <p className="text-sm text-text-secondary mb-4">Focusing on foundational problem solving skills required for Zoho's first round.</p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-success/5 border border-success/20 rounded-lg p-3">
                <CheckCircle2 size={18} className="text-success mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-text-secondary line-through">Day 1: Two Sum, Reverse Array</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-success/5 border border-success/20 rounded-lg p-3">
                <CheckCircle2 size={18} className="text-success mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-text-secondary line-through">Day 2: String Palindrome, Anagram</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary-light/50 border border-primary/30 rounded-lg p-3 shadow-sm relative">
                <div className="w-2 h-full absolute left-0 top-0 bg-primary rounded-l-lg"></div>
                <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center shrink-0 ml-1">
                   <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1 pl-1">
                  <div className="text-sm font-bold text-primary flex items-center gap-2">Day 3: Matrix Rotation <BadgePill variant="primary" className="py-0 px-2 text-[10px]">Today</BadgePill></div>
                  <div className="text-xs text-text-secondary mt-0.5">2 problems • 1 hr estimated</div>
                </div>
                <Button size="sm" className="h-8">Start</Button>
              </div>
              <div className="flex items-start gap-3 bg-surface border border-border rounded-lg p-3">
                <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-border shrink-0 ml-1"></div>
                <div className="pl-1">
                  <div className="text-sm font-medium text-text-primary">Day 4: Sliding Window</div>
                </div>
              </div>
            </div>
          </div>

          {/* Week 2 */}
          <div className="relative pl-8 pb-8 border-l-2 border-border last:border-0 last:pb-0 opacity-70 ml-2">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface border-2 border-border flex items-center justify-center">
              <Lock size={10} className="text-text-muted" />
            </div>
            <h3 className="font-bold text-lg text-text-secondary mb-1 flex items-center gap-2 -mt-1.5">Week 2: Linked Lists, Stacks <Lock size={16}/></h3>
            <p className="text-sm text-text-muted">Locked until Week 1 is complete.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-secondary" />
              <h3 className="font-semibold text-text-primary">AI Insight</h3>
              <PulseIndicator className="ml-auto" />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              "You're 2 days behind on DP topics compared to students who successfully cleared Zoho. Spend 45 extra minutes today to stay on track."
            </p>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
             <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">📌 Today's Plan</h3>
             <div className="space-y-3">
                <div className="flex items-start gap-3">
                   <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0"></div>
                   <div>
                      <div className="font-bold text-text-primary text-sm">Coding</div>
                      <div className="text-xs text-text-secondary mt-0.5">Matrix Rotation Problem</div>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="w-2 h-2 mt-1.5 rounded-full bg-border shrink-0"></div>
                   <div>
                      <div className="font-bold text-text-primary text-sm">Aptitude</div>
                      <div className="text-xs text-text-secondary mt-0.5">10 Time & Work Questions</div>
                   </div>
                </div>
             </div>
             <Button className="w-full mt-6">Start Session</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
