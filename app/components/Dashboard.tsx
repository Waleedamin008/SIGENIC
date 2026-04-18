"use client";
import { TicketCheck, BookOpen, Calculator, TrendingUp, Clock, CheckCircle, AlertCircle, ArrowUp, ArrowDown, Activity, Users, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const ticketTrend = [
  { day: "Mon", open: 4, resolved: 6 },
  { day: "Tue", open: 7, resolved: 5 },
  { day: "Wed", open: 5, resolved: 8 },
  { day: "Thu", open: 3, resolved: 7 },
  { day: "Fri", open: 6, resolved: 9 },
  { day: "Sat", open: 2, resolved: 4 },
  { day: "Sun", open: 1, resolved: 3 },
];

const calcUsage = [
  { month: "Jan", uses: 12 },
  { month: "Feb", uses: 19 },
  { month: "Mar", uses: 28 },
  { month: "Apr", uses: 35 },
];

const RECENT_TICKETS = [
  { id: "TK-2041", title: "CMP tool pressure anomaly — Fab 2 Line B", status: "progress", priority: "high", time: "2h ago" },
  { id: "TK-2040", title: "Zendesk sync delay on excursion alerts", status: "open", priority: "medium", time: "4h ago" },
  { id: "TK-2039", title: "ROI calculator export not working in Safari", status: "resolved", priority: "low", time: "6h ago" },
  { id: "TK-2038", title: "Litho tool defect rate above threshold", status: "resolved", priority: "high", time: "1d ago" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "8px 12px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ fontSize: 12, color: p.color }}>
            {p.name}: <strong>{p.value}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div style={{ padding: "28px", maxWidth: 1100 }}>
      {/* Welcome banner */}
      <div className="animate-fade-up card scanline" style={{
        padding: "20px 24px", marginBottom: 24,
        background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,212,255,0.04) 100%)",
        borderColor: "rgba(0,212,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
            Good morning — Alex Kim
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>
            Partner Operations Center
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
            3 tickets need attention · Knowledge base updated 2h ago
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em" }}>SYSTEM STATUS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", marginTop: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-green)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent-green)" }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}>
            UPTIME: 99.7% · Last 30d
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Open Tickets", value: "12", delta: "+2", up: true, color: "accent", Icon: TicketCheck },
          { label: "Avg Resolution", value: "4.2h", delta: "-18%", up: false, color: "green", Icon: Clock },
          { label: "Self-Service Rate", value: "74%", delta: "+6%", up: false, color: "green", Icon: CheckCircle },
          { label: "Active Partners", value: "48", delta: "+3", up: true, color: "orange", Icon: Users },
        ].map(({ label, value, delta, up, color, Icon }, i) => (
          <div key={label} className={`stat-card animate-fade-up ${color} s${i + 1}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ padding: 8, background: "var(--accent-glow)", borderRadius: 6 }}>
                <Icon size={14} color={`var(--accent${color === "green" ? "-green" : color === "orange" ? "-orange" : ""})`} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, fontFamily: "var(--font-mono)", fontSize: 10 }}
                className={up ? "" : ""} >
                {up ? <ArrowUp size={10} color="var(--accent-orange)" /> : <ArrowDown size={10} color="var(--accent-green)" />}
                <span style={{ color: up ? "var(--accent-orange)" : "var(--accent-green)" }}>{delta}</span>
              </div>
            </div>
            <div className="animate-count" style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Ticket trend */}
        <div className="card animate-fade-up s3" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>Ticket Activity</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Last 7 days</div>
            </div>
            <div className="badge badge-info">This Week</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ticketTrend}>
              <defs>
                <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--accent-green)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="open" name="Open" stroke="var(--accent)" fill="url(#openGrad)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="resolved" name="Resolved" stroke="var(--accent-green)" fill="url(#resolvedGrad)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Calculator usage */}
        <div className="card animate-fade-up s4" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>ROI Calculator Usage</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Monthly sessions</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent-green)" }}>
              <TrendingUp size={11} />
              +25% MoM
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={calcUsage} barSize={32}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="uses" name="Sessions" fill="var(--accent)" radius={[3, 3, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent tickets */}
      <div className="card animate-fade-up s5" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Recent Tickets</div>
          <button className="btn-ghost" style={{ padding: "6px 14px" }}>View All</button>
        </div>
        {RECENT_TICKETS.map((t) => (
          <div key={t.id} className="table-row" style={{ gridTemplateColumns: "90px 1fr 100px 80px 70px" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{t.id}</span>
            <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{t.title}</span>
            <span className={`badge badge-${t.status}`}>{t.status === "progress" ? "In Progress" : t.status}</span>
            <span className={`badge badge-${t.priority}`}>{t.priority}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>{t.time}</span>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { icon: TicketCheck, label: "Submit a Ticket", desc: "Report a bug or get support", color: "var(--accent)" },
          { icon: Calculator, label: "Run ROI Simulation", desc: "Estimate your yield improvements", color: "var(--accent-green)" },
          { icon: Zap, label: "Request a Demo", desc: "Schedule a walkthrough session", color: "var(--accent-orange)" },
        ].map(({ icon: Icon, label, desc, color }, i) => (
          <div key={label} className={`card card-hover animate-fade-up s${i + 6}`} style={{ padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ padding: 8, background: `${color}15`, borderRadius: 6, flexShrink: 0 }}>
              <Icon size={16} color={color} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
