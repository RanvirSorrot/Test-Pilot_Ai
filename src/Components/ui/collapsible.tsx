"use client";

import * as React from "react";

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null,
);

export function Collapsible({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <CollapsibleContext.Provider value={{ open, onOpenChange }}>
        {children}
      </CollapsibleContext.Provider>
    </div>
  );
}

export function CollapsibleTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactElement;
}) {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    return children;
  }

  const triggerProps = {
    onClick: () => context.onOpenChange?.(!context.open),
    "data-state": context.open ? "open" : "closed",
  };

  if (!asChild) {
    return <button type="button" {...triggerProps}>{children}</button>;
  }

  return React.cloneElement(children, triggerProps);
}

export function CollapsibleContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(CollapsibleContext);
  if (!context?.open) {
    return null;
  }

  return <div className={className}>{children}</div>;
}
