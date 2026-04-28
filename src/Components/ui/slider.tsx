"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  const current = value[0] ?? min;
  const percentage = ((current - min) / (max - min || 1)) * 100;

  return (
    <div className={cn("relative flex h-5 items-center", className)}>
      <div className="absolute h-1.5 w-full rounded-full bg-surface-3" />
      <div
        className="absolute h-1.5 rounded-full bg-primary"
        style={{ width: `${percentage}%` }}
      />
      <input
        type="range"
        value={current}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onValueChange?.([Number(event.target.value)])}
        className="slider-thumb relative z-10 w-full appearance-none bg-transparent"
      />
    </div>
  );
}
