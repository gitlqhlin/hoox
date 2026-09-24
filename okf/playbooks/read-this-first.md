---
type: "Playbook"
title: "How to read the HOOX bundle"
description: "Read the root index, open one concept, and follow its links instead of scanning the monorepo."
tags: [hoox, playbook, okf]
status: stable
okf_lock: human
generated:
  by: human:jango_blockchained
  at: 2026-09-24T00:00:00Z
sources:
  - id: spec
    resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
    title: Open Knowledge Format v0.2
---

# What this bundle is

This directory is an [Open Knowledge Format](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md) v0.2 bundle. It is a compiled cache of the HOOX repo: one concept per source directory and per document, with import links already resolved.

Start at [the root index](/index.md). Open one concept. Follow `# Depends on`, `# Used by`, and `# Nested` before opening source. The product map is [HOOX map](/playbooks/hoox-map.md).

# Commands

- `bun run okf:query trade worker` finds concepts by path, title, and description.
- `bun run okf:context packages/cli/src` prints that concept and one-line blurbs for its neighbors.
- `bun run okf:lint` checks the bundle.
- `bun run okf:enrich` drafts and relinks the bundle from the working tree.
- `bun run okf:check` fails when the committed bundle does not match the tree.

The draft records exports, imports, and the first non-license comment. It does not call a model.

# What the hook does

`.husky/pre-commit` runs lint-staged, then this pipeline from the git index, and stages the generated bundle. A new curated file is staged with it. An unstaged edit to a curated playbook stays unstaged. `OKF_SKIP=1` skips the refresh.

Worker isolates under `workers/` except `workers/dashboard` are git submodules. Their source is not compiled into this bundle. Dashboard, the CLI, the TUI, and `packages/shared` are.
