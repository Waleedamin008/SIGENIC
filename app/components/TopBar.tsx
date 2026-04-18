"use client";
import { Bell, Search } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header style={{
      height: 60,
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      padding: "0 28px",
      gap: 16,
      background: "var(--bg-secondary)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>{title}</h1>
          {subtitle && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em" }}>{subtitle}</span>}
        </div>
      </div>
      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 4, padding: "6px 12px", width: 220,
      }}>
        <Search size={12} color="var(--text-muted)" />
        <input placeholder="Search..." style={{
          background: "none", border: "none", outline: "none",
          color: "var(--text-primary)", fontSize: 13, width: "100%",
        }} />
      </div>
      {/* Notif */}
      <div style={{ position: "relative" }}>
        <button style={{ background: "none", border: "1px solid var(--border)", borderRadius: 4, padding: "7px", cursor: "pointer", color: "var(--text-secondary)", display: "flex" }}>
          <Bell size={15} />
        </button>
        <div style={{
          position: "absolute", top: -3, right: -3, width: 8, height: 8,
          background: "var(--accent-red)", borderRadius: "50%", border: "1px solid var(--bg-secondary)",
        }} />
      </div>
      {/* Live indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", letterSpacing: "0.08em" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite" }} />
        LIVE
      </div>
    </header>
  );
}
