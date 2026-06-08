"use client";
import { useState, useEffect } from "react";

export function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: "rgba(34,197,94,.22)", color: "inherit", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  );
}

const FULL = "Welcome back, Sunit Pal!";
const SPLIT = 14; 

export function TypeWriter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n < FULL.length) {
      const t = setTimeout(() => setN((v) => v + 1), 52);
      return () => clearTimeout(t);
    }
  }, [n]);
  
  const pre = FULL.slice(0, Math.min(n, SPLIT));
  const post = n > SPLIT ? FULL.slice(SPLIT, n) : "";
  const done = n >= FULL.length;
  
  return (
    <span>
      {pre}
      {post && <em style={{ color: "#22C55E", fontStyle: "normal" }}>{post}</em>}
      {!done && <span style={{ display: "inline-block", width: 2, height: "0.85em", background: "#22C55E", marginLeft: 2, verticalAlign: "-0.08em", animation: "blink 1s ease infinite" }} />}
    </span>
  );
}

export function CountUp({ end }: { end: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const dur = 1600, s = performance.now();
    let raf: number;
    const step = (t: number) => {
      const p = Math.min((t - s) / dur, 1);
      setV(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <>{v.toLocaleString()}</>;
}