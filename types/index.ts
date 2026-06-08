// ─── Grid / Workbook Types ────────────────────────────────────────────────────

export type GridTag =
  | "wbk"
  | "li"
  | "g"
  | "sn"
  | "fc"
  | "ic"
  | "fp"
  | "gm"
  | "gs"
  | "fa"
  | "hs";

export interface GridItem {
  id: string;
  name: string;
  icon: string;
  tags: GridTag[];
  user: string;
  userAvatar?: string;
  date: string;
  starred: boolean;
  expanded?: boolean;
  children?: GridItem[];
}

// ─── User / Workspace ─────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  color: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: "Free" | "Booster" | "Enterprise";
  creditsUsed: number;
  creditsTotal: number;
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

export interface OnboardingTask {
  id: string;
  label: string;
  completed: boolean;
}

// ─── Find People Filters ──────────────────────────────────────────────────────

export interface FindPeopleFilters {
  keyword: string;
  jobTitle: string;
  companyWebsite: string;
  personLocation: string;
  companyLocation: string;
  companyHeadcount: string;
  managementLevel: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  section?: "main" | "other";
}

// ─── Toast ────────────────────────────────────────────────────────────────────

export interface Toast {
  id: string;
  icon: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

// ─── Tag Meta ─────────────────────────────────────────────────────────────────

export interface TagMeta {
  label: string;
  className: string;
}
