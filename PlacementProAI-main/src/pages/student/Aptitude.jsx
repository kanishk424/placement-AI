import { useState } from 'react';
import { aptitudeQuestions } from '../../mockData';
import { Button } from '../../components/Button';
import { BadgePill } from '../../components/BadgePill';
import { Brain, CheckCircle2, XCircle, ChevronRight, BarChart3, Clock, LayoutGrid } from 'lucide-react';

export function AptitudeModule() {
  const [activeTab, setActiveTab] = useState('practice');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = aptitudeQuestions[currentQuestion];

  const handleOptionClick = (option) => {
    if (!showExplanation) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    setCurrentQuestion((prev) => (prev + 1) % aptitudeQuestions.length);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-surface border border-border rounded-xl flex flex-col overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-surface-alt">
          <h3 className="font-semibold text-text-primary flex items-center gap-2"><Brain size={18} className="text-secondary"/> Aptitude</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 mt-2 px-2 hidden md:block">Topics</div>
          <div className="hidden md:block">
            {['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'].map((topic, i) => (
              <button 
                key={topic}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
              >
                {topic}
              </button>
            ))}
          </div>
          
          <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 mt-6 px-2">Modes</div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2">
            <button 
              onClick={() => setActiveTab('practice')}
              className={`flex-1 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'practice' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
            >
              <LayoutGrid size={16} /> Practice
            </button>
            <button 
              onClick={() => setActiveTab('test')}
              className={`flex-1 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'test' ? 'bg-danger text-white shadow-sm' : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
            >
              <Clock size={16} /> Mock Test
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
            >
              <BarChart3 size={16} /> Performance
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-h-[500px]">
        {activeTab === 'practice' && (
          <div className="bg-surface border border-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <BadgePill variant="primary">Q{currentQuestion + 1} of {aptitudeQuestions.length}</BadgePill>
                <span className="text-sm font-medium text-text-secondary">{question.topic}</span>
              </div>
              <div className="flex items-center gap-2 text-warning bg-warning/10 px-3 py-1.5 rounded-lg text-sm font-bold border border-warning/20">
                <Clock size={16} /> 00:45
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 sm:p-8">
              <h2 className="text-lg sm:text-xl text-text-primary leading-relaxed font-medium mb-8">
                {question.text}
              </h2>
              
              <div className="space-y-3 max-w-2xl">
                {question.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === question.correct;
                  let bgClass = 'bg-surface hover:bg-surface-alt hover:border-primary/40 border-border cursor-pointer';
                  let textClass = 'text-text-primary';
                  let Icon = null;
                  
                  if (showExplanation) {
                    bgClass = 'bg-surface border-border cursor-default opacity-60';
                    if (isCorrect) {
                      bgClass = 'bg-success/10 border-success/40 text-success';
                      textClass = 'text-success font-semibold';
                      Icon = CheckCircle2;
                    } else if (isSelected && !isCorrect) {
                      bgClass = 'bg-danger/10 border-danger/40 text-danger';
                      textClass = 'text-danger font-semibold';
                      Icon = XCircle;
                    }
                  } else if (isSelected) {
                    bgClass = 'bg-primary-light border-primary text-primary shadow-sm';
                    textClass = 'text-primary font-semibold';
                  }
                  
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className={`border p-4 rounded-xl transition-all flex items-center justify-between ${bgClass}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm ${isSelected ? 'border-primary bg-primary text-white' : 'border-border bg-surface text-text-secondary'}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`text-base ${textClass}`}>{option}</span>
                      </div>
                      {Icon && <Icon size={20} className={isCorrect ? 'text-success' : 'text-danger'} />}
                    </div>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="mt-8 p-6 bg-primary-light/50 border border-primary/20 rounded-xl max-w-2xl animate-fade-in">
                  <h4 className="font-semibold text-text-primary mb-2">Explanation</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Relative speed = (60 + 6) km/hr = 66 km/hr. <br/><br/>
                    66 km/hr = 66 * (5/18) m/sec = 55/3 m/sec. <br/><br/>
                    Time taken = (Length of train) / (Relative speed) = 120 / (55/3) = (120 * 3) / 55 = 360 / 55 = 72 / 11 = 6.54 sec.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-5 border-t border-border bg-surface-alt flex justify-between items-center">
              <Button variant="ghost">Report Issue</Button>
              {!showExplanation ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="px-8"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  className="px-8 gap-2"
                >
                  Next Question <ChevronRight size={18} />
                </Button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="flex-1 bg-surface border border-border rounded-xl shadow-sm flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
              <Clock size={40} />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">TCS NQT Proctored Mock Test</h2>
            <div className="max-w-md space-y-4 text-sm text-text-secondary mb-8">
              <p className="flex items-center gap-2 justify-center"><CheckCircle2 size={16} className="text-success"/> 30 Questions in 45 Minutes</p>
              <p className="flex items-center gap-2 justify-center"><CheckCircle2 size={16} className="text-success"/> Full-screen mode will be enforced</p>
              <p className="flex items-center gap-2 justify-center text-danger"><XCircle size={16}/> Tab switching will result in auto-submission</p>
            </div>
            <Button size="lg" className="bg-danger text-white hover:bg-danger/90 border-none px-12">Start Proctored Test</Button>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="flex-1 bg-surface border border-border rounded-xl shadow-sm flex flex-col items-center justify-center p-12">
             <BarChart3 size={48} className="text-text-muted mb-4" />
             <h2 className="text-xl font-bold text-text-primary">Performance Analytics</h2>
             <p className="text-text-secondary mt-2">Take at least 1 mock test to view your performance breakdown.</p>
          </div>
        )}
      </div>
    </div>
  );
}
