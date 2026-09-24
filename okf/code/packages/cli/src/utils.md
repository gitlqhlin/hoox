---
type: "Code Module"
title: "packages/cli/src/utils"
description: "packages/cli/src/utils contains completion.test.ts, completion.ts, error-handler.test.ts, and 26 more files."
resource: "packages/cli/src/utils"
tags: [cli, code, packages, utils]
status: stable
generated:
  by: process:axis-okf/1
  at: 2026-09-24T03:53:55Z
sources:
  - id: tree
    resource: "packages/cli/src/utils"
    title: "packages/cli/src/utils"
    author: process:git
okf_lock: generated
---

# Files

* `completion.test.ts`
* `completion.ts` — Suggestion, getCmdPath, suggestNextCommand
* `error-handler.test.ts`
* `error-handler.ts` — CommandResult, suggestForCommand, withErrorHandling
* `errors.test.ts`
* `errors.ts` — CLIError, enum
* `format-mode.test.ts`
* `format-mode.ts` — isRichMode
* `formatters.test.ts`
* `formatters.ts` — BadgeLevel, FormatOptions, FormatTableOptions, ProgressBarEta, formatBadge, formatCompletion, formatDuration, formatError, formatHeader, formatHint, formatJson, formatKeyValue
* `fs-secure.ts` — SECRET_DIR_MODE, SECRET_FILE_MODE, ensureSecretDir, secureChmod, secureSecretFile
* `git.test.ts`
* `git.ts` — gitPull, gitSubmoduleUpdate, gitUntrackFile, isGitRepo, isGitTracked, isSubmodule
* `help-formatter.test.ts`
* `help-formatter.ts` — renderHelp
* `number.test.ts`
* `number.ts` — formatBytes, formatNumber
* `rich.test.ts`
* `rich.ts` — RichTask, RichTaskResult, RunRichTasksOptions, runRichTasks
* `string.test.ts`
* `string.ts` — levenshtein
* `theme.test.ts`
* `theme.ts` — hr, icons, kv, stripAnsi, tagged, theme
* `timer.test.ts`
* `timer.ts` — formatDuration, startTimer
* `update-check.test.ts`
* `update-check.ts` — attachUpdateCheck
* `wrangler-output.test.ts`
* `wrangler-output.ts` — formatSecretFailureDetails, sanitizeWranglerOutput

# Packages

`@clack/prompts`, `ansis`, `bun:test`, `commander`, `deploy`, `node:fs`, `start`
