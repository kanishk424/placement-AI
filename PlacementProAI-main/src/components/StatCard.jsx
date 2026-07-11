import { cn } from "../utils/cn";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({ title, value, icon: Icon, trend, trendValue, className }) {
  return (
    <div className={cn("bg-surface rounded-xl p-5 shadow-sm border border-border flex flex-col hover:-translate-y-0.5 transition-transform duration-200", className)}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-text-secondary text-sm font-medium">{title}</div>
        {Icon && (
          <div className="p-2 bg-primary-light text-primary rounded-lg">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
        {trend && (
          <span className={cn("text-xs font-medium flex items-center", trend === 'up' ? 'text-success' : 'text-danger')}>
            {trend === 'up' ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
