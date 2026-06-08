"use client";
import { Zap, Sun, Moon } from "lucide-react";
import { CountUp } from "./helper";

interface TopbarProps {
  dark: boolean;
  setDark: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Topbar({ dark, setDark }: TopbarProps) {
  return (
    <header className="topbar" style={{ justifyContent: "flex-end" }}>
      <div className="t-usage" title="Credits used this month">
        <div className="t-udot" />
        <Zap size={12} style={{ opacity: 0.8 }} />
        <CountUp end={450000} />&thinsp;/&thinsp;5,500,000
      </div>

      <div className="t-plan">Booster Plan</div>

      <button
        onClick={() => setDark((d) => !d)}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
        style={{
          width: 30, height: 30, borderRadius: 9, border: "none", cursor: "pointer", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: dark ? "linear-gradient(135deg,#22C55E,#16A34A)" : "rgba(0,0,0,.08)",
          boxShadow: dark ? "0 2px 10px rgba(34,197,94,.4)" : "none",
          transition: "all .3s",
        }}
      >
        {dark ? <Sun size={16} color="white" /> : <Moon size={16} color="#374151" />}
      </button>

      <div className="t-av" title="Sunit Pal" role="button">S</div>
    </header>
  );
}