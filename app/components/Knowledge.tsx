"use client";
import { useState } from "react";
import { Search, BookOpen, ChevronRight, ThumbsUp, Eye, Tag } from "lucide-react";

const ARTICLES = [
  { id: 1, title: "Yield Loss Diagnosis: CMP Pressure Excursions", category: "Troubleshooting", views: 284, helpful: 47, tags: ["CMP", "Yield", "Excursion"], excerpt: "Step-by-step guide for diagnosing and resolving CMP tool pressure anomalies that result in yield loss. Covers threshold definitions, alert interpretation, and escalation paths.", updated: "2d ago" },
  { id: 2, title: "Zendesk Ticket Triage & Priority Classification", category: "SOPs", views: 192, helpful: 38, tags: ["Zendesk", "Support"], excerpt: "Standard operating procedure for classifying incoming support tickets by severity, product area, and customer impact. Includes SLA targets per priority level.", updated: "5d ago" },
  { id: 3, title: "ROI Calculator: Input Guide & Methodology", category: "Best Practices", views: 310, helpful: 61, tags: ["ROI", "Calculator"], excerpt: "How to accurately input process parameters into the Sigenic ROI Calculator for reliable yield improvement estimates. Covers fab-specific configurations.", updated: "1w ago" },
  { id: 4, title: "Lithography Tool Defect Rate Thresholds", category: "Troubleshooting", views: 145, helpful: 29, tags: ["Lithography", "Defect"], excerpt: "Reference guide for acceptable defect rate ranges across supported lithography tools. Includes action triggers and escalation procedures.", updated: "1w ago" },
  { id: 5, title: "Onboarding New Partner Engineers to Sigenic", category: "SOPs", views: 89, helpful: 22, tags: ["Onboarding"], excerpt: "Checklist and timeline for onboarding new engineers to the Sigenic partner portal, tool suite, and escalation workflows.", updated: "2w ago" },
  { id: 6, title: "Excursion Prevention: Best Practices Q1 2026", category: "Best Practices", views: 421, helpful: 78, tags: ["Excursion", "Yield"], excerpt: "Compilation of highest-impact best practices from Q1 partner reviews. Focus on real-time monitoring, threshold calibration, and early alert configuration.", updated: "3w ago" },
];

const CATS = ["All", "Troubleshooting", "SOPs", "Best Practices", "FAQs"];

export default function Knowledge() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = ARTICLES.filter(a =>
    (cat === "All" || a.category === cat) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "28px", maxWidth: 1100 }}>
      <div className="animate-fade-up" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Knowledge Base</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Self-service guides, SOPs, and best practices</p>
      </div>

      {/* Search */}
      <div className="animate-fade-up s2" style={{ position: "relative", marginBottom: 20 }}>
        <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input className="input-field" placeholder="Search guides, SOPs, known issues..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft: 40, fontSize: 14 }} />
      </div>

      {/* Category filters */}
      <div className="animate-fade-up s2" style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "6px 14px", borderRadius: 4, border: "1px solid",
            borderColor: cat === c ? "var(--accent)" : "var(--border)",
            background: cat === c ? "rgba(0,212,255,0.08)" : "transparent",
            color: cat === c ? "var(--accent)" : "var(--text-secondary)",
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em",
            cursor: "pointer", textTransform: "uppercase", transition: "all 0.15s",
          }}>{c}</button>
        ))}
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", alignSelf: "center" }}>
          {filtered.length} articles
        </span>
      </div>

      {/* Featured article */}
      {cat === "All" && !search && (
        <div className="card animate-fade-up s3 scanline" style={{
          padding: "20px 24px", marginBottom: 20,
          background: "linear-gradient(135deg, rgba(0,229,160,0.04), var(--bg-card))",
          borderColor: "rgba(0,229,160,0.2)",
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <div className="badge badge-resolved">Featured</div>
            <div className="badge badge-info">Best Practices</div>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Excursion Prevention: Best Practices Q1 2026</h3>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 14, lineHeight: 1.7 }}>
            Compilation of highest-impact best practices from Q1 partner reviews. Focus on real-time monitoring, threshold calibration, and early alert configuration.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
              <Eye size={11} /> 421 views
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--accent-green)" }}>
              <ThumbsUp size={11} /> 78 found helpful
            </span>
            <button className="btn-accent" style={{ marginLeft: "auto", padding: "7px 16px" }}>Read Article</button>
          </div>
        </div>
      )}

      {/* Article grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {filtered.map((a, i) => (
          <div key={a.id} className={`card card-hover animate-fade-up s${(i % 6) + 3}`} style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div className="badge badge-info" style={{ fontSize: 9 }}>{a.category}</div>
              <span className="mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{a.updated}</span>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h3>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>{a.excerpt}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
              {a.tags.map(t => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 3, padding: "2px 7px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 3, fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  <Tag size={8} /> {t}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                <Eye size={10} /> {a.views}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                <ThumbsUp size={10} /> {a.helpful}
              </span>
              <button style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "var(--accent)", fontSize: 11, fontFamily: "var(--font-mono)", cursor: "pointer", letterSpacing: "0.06em" }}>
                Read <ChevronRight size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px", color: "var(--text-muted)" }}>
          <BookOpen size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>No articles match your search</div>
        </div>
      )}
    </div>
  );
}
