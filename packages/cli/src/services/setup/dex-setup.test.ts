/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

import { afterEach, describe, expect, it } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  applyWalletRpcDefaults,
  DEFAULT_RPC_URL_ARBITRUM,
  DEFAULT_RPC_URL_SOLANA,
  encodeBase58,
  ensureSolanaPrivateKey,
  generateSolanaSeedBase58,
} from "./dex-setup.js";

describe("dex-setup", () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it("encodeBase58 round-trips known vectors", () => {
    expect(encodeBase58(new Uint8Array([0]))).toBe("1");
    expect(encodeBase58(new Uint8Array([0, 0, 1]))).toBe("112");
  });

  it("generateSolanaSeedBase58 returns a non-empty base58 string", () => {
    const a = generateSolanaSeedBase58();
    const b = generateSolanaSeedBase58();
    expect(a.length).toBeGreaterThan(30);
    expect(b).not.toBe(a);
    expect(/^[1-9A-HJ-NP-Za-km-z]+$/.test(a)).toBe(true);
  });

  it("ensureSolanaPrivateKey generates once and preserves existing", () => {
    dir = mkdtempSync(join(tmpdir(), "hoox-dex-"));
    const path = join(dir, ".dev.vars");
    const first = ensureSolanaPrivateKey(path);
    expect(first.generated).toBe(true);
    expect(first.value).toBeTruthy();
    const text = readFileSync(path, "utf-8");
    expect(text).toContain("SOLANA_PRIVATE_KEY=");
    const second = ensureSolanaPrivateKey(path);
    expect(second.generated).toBe(false);
    expect(second.value).toBe(first.value);
  });

  it("applyWalletRpcDefaults fills empty Arbitrum and Solana RPCs only", () => {
    dir = mkdtempSync(join(tmpdir(), "hoox-dex-"));
    const path = join(dir, "wrangler.jsonc");
    writeFileSync(
      path,
      `{
  "vars": {
    "RPC_URL_ETHEREUM": "https://eth.llamarpc.com",
    "RPC_URL_ARBITRUM": "",
    "RPC_URL_SOLANA": ""
  }
}
`
    );
    const patched = applyWalletRpcDefaults(path);
    expect(patched.sort()).toEqual(["RPC_URL_ARBITRUM", "RPC_URL_SOLANA"]);
    const out = readFileSync(path, "utf-8");
    expect(out).toContain(`"RPC_URL_ARBITRUM": "${DEFAULT_RPC_URL_ARBITRUM}"`);
    expect(out).toContain(`"RPC_URL_SOLANA": "${DEFAULT_RPC_URL_SOLANA}"`);
    expect(applyWalletRpcDefaults(path)).toEqual([]);
  });
});
