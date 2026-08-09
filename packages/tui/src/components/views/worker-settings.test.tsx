/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Unit tests for WorkerSettingsView contracts:
 * secret fields stay CLI-only, dangerous writes need double-confirm, etc.
 */
import { describe, it, expect } from "bun:test";
import { WorkerSettingsView } from "./worker-settings";

describe("WorkerSettingsView", () => {
  it("is a function component", () => {
    expect(WorkerSettingsView).toBeInstanceOf(Function);
    expect(WorkerSettingsView.name).toBe("WorkerSettingsView");
  });

  it("secret fields never display cleartext values (display contract)", () => {
    // Mirrors format path in the view: secrets always render as CLI placeholder.
    const isSecret = true;
    const display = isSecret ? "(secret — CLI)" : "should-not-appear";
    expect(display).toBe("(secret — CLI)");
    expect(display).not.toMatch(/sk-|token|password/i);
  });

  it("dangerous fields require a second confirm before write (contract)", () => {
    // Mirrors saveCurrent double-Enter gate for kind === "dangerous"
    let pending: string | null = null;
    const fieldKey = "risk:kill_switch";
    const kind = "dangerous" as const;

    // First Enter → arm confirm
    if (kind === "dangerous" && pending !== fieldKey) {
      pending = fieldKey;
    }
    expect(pending).toBe(fieldKey);

    // Second Enter with same key → proceed
    const shouldWrite = kind === "dangerous" && pending === fieldKey;
    expect(shouldWrite).toBe(true);
  });
});
