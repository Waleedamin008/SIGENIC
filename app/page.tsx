"use client";
import { useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import Support from "./components/Support";
import Knowledge from "./components/Knowledge";
import Calculator from "./components/Calculator";
import ServiceRequest from "./components/ServiceRequest";

type Page = "dashboard" | "support" | "knowledge" | "calculator" | "service";

const PAGE_META: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: "Overview", subtitle: "partner.sigenic.com" },
  support: { title: "Support & Tickets", subtitle: "Powered by Zendesk" },
  knowledge: { title: "Knowledge Base", subtitle: "Self-service resources" },
  calculator: { title: "ROI Calculator", subtitle: "Yield impact simulator" },
  service: { title: "Service Requests", subtitle: "Demos & advisory" },
};

function Portal() {
  const [page, setPage] = useState<Page>("dashboard");
  const meta = PAGE_META[page];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={page} onNav={(id) => setPage(id as Page)} onLogout={() => window.location.reload()} />
      <div style={{ marginLeft: 220, flex: 1, minHeight: "100vh", background: "var(--bg-primary)" }}>
        <TopBar title={meta.title} subtitle={meta.subtitle} />
        <main>
          {page === "dashboard" && <Dashboard />}
          {page === "support" && <Support />}
          {page === "knowledge" && <Knowledge />}
          {page === "calculator" && <Calculator />}
          {page === "service" && <ServiceRequest />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);

  return (
    <ThemeProvider>
      {authed ? <Portal /> : <Login onLogin={() => setAuthed(true)} />}
    </ThemeProvider>
  );
}
