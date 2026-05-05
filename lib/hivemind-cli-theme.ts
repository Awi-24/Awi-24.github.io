/**
 * Mirrors packages/tui/src/theme.ts from @awi-24/hivemind-cli
 * (palette + glyphs for the marketing TUI preview).
 */
export const hivemindCliTheme = {
  tagUser: "YOU",
  tagAssistant: "HIVE",
  primary: "#00F0FF",
  accent: "#FF2DFF",
  highlight: "#FFE100",
  ok: "#39FF14",
  err: "#FF003C",
  text: "#E2E2F0",
  textMuted: "#6A6A8A",
  textDim: "#3D3D5C",
  userLabel: "#FFE100",
  userBorder: "#8B7D00",
  userBody: "#F0F0FF",
  assistantLabel: "#00F0FF",
  assistantBorder: "#006B73",
  assistantBody: "#E2E2F0",
  panelBorder: "#3D3D5C",
  panelBorderMuted: "#2A2A4A",
  promptBarBg: "#FFE100",
  promptBarFg: "#0A0A1A",
  promptBarMutedFg: "#4A4A6A",
  scanline: "#1A3A3D",
  glyph: {
    horizontal: "─",
    vertical: "│",
    dot: "·",
    diamond: "◆",
    blockLight: "░",
    circle: "●",
  },
} as const

/** Published CLI version (package.json / README). */
export const HIVEMIND_CLI_VERSION = "0.2.1"
