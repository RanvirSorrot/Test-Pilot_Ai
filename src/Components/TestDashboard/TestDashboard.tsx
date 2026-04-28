"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bot,
  Globe,
  KeyRound,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Inbox,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/Components/TestPilot/Navbar";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Slider } from "@/Components/ui/slider";
import { Checkbox } from "@/Components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";
import { Progress } from "@/Components/ui/progress";
import { cn } from "@/lib/utils";
import { mockLogs, type LogEntry, type LogType } from "@/lib/mockReport";

const SCOPES = [
  { id: "forms", label: "Forms" },
  { id: "navigation", label: "Navigation" },
  { id: "buttons", label: "Buttons" },
  { id: "a11y", label: "Accessibility" },
  { id: "console", label: "Console errors" },
  { id: "network", label: "Network requests" },
  { id: "responsive", label: "Responsive / mobile view" },
];

const isValidUrl = (s: string) => {
  try {
    const u = new URL(s.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const TYPE_META: Record<LogType, { icon: typeof Info; color: string; label: string }> = {
  info: { icon: Info, color: "text-info", label: "INFO" },
  pass: { icon: CheckCircle2, color: "text-success", label: "PASS" },
  error: { icon: XCircle, color: "text-destructive", label: "ERROR" },
  warning: { icon: AlertTriangle, color: "text-warning", label: "WARN" },
  agent: { icon: Bot, color: "text-primary", label: "AGENT" },
};

type Status = "idle" | "running" | "completed";

const TestDashboard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const initialUrl = params.get("url") ?? "";
  const autostart = params.get("autostart") === "1";

  const [url, setUrl] = useState(initialUrl);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [maxActions, setMaxActions] = useState([50]);
  const [scopes, setScopes] = useState<string[]>(["forms", "navigation", "buttons", "a11y"]);

  const [status, setStatus] = useState<Status>("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const valid = useMemo(() => isValidUrl(url), [url]);
  const totalActions = maxActions[0];

  const toggleScope = (id: string) =>
    setScopes((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const startTest = () => {
    if (!valid && url.trim() !== "") return;
    clearTimers();
    setLogs([]);
    setProgress(0);
    setStatus("running");

    const stream = mockLogs;
    const stepMs = 380;
    stream.forEach((entry, i) => {
      const t = window.setTimeout(() => {
        setLogs((prev) => [...prev, entry]);
        setProgress(Math.min(100, Math.round(((i + 1) / stream.length) * 100)));
      }, i * stepMs);
      timersRef.current.push(t);
    });

    const finish = window.setTimeout(() => {
      setStatus("completed");
      const goto = window.setTimeout(() => {
        router.push(`/report?url=${encodeURIComponent(url || "https://example-ecommerce.com")}`);
      }, 900);
      timersRef.current.push(goto);
    }, stream.length * stepMs + 400);
    timersRef.current.push(finish);
  };

  useEffect(() => {
    if (autostart) {
      const t = window.setTimeout(() => startTest(), 250);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimers(), []);

  // autoscroll
  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const actionsCount = Math.round((progress / 100) * totalActions);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Run a test</h1>
            <p className="text-sm text-muted-foreground">
              Configure your scope on the left. Watch the agent work on the right.
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px),1fr]">
          {/* Config Panel */}
          <section className="glass-card p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Test configuration
            </h2>

            <div className="mt-5 space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-site.com"
                  className={cn(
                    "h-11 pl-9 pr-10 transition-all",
                    valid && "border-success/60 ring-1 ring-success/30",
                  )}
                />
                {valid && (
                  <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-scale-in text-success" />
                )}
              </div>
              {!valid && url.length > 0 && (
                <p className="text-xs text-warning">Enter a valid URL starting with http:// or https://</p>
              )}
            </div>

            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen} className="mt-5">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md border border-border/60 bg-surface-2/60 px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-2"
                >
                  <span className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    Advanced options
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-muted-foreground transition-transform", advancedOpen && "rotate-180")}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="user" className="text-xs">Test username</Label>
                    <Input id="user" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user@site.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pw" className="text-xs">Password</Label>
                    <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Max actions</Label>
                    <span className="font-mono text-xs text-foreground">{maxActions[0]}</span>
                  </div>
                  <Slider value={maxActions} onValueChange={setMaxActions} min={10} max={100} step={5} />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>10</span><span>100</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Test scope</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {SCOPES.map((s) => {
                      const checked = scopes.includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-2 rounded-md border border-border/60 bg-surface-2/40 px-2.5 py-2 text-sm transition-colors",
                            checked && "border-primary/60 bg-primary/10",
                          )}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleScope(s.id)}
                            className="h-4 w-4"
                          />
                          <span className="text-xs">{s.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button
              onClick={startTest}
              disabled={status === "running"}
              size="lg"
              className="mt-6 h-12 w-full gap-2 rounded-xl bg-gradient-primary text-base text-primary-foreground shadow-glow hover:opacity-95 disabled:opacity-70"
            >
              {status === "running" ? (
                <>
                  <Bot className="h-4 w-4 animate-pulse" />
                  Agent working...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run AI Test
                </>
              )}
            </Button>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>≈ {Math.round(totalActions * 2.7)}s estimated</span>
              <button
                onClick={() => {
                  clearTimers();
                  setStatus("idle");
                  setLogs([]);
                  setProgress(0);
                }}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
          </section>

          {/* Activity Feed */}
          <section className="glass-card flex min-h-[560px] flex-col overflow-hidden">
            <header className="border-b border-border/60 bg-surface-2/40 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Live activity
                  </h2>
                  <p className="mt-0.5 font-mono text-xs text-foreground/80">
                    {status === "idle"
                      ? "Awaiting instructions..."
                      : status === "running"
                      ? `Testing in progress... ${actionsCount}/${totalActions} actions`
                      : `Test complete — ${totalActions} actions executed`}
                  </p>
                </div>
                <StatusBadge status={status} compact />
              </div>
              <Progress value={progress} className="mt-3 h-1.5 bg-surface-3" />
            </header>

            <div ref={feedRef} className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4 font-mono text-[13px]">
              {logs.length === 0 ? (
                <EmptyFeed />
              ) : (
                <ul className="space-y-2">
                  {logs.map((log) => (
                    <LogRow key={log.id} log={log} />
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const StatusBadge = ({ status, compact = false }: { status: Status; compact?: boolean }) => {
  if (status === "running") {
    return (
      <span className={cn(
        "inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-success",
        compact && "px-2 py-0.5 text-[10px]",
      )}>
        <span className="pulse-dot" /> Running
      </span>
    );
  }
  if (status === "completed") {
    return (
      <span className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-primary",
        compact && "px-2 py-0.5 text-[10px]",
      )}>
        <CheckCircle2 className="h-3 w-3" /> Completed
      </span>
    );
  }
  return (
    <span className={cn(
      "inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
      compact && "px-2 py-0.5 text-[10px]",
    )}>
      <span className="h-2 w-2 rounded-full bg-muted-foreground/60" /> Idle
    </span>
  );
};

const LogRow = ({ log }: { log: LogEntry }) => {
  const meta = TYPE_META[log.type];
  const Icon = meta.icon;
  return (
    <li className="flex items-start gap-3 rounded-md border border-transparent px-2 py-1.5 transition-colors hover:border-border/60 hover:bg-surface-2/40 animate-slide-in-left">
      <span className="mt-0.5 w-12 shrink-0 text-[10px] tabular-nums text-muted-foreground/70">{log.ts}</span>
      <span className={cn("mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center", meta.color)}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className={cn("w-12 shrink-0 text-[10px] font-semibold tracking-wider", meta.color)}>
        {meta.label}
      </span>
      <span className="text-foreground/85">{log.text}</span>
    </li>
  );
};

const EmptyFeed = () => (
  <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
    <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-surface-2 to-surface-3 shadow-card">
      <Bot className="h-9 w-9 text-muted-foreground" />
      <Inbox className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full bg-background p-0.5 text-muted-foreground/70" />
    </div>
    <p className="text-sm font-medium text-foreground">Waiting to start</p>
    <p className="mt-1 max-w-xs text-xs text-muted-foreground">
      Paste a URL and hit <ChevronRight className="-mt-0.5 inline h-3 w-3" /> Run AI Test to begin.
    </p>
  </div>
);

export default TestDashboard;
