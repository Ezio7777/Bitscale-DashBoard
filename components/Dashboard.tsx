"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Building2, Users, Plus, Play } from "lucide-react";

import { CHECKS } from "../lib/data";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FindModal from "./FindModal";
import GridsManager from "./GridsManager";
import { TypeWriter } from "./helper";

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState<"people" | "companies" | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Dashboard Cards State */
  const [checks, setChecks] = useState(CHECKS);
  const [pgGo, setPgGo] = useState(false);
  const [dot, setDot] = useState(0);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => { const t = setTimeout(() => setPgGo(true), 700); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setInterval(() => setDot((d) => (d + 1) % 4), 3500); return () => clearInterval(t); }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const toggleCheck = useCallback((label: string) => {
    setChecks((prev) => prev.map((c) => {
      if (c.label !== label) return c;
      if (!c.done) showToast(`✅ Completed: ${label}`);
      return { ...c, done: !c.done };
    }));
  }, [showToast]);

  const completedCount = checks.filter((c) => c.done).length;
  const progressPct = Math.round((completedCount / checks.length) * 100);

  return (
    <div className={dark ? "dark" : ""} style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--app-bg)", transition: "background .3s" }}>
      <div className="dark-orbs" aria-hidden="true">
        <div className="orb orb1" />
        <div className="orb orb2" />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeNav={activeNav} setActiveNav={setActiveNav} showToast={showToast} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, background: "var(--main-bg)", transition: "background .3s, filter .3s, transform .3s", ...(modal ? { filter: "brightness(.97)", transform: "scale(0.988)" } : {}) }}>
        <Topbar dark={dark} setDark={setDark} />

        {/* Note the flex:1 and overflowY: "auto" fixes your previous scrolling issue! */}
        <div className="content" style={{ position: "relative", zIndex: 1, flex: 1, overflowY: "auto" }}>
          
          {/* Welcome Action Bar */}
          <div className="welcome">
            <div>
              <div className="w-title" style={{ fontSize: 28 }}><TypeWriter /></div>
              <div className="w-sub">Here&apos;s your daily scoop on Bitscale!</div>
            </div>
            <div className="w-actions">
              <button className="btn btn-ghost" onClick={() => setModal("companies")}><Building2 size={15} /> Find Companies</button>
              <button className="btn btn-ghost" onClick={() => setModal("people")}><Users size={15} /> Find People</button>
              <button className="btn btn-primary" onClick={() => showToast("✨ New grid created!")}><Plus size={15} /> New Grid</button>
            </div>
          </div>

          {/* Cards Area */}
          <div className="cards">
            <div className="card">
              <div className="lc-hdr">
                <span className="lc-title">Latest from Bitscale</span>
                <div className="dot-row">
                  {[0, 1, 2, 3].map((i) => (
                    <button key={i} className={`carousel-dot ${i === dot ? "on" : ""}`} onClick={() => setDot(i)} aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
              </div>
              <div className="vid-area">
                <div className="vid-thumb" role="button" onClick={() => showToast("▶️ Playing: How to Integrate 2 Way HubSpot")}>
                  <div className="vid-play"><Play size={12} color="#111" fill="#111" /></div>
                </div>
                <div className="vid-info">
                  <h4>How to Integrate 2 Way HubSpot</h4>
                  <p>Prerequisites for this Integration is that you should have a HubSpot account and Copy the API key. We simple add our API key through the integrations pa…</p>
                  <div className="vid-posted">Posted today</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="pc-hdr">
                <div className="pc-ico">📋</div>
                <div>
                  <div className="pc-title">Complete product demo</div>
                  <div className="pc-sub">92% of users nailed BitScale after this walkthrough</div>
                </div>
              </div>
              <div className="pc-bar-area">
                <div className="pc-track">
                  <div className="pc-fill" style={{ width: pgGo ? `${progressPct}%` : 0, transition: "width 1.6s cubic-bezier(.4,0,.2,1)" }} />
                </div>
                <div className="pc-pct">{progressPct}%</div>
              </div>
              <div className="checklist">
                {checks.map((c) => (
                  <div key={c.label} className={`citem ${c.done ? "done" : ""}`} onClick={() => toggleCheck(c.label)}>
                    <div className="ccheck">{c.done && <span className="cmark">✓</span>}</div>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grids / Workbooks Table Component */}
          <GridsManager showToast={showToast} />
        </div>
      </main>

      {modal && <FindModal type={modal} onClose={() => setModal(null)} />}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          <Zap size={13} color="#22C55E" style={{ flexShrink: 0 }} />
          {toast}
        </div>
      )}
    </div>
  );
}