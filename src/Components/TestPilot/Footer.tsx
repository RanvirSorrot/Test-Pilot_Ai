import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-background/40">
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
      <Logo />
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} TestPilot AI. Autonomous QA for the modern web.
      </p>
    </div>
  </footer>
);
