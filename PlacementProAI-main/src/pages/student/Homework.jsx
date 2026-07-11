import { useState } from 'react';
import { homeworks } from '../../mockData';
import { Button } from '../../components/Button';
import { BadgePill } from '../../components/BadgePill';
import { BookOpen, Upload, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export function Homework() {
  const [activeTab, setActiveTab] = useState('All');
  
  const filteredHomeworks = homeworks.filter(hw => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return hw.status === 'Pending';
    if (activeTab === 'Submitted') return hw.status === 'Submitted';
    return true; // Overdue etc.
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary mb-1">Homework & Assignments</h2>
        <p className="text-text-secondary">Keep track of your tasks from mentors.</p>
      </div>

      <div className="flex border-b border-border overflow-x-auto">
        {['All', 'Pending', 'Submitted', 'Overdue'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredHomeworks.map((hw) => (
          <div key={hw.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${hw.status === 'Submitted' ? 'bg-success/10 text-success' : hw.due === 'Tomorrow' ? 'bg-warning/10 text-warning' : 'bg-primary-light text-primary'}`}>
                  {hw.status === 'Submitted' ? <CheckCircle size={24} /> : hw.due === 'Tomorrow' ? <AlertCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-1">{hw.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
                    <span className="flex items-center gap-1"><BookOpen size={14} /> Assigned by: {hw.assignedBy}</span>
                    <span className="hidden sm:inline">•</span>
                    <BadgePill variant="neutral">{hw.type}</BadgePill>
                    {hw.points && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>Points: {hw.points}</span>
                      </>
                    )}
                  </div>
                  
                  {hw.status === 'Submitted' && hw.feedback && (
                    <div className="bg-surface-alt border border-border rounded-lg p-3 text-sm flex items-start gap-2 mt-2">
                       <MessageSquare size={16} className="text-text-muted shrink-0 mt-0.5" />
                       <div className="text-text-secondary"><span className="font-medium text-text-primary">Feedback:</span> "{hw.feedback}"</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end justify-between min-w-[140px] border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-4 mt-2 md:mt-0">
                <div className="text-left md:text-right w-full flex md:block justify-between items-center mb-4 md:mb-0">
                  <div className="text-xs text-text-secondary mb-1">Status</div>
                  <div className={`font-semibold ${hw.status === 'Submitted' ? 'text-success' : hw.due === 'Tomorrow' ? 'text-warning' : 'text-primary'}`}>
                    {hw.status === 'Submitted' ? `Score: ${hw.score}` : `Due: ${hw.due}`}
                  </div>
                </div>
                
                {hw.status === 'Pending' ? (
                  <Button className="w-full md:w-auto text-sm" variant="outline">
                    <Upload size={14} className="mr-2" /> Submit
                  </Button>
                ) : (
                  <Button className="w-full md:w-auto text-sm" variant="ghost">View Details</Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filteredHomeworks.length === 0 && (
          <div className="py-12 text-center text-text-secondary bg-surface border border-border rounded-xl">
            No homework found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
