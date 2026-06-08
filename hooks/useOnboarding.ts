"use client";

import { useState, useMemo, useCallback } from "react";
import { ONBOARDING_TASKS } from "@/lib/data";
import type { OnboardingTask } from "@/types";

export function useOnboarding() {
  const [tasks, setTasks] = useState<OnboardingTask[]>(ONBOARDING_TASKS);

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  const progressPercent = useMemo(
    () => Math.round((completedCount / tasks.length) * 100),
    [completedCount, tasks.length]
  );

  const allComplete = completedCount === tasks.length;

  const completeTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  return {
    tasks,
    completedCount,
    progressPercent,
    allComplete,
    completeTask,
    toggleTask,
  };
}
