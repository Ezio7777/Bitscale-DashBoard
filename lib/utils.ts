import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GridTag, TagMeta } from "@/types";

// ─── Tailwind class merger ─────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Avatar color palette ─────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#7c6af7",
  "#4f8ef0",
  "#22c97b",
  "#f5a623",
  "#f04f4f",
  "#e879f9",
  "#06b6d4",
  "#f97316",
];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Tag metadata ─────────────────────────────────────────────────────────────
export const TAG_META: Record<GridTag, TagMeta> = {
  wbk: { label: "WBK", className: "tag-blue" },
  li: { label: "LI", className: "tag-blue" },
  g: { label: "G", className: "tag-green" },
  sn: { label: "SN", className: "tag-purple" },
  fc: { label: "FC", className: "tag-green" },
  ic: { label: "CSV", className: "tag-amber" },
  fp: { label: "FP", className: "tag-purple" },
  gm: { label: "GM", className: "tag-red" },
  gs: { label: "GS", className: "tag-blue" },
  fa: { label: "FA", className: "tag-amber" },
  hs: { label: "HS", className: "tag-red" },
};

// ─── Format numbers ───────────────────────────────────────────────────────────
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
