"use client";
import { useState } from "react";
import { CheckCircle, Presentation, TrendingUp, Cpu, HelpCircle, ChevronRight } from "lucide-react";

const SERVICE_TYPES = [
  { id: "demo", icon: Presentation, label: "Demo Request", desc: "Schedule a live product walkthrough with our team", time: "1–2 business days" },
  { id: "onboarding", icon: Cpu, label: "Feature Onboarding", desc: "Get guided setup for a new Sigenic module or tool", time: "2–3 business days" },
  { id: "data", icon: TrendingUp, label: "Data Analysis Request", desc: "Request in-depth analysis of your fab process data", time: "3–5 business days" },
  { id: "advisory", icon: HelpCircle, label: "Consulting / Advisory", desc: "Discuss strategy, roadmap, or technical architecture", time: "1–2 business days" },
];

export default function ServiceRequest() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "form" | "done">("select");
  const [form, setForm] = useState({ name: "", email: "", company: "", date: "", notes: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("done");
  }

  const serviceInfo = SERVICE_TYPES.find(s => s.id === selected);

  return (
    <div style={{ padding: "28px", maxWidth: 900 }}>
      <div className="animate-fade-up" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Service Requests</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Structured intake for demos, onboarding, and advisory services</p>
      </div>

      {step === "select" && (
        <>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>Select Request Type</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {SERVICE_TYPES.map(({ id, icon: Icon, label, desc, time }, i) => (
              <button key={id} onClick={() => { setSelected(id); setStep("form"); }}
                className={`card card-hover animate-fade-up s${i + 2}`}
                style={{
                  padding: "20px", textAlign: "left", display: "flex", gap: 14, alignItems: "flex-start", width: "100%",
                  borderColor: selected === id ? "var(--accent)" : undefined,
                  background: "var(--bg-card)",
                }}>
                <div style={{ padding: 10, background: "rgba(0,212,255,0.08)", borderRadius: 8, flexShrink: 0 }}>
                  <Icon size={20} color="var(--accent)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 10 }}>{desc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                      Est. response: {time}
                    </span>
                    <ChevronRight size={13} color="var(--text-muted)" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Recent requests */}
          <div className="card animate-fade-up s6" style={{ marginTop: 24 }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", fontWeight: 600, fontSize: 13 }}>My Recent Requests</div>
            {[
              { type: "Demo Request", status: "resolved", date: "Apr 10, 2026", ref: "SR-0142" },
              { type: "Data Analysis Request", status: "progress", date: "Apr 15, 2026", ref: "SR-0148" },
            ].map(r => (
              <div key={r.ref} className="table-row" style={{ gridTemplateColumns: "80px 1fr 160px 120px" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{r.ref}</span>
                <span style={{ fontSize: 13 }}>{r.type}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</span>
                <span className={`badge badge-${r.status}`}>{r.status === "progress" ? "In Progress" : r.status}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {step === "form" && serviceInfo && (
        <div className="card animate-fade-up" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
            <div style={{ padding: 8, background: "rgba(0,212,255,0.08)", borderRadius: 6 }}>
              <serviceInfo.icon size={16} color="var(--accent)" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{serviceInfo.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Est. response: {serviceInfo.time}</div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Full Name</label>
                <input className="input-field" placeholder="Alex Kim" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Email</label>
                <input type="email" className="input-field" placeholder="alex@fab.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Company / Fab</label>
                <input className="input-field" placeholder="Fab 1 Singapore" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Preferred Date</label>
                <input type="date" className="input-field" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Additional Notes</label>
              <textarea className="input-field" placeholder="Describe what you'd like covered, specific questions, or context..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={4} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" className="btn-accent">Submit Request</button>
              <button type="button" className="btn-ghost" onClick={() => setStep("select")}>Back</button>
            </div>
          </form>
        </div>
      )}

      {step === "done" && (
        <div className="card animate-fade-up" style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,229,160,0.12)", border: "1px solid var(--accent-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle size={24} color="var(--accent-green)" />
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--accent-green)", marginBottom: 8 }}>REQUEST SUBMITTED</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
            Your {serviceInfo?.label} request (SR-0149) has been routed to the Sigenic team.<br />
            You'll receive a confirmation within {serviceInfo?.time}.
          </div>
          <button className="btn-ghost" onClick={() => { setStep("select"); setSelected(null); }}>Submit Another</button>
        </div>
      )}
    </div>
  );
}
