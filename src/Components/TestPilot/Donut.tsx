import { cn } from "@/lib/utils";

interface DonutProps {
  pass: number;
  warn: number;
  fail: number;
  size?: number;
  className?: string;
}

export const Donut = ({ pass, warn, fail, size = 200, className }: DonutProps) => {
  const total = Math.max(pass + warn + fail, 1);
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const passLen = (pass / total) * c;
  const warnLen = (warn / total) * c;
  const failLen = (fail / total) * c;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--surface-3))"
          strokeWidth={14}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--success))"
          strokeWidth={14}
          fill="none"
          strokeDasharray={`${passLen} ${c - passLen}`}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--warning))"
          strokeWidth={14}
          fill="none"
          strokeDasharray={`${warnLen} ${c - warnLen}`}
          strokeDashoffset={-passLen}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--destructive))"
          strokeWidth={14}
          fill="none"
          strokeDasharray={`${failLen} ${c - failLen}`}
          strokeDashoffset={-(passLen + warnLen)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-semibold">{total}</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">checks</span>
      </div>
    </div>
  );
};
