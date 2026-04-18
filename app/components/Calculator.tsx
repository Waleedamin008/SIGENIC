"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft, BarChart3, Download, Send } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

type Step = "context" | "operational" | "business" | "results";
const STEPS: Step[] = ["context", "operational", "business", "results"];

const DEFAULT = {
  fab: "Fab 1 — Singapore",
  dept: "Lithography",
  process: "28nm Logic",
  tool: "ASML NXT:1980",
  yield: 78,
  defectRate: 4.2,
  throughput: 120,
  scrapRate: 2.8,
  downtime: 6,
  costPerWafer: 2400,
  volume: 5000,
  costExcursion: 180000,
};

function Slider({ label, value, min, max, unit, onChange }: any) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <label style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</label>
        <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{value}{unit}</span>
      </div>
      <input type="range" className="range-slider" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

export default function Calculator() {
  const [step, setStep] = useState<Step>("context");
  const [d, setD] = useState(DEFAULT);
  const si = STEPS.indexOf(step);

  // Compute results
  const yieldImprove = Math.round(((100 - d.yield) * 0.35) * 10) / 10;
  const scrapReduce = Math.round(d.scrapRate * 0.42 * 10) / 10;
  const downtimeReduce = Math.round(d.downtime * 0.38 * 10) / 10;
  const monthlySavings = Math.round((d.costPerWafer * d.volume * (yieldImprove / 100)) / 12);
  const annualSavings = monthlySavings * 12;
  const excursionSavings = Math.round(d.costExcursion * 0.6);

  const gaugeData = [
    { name: "Yield", value: yieldImprove, fill: "var(--accent-green)" },
    { name: "Scrap", value: scrapReduce, fill: "var(--accent)" },
    { name: "Downtime", value: downtimeReduce, fill: "var(--accent-orange)" },
  ];

  const Step0 = () => (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.1em" }}>STEP 1 OF 3 — CONTEXT SELECTION</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { label: "Fab / Site", key: "fab", opts: ["Fab 1 — Singapore", "Fab 2 — Taiwan", "Fab 3 — South Korea"] },
          { label: "Department", key: "dept", opts: ["Lithography", "Etch", "CMP", "Diffusion", "Metrology"] },
          { label: "Process Step", key: "process", opts: ["28nm Logic", "14nm FinFET", "7nm EUV", "3nm GAA"] },
          { label: "Machine / Tool", key: "tool", opts: ["ASML NXT:1980", "ASML NXE:3400", "Lam Versys", "Applied Centura"] },
        ].map(({ label, key, opts }) => (
          <div key={key}>
            <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{label}</label>
            <select className="input-field" value={(d as any)[key]} onChange={e => setD({ ...d, [key]: e.target.value })}>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const Step1 = () => (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.1em" }}>STEP 2 OF 3 — OPERATIONAL INPUTS</div>
      <Slider label="Current Yield" value={d.yield} min={50} max={99} unit="%" onChange={(v: number) => setD({ ...d, yield: v })} />
      <Slider label="Defect Rate" value={d.defectRate} min={0.1} max={15} unit="%" onChange={(v: number) => setD({ ...d, defectRate: v })} />
      <Slider label="Throughput (wafers/hr)" value={d.throughput} min={20} max={300} unit="" onChange={(v: number) => setD({ ...d, throughput: v })} />
      <Slider label="Scrap Rate" value={d.scrapRate} min={0.1} max={10} unit="%" onChange={(v: number) => setD({ ...d, scrapRate: v })} />
      <Slider label="Planned Downtime (%)" value={d.downtime} min={1} max={30} unit="%" onChange={(v: number) => setD({ ...d, downtime: v })} />
    </div>
  );

  const Step2 = () => (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.1em" }}>STEP 3 OF 3 — BUSINESS INPUTS</div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Cost per Wafer (USD)</label>
        <input type="number" className="input-field" value={d.costPerWafer}
          onChange={e => setD({ ...d, costPerWafer: Number(e.target.value) })} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Monthly Volume (wafers)</label>
        <input type="number" className="input-field" value={d.volume}
          onChange={e => setD({ ...d, volume: Number(e.target.value) })} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Cost per Excursion Event (USD)</label>
        <input type="number" className="input-field" value={d.costExcursion}
          onChange={e => setD({ ...d, costExcursion: Number(e.target.value) })} />
      </div>
    </div>
  );

  const Results = () => (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent-green)", marginBottom: 16, letterSpacing: "0.1em" }}>SIMULATION RESULTS — {d.fab}</div>
      {/* Big numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Monthly Savings", value: `$${monthlySavings.toLocaleString()}`, color: "var(--accent-green)" },
          { label: "Annual Savings", value: `$${annualSavings.toLocaleString()}`, color: "var(--accent)" },
          { label: "Excursion Reduction", value: `$${excursionSavings.toLocaleString()}`, color: "var(--accent-orange)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card animate-count" style={{ padding: "16px", textAlign: "center", borderColor: `${color}30` }}>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Impact metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Yield Improvement", value: `+${yieldImprove}%`, color: "var(--accent-green)" },
          { label: "Scrap Reduction", value: `-${scrapReduce}%`, color: "var(--accent)" },
          { label: "Downtime Reduction", value: `-${downtimeReduce}%`, color: "var(--accent-orange)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Config summary */}
      <div className="card" style={{ padding: "14px 16px", marginBottom: 16, background: "rgba(0,212,255,0.03)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.1em" }}>CONFIGURATION</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["Site", d.fab.split("—")[0]],
            ["Tool", d.tool.split(" ")[0] + " " + d.tool.split(" ")[1]],
            ["Process", d.process],
            ["Base Yield", d.yield + "%"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{k}</div>
              <div style={{ fontSize: 12, color: "var(--text-primary)", marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-accent"><Download size={12} /> Export Report</button>
        <button className="btn-ghost"><Send size={12} /> Request Consultation</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "28px", maxWidth: 900 }}>
      <div className="animate-fade-up" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>ROI Score Calculator</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Simulate yield improvement and financial impact before engagement</p>
      </div>

      {/* Step progress */}
      <div className="animate-fade-up s2" style={{ display: "flex", gap: 0, marginBottom: 28 }}>
        {["Context", "Operational", "Business", "Results"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: i <= si ? "var(--accent)" : "var(--bg-card)",
                border: `1px solid ${i <= si ? "var(--accent)" : "var(--border)"}`,
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                color: i <= si ? "#050a14" : "var(--text-muted)",
                transition: "all 0.3s",
              }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: i === si ? "var(--text-primary)" : "var(--text-muted)", fontWeight: i === si ? 600 : 400 }}>{s}</span>
            </div>
            {i < 3 && <div style={{ flex: 1, height: 1, background: i < si ? "var(--accent)" : "var(--border)", margin: "0 12px", transition: "background 0.3s" }} />}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="card animate-fade-up s3" style={{ padding: "28px" }}>
        {step === "context" && <Step0 />}
        {step === "operational" && <Step1 />}
        {step === "business" && <Step2 />}
        {step === "results" && <Results />}

        {/* Nav buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <button className="btn-ghost" onClick={() => setStep(STEPS[si - 1])} disabled={si === 0} style={{ visibility: si === 0 ? "hidden" : "visible" }}>
            <ChevronLeft size={12} /> Back
          </button>
          {step !== "results" ? (
            <button className="btn-accent" onClick={() => setStep(STEPS[si + 1])}>
              {si === 2 ? "Calculate Results" : "Next"} <ChevronRight size={12} />
            </button>
          ) : (
            <button className="btn-ghost" onClick={() => setStep("context")}>
              Run New Simulation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
