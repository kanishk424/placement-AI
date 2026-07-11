import { Link } from 'react-router-dom';
import { ArrowRight, Code, Brain, Map, Users, BarChart3, Bell } from 'lucide-react';
import { Button } from '../components/Button';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full glass-hero z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-text-primary">
              Placement<span className="text-primary">Pro</span> <span className="text-secondary">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-text-secondary hover:text-text-primary font-medium">Log In</Link>
            <Link to="/register">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden dot-pattern min-h-[90vh] flex items-center">
        {/* Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 blur-3xl -z-10 rounded-full mix-blend-multiply opacity-70"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
              The Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                College Placements
              </span><br/>
              is AI-Powered
            </h1>
            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
              Enterprise-grade AI ecosystem to train, track, and place your students in top tier companies. 
              Elevate your college's placement record.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Get Started Free <ArrowRight size={18} />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                See Demo
              </Button>
            </div>
            <div className="pt-4 flex items-center gap-6 text-sm text-text-secondary font-medium uppercase tracking-wider">
              <span>500+ Colleges</span>
              <span>2L+ Students</span>
              <span>89% Placement Rate</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-2xl -rotate-6 scale-105"></div>
            <div className="bg-surface/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-6 relative flex flex-col gap-4 transform hover:-translate-y-2 transition-all duration-500">
              {/* Floating Cards Mock */}
              <div className="flex gap-4 items-center bg-surface p-4 rounded-xl shadow-soft-md border border-border">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary text-xl font-bold">94</div>
                <div>
                  <div className="font-bold text-text-primary">Placement Score</div>
                  <div className="text-xs text-text-secondary">Top 5% of class</div>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-surface p-4 rounded-xl shadow-soft-md border border-border self-end w-3/4">
                <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center text-warning text-xl">🔥</div>
                <div>
                  <div className="font-bold text-text-primary">Coding Streak</div>
                  <div className="text-xs text-text-secondary">47 days and counting!</div>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-surface p-4 rounded-xl shadow-soft-md border border-border">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success text-xl">🎯</div>
                <div>
                  <div className="font-bold text-text-primary">Mock Interviews</div>
                  <div className="text-xs text-text-secondary">12 completed. Ready for TCS.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Complete Preparation Ecosystem</h2>
            <p className="text-text-secondary text-lg">Everything a student needs to get placed, powered by intelligent analytics.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI Roadmap Generator", icon: Map, color: "from-primary to-secondary", desc: "Personalized day-by-day preparation paths based on student's target company and current level." },
              { title: "Coding Practice", icon: Code, color: "from-secondary to-accent", desc: "Built-in IDE with 1000+ curated problems, test cases, and AI hints to master DSA." },
              { title: "Aptitude Training", icon: Brain, color: "from-accent to-success", desc: "Proctored mock tests, topic-wise practice, and speed vs accuracy analytics." },
              { title: "Communication Coach", icon: Users, color: "from-success to-primary", desc: "AI-driven mock interviews with immediate feedback on tone, vocabulary, and confidence." },
              { title: "Placement Analytics", icon: BarChart3, color: "from-warning to-danger", desc: "College-wide visibility into readiness scores to identify at-risk students early." },
              { title: "Parent Alerts", icon: Bell, color: "from-danger to-secondary", desc: "Automated attendance and performance reports sent directly to parents via SMS/WhatsApp." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-background border border-border p-6 rounded-2xl shadow-soft-sm hover:-translate-y-1 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-alt border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-text-secondary">
          <p>© 2026 PlacementPro AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
