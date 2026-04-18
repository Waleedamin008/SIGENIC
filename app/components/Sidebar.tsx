"use client";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, LayoutDashboard, TicketCheck, BookOpen, Calculator, ClipboardList, LogOut, Cpu } from "lucide-react";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "support", label: "Support & Tickets", icon: TicketCheck },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  { id: "calculator", label: "ROI Calculator", icon: Calculator },
  { id: "service", label: "Service Requests", icon: ClipboardList },
];

interface SidebarProps {
  active: string;
  onNav: (id: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ active, onNav, onLogout }: SidebarProps) {
  const { theme, toggle } = useTheme();

  return (
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: "var(--accent)", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Cpu size={16} color="#050a14" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.05em" }}>SIGENIC</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Partner Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 12px", flex: 1 }}>
        <div style={{ marginBottom: 4, padding: "4px 12px", fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Navigation</div>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`sidebar-link ${active === id ? "active" : ""}`}
            style={{ width: "100%", background: "none", border: "1px solid transparent", marginBottom: 2 }}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px", borderTop: "1px solid var(--border)" }}>
        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: "var(--accent-glow)",
            border: "1px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", fontWeight: 700,
          }}>AK</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>Alex Kim</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Engineer</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={toggle} className="btn-ghost" style={{ flex: 1, padding: "8px", justifyContent: "center" }}>
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          <button onClick={onLogout} className="btn-ghost" style={{ flex: 1, padding: "8px", justifyContent: "center" }}>
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
