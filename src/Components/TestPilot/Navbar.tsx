"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/#how", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/#docs", label: "Docs" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="TestPilot AI home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) =>
            l.to.startsWith("/#") ? (
              <a
                key={l.to}
                href={l.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  pathname === l.to ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/test")}
            className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
          >
            Get started free
          </Button>
        </div>
      </div>
    </header>
  );
};
