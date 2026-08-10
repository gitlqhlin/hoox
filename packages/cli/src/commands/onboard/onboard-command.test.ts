/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, mock, beforeAll, afterEach } from "bun:test";
import { Command } from "commander";
import { SetupService } from "../../services/setup/index.js";

const runInitMock = mock(
  async (
    _opts: unknown,
    _fmt: unknown,
    _nonInteractive: boolean
  ): Promise<void> => {}
);

// Hoist mock before onboard-command binds runInitCommand
mock.module("../init/init-command.js", () => ({
  runInitCommand: runInitMock,
  registerInitCommand: () => {},
  // Stub the repo-root guard so onboard tests focus on setup/init flow.
  verifyRepoRoot: async () => {},
}));

const { registerOnboardCommand } = await import("./onboard-command.js");

describe("registerOnboardCommand", () => {
  const origRun = SetupService.prototype.runAll;
  const origAuth = SetupService.prototype.checkAuth;
  let runAll: ReturnType<typeof mock>;
  let checkAuth: ReturnType<typeof mock>;

  beforeAll(() => {
    // ensure module mock is installed
  });

  afterEach(() => {
    runInitMock.mockClear();
    SetupService.prototype.runAll = origRun;
    SetupService.prototype.checkAuth = origAuth;
    process.exitCode = 0;
    delete process.env.CLOUDFLARE_API_TOKEN;
    delete process.env.CLOUDFLARE_ACCOUNT_ID;
  });

  function mockSetup(
    runAllImpl?: () => Promise<{
      success: boolean;
      steps: Array<{ step: string; success: boolean; message: string }>;
      secrets: unknown[];
    }>,
    authOk = true
  ): void {
    runAll = mock(
      runAllImpl ??
        (() =>
          Promise.resolve({
            success: true,
            steps: [{ step: "keys", success: true, message: "ok" }],
            secrets: [],
          }))
    );
    checkAuth = mock(async () => authOk);
    SetupService.prototype.runAll = runAll as typeof origRun;
    SetupService.prototype.checkAuth = checkAuth as typeof origAuth;
  }

  it("registers onboard with init + setup flags and aliases", () => {
    const program = new Command();
    registerOnboardCommand(program);
    const onboard = program.commands.find((c) => c.name() === "onboard");
    expect(onboard).toBeDefined();
    expect(onboard!.aliases()).toEqual(
      expect.arrayContaining(["bootstrap", "quickstart"])
    );
    const optNames = onboard!.options.map((o) => o.long).filter(Boolean);
    expect(optNames).toContain("--token");
    expect(optNames).toContain("--account");
    expect(optNames).toContain("--skip-keys");
    expect(optNames).toContain("--skip-db");
    expect(optNames).toContain("--skip-secrets");
    expect(optNames).toContain("--skip-dashboard");
    expect(optNames).toContain("--resume");
  });

  it("chains runInitCommand then SetupService.runAll with skip flags", async () => {
    mockSetup();

    const program = new Command();
    program.exitOverride();
    program.option("--json");
    program.option("--quiet");
    program.option("-y, --yes");
    registerOnboardCommand(program);

    await program.parseAsync(
      [
        "onboard",
        "--token",
        "cfut_test",
        "--account",
        "acct_test",
        "--skip-dashboard",
        "--skip-db",
        "--quiet",
      ],
      { from: "user" }
    );

    expect(runInitMock).toHaveBeenCalledTimes(1);
    const [opts, , nonInteractive] = runInitMock.mock.calls[0] as [
      Record<string, unknown>,
      unknown,
      boolean,
    ];
    expect(nonInteractive).toBe(true);
    expect(opts.token).toBe("cfut_test");
    expect(opts.account).toBe("acct_test");
    expect(checkAuth).toHaveBeenCalledTimes(1);
    expect(runAll).toHaveBeenCalledTimes(1);
    const setupOpts = (
      runAll.mock.calls as unknown as Array<[Record<string, unknown>]>
    )[0][0];
    expect(setupOpts.skipDashboard).toBe(true);
    expect(setupOpts.skipDb).toBe(true);
    // Token/account mirrored into env for setup
    expect(process.env.CLOUDFLARE_API_TOKEN).toBe("cfut_test");
    expect(process.env.CLOUDFLARE_ACCOUNT_ID).toBe("acct_test");
  });

  it("does not run setup when init sets a non-zero exitCode", async () => {
    runInitMock.mockImplementationOnce(async () => {
      process.exitCode = 1;
    });
    mockSetup();

    const program = new Command();
    program.exitOverride();
    program.option("--json");
    program.option("--quiet");
    program.option("-y, --yes");
    registerOnboardCommand(program);

    await program.parseAsync(
      ["onboard", "--token", "t", "--account", "a", "--quiet"],
      { from: "user" }
    );

    expect(runInitMock).toHaveBeenCalledTimes(1);
    expect(checkAuth).not.toHaveBeenCalled();
    expect(runAll).not.toHaveBeenCalled();
    expect(process.exitCode).toBe(1);
  });

  it("aborts setup when Cloudflare auth check fails", async () => {
    mockSetup(undefined, false);

    const program = new Command();
    program.exitOverride();
    program.option("--json");
    program.option("--quiet");
    program.option("-y, --yes");
    registerOnboardCommand(program);

    await program.parseAsync(
      ["onboard", "--token", "t", "--account", "a", "--quiet"],
      { from: "user" }
    );

    expect(checkAuth).toHaveBeenCalledTimes(1);
    expect(runAll).not.toHaveBeenCalled();
    expect(process.exitCode).toBe(1);
  });

  it("sets exitCode when setup reports failure", async () => {
    mockSetup(() =>
      Promise.resolve({
        success: false,
        steps: [{ step: "secrets", success: false, message: "boom" }],
        secrets: [],
      })
    );

    process.exitCode = 0;
    const program = new Command();
    program.exitOverride();
    program.option("--json");
    program.option("--quiet");
    program.option("-y, --yes");
    registerOnboardCommand(program);

    await program.parseAsync(
      ["onboard", "--token", "t", "--account", "a", "--quiet"],
      { from: "user" }
    );
    expect(process.exitCode).toBe(1);
    expect(runAll).toHaveBeenCalledTimes(1);
  });
});
