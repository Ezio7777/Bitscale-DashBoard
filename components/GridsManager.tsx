"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Star, ChevronDown, ChevronUp, MoreHorizontal, Pencil, Copy, Share2, ExternalLink, Trash2, List, LayoutGrid, ArrowUpDown } from "lucide-react";
import { INITIAL_GRIDS, SortKey, SortDir } from "../lib/data";
import { Highlight } from "./ui/helper";

/* -- Local Dropdown Component -- */
function RowMenu({ name, onClose }: { name: string; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const actions = [
    { Icon: Pencil, label: "Rename", color: "var(--actnbtn-hc)" },
    { Icon: Copy, label: "Duplicate", color: "var(--actnbtn-hc)" },
    { Icon: Share2, label: "Share", color: "var(--actnbtn-hc)" },
    { Icon: ExternalLink, label: "Open in new tab", color: "var(--actnbtn-hc)" },
    { Icon: Trash2, label: "Delete", color: "#EF4444" },
  ];

  return (
    <div ref={menuRef} style={{ position: "absolute", right: 8, top: "100%", zIndex: 50, marginTop: 4, background: "var(--card-bg)", border: "1.5px solid var(--card-border)", borderRadius: 10, overflow: "hidden", minWidth: 170, boxShadow: "0 8px 32px rgba(0,0,0,.18)", animation: "scaleIn .15s ease" }}>
      {actions.map(({ Icon, label, color }) => (
        <button key={label} onClick={() => onClose()} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color, fontFamily: "inherit", transition: "background .12s", textAlign: "left" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--acc-hover)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  );
}

/* -- Local Grid Card Component -- */
function GridCard({ g, onStar }: { g: typeof INITIAL_GRIDS[0]; onStar: (id: number) => void }) {
  return (
    <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--card-border)", borderRadius: 12, padding: "16px", cursor: "pointer", transition: "all .2s", boxShadow: "var(--card-shadow)" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.12)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--card-shadow)"; }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: g.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>{g.sym}</div>
        <button onClick={(e) => { e.stopPropagation(); onStar(g.id); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
          <Star size={15} fill={g.starred ? "#F59E0B" : "none"} color={g.starred ? "#F59E0B" : "var(--rexpand-color)"} />
        </button>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--rname-color)", marginBottom: 5, lineHeight: 1.35 }}>{g.name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--date-color)" }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: g.ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "white" }}>{g.ini}</div>
        {g.by} · {g.dateStr}
      </div>
    </div>
  );
}

/* -- Main Component -- */
export default function GridsManager({ showToast }: { showToast: (msg: string) => void }) {
  const [grids, setGrids] = useState(INITIAL_GRIDS);
  const [tab, setTab] = useState<"grids" | "starred">("grids");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const toggleStar = (id: number) => {
    setGrids((prev) => prev.map((g) => {
      if (g.id !== id) return g;
      showToast(g.starred ? "Removed from starred" : `⭐ Starred: ${g.name.slice(0, 26)}…`);
      return { ...g, starred: !g.starred };
    }));
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let rows = grids.filter((g) =>
      tab === "starred" ? g.starred : g.name.toLowerCase().includes(search.toLowerCase()) || g.by.toLowerCase().includes(search.toLowerCase())
    );
    rows = [...rows].sort((a, b) => {
      const va = sortKey === "date" ? a.date : sortKey === "by" ? a.by : a.name;
      const vb = sortKey === "date" ? b.date : sortKey === "by" ? b.by : b.name;
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return rows;
  }, [grids, tab, search, sortKey, sortDir]);

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ArrowUpDown size={11} style={{ opacity: 0.35 }} />;
    return sortDir === "asc" ? <ChevronUp size={11} style={{ color: "#22C55E" }} /> : <ChevronDown size={11} style={{ color: "#22C55E" }} />;
  }

  return (
    <div className="grids">
      <div className="grids-hdr">
        <div className="tabs">
          <button className={`tab ${tab === "grids" ? "on" : ""}`} onClick={() => setTab("grids")}>My Grids</button>
          <button className={`tab ${tab === "starred" ? "on" : ""}`} onClick={() => setTab("starred")}>
            Starred{tab === "starred" && ` (${grids.filter((g) => g.starred).length})`}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <div className="sbox">
            <Search size={14} color="#9CA3AF" />
            <input placeholder="Search grids and workbooks..." value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search grids" />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 13, lineHeight: 1, padding: 0 }} aria-label="Clear search">✕</button>
            )}
          </div>

          <button className={`vbtn ${viewMode === "list" ? "on" : ""}`} onClick={() => setViewMode("list")} title="List view" style={{ background: viewMode === "list" ? "var(--tab-active-bg)" : undefined, color: viewMode === "list" ? "var(--tab-active-color)" : undefined }}>
            <List size={16} />
          </button>
          <button className={`vbtn ${viewMode === "grid" ? "on" : ""}`} onClick={() => setViewMode("grid")} title="Grid view" style={{ background: viewMode === "grid" ? "var(--tab-active-bg)" : undefined, color: viewMode === "grid" ? "var(--tab-active-color)" : undefined }}>
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, padding: 16, maxHeight: 420, overflowY: "auto" }}>
          {filtered.map((g) => <GridCard key={g.id} g={g} onStar={toggleStar} />)}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: "32px 0", textAlign: "center", color: "var(--sub-color)", fontSize: 13 }}>
              {search ? `No results for "${search}"` : "No starred grids yet"}
            </div>
          )}
        </div>
      ) : (
        <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: 420 }}>
          <table className="tbl" role="grid" aria-label="Grids and workbooks">
            <thead>
              <tr>
                <th scope="col"><button onClick={() => handleSort("name")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "inherit", fontWeight: "inherit", color: "inherit", padding: 0 }}>NAME <SortIcon k="name" /></button></th>
                <th scope="col"><button onClick={() => handleSort("by")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "inherit", fontWeight: "inherit", color: "inherit", padding: 0 }}>EDITED BY <SortIcon k="by" /></button></th>
                <th scope="col"><button onClick={() => handleSort("date")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "inherit", fontWeight: "inherit", color: "inherit", padding: 0 }}>LAST EDITED <SortIcon k="date" /></button></th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, idx) => (
                <tr key={g.id} className="tr" style={{ animationDelay: `${idx * 0.04}s` }}>
                  <td>
                    <div className="namecell">
                      {g.parent && <span className="rexpand"><ChevronDown size={13} /></span>}
                      <button className={`starBtn ${g.starred ? "lit" : ""}`} onClick={() => toggleStar(g.id)}><Star size={14} fill={g.starred ? "#F59E0B" : "none"} /></button>
                      <div className="type-badge" style={{ background: g.color }}>{g.sym}</div>
                      <span className="rname"><Highlight text={g.name} query={search} /></span>
                    </div>
                  </td>
                  <td>
                    <div className="editcell"><div className="editav" style={{ background: g.ac }}>{g.ini}</div>{g.by}</div>
                  </td>
                  <td><span className="datecell">{g.dateStr}</span></td>
                  <td style={{ position: "relative" }}>
                    <button className="actnbtn" onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === g.id ? null : g.id); }}><MoreHorizontal size={16} /></button>
                    {openMenu === g.id && <RowMenu name={g.name} onClose={() => setOpenMenu(null)} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}