import { useState } from 'react';
import { forumPosts } from '../../mockData';
import { MessageSquare, ThumbsUp, Search, PlusCircle, User, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '../../components/Button';
import { BadgePill } from '../../components/BadgePill';

export function Forum() {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', 'Coding Doubts', 'Aptitude', 'HR/Interview', 'General'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Discussion Forum</h2>
          <p className="text-text-secondary">Ask questions and discuss with peers and mentors.</p>
        </div>
        <Button className="shrink-0 gap-2"><PlusCircle size={18} /> New Discussion</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 shadow-sm hidden md:block">
            <h3 className="text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">Categories</h3>
            <div className="space-y-1">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTag === tag ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Categories */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-2">
            {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${activeTag === tag ? 'bg-primary border-primary text-white' : 'bg-surface border-border text-text-secondary hover:bg-surface-alt'}`}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>

        {/* Main List */}
        <div className="flex-1 space-y-4">
          {forumPosts.map(post => (
            <div key={post.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.status === 'SOLVED' ? (
                      <BadgePill variant="success" className="py-0 px-2 gap-1 text-[10px]">
                        <CheckCircle2 size={12} /> SOLVED
                      </BadgePill>
                    ) : (
                      <BadgePill variant="warning" className="py-0 px-2 text-[10px]">OPEN</BadgePill>
                    )}
                    <BadgePill variant="neutral" className="py-0 px-2 text-[10px]">{post.tag}</BadgePill>
                    <span className="text-xs text-text-muted">{post.time}</span>
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-surface-alt flex items-center justify-center border border-border">
                        <User size={12} />
                      </div>
                      <span className="font-medium text-text-primary">{post.author}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center text-text-secondary bg-surface-alt rounded-lg p-3 min-w-[70px] border border-border/50">
                  <MessageCircle size={18} className="mb-1" />
                  <span className="font-bold text-text-primary">{post.replies}</span>
                  <span className="text-[10px] uppercase tracking-wider">Replies</span>
                </div>
              </div>
            </div>
          ))}
          
          {forumPosts.length === 0 && (
            <div className="text-center py-12 bg-surface rounded-xl border border-border text-text-secondary">
              No discussions found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
