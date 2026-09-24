---
type: "Playbook"
title: "HOOX map"
description: "Where the CLI, shared library, TUI, and dashboard live, and which workers are separate repos."
tags: [hoox, playbook, architecture]
status: stable
okf_lock: human
generated:
  by: human:jango_blockchained
  at: 2026-09-24T00:00:00Z
sources:
  - id: readme
    resource: README.md
    title: HOOX README
---

# In this repo

- [packages/cli/src](/code/packages/cli/src.md) is the `hoox` CLI.
- [packages/shared/src](/code/packages/shared/src.md) is the shared library used by workers and the CLI.
- [packages/tui/src](/code/packages/tui/src.md) is the terminal dashboard.
- [workers/dashboard/src](/code/workers/dashboard/src.md) is the Next.js ops console. It lives in this repo. The other workers do not.

# Worker submodules

These directories are separate git repos. Open the submodule to read their source. This bundle does not compile them.

- `workers/hoox-worker` is the public gateway.
- `workers/trade-worker` is multi-exchange execution.
- `workers/agent-worker` is the risk manager.
- `workers/d1-worker` is the D1 proxy.
- `workers/telegram-worker` is alerts and the bot.
- `workers/web3-wallet-worker` is on-chain wallet identity.
- `workers/email-worker` parses mail into signals.
- `workers/analytics-worker` is the Analytics Engine fan-in.
- `workers/report-worker` renders PDFs.
- `workers/pyne-worker` is the Python PYNE edge evaluate host.

# Sisters

PYNE (the Pine engine) and AXIS (the charting PWA) are sibling repositories. Their maps are their own `okf/` bundles, not this one.
