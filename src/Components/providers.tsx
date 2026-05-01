"use client";

import type { ReactNode } from "react";
import { Toaster } from "@/Components/ui/toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
