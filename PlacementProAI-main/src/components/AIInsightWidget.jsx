import { PulseIndicator } from "./PulseIndicator";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./Button";

export function AIInsightWidget({ message, actionText, onAction }) {
  return (
    <div className="bg-gradient-to-r from-primary-light/50 to-surface border border-primary/20 rounded-xl p-5 shadow-sm relative overflow-hidden group">
      {/* Decorative gradient blur */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="flex-shrink-0 relative">
          <div className="bg-surface border border-primary/20 p-2.5 rounded-lg shadow-sm">
             <Sparkles className="text-secondary" size={24} />
          </div>
          <div className="absolute -top-1 -right-1">
             <PulseIndicator />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-text-primary">AI Insight</h4>
          </div>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            {message}
          </p>
          {actionText && (
            <Button variant="outline" size="sm" onClick={onAction} className="text-xs py-1.5 px-3">
              {actionText} <ArrowRight size={14} className="ml-1.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
