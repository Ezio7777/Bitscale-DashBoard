"use client";
import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Lock, Unlock, X, Save, Eye, Users } from "lucide-react";
import { PEOPLE_FILTERS, COMPANY_FILTERS, FAKE_PEOPLE, FAKE_COMPANIES } from "../lib/data";

interface FindModalProps {
  type: "people" | "companies";
  onClose: () => void;
}

export default function FindModal({ type, onClose }: FindModalProps) {
  const [openAcc, setOpenAcc] = useState<Record<string, boolean>>({});
  const [selTags, setSelTags] = useState<Record<string, string[]>>({});
  const [kw, setKw] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof FAKE_PEOPLE | typeof FAKE_COMPANIES | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const filters = type === "people" ? PEOPLE_FILTERS : COMPANY_FILTERS;

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const totalSel = Object.values(selTags).flat().length + (kw ? 1 : 0);

  const handlePreview = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResults(type === "people" ? FAKE_PEOPLE : FAKE_COMPANIES);
    }, 1100);
  };

  const toggleTag = (fid: string, tag: string) =>
    setSelTags((p) => {
      const c = p[fid] || [];
      return { ...p, [fid]: c.includes(tag) ? c.filter((t) => t !== tag) : [...c, tag] };
    });

  const resultData = results as typeof FAKE_PEOPLE & typeof FAKE_COMPANIES;

  return (
    <div className="overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }} role="dialog" aria-modal="true">
      <div className="modal">
        {/* Header */}
        <div className="modal-hdr">
          <span className="modal-title">{type === "companies" ? "🏢 Find Companies" : "🔍 Find People"}</span>
          <div className="modal-acts">
            <button className="ss-btn"><ChevronDown size={12} /> Saved Search</button>
            <div className="usage-chip">
              <Lock size={12} />
              8,000<span style={{ color: "#9CA3AF", fontWeight: 400 }}>&nbsp;/&nbsp;50,000</span>
            </div>
            <span className="ent-notice"><Unlock size={12} />Unlock&nbsp;<strong>100,000</strong>&nbsp;leads with Enterprise Plan*</span>
            <button className="close-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="fpanel">
            <div className="kw-section">
              <div className="f-lbl"><Users size={14} />{type === "people" ? "People" : "Company"} Keyword</div>
              <div className="f-input">
                <Search size={13} color="#9CA3AF" />
                <input placeholder="Enter single keyword here..." value={kw} onChange={(e) => setKw(e.target.value)} aria-label="Keyword" />
              </div>
            </div>

            {filters.map((f) => {
              const cnt = (selTags[f.id] || []).length;
              const open = !!openAcc[f.id];
              return (
                <div key={f.id} className="acc-item">
                  <div className="acc-hdr" onClick={() => setOpenAcc((p) => ({ ...p, [f.id]: !p[f.id] }))} role="button" aria-expanded={open}>
                    <div className="acc-label"><f.Icon size={14} />{f.label}{cnt > 0 && <span className="acc-count">{cnt}</span>}</div>
                    <span className={`acc-chev ${open ? "open" : ""}`}><ChevronDown size={14} /></span>
                  </div>
                  <div className={`acc-body ${open ? "open" : ""}`}>
                    <div className="acc-hint">{f.hint}</div>
                    {f.tags.length > 0 ? (
                      <div className="tag-list">
                        {f.tags.map((tag) => (
                          <span key={tag} className={`ftag ${(selTags[f.id] || []).includes(tag) ? "sel" : ""}`} onClick={() => toggleTag(f.id, tag)} role="button">{tag}</span>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: "0 15px 12px" }}>
                        <div className="f-input">
                          <Search size={12} color="#9CA3AF" />
                          <input placeholder={`Add ${f.label.toLowerCase()}...`} style={{ background: "none", border: "none", outline: "none", fontSize: 12, fontFamily: "inherit", width: "100%", color: "var(--input-color)" }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rpanel">
            <div className="r-hdr">
              {results ? <><strong>{results.length} results</strong> found · {totalSel} filter{totalSel !== 1 ? "s" : ""} applied</> : totalSel > 0 ? <><strong>{totalSel} filter{totalSel !== 1 ? "s" : ""}</strong> applied · Click &quot;Preview Result&quot; to load data</> : "Apply filters or enter a keyword, then click Preview Result"}
            </div>

            <div className="r-cols" style={{ gridTemplateColumns: type === "people" ? "1.8fr 1.4fr 1.4fr 1.8fr 1.4fr" : "1.8fr 1.2fr 1fr 1fr 1fr" }}>
              {type === "people"
                ? ["NAME", "TITLE", "COMPANY", "LINKEDIN", "LOCATION"].map((c) => <div key={c} className="r-col">{c}</div>)
                : ["COMPANY", "DOMAIN", "HEADCOUNT", "LOCATION", "REVENUE"].map((c) => <div key={c} className="r-col">{c}</div>)}
            </div>

            {loading ? (
              <div className="empty-state">
                <div style={{ width: 36, height: 36, border: "3px solid var(--pc-track)", borderTopColor: "#22C55E", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <div style={{ fontSize: 13, color: "var(--sub-color)", marginTop: 8 }}>Searching {type === "people" ? "people" : "companies"}…</div>
              </div>
            ) : results ? (
              <div style={{ flex: 1, overflowY: "auto" }}>
                {type === "people" ? (
                  (resultData as typeof FAKE_PEOPLE).map((p, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.4fr 1.4fr 1.8fr 1.4fr", padding: "10px 16px", borderBottom: "1px solid var(--tr-border)", fontSize: 12.5, cursor: "pointer", transition: "background .12s", animation: `rowIn .3s ease ${i * 0.04}s both` }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--tr-hover)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                      <div style={{ fontWeight: 600, color: "var(--rname-color)" }}>{p.name}</div>
                      <div style={{ color: "var(--edit-color)" }}>{p.title}</div>
                      <div style={{ color: "var(--edit-color)" }}>{p.company}</div>
                      <div style={{ color: "#22C55E", fontSize: 11.5 }}>{p.linkedin}</div>
                      <div style={{ color: "var(--date-color)" }}>{p.loc}</div>
                    </div>
                  ))
                ) : (
                  (resultData as typeof FAKE_COMPANIES).map((c, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr 1fr", padding: "10px 16px", borderBottom: "1px solid var(--tr-border)", fontSize: 12.5, cursor: "pointer", transition: "background .12s", animation: `rowIn .3s ease ${i * 0.04}s both` }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--tr-hover)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                      <div style={{ fontWeight: 600, color: "var(--rname-color)" }}>{c.name}</div>
                      <div style={{ color: "#22C55E", fontSize: 11.5 }}>{c.domain}</div>
                      <div style={{ color: "var(--edit-color)" }}>{c.hc}</div>
                      <div style={{ color: "var(--edit-color)" }}>{c.loc}</div>
                      <div style={{ color: "var(--date-color)", fontWeight: 600 }}>{c.rev}</div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-illus">🔍</div>
                <div className="empty-title">No results yet</div>
                <div className="empty-sub">Apply filters on the left or enter a keyword above, then click Preview Result to see live data.</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-foot">
          <button className="btn btn-ghost" style={{ fontSize: 13 }}><Save size={14} /> Save Search</button>
          <button className="btn btn-primary" style={{ fontSize: 13 }} onClick={handlePreview} disabled={loading}>
            {loading ? <><div style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Searching…</> : <><Eye size={14} /> Preview Result{totalSel > 0 && <span style={{ background: "rgba(255,255,255,.25)", borderRadius: 8, padding: "1px 7px", fontSize: 11, marginLeft: 4 }}>{totalSel}</span>}</>}
          </button>
        </div>
      </div>
    </div>
  );
}