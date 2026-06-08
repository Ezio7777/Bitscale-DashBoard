"use client";

import { useState, useMemo, useCallback } from "react";
import { GRIDS } from "@/lib/data";
import type { GridItem } from "@/types";

type TabType = "my" | "starred";

export function useGrids() {
  const [grids, setGrids] = useState<GridItem[]>(GRIDS);
  const [activeTab, setActiveTab] = useState<TabType>("my");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGrids = useMemo(() => {
    return grids.filter((g) => {
      if (activeTab === "starred" && !g.starred) return false;
      if (
        searchQuery &&
        !g.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [grids, activeTab, searchQuery]);

  const toggleStar = useCallback((id: string) => {
    setGrids((prev) =>
      prev.map((g) => (g.id === id ? { ...g, starred: !g.starred } : g))
    );
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setGrids((prev) =>
      prev.map((g) => (g.id === id ? { ...g, expanded: !g.expanded } : g))
    );
  }, []);

  const addGrid = useCallback((name: string) => {
    const newGrid: GridItem = {
      id: `grid-${Date.now()}`,
      name,
      icon: "📋",
      tags: [],
      user: "Tim Martin",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      starred: false,
    };
    setGrids((prev) => [newGrid, ...prev]);
  }, []);

  const deleteGrid = useCallback((id: string) => {
    setGrids((prev) => prev.filter((g) => g.id !== id));
  }, []);

  return {
    grids,
    filteredGrids,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toggleStar,
    toggleExpand,
    addGrid,
    deleteGrid,
  };
}
