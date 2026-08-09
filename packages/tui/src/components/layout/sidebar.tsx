/**
 * Copyright (c) 2026 HOOX · HOOX · jango-blockchained (hoox-sh)
 * SPDX-License-Identifier: Apache-2.0
 */

/** @jsxImportSource @opentui/react */

import { Colors, useUIStore } from "@hoox-sh/hoox-shared";
import { SIDEBAR_ITEMS } from "../../view-registry";
import { CoolBrackets, CoolGlyph } from "../shared/cool-brackets";

/** Fixed sidebar width (columns). */
export const SIDEBAR_WIDTH = 24;

/**
 * Sidebar — left navigation panel with view links.
 * Items and shortcut hints come from the view registry (single source of truth).
 */
export function Sidebar() {
  const activeView = useUIStore((s) => s.activeView);
  const sidebarExpanded = useUIStore((s) => s.sidebarExpanded);
  const setView = useUIStore((s) => s.setView);

  if (!sidebarExpanded) return null;

  return (
    <box
      flexDirection="column"
      width={SIDEBAR_WIDTH}
      padding={1}
      gap={0}
      border={true}
      borderStyle="single"
      borderColor={Colors.border}
      backgroundColor={Colors.card}
    >
      {/* Brand header — static accent brackets */}
      <CoolBrackets open="┌" close="┐" gap={1}>
        <text fg={Colors.foreground} bold>
          HOOX
        </text>
      </CoolBrackets>
      <text fg={Colors.dim}>─────────────────</text>

      {/* Navigation items (registry order) */}
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = item.id === activeView;
        return (
          <box flexDirection="row" gap={1} key={item.id}>
            {isActive ? <CoolGlyph char="▸" /> : <text fg={Colors.dim}> </text>}
            <text
              fg={isActive ? Colors.accent : Colors.muted}
              bold={isActive}
              onMouseUp={() => setView(item.id)}
            >
              {item.label}
            </text>
          </box>
        );
      })}

      {/* Shortcut hints — digits are Ctrl; letter chords are Ctrl+Alt */}
      <box flexGrow={1} />
      <text fg={Colors.dim} dim>
        Ctrl+0-9 · Ctrl+Alt+…
      </text>
    </box>
  );
}
