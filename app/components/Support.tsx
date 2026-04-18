"use client";
import { useState } from "react";
import { Plus, Filter, Search, ChevronRight } from "lucide-react";

const TICKETS = [
  { id: "TK-2041", title: "CMP tool pressure anomaly — Fab 2 Line B", category: "Bug / Issue", area: "CMP", priority: "high", status: "progress", updated: "2h ago", assignee: "S. Tanaka" },
  { id: "TK-2040", title: "Zendesk sync delay on excursion alerts", category: "General Support", area: "Integrations", priority: "medium", status: "open", updated: "4h ago", assignee: "Unassigned" },
  { id: "TK-2039", title: "ROI calculator export not working in Safari", category: "Bug / Issue", area: "Portal", priority: "low", status: "resolved", updated: "6h ago", assignee: "A. Park" },
  { id: "TK-2038", title: "Litho tool defect rate above threshold — urgent review", category: "Bug / Issue", area: "Lithography", priority: "high", status: "resolved", updated: "1d ago", assignee: "S. Tanaka" },
  { id: "TK-2037", title: "Feature request: bulk ticket export to CSV", category: "Feature Request", area: "Portal", priority: "low", status: "open", updated: "2d ago", assignee: "Unassigned" },
  { id: "TK-2036", title: "Etch tool throughput inconsistency reported by Fab 3", category: "Bug / Issue", area: "Etch", priority: "medium", status: "progress", updated: "2d ago", assignee: "R. Chowdhury" },
];

const STATUSES = ["All", "Open", "In Progress", "Resolved"];

export default function Support() {
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Bug / Issue", area: "Lithography", priority: "medium", desc: "" });
  const [submitted, setSubmitted] = useState(false);

  const filtered = filter === "All" ? TICKETS : TICKETS.filter(t =>
    filter === "Open" ? t.status === "open" :
    filter === "In Progress" ? t.status === "progress" :
    t.status === "resolved"
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowForm(false); setSubmitted(false); }, 2000);
  }

  return (
    <div style={{ padding: "28px", maxWidth: 1100 }}>
      {/* Header */}
      <div className="animate-fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Support & Ticketing</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Powered by Zendesk · {TICKETS.length} total tickets</p>
        </div>
        <button className="btn-accent" onClick={() => setShowForm(!showForm)}>
          <Plus size={12} />
          Submit Ticket
        </button>
      </div>

      {/* New Ticket Form */}
      {showForm && (
        <div className="card animate-fade-up" style={{ padding: "24px", marginBottom: 24, borderColor: "rgba(0,212,255,0.3)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em", marginBottom: 16 }}>NEW TICKET</div>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
              <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent-green)", fontSize: 12 }}>Ticket submitted to Zendesk · TK-2042 created</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Category</label>
                  <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option>Bug / Issue</option>
                    <option>General Support</option>
                    <option>Feature Request</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Product Area</label>
                  <select className="input-field" value={form.area} onChange={e => setForm({...form, area: e.target.value})}>
                    <option>Lithography</option>
                    <option>Etch</option>
                    <option>CMP</option>
                    <option>Integrations</option>
                    <option>Portal</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Priority</label>
                  <select className="input-field" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Title</label>
                <input className="input-field" placeholder="Briefly describe the issue..." value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Description</label>
                <textarea className="input-field" placeholder="Provide detailed context, steps to reproduce, impact..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} rows={3} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" className="btn-accent">Submit to Zendesk</button>
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="animate-fade-up s2" style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: "6px 14px",
            borderRadius: 4,
            border: "1px solid",
            borderColor: filter === s ? "var(--accent)" : "var(--border)",
            background: filter === s ? "rgba(0,212,255,0.08)" : "transparent",
            color: filter === s ? "var(--accent)" : "var(--text-secondary)",
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em",
            cursor: "pointer", textTransform: "uppercase",
            transition: "all 0.15s",
          }}>{s}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", alignSelf: "center" }}>
            {filtered.length} tickets
          </span>
        </div>
      </div>

      {/* Ticket list */}
      <div className="card animate-fade-up s3">
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 130px 90px 90px 100px 80px 24px", padding: "10px 16px", borderBottom: "1px solid var(--border)" }}>
          {["ID", "Title", "Category", "Area", "Priority", "Status", "Updated", ""].map(h => (
            <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>
        {filtered.map((t, i) => (
          <div key={t.id} className={`table-row animate-fade-up s${i + 1}`}
            style={{ gridTemplateColumns: "80px 1fr 130px 90px 90px 100px 80px 24px", cursor: "pointer" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{t.id}</span>
            <span style={{ fontSize: 13, color: "var(--text-primary)", paddingRight: 8 }}>{t.title}</span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{t.category}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.area}</span>
            <span className={`badge badge-${t.priority}`}>{t.priority}</span>
            <span className={`badge badge-${t.status}`}>{t.status === "progress" ? "In Progress" : t.status}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>{t.updated}</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        ))}
      </div>

      {/* Zendesk note */}
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(0,212,255,0.04)", borderRadius: 6, border: "1px solid rgba(0,212,255,0.15)" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
          Zendesk sync: <span style={{ color: "var(--accent-green)" }}>ACTIVE</span> · Last synced 14s ago · All tickets mirrored
        </span>
      </div>
    </div>
  );
}
