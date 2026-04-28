"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Bug, Zap, ArrowRight, Globe, MousePointerClick, Sparkles, FileText, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Navbar } from "@/Components/TestPilot/Navbar";
import { Footer } from "@/Components/TestPilot/Footer";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";

const FEATURE_PILLS = [
  { icon: Bot, label: "Fully Autonomous" },
  { icon: Bug, label: "Bug Detection" },
  { icon: Zap, label: "Results in Minutes" },
];

const STEPS = [
  {
    icon: Globe,
    title: "Paste URL",
    desc: "Drop any live website link — staging or production.",
  },
  {
    icon: Sparkles,
    title: "Agent Analyzes",
    desc: "AI maps every button, form, link and interactive element.",
  },
  {
    icon: MousePointerClick,
    title: "Auto Testing",
    desc: "Agent clicks, types and navigates exactly like a real user.",
  },
  {
    icon: FileText,
    title: "Get Report",
    desc: "Detailed bug report with screenshots and fix recommendations.",
  },
];

const SOCIAL_LOGOS = ["acme", "northwind", "stellar", "nimbus", "vertex", "lumen"];

const isValidUrl = (s: string) => {
  try {
    const u = new URL(s.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const AnimatedAgentMockup = () => (
  <div className="relative mx-auto mt-16 w-full max-w-5xl animate-fade-in">
    <div className="absolute inset-x-0 -top-10 h-40 bg-gradient-glow blur-2xl" aria-hidden />
    <div className="glass-card relative overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface-2/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <div className="ml-3 flex h-7 flex-1 items-center rounded-md border border-border/60 bg-background/60 px-3 text-xs text-muted-foreground">
          https://example-ecommerce.com
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-medium text-success md:inline-flex">
          <span className="pulse-dot" />
          AGENT RUNNING
        </span>
      </div>
      <div className="grid gap-0 md:grid-cols-[1.4fr,1fr]">
        {/* fake browser viewport */}
        <div className="relative min-h-[320px] bg-gradient-to-br from-surface-2 to-background p-6">
          <div className="space-y-3">
            <div className="h-5 w-40 rounded bg-foreground/10" />
            <div className="h-3 w-72 rounded bg-foreground/5" />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-surface p-3">
                  <div className="h-16 rounded bg-foreground/5" />
                  <div className="mt-2 h-2.5 w-3/4 rounded bg-foreground/10" />
                  <div className="mt-1.5 h-2 w-1/2 rounded bg-foreground/5" />
                </div>
              ))}
            </div>
          </div>
          {/* moving cursor */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
            <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary shadow-glow backdrop-blur">
              <Bot className="h-3.5 w-3.5" />
              Agent clicking &quot;Add to cart&quot;
            </div>
            <MousePointerClick className="ml-10 mt-1 h-5 w-5 text-primary" />
          </div>
        </div>
        {/* live log */}
        <div className="border-t border-border/60 bg-background/40 p-4 font-mono text-xs md:border-l md:border-t-0">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Live activity</span>
            <span className="text-[10px] text-muted-foreground">24 / 50</span>
          </div>
          <ul className="space-y-2.5">
            {[
              { icon: CheckCircle2, color: "text-success", text: "Homepage loaded (412ms)" },
              { icon: Bot, color: "text-primary", text: "Agent: testing primary nav" },
              { icon: CheckCircle2, color: "text-success", text: "All 8 nav links → 200" },
              { icon: AlertTriangle, color: "text-warning", text: "Low contrast on Login" },
              { icon: XCircle, color: "text-destructive", text: "Checkout button unresponsive" },
              { icon: Bot, color: "text-primary", text: "Agent: switching to mobile" },
            ].map((row, i) => (
              <li key={i} className="flex items-start gap-2 animate-slide-in-left" style={{ animationDelay: `${i * 120}ms` }}>
                <row.icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", row.color)} />
                <span className="text-foreground/80">{row.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Landing = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const valid = useMemo(() => isValidUrl(url), [url]);

  const handleStart = () => {
    const u = url.trim() || "https://example-ecommerce.com";
    router.push(`/test?url=${encodeURIComponent(u)}&autostart=1`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container relative z-10 pt-20 pb-12 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Autonomous QA powered by AI agents
            </div>
            <h1 className="text-balance bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-6xl">
              Let AI test your website.
              <br />
              <span className="gradient-brand-text">Automatically.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
              Paste your URL. Our AI agent clicks through every flow, finds bugs, and delivers a full report — no setup, no scripts, no humans needed.
            </p>

            {/* URL input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStart();
              }}
              className="relative mx-auto mt-9 flex max-w-2xl flex-col items-center gap-3 sm:flex-row"
            >
              <div className="relative w-full flex-1">
                <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL..."
                  aria-label="Website URL to test"
                  className={cn(
                    "h-14 rounded-xl border-border/70 bg-surface/80 pl-11 pr-12 text-base shadow-card transition-all focus-visible:border-primary focus-visible:ring-primary/40",
                    valid && "border-success/60 ring-1 ring-success/30",
                  )}
                />
                {valid && (
                  <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-scale-in text-success" />
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 w-full gap-2 rounded-xl bg-gradient-primary px-7 text-base font-medium text-primary-foreground shadow-glow hover:opacity-95 sm:w-auto"
              >
                Start Testing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {FEATURE_PILLS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <AnimatedAgentMockup />

          {/* social proof */}
          <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Trusted by developers testing 10,000+ websites
            </p>
            <div className="mt-5 grid grid-cols-3 gap-6 opacity-70 md:grid-cols-6">
              {SOCIAL_LOGOS.map((name) => (
                <div
                  key={name}
                  className="flex h-10 items-center justify-center rounded-md border border-border/40 bg-surface/40 text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border/60 bg-background/60 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              From URL to full bug report in four hands-off steps.
            </p>
          </div>
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="glass-card relative flex flex-col gap-4 p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="absolute right-4 top-4 text-xs font-mono text-muted-foreground/60">
                  0{i + 1}
                </div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section id="docs" className="border-t border-border/60 py-24">
        <div className="container">
          <div className="glass-card relative mx-auto flex max-w-4xl flex-col items-center gap-5 overflow-hidden p-10 text-center">
            <div className="absolute inset-0 bg-gradient-glow opacity-60" aria-hidden />
            <div className="relative">
              <h3 className="text-3xl font-semibold tracking-tight">
                Ship with confidence. Without writing tests.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Run an autonomous QA pass on every deploy. Catch what humans miss.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/test")}
                className="mt-6 h-12 rounded-xl bg-gradient-primary px-7 text-base text-primary-foreground shadow-glow hover:opacity-95"
              >
                Run your first test free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
