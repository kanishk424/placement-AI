import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { cn } from '../utils/cn';
import { ArrowRight, Lock, User, Briefcase, GraduationCap, Building2 } from 'lucide-react';

export function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');
  const navigate = useNavigate();

  const tabs = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'mentor', label: 'Mentor', icon: User },
    { id: 'officer', label: 'Officer', icon: Briefcase },
    { id: 'external', label: 'External', icon: Building2 },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (activeTab === 'student') navigate('/student/dashboard');
    else if (activeTab === 'mentor') navigate('/mentor/dashboard');
    else if (activeTab === 'officer') navigate('/officer/dashboard');
    else navigate('/external/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-secondary to-accent p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary font-bold text-2xl">
              P
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Placement<span className="text-white/80">Pro</span> AI
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mt-12">
            Unlock your <br/> true potential.
          </h1>
          <p className="text-white/80 text-lg mt-6 max-w-md">
            Join the ecosystem that's actively helping thousands of students land their dream jobs through AI-driven insights and practice.
          </p>
        </div>
        
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Student" />
            </div>
            <div>
              <div className="text-white font-medium">Arjun Kumar</div>
              <div className="text-white/70 text-sm">Placed at Google • 32 LPA</div>
            </div>
          </div>
          <p className="text-white/90 text-sm italic">
            "The AI roadmap perfectly guided me on what to study. The mock interviews were exactly like the real thing."
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-text-primary">Welcome back</h2>
            <p className="text-text-secondary mt-2">Log in to your account to continue</p>
          </div>

          <div className="bg-surface border border-border p-1 rounded-xl flex gap-1 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-alt"
                )}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                {activeTab === 'student' ? 'Roll Number' : activeTab === 'external' ? 'Email Address' : 'Employee ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                  {activeTab === 'external' ? <User size={18} /> : <GraduationCap size={18} />}
                </div>
                <input 
                  type={activeTab === 'external' ? 'email' : 'text'}
                  defaultValue={activeTab === 'student' ? 'CSE001' : ''}
                  className="w-full bg-surface-alt border border-border rounded-lg pl-10 pr-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder={`Enter your ${activeTab === 'student' ? 'roll number' : activeTab === 'external' ? 'email' : 'ID'}`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-text-secondary">Password</label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-light">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                  <Lock size={18} />
                </div>
                <input 
                  type="password"
                  defaultValue="password123"
                  className="w-full bg-surface-alt border border-border rounded-lg pl-10 pr-4 py-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-2.5 text-base mt-2">
              Sign In <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-muted">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full py-2.5 text-base gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>

          {activeTab === 'external' && (
            <p className="text-center text-sm text-text-secondary mt-8">
              New here? <Link to="/register" className="font-medium text-primary hover:underline">Register your profile</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
