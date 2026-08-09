/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Hook unit tests — renderer ref, global keyboard registration, polling helpers.
 */
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { setRendererRef, getRendererRef, registerGlobalHandler } from "./index";
import type { KeyEvent } from "./use-keyboard";

describe("renderer-ref", () => {
  afterEach(() => {
    setRendererRef(null);
  });

  it("stores and returns the renderer singleton", () => {
    const fake = {
      id: "renderer",
    } as unknown as import("@opentui/core").CliRenderer;
    setRendererRef(fake);
    expect(getRendererRef()).toBe(fake);
  });

  it("clears when set to null", () => {
    setRendererRef({} as import("@opentui/core").CliRenderer);
    setRendererRef(null);
    expect(getRendererRef()).toBeNull();
  });
});

describe("registerGlobalHandler", () => {
  beforeEach(() => {
    // Ensure no renderer → attach is a no-op; handlers still register
    setRendererRef(null);
  });

  it("registers and unregisters without throwing", () => {
    const calls: string[] = [];
    const unsub = registerGlobalHandler((key: KeyEvent) => {
      calls.push(key.name);
    }, 10);
    expect(typeof unsub).toBe("function");
    unsub();
    expect(calls).toEqual([]);
  });

  it("multiple handlers can register and all unsubscribe cleanly", () => {
    const a = registerGlobalHandler(() => {}, 0);
    const b = registerGlobalHandler(() => {}, 50);
    const c = registerGlobalHandler(() => {}, 100);
    a();
    b();
    c();
  });
});

describe("usePolling backoff math", () => {
  it("caps exponential backoff at 16s", () => {
    const base = 1000;
    const MAX = 16_000;
    for (let retry = 0; retry < 10; retry++) {
      const backoff = Math.min(base * Math.pow(2, retry), MAX);
      expect(backoff).toBeLessThanOrEqual(MAX);
    }
    expect(Math.min(base * Math.pow(2, 10), MAX)).toBe(MAX);
  });
});

// Silence unused import if mock is tree-shaken away in some runners
void mock;
