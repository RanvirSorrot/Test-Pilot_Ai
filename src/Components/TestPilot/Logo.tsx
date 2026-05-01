import { Bot, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
        <Bot className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
        <Crosshair className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background p-0.5 text-primary" strokeWidth={2.5} />
      </div>
      {showText && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          TestPilot<span className="text-primary"> AI</span>
        </span>
      )}
    </div>
  );
};
