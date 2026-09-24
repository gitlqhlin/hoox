---
type: "Document"
title: "🔒 Idempotency & Durable Objects"
description: "How Hoox uses Cloudflare Durable Objects for at-most-once acceptance at the gateway (two-phase reserve/commit/release) so webhook retries cannot double-dispatch orders during…"
resource: "docs/enduser/concepts/idempotency.mdx"
tags: [concepts, doc, docs, enduser]
status: stable
generated:
  by: process:axis-okf/1
  at: 2026-09-24T03:53:55Z
sources:
  - id: tree
    resource: "docs/enduser/concepts/idempotency.mdx"
    title: "docs/enduser/concepts/idempotency.mdx"
    author: process:git
okf_lock: generated
---

# Source

Repo path `docs/enduser/concepts/idempotency.mdx`.

# Outline

* ⚠️ The Danger: How Webhook Retries Lead to Double-Ordering
* 🛡️ The Hoox Solution: Durable Objects Mutex Locking
  * The Idempotency Workflow (two-phase)
* 🔍 The Dedup & Cleanup Algorithm
  * 1. Key resolution
  * 2. Atomic two-phase evaluation
  * 3. Automatic TTL & Storage Alarms
  * 4. Cold-Start Resilience
* 📊 Performance Impact
  * 🔗 Next Steps
