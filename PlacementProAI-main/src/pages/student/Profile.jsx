import { User, MapPin, Phone, Mail, BookOpen, GraduationCap, Award, Briefcase, ChevronRight } from 'lucide-react';
import { currentUser } from '../../mockData';
import { ProgressRing } from '../../components/ProgressRing';
import { BadgePill } from '../../components/BadgePill';
import { Button } from '../../components/Button';
import { useState } from 'react';

export function StudentProfile() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Skills', 'Resume', 'Certifications', 'Statistics'];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Section */}
      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 relative group cursor-pointer flex-shrink-0">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-white text-xs font-medium">Edit</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{currentUser.name}</h1>
            <div className="flex items-center gap-3 text-text-secondary mt-2">
              <span className="flex items-center gap-1"><BookOpen size={16} /> {currentUser.rollNo}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><GraduationCap size={16} /> {currentUser.dept}, {currentUser.year} Yr, Sec {currentUser.section}</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
               <BadgePill variant="primary">Intermediate</BadgePill>
               <BadgePill variant="success">Eligible for Placements</BadgePill>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-right hidden sm:block">
             <div className="text-sm text-text-secondary font-medium">Readiness Score</div>
             <div className="text-xs text-text-muted mt-1">Top 15% in class</div>
           </div>
           <ProgressRing progress={74} size={100} strokeWidth={8} color="text-primary" />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="py-4">
        {activeTab === 'Overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2"><User size={18}/> Personal Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">Email</span>
                  <span className="col-span-2 font-medium">kiran.m@college.edu</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">Phone</span>
                  <span className="col-span-2 font-medium">+91 98765 43210</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">DOB</span>
                  <span className="col-span-2 font-medium">14 Aug 2005</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">Address</span>
                  <span className="col-span-2 font-medium leading-relaxed">123 Tech Park Road,<br/>Silicon Valley, CA 94025</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2"><GraduationCap size={18}/> Academic Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 text-sm items-center">
                  <span className="text-text-secondary">CGPA</span>
                  <span className="col-span-2 font-bold text-lg text-primary flex items-center gap-2">
                    8.42 <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">↑ 0.12</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">12th Grade</span>
                  <span className="col-span-2 font-medium">92.4% (CBSE)</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">10th Grade</span>
                  <span className="col-span-2 font-medium">95.0% (CBSE)</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-text-secondary">Arrears</span>
                  <span className="col-span-2 font-medium text-success">0 (Clear History)</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'Overview' && (
          <div className="bg-surface border border-border p-12 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center text-text-muted mb-4">
              <Briefcase size={32} />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">{activeTab} Details</h3>
            <p className="text-text-secondary max-w-md">This section is currently under development. Check back soon for detailed {activeTab.toLowerCase()} information.</p>
            <Button variant="outline" className="mt-6">Edit {activeTab}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
