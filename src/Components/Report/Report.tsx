"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  Bot,
  Bug,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Download,
  Filter,
  Globe,
  Info,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Navbar } from "@/Components/TestPilot/Navbar";
import { Footer } from "@/Components/TestPilot/Footer";
import { Donut } from "@/Components/TestPilot/Donut";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Badge } from "@/Components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import {
  mockBugs,
  mockLogs,
  mockPassed,
  mockSummary,
  mockWarnings,
  type Bug as BugType,
  type LogType,
  type Severity,
  type Warning as WarningType,
} from "@/lib/mockReport";

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-destructive/15 text-destructive border-destructive/40",
  High: "bg-warning/15 text-warning border-warning/40",
  Medium: "bg-info/15 text-info border-info/40",
  Low: "bg-muted text-muted-foreground border-border",
};

const TYPE_META: Record<LogType, { icon: typeof Info; color: string; label: string }> = {
  info: { icon: Info, color: "text-info", label: "INFO" },
  pass: { icon: CheckCircle2, color: "text-success", label: "PASS" },
  error: { icon: XCircle, color: "text-destructive", label: "ERROR" },
  warning: { icon: AlertTriangle, color: "text-warning", label: "WARN" },
  agent: { icon: Bot, color: "text-primary", label: "AGENT" },
};

const Report = () => {
  const router = useRouter();
  const params = useSearchParams();
  const url = params.get("url") ?? mockSummary.url;
  const animatedScore = useCountUp(mockSummary.score);

  const passCount = mockPassed.length;
  const warnCount = mockWarnings.length;
  const bugCount = mockBugs.length;

  const scoreColor =
    mockSummary.score < 50 ? "text-destructive" : mockSummary.score < 75 ? "text-warning" : "text-success";
  const scoreRing =
    mockSummary.score < 50
      ? "from-destructive/20 to-destructive/0 ring-destructive/40"
      : mockSummary.score < 75
      ? "from-warning/20 to-warning/0 ring-warning/40"
      : "from-success/20 to-success/0 ring-success/40";

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied", description: "Share this report with your team." });
  };

  const handleDownload = () => {
    toast({ title: "Preparing PDF", description: "Your report will download shortly." });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        {/* Header */}
        <section className="glass-card relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" aria-hidden />
          <div className="relative grid gap-6 md:grid-cols-[1fr,auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Test report</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-2 text-[10px] font-semibold text-primary">
                  {favicon(url)}
                </div>
                <h1 className="break-all text-2xl font-semibold tracking-tight md:text-3xl">{url}</h1>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {new Date(mockSummary.testedAt).toLocaleString()}</span>
                <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Production</span>
              </div>
            </div>
            <div className={cn(
              "flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-b p-5 ring-1",
              scoreRing,
            )}>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Overall score</span>
              <div className={cn("font-mono text-5xl font-semibold tabular-nums", scoreColor)}>
                {animatedScore}
                <span className="ml-0.5 text-xl text-muted-foreground">/100</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            <Stat icon={XCircle} label="Bugs found" value={bugCount} tone="destructive" />
            <Stat icon={AlertTriangle} label="Warnings" value={warnCount} tone="warning" />
            <Stat icon={CheckCircle2} label="Passed" value={passCount} tone="success" />
            <Stat icon={Clock} label="Duration" value={formatDuration(mockSummary.durationSec)} tone="muted" />
            <Stat icon={Bot} label="Actions taken" value={mockSummary.actions} tone="primary" />
          </div>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="h-auto w-full justify-start gap-1 rounded-xl border border-border/60 bg-surface/60 p-1 backdrop-blur">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-surface-2 data-[state=active]:text-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="bugs" className="rounded-lg gap-1.5 data-[state=active]:bg-surface-2 data-[state=active]:text-foreground">
              Bugs <Badge variant="outline" className="border-destructive/40 bg-destructive/10 text-destructive">{bugCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="warnings" className="rounded-lg gap-1.5 data-[state=active]:bg-surface-2 data-[state=active]:text-foreground">
              Warnings <Badge variant="outline" className="border-warning/40 bg-warning/10 text-warning">{warnCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="passed" className="rounded-lg gap-1.5 data-[state=active]:bg-surface-2 data-[state=active]:text-foreground">
              Passed <Badge variant="outline" className="border-success/40 bg-success/10 text-success">{passCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="log" className="rounded-lg data-[state=active]:bg-surface-2 data-[state=active]:text-foreground">
              Full log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 animate-fade-in">
            <OverviewTab pass={passCount} warn={warnCount} fail={bugCount} bugs={mockBugs} />
          </TabsContent>
          <TabsContent value="bugs" className="mt-6 animate-fade-in">
            <div className="grid gap-4">
              {mockBugs.map((b) => <BugCard key={b.id} bug={b} />)}
            </div>
          </TabsContent>
          <TabsContent value="warnings" className="mt-6 animate-fade-in">
            <div className="grid gap-4">
              {mockWarnings.map((w) => <WarningCard key={w.id} warning={w} />)}
            </div>
          </TabsContent>
          <TabsContent value="passed" className="mt-6 animate-fade-in">
            <PassedList />
          </TabsContent>
          <TabsContent value="log" className="mt-6 animate-fade-in">
            <FullLog />
          </TabsContent>
        </Tabs>

        {/* Footer actions */}
        <section className="mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border border-border/60 bg-surface/60 p-4 md:flex-row">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
              <Copy className="h-3.5 w-3.5" /> Share report
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Download PDF
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push(`/test?url=${encodeURIComponent(url)}&autostart=1`)} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Re-run test
            </Button>
            <Button size="sm" onClick={() => router.push("/test")} className="gap-1.5 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
              Test another URL
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const favicon = (url: string) => {
  try {
    return new URL(url).hostname.charAt(0).toUpperCase();
  } catch {
    return "?";
  }
};

const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
};

const Stat = ({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Info;
  label: string;
  value: number | string;
  tone: "destructive" | "warning" | "success" | "muted" | "primary";
}) => {
  const toneCls = {
    destructive: "text-destructive bg-destructive/10 border-destructive/30",
    warning: "text-warning bg-warning/10 border-warning/30",
    success: "text-success bg-success/10 border-success/30",
    primary: "text-primary bg-primary/10 border-primary/30",
    muted: "text-muted-foreground bg-surface-2 border-border/60",
  }[tone];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/60 p-3">
      <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg border", toneCls)}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="font-mono text-lg font-semibold tabular-nums">{value}</div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};

const OverviewTab = ({ pass, warn, fail, bugs }: { pass: number; warn: number; fail: number; bugs: BugType[] }) => {
  const top = bugs.slice(0, 3);
  return (
    <div className="grid gap-6 lg:grid-cols-[auto,1fr]">
      <div className="glass-card flex flex-col items-center justify-center gap-4 p-6">
        <Donut pass={pass} warn={warn} fail={fail} />
        <div className="flex gap-4 text-xs">
          <Legend color="bg-success" label={`Passed ${pass}`} />
          <Legend color="bg-warning" label={`Warnings ${warn}`} />
          <Legend color="bg-destructive" label={`Bugs ${fail}`} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="glass-card p-6">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">AI summary</h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">{mockSummary.description}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Top critical issues
          </h3>
          <div className="grid gap-3">
            {top.map((b) => (
              <div key={b.id} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{b.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{b.url}</p>
                  </div>
                  <Badge variant="outline" className={cn("shrink-0", SEVERITY_STYLES[b.severity])}>
                    {b.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
    <span className={cn("h-2 w-2 rounded-full", color)} />
    {label}
  </span>
);

const BugCard = ({ bug }: { bug: BugType }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="glass-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 p-5 text-left transition-colors hover:bg-surface-2/40"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
            <Bug className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{bug.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className={SEVERITY_STYLES[bug.severity]}>{bug.severity}</Badge>
              <span className="font-mono">{bug.url}</span>
            </div>
          </div>
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="grid gap-4 border-t border-border/60 bg-surface-2/30 p-5 md:grid-cols-[1fr,260px] animate-fade-in">
          <div className="space-y-3 text-sm">
            <DetailBlock label="Agent action" value={bug.action} />
            <DetailBlock label="What happened" value={bug.result} />
            <DetailBlock label="Recommendation" value={bug.recommendation} accent />
          </div>
          <ScreenshotPlaceholder />
        </div>
      )}
    </article>
  );
};

const WarningCard = ({ warning }: { warning: WarningType }) => (
  <article className="glass-card flex items-start gap-3 p-5">
    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10 text-warning">
      <AlertTriangle className="h-4 w-4" />
    </span>
    <div className="flex-1">
      <h3 className="text-base font-semibold">{warning.title}</h3>
      <p className="mt-0.5 font-mono text-xs text-muted-foreground">{warning.url}</p>
      <p className="mt-2 text-sm text-foreground/85">{warning.detail}</p>
      <p className="mt-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-foreground/80">
        <span className="font-semibold text-primary">Fix: </span>{warning.recommendation}
      </p>
    </div>
  </article>
);

const PassedList = () => (
  <div className="glass-card divide-y divide-border/60">
    {mockPassed.map((p) => (
      <div key={p.id} className="flex items-center gap-3 px-5 py-3">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span className="text-sm text-foreground/90">{p.title}</span>
      </div>
    ))}
  </div>
);

const FullLog = () => {
  const [filter, setFilter] = useState<"all" | LogType>("all");
  const filtered = useMemo(
    () => (filter === "all" ? mockLogs : mockLogs.filter((l) => l.type === filter)),
    [filter],
  );
  const filters: Array<{ id: "all" | LogType; label: string }> = [
    { id: "all", label: "All" },
    { id: "info", label: "Info" },
    { id: "pass", label: "Pass" },
    { id: "error", label: "Error" },
    { id: "warning", label: "Warning" },
    { id: "agent", label: "Agent" },
  ];
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 bg-surface-2/40 px-4 py-3">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors",
              filter === f.id
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border/60 bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="divide-y divide-border/40 font-mono text-[13px]">
        {filtered.map((log) => {
          const m = TYPE_META[log.type];
          const Icon = m.icon;
          return (
            <li key={log.id} className="flex items-start gap-3 px-5 py-2.5">
              <span className="w-12 shrink-0 text-[10px] tabular-nums text-muted-foreground/70">{log.ts}</span>
              <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", m.color)} />
              <span className={cn("w-12 shrink-0 text-[10px] font-semibold tracking-wider", m.color)}>{m.label}</span>
              <span className="text-foreground/85">{log.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const DetailBlock = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className={cn("mt-1 text-sm", accent ? "rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-foreground/85" : "text-foreground/85")}>
      {value}
    </p>
  </div>
);

const ScreenshotPlaceholder = () => (
  <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-surface-2/40 text-muted-foreground">
    <Camera className="h-6 w-6" />
    <span className="text-[11px] uppercase tracking-widest">Screenshot captured</span>
  </div>
);

export default Report;
