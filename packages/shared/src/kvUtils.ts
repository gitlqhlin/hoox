/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utility functions for KV operations
 * Shared across workers that need KV timestamp logging and parallel I/O
 */
import type { KVNamespace } from "@cloudflare/workers-types";
import { toError } from "./errors";

/**
 * Interface for environments with a KVNamespace binding
 */
export interface EnvWithKV {
  REPORT_KV: KVNamespace;
  [key: string]: unknown;
}

/**
 * Logs a timestamp to KV
 * @param env - Environment with KV binding
 * @param prefix - Optional prefix for the key
 * @returns Promise that resolves when the operation completes
 */
export async function logKvTimestamp(
  env: EnvWithKV,
  prefix: string = "timestamp"
): Promise<void> {
  const timestamp = new Date().toISOString();
  const key = `${prefix}_${timestamp}`;
  try {
    await env.REPORT_KV.put(key, timestamp);
  } catch (error) {
    console.error(
      `Failed to log timestamp to KV: ${toError(error, "Unknown error")}`
    );
  }
}

/**
 * Parallel KV gets — prefer over sequential `await kv.get` loops.
 * Order of returned values matches `keys`.
 */
export async function kvGetMany(
  kv: KVNamespace,
  keys: readonly string[]
): Promise<Array<string | null>> {
  if (keys.length === 0) return [];
  return Promise.all(keys.map((key) => kv.get(key)));
}

/**
 * Parallel KV gets as a record keyed by the original key names.
 */
export async function kvGetManyAsRecord(
  kv: KVNamespace,
  keys: readonly string[]
): Promise<Record<string, string | null>> {
  const values = await kvGetMany(kv, keys);
  const out: Record<string, string | null> = {};
  for (let i = 0; i < keys.length; i++) {
    out[keys[i]!] = values[i] ?? null;
  }
  return out;
}

export interface KvPutEntry {
  key: string;
  value: string;
  options?: {
    expirationTtl?: number;
    expiration?: number;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Parallel KV puts — prefer over sequential `await kv.put` loops
 * when writes are independent (no read-modify-write races).
 */
export async function kvPutMany(
  kv: KVNamespace,
  entries: readonly KvPutEntry[]
): Promise<void> {
  if (entries.length === 0) return;
  await Promise.all(
    entries.map((entry) => kv.put(entry.key, entry.value, entry.options))
  );
}

/**
 * Helper function to convert Headers to a plain object
 * @param headers - The Headers object to convert
 * @returns Plain object representation of headers
 */
export function headersToObject(
  headers: Headers | null | undefined
): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) return result;

  // Safely iterate through headers
  try {
    headers.forEach((value, key) => {
      result[key] = value;
    });
  } catch (error) {
    console.error(
      `Error converting headers to object: ${toError(error, "Unknown error")}`
    );
  }

  return result;
}
