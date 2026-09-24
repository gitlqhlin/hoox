# docs/enduser/concepts

# Concepts

* [ai-risk-manager.mdx](ai-risk-manager.md) - description: "How the agent-worker runs configurable cron checks (1–1440 minutes) to calculate trailing stops, evaluate max daily drawdowns, and govern a multi-provider fallback…
* [cloudflare-services.mdx](cloudflare-services.md) - description: "How D1 edge-SQLite, KV, R2, Queues, Durable Objects, Vectorize, and Browser Rendering power our distributed edge monorepo.".
* [Product ecosystem](ecosystem.md) - description: "HOOX, PYNE, PyneTS, AXIS, pyne-worker, and pyne-agent-worker — what each surface does.".
* [⚡ Edge-First Architecture](edge-architecture.md) - Why running algorithmic trading bots on V8 isolates and Cloudflare's 330+ global data centers cuts latency by 60% and eliminates slippage.
* [how-hoox-works.mdx](how-hoox-works.md) - description: "High-level overview of the pipeline turning a trade signal into an executed edge order.".
* [🔒 Idempotency & Durable Objects](idempotency.md) - How Hoox uses Cloudflare Durable Objects for at-most-once acceptance at the gateway (two-phase reserve/commit/release) so webhook retries cannot double-dispatch orders during…
* [📊 Signals & Trade Spec](signals-and-trades.md) - This document details the exact specifications, JSON validation schemas, and internal translation logic that occurs when an external trade signal (such as a TradingView® alert or…
