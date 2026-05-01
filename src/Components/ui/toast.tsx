import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

export type ToastActionElement = React.ReactElement;

export function Toast({ open = true, className, children }: ToastProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-auto w-full rounded-xl border border-border/60 bg-surface/95 p-4 shadow-2xl backdrop-blur",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
}

export function ToastViewport({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-4 z-[100] mx-auto flex w-full max-w-sm flex-col gap-3 px-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ToastTitle(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm font-semibold", props.className)} {...props} />;
}

export function ToastDescription(
  props: React.HTMLAttributes<HTMLParagraphElement>,
) {
  return (
    <p
      className={cn("mt-1 text-sm text-muted-foreground", props.className)}
      {...props}
    />
  );
}

export function ToastClose(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      type="button"
      aria-label="Close notification"
      className={cn(
        "absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2/70 hover:text-foreground",
        props.className,
      )}
      {...props}
    >
      ×
    </button>
  );
}
