"use client";

import { useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";
import { Navbar } from "@/Components/TestPilot/Navbar";
import { Footer } from "@/Components/TestPilot/Footer";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try the agent on side projects.",
    cta: "Start free",
    highlight: false,
    features: [
      "3 tests / month",
      "Up to 50 actions per test",
      "Basic report (web view)",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    description: "Everything a solo dev needs to ship safely.",
    cta: "Upgrade to Pro",
    highlight: true,
    features: [
      "Unlimited tests",
      "Up to 200 actions per test",
      "PDF export & shareable links",
      "Priority queue",
      "Email + chat support",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "/ month",
    description: "For teams shipping continuously.",
    cta: "Start Team trial",
    highlight: false,
    features: [
      "Everything in Pro",
      "Team workspace & roles",
      "API access & webhooks",
      "Test history & diffs",
      "SSO & audit logs",
    ],
  },
];

const Pricing = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary">Pricing</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Simple plans for every stage.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Start free. Upgrade when you need more agents, more actions, and more reports.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "glass-card relative flex flex-col p-7 transition-transform",
                t.highlight && "border-primary/50 ring-1 ring-primary/40 shadow-glow md:-translate-y-2",
              )}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-glow">
                  <Sparkles className="-mt-0.5 mr-1 inline h-3 w-3" />
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <Button
                onClick={() => router.push("/test")}
                className={cn(
                  "mt-6 h-11 w-full rounded-lg",
                  t.highlight
                    ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
                    : "bg-surface-2 text-foreground hover:bg-surface-3",
                )}
              >
                {t.cta}
              </Button>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", t.highlight ? "text-primary" : "text-success")} />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          All plans include autonomous AI testing, bug detection, and the full activity log.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
