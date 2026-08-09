/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

/** @jsxImportSource @opentui/react */
/**
 * React-style error boundary for the TUI.
 * Catches render errors in child views and displays a styled recovery panel
 * with the view name, error message, and a [Retry] button.
 *
 * Colors use Hoox design tokens — no hardcoded hex.
 */
import { Component, type ReactNode } from "react";
import { Colors } from "@hoox-sh/hoox-shared";
import { redactSecretsInText } from "../../services/dev-log";

// ── Types ──────────────────────────────────────────────────────────────────

interface ErrorBoundaryProps {
  /** Name of the view being wrapped (shown in error UI) */
  viewName: string;
  /** Child content to protect */
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** First line of error message, secrets scrubbed, length-capped for chrome. */
export function formatBoundaryErrorMessage(error: Error, maxLen = 160): string {
  const first = (error.message || "Unknown error").split("\n")[0] ?? "";
  const scrubbed = redactSecretsInText(first).trim() || "Unknown error";
  return scrubbed.length > maxLen
    ? `${scrubbed.slice(0, maxLen - 1)}…`
    : scrubbed;
}

// ── Component ──────────────────────────────────────────────────────────────

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  /** Reset error state to retry rendering children */
  private handleRetry = () => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (this.state.error) {
      const message = formatBoundaryErrorMessage(this.state.error);
      return (
        <box
          flexDirection="column"
          padding={2}
          gap={1}
          border={true}
          borderStyle="single"
          borderColor={Colors.border}
          backgroundColor={Colors.card}
        >
          {/* Header: view name + error indicator */}
          <box flexDirection="row" gap={1}>
            <text fg={Colors.error} bold>
              ⚠
            </text>
            <text fg={Colors.error} bold>
              Failed to load {this.props.viewName}
            </text>
          </box>

          {/* Error message (redacted, first line only) */}
          <text fg={Colors.muted}>{message}</text>

          {/* Retry action */}
          <box paddingTop={1}>
            <text
              fg={Colors.accent}
              bg={Colors.card}
              onMouseUp={this.handleRetry}
            >
              {"  [Retry]  "}
            </text>
          </box>
        </box>
      );
    }

    return this.props.children;
  }
}
