"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SIDENAV, OTHERNAV } from "../lib/data";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function Sidebar({ collapsed, setCollapsed, activeNav, setActiveNav, showToast }: SidebarProps) {
  return (
    <aside 
      className={`sb ${collapsed ? "c" : ""}`} 
      aria-label="Main navigation"
      // Force the outer container to let the button bleed over the edge
      style={{ overflow: "visible", position: "relative", zIndex: 10 }}
    >
      {/* Inner wrapper to contain the content and hide it when collapsing */}
      <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        
        <div className="sb-logo" onClick={() => setCollapsed((v) => !v)} role="button" tabIndex={0} aria-label="Toggle sidebar">
          <div className="sb-gem">B</div>
          <span className="sb-wordmark">Bitscale</span>
        </div>

        <div className="sb-ws" role="button">
          <div className="sb-ws-av">S</div>
          <span className="sb-ws-name">GTM Spaces</span>
          <ChevronDown size={14} className="sb-ws-ch" />
        </div>

        <nav className="sb-nav" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {SIDENAV.map((item) => (
            <div key={item.id} className={`sb-ni ${activeNav === item.id ? "act" : ""}`}
              onClick={() => { setActiveNav(item.id); showToast(`📌 ${item.label}`); }}
              role="button" tabIndex={0} aria-current={activeNav === item.id ? "page" : undefined}
            >
              <span className="sb-ni-ic"><item.Icon size={16} /></span>
              <span className="sb-ni-lbl">{item.label}</span>
              {item.badge && <span className="sb-ni-bdg">{item.badge}</span>}
            </div>
          ))}
          <div className="sb-nav-sec">Other</div>
          {OTHERNAV.map((item) => (
            <div key={item.id} className={`sb-ni ${activeNav === item.id ? "act" : ""}`}
              onClick={() => { setActiveNav(item.id); showToast(`📌 ${item.label}`); }}
              role="button" tabIndex={0}
            >
              <span className="sb-ni-ic"><item.Icon size={16} /></span>
              <span className="sb-ni-lbl">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sb-foot">
          <div className="sb-gem" style={{ width: 24, height: 24, fontSize: 11, borderRadius: 7, flexShrink: 0 }}>S</div>
          <div className="sb-foot-txt">
            <div className="sb-foot-title">Sunit Pal</div>
            <div className="sb-foot-sub">Get Support at Bitscale</div>
          </div>
        </div>

      </div>

      {/* Button placed OUTSIDE the hidden overflow wrapper */}
      <button 
        className="sb-colbtn" 
        onClick={() => setCollapsed((v) => !v)} 
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronRight size={11} style={{ transform: "rotate(180deg)" }} />}
      </button>
    </aside>
  );
}