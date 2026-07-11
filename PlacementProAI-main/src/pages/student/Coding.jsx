import { useState } from 'react';
import { codingProblems } from '../../mockData';
import { Button } from '../../components/Button';
import { BadgePill } from '../../components/BadgePill';
import { PulseIndicator } from '../../components/PulseIndicator';
import { Play, Check, X, Sparkles, Code2, ChevronDown } from 'lucide-react';

export function CodingPractice() {
  const [activeProblem, setActiveProblem] = useState(codingProblems[0]);
  const [code, setCode] = useState('function twoSum(nums, target) {\n  // Write your code here\n  \n}');
  const [output, setOutput] = useState(null);
  
  const handleRun = () => {
    setOutput({ status: 'running' });
    setTimeout(() => {
      setOutput({ status: 'passed', message: 'All test cases passed!', time: '42ms', memory: '34.2MB' });
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 max-w-[1600px] mx-auto">
      {/* Left Panel: Problem List */}
      <div className="w-full lg:w-1/4 bg-surface border border-border rounded-xl flex flex-col overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-surface-alt">
          <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2"><Code2 size={18}/> Problems</h3>
          <div className="flex justify-between text-xs">
            <span className="text-text-secondary">Solved: 47/200</span>
            <span className="text-text-secondary font-medium">Streak: 🔥 23</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[300px] lg:max-h-full">
          {codingProblems.map((p) => (
            <div 
              key={p.id}
              onClick={() => setActiveProblem(p)}
              className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                activeProblem.id === p.id 
                  ? 'bg-primary-light border-primary/30' 
                  : 'bg-transparent border-transparent hover:bg-surface-alt hover:border-border'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm text-text-primary line-clamp-1 flex-1 pr-2">#{p.number} {p.title}</span>
                <span>{p.status === 'Solved' ? '✅' : p.status === 'Pending' ? '⏳' : '❌'}</span>
              </div>
              <div className="flex gap-2">
                <BadgePill variant={p.difficulty === 'Easy' ? 'success' : p.difficulty === 'Medium' ? 'warning' : 'danger'}>
                  {p.difficulty}
                </BadgePill>
                <span className="text-xs text-text-muted mt-0.5">{p.topic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel: Code Editor */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Problem Description */}
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm min-h-[200px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-primary">#{activeProblem.number} {activeProblem.title}</h2>
            <BadgePill variant={activeProblem.difficulty === 'Easy' ? 'success' : activeProblem.difficulty === 'Medium' ? 'warning' : 'danger'}>
              {activeProblem.difficulty}
            </BadgePill>
          </div>
          <div className="text-sm text-text-secondary flex-1">
            <p className="mb-4">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
            <p className="mb-2"><strong>Example 1:</strong></p>
            <pre className="bg-surface-alt p-3 rounded-lg border border-border text-xs mb-4 overflow-x-auto">
              Input: nums = [2,7,11,15], target = 9<br/>
              Output: [0,1]
            </pre>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 min-h-[400px] bg-[#1e1e1e] rounded-xl flex flex-col overflow-hidden border border-border shadow-sm">
          <div className="h-12 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#3d3d3d]">
            <div className="flex items-center gap-2 text-sm text-white/80 bg-[#1e1e1e] px-3 py-1 rounded border border-[#3d3d3d] cursor-pointer">
              JavaScript <ChevronDown size={14} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-[#4a4a4a] text-white hover:bg-[#3a3a3a] bg-transparent" onClick={handleRun}>
                <Play size={14} className="mr-1.5" /> Run
              </Button>
              <Button size="sm" className="bg-success text-white hover:bg-success/90">Submit</Button>
            </div>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent text-[#d4d4d4] font-mono text-sm p-4 focus:outline-none resize-none"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Right Panel: Output & AI Hint */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <div className="flex-1 bg-surface border border-border rounded-xl p-5 shadow-sm overflow-y-auto min-h-[300px]">
          <h3 className="font-semibold text-text-primary mb-4 border-b border-border pb-2">Output</h3>
          
          {!output && <div className="text-sm text-text-muted text-center mt-10">Run your code to see output</div>}
          
          {output && output.status === 'running' && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span className="text-sm text-text-secondary">Running test cases...</span>
            </div>
          )}
          
          {output && output.status === 'passed' && (
            <div className="space-y-4">
              <div className="bg-success/10 border border-success/20 text-success p-3 rounded-lg flex items-center gap-2 font-medium">
                <Check size={18} /> {output.message}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-alt p-3 rounded-lg text-center border border-border">
                  <div className="text-xs text-text-secondary mb-1">Runtime</div>
                  <div className="font-mono text-sm font-semibold text-text-primary">{output.time}</div>
                </div>
                <div className="bg-surface-alt p-3 rounded-lg text-center border border-border">
                  <div className="text-xs text-text-secondary mb-1">Memory</div>
                  <div className="font-mono text-sm font-semibold text-text-primary">{output.memory}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-secondary" />
            <h3 className="font-semibold text-text-primary">AI Copilot</h3>
            <PulseIndicator className="ml-auto" />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Stuck? Try using a Hash Map to store the values and their indices as you iterate through the array. This reduces time complexity to O(N).
          </p>
          <Button variant="outline" size="sm" className="w-full text-xs bg-white text-primary border-primary hover:bg-primary-light">Show Hint Code</Button>
        </div>
      </div>
    </div>
  );
}
