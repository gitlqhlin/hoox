---
type: "Document"
title: "TUI Balanced Quality Pass — Design Spec"
description: "Package: packages/tui (+ minimal packages/shared token/map exports)."
resource: "docs/devops/specs/2026-07-20-tui-quality-pass-design.md"
tags: [devops, doc, docs, specs]
status: stable
generated:
  by: process:axis-okf/1
  at: 2026-09-24T03:53:55Z
sources:
  - id: tree
    resource: "docs/devops/specs/2026-07-20-tui-quality-pass-design.md"
    title: "docs/devops/specs/2026-07-20-tui-quality-pass-design.md"
    author: process:git
okf_lock: generated
---

# Source

Repo path `docs/devops/specs/2026-07-20-tui-quality-pass-design.md`.

# Outline

* 1. Goals and non-goals
  * Goals
  * Non-goals
* 2. Color system
  * Brand DNA (unchanged)
  * Hard-coded hex cleanup
  * Semantic maps (new single source)
  * Explicitly deferred
* 3. Architecture
  * 3.1 Single view registry
  * 3.2 Shared chrome components
  * 3.3 App shell thinning
  * 3.4 Sidebar polish
* 4. UX polish details
* 5. Error handling and safety
* 6. Testing and verification
  * Must pass
  * Test updates
  * Out of scope for this pass
* 7. File plan (implementation sketch)
* 8. Implementation phases
* 9. Acceptance criteria
* 10. Risks and mitigations
* 11. Decisions log

# Mentions

* [packages/shared/src](/code/packages/shared/src.md)
* [packages/tui/src](/code/packages/tui/src.md)
* [packages/tui/src/components/shared](/code/packages/tui/src/components/shared.md)
* [packages/tui/src/utils](/code/packages/tui/src/utils.md)
