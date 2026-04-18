"use client";
import { useState } from "react";
import { Cpu, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const { theme, toggle } = useTheme();
  const [email, setEmail] = useState("alex.kim@fab1.com");
  const [pass, setPass] = useState("••••••••");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(onLogin, 1200);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div className="grid-bg" style={{
        position: "absolute", inset: 0, opacity: 0.4,
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute",
        width: 600, height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* Theme toggle */}
      <button onClick={toggle} style={{
        position: "absolute", top: 20, right: 20,
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
        padding: 8, cursor: "pointer", color: "var(--text-secondary)", display: "flex",
      }}>
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      <div style={{ width: 400, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, background: "var(--accent)", borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
            boxShadow: "0 0 30px rgba(0,212,255,0.3)",
          }}>
            <Cpu size={26} color="#050a14" />
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em" }}>SIGENIC</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>
            Partner Portal
          </div>
        </div>

        {/* Card */}
        <div className="card animate-fade-up s2 scanline" style={{ padding: "32px", borderColor: "rgba(0,212,255,0.15)" }}>
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Sign in to your account</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Access your partner dashboard and tools</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Email</label>
              <input className="input-field" type="email" value={email}
                onChange={e => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input className="input-field" type={showPass ? "text" : "password"} value={pass}
                  onChange={e => setPass(e.target.value)} style={{ paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex",
                }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-accent" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, border: "2px solid #050a14", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Authenticating...
                </span>
              ) : (
                <>Sign In <ArrowRight size={13} /></>
              )}
            </button>
          </form>

          <div className="glow-line" style={{ margin: "20px 0" }} />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Access issues? </span>
            <span style={{ fontSize: 11, color: "var(--accent)", cursor: "pointer" }}>Contact support →</span>
          </div>
        </div>

        {/* Footer */}
        <div className="animate-fade-up s4" style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            partner.sigenic.com · v1.0.0 · HTTPS SECURED
          </span>
        </div>
      </div>
    </div>
  );
}
