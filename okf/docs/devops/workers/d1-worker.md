---
type: "Document"
title: "d1-worker.mdx"
description: "description: \"Comprehensive engineering specification for the Hoox D1 SQLite Database Proxy Worker, covering SQL query interfaces, batch operations, and dashboard statistics…"
resource: "docs/devops/workers/d1-worker.mdx"
tags: [devops, doc, docs, workers]
status: stable
generated:
  by: process:axis-okf/1
  at: 2026-09-24T03:53:55Z
sources:
  - id: tree
    resource: "docs/devops/workers/d1-worker.mdx"
    title: "docs/devops/workers/d1-worker.mdx"
    author: process:git
okf_lock: generated
---

# Source

Repo path `docs/devops/workers/d1-worker.mdx`.

# Outline

* ⚡ 1. Declared Wrangler Configurations & Bindings
* 🔌 2. Internal REST API Specification
  * A. Named RPC (preferred for hot paths)
  * B. Execute Single SQL Query (SELECT-only free-form)
  * C. Execute Transactional Batch Operations
  * C. Dashboard Telemetry Statistics
* 🛡️ 3. Security & SQL Injection Protection
  * 🔗 Next Steps

# Mentions

* [packages/shared/src](/code/packages/shared/src.md)
* [packages/shared/src/middleware](/code/packages/shared/src/middleware.md)
* [packages/shared/src/types](/code/packages/shared/src/types.md)
