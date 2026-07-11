import { cn } from "../utils/cn";

export function HeatmapGrid({ data, className }) {
  const intensities = [
    "bg-surface-alt", // 0
    "bg-indigo-200", // 1
    "bg-indigo-400", // 2
    "bg-indigo-600", // 3
    "bg-indigo-800", // 4
  ];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-1 overflow-hidden" style={{ width: '100%', flexWrap: 'wrap' }}>
        {data.slice(0, 365).map((day, i) => (
          <div
            key={i}
            title={`${day.date}: ${day.count} contributions`}
            className={cn(
              "w-3 h-3 rounded-[2px] transition-all hover:scale-125 hover:ring-1 hover:ring-primary cursor-pointer",
              intensities[Math.min(day.count, 4)]
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-end text-xs text-text-secondary mt-2 gap-2">
        <div>Less</div>
        <div className="flex gap-1">
          {intensities.map((color, i) => (
            <div key={i} className={cn("w-3 h-3 rounded-[2px]", color)} />
          ))}
        </div>
        <div>More</div>
      </div>
    </div>
  );
}
