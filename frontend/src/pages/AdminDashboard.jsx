import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Mail,
  Calendar,
  Activity,
  Download,
  Briefcase,
  RefreshCw,
  ExternalLink,
  Search
} from "lucide-react";
import { apiClient } from "../api/client";
import { getLocalLeads } from "../utils/leadStorage";

/**
 * 28. ADMIN DASHBOARD (/admin)
 * Displays:
 * - Total enquiries
 * - Consultation requests
 * - Health Checkup leads
 * - Lead Magnet leads
 * - Job applications
 * Plus detailed Enquiries table (Name, Email, Phone, Company, Requirement, Date, Status)
 * and Careers applications viewer.
 */
export default function AdminDashboard() {
  const [store, setStore] = useState(() => getLocalLeads());
  const [activeTab, setActiveTab] = useState("enquiries");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSource, setDataSource] = useState("Local + API Sync");
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    const localData = getLocalLeads();
    try {
      const res = await apiClient.get("/admin/dashboard");
      if (res?.data) {
        setStore({
          contacts: res.data.contacts?.length ? res.data.contacts : localData.contacts,
          consultations: res.data.consultations?.length ? res.data.consultations : localData.consultations,
          healthCheckups: res.data.healthCheckups?.length ? res.data.healthCheckups : localData.healthCheckups,
          leadMagnets: res.data.leadMagnets?.length ? res.data.leadMagnets : localData.leadMagnets,
          applications: res.data.applications?.length ? res.data.applications : localData.applications
        });
        setDataSource(res.source === "mongodb" ? "MongoDB Live" : "Express API + Local Sync");
      }
    } catch {
      setStore(localData);
      setDataSource("Browser LocalStorage Sync (Start Backend for API Sync)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const updateEnquiryStatus = (id, newStatus) => {
    setStore((prev) => ({
      ...prev,
      contacts: prev.contacts.map((item) =>
        (item.id || item._id) === id ? { ...item, status: newStatus } : item
      )
    }));
  };

  const metrics = [
    {
      key: "enquiries",
      label: "Total Enquiries",
      count: store.contacts?.length || 0,
      icon: Mail
    },
    {
      key: "consultations",
      label: "Consultation Requests",
      count: store.consultations?.length || 0,
      icon: Calendar
    },
    {
      key: "healthCheckups",
      label: "Health Checkup Leads",
      count: store.healthCheckups?.length || 0,
      icon: Activity
    },
    {
      key: "leadMagnets",
      label: "Lead Magnet Leads",
      count: store.leadMagnets?.length || 0,
      icon: Download
    },
    {
      key: "applications",
      label: "Job Applications",
      count: store.applications?.length || 0,
      icon: Briefcase
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-gold">
            <ShieldCheck className="w-4 h-4" />
            <span>Riyadvi Full-Stack Lead & Talent Console • {dataSource}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-1">
            Admin <span className="text-gold-gradient">Dashboard</span>
          </h1>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          className="px-5 py-2.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold inline-flex items-center gap-2 hover:border-brand-gold self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Sync Records</span>
        </button>
      </div>

      {/* 5 Overview Metric Cards (Section 28) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((m) => {
          const active = activeTab === m.key;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => setActiveTab(m.key)}
              className={`p-5 rounded-3xl text-left transition-all border ${
                active
                  ? "glass-gold border-brand-gold shadow-gold-sm"
                  : "glass-panel border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <m.icon className="w-5 h-5 text-brand-gold" />
                <span className="text-[10px] font-mono uppercase text-zinc-500">View</span>
              </div>
              <p className="text-3xl font-extrabold text-white mt-3">{m.count}</p>
              <p className="text-xs text-zinc-400 mt-1">{m.label}</p>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-panel rounded-2xl p-4 border border-zinc-800">
        <div className="flex flex-wrap gap-2">
          {metrics.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setActiveTab(m.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === m.key
                  ? "bg-gold-gradient text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              {m.label} ({m.count})
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-brand-gold"
          />
        </div>
      </div>

      {/* ENQUIRIES TABLE (Show: Name, Email, Phone, Company, Requirement, Date, Status) */}
      {activeTab === "enquiries" && (
        <div className="glass-panel metallic-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Contact Enquiries</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Showing Name, Email, Phone, Company, Requirement, Date, and Status.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-brand-gold bg-zinc-950/60">
                  <th className="py-3.5 px-5">Name</th>
                  <th className="py-3.5 px-5">Email</th>
                  <th className="py-3.5 px-5">Phone</th>
                  <th className="py-3.5 px-5">Company</th>
                  <th className="py-3.5 px-5">Requirement</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70 text-xs">
                {(store.contacts || [])
                  .filter(
                    (c) =>
                      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => {
                    const rowId = item.id || item._id;
                    const dateStr = item.date || item.createdAt?.split("T")[0] || "2026-10-22";
                    return (
                      <tr key={rowId} className="hover:bg-zinc-900/50">
                        <td className="py-4 px-5 font-semibold text-white">{item.name}</td>
                        <td className="py-4 px-5 text-zinc-300">{item.email}</td>
                        <td className="py-4 px-5 text-zinc-300">{item.phone}</td>
                        <td className="py-4 px-5 text-brand-goldLight">{item.company || "—"}</td>
                        <td className="py-4 px-5 text-zinc-200">{item.requirement}</td>
                        <td className="py-4 px-5 font-mono text-zinc-400">{dateStr}</td>
                        <td className="py-4 px-5">
                          <select
                            value={item.status || "New"}
                            onChange={(e) => updateEnquiryStatus(rowId, e.target.value)}
                            className="px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-semibold focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Contacted">Contacted</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CAREERS APPLICATIONS VIEW */}
      {activeTab === "applications" && (
        <div className="glass-panel metallic-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Submitted Career Applications</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Candidate applications submitted via /careers/:jobSlug.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] font-mono uppercase text-brand-gold bg-zinc-950/60">
                  <th className="py-3.5 px-5">Candidate Name</th>
                  <th className="py-3.5 px-5">Email & Phone</th>
                  <th className="py-3.5 px-5">Position</th>
                  <th className="py-3.5 px-5">Resume / Portfolio</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70 text-xs">
                {(store.applications || []).map((app) => (
                  <tr key={app.id || app._id} className="hover:bg-zinc-900/50">
                    <td className="py-4 px-5 font-semibold text-white">{app.name}</td>
                    <td className="py-4 px-5 text-zinc-300">
                      <div>{app.email}</div>
                      <div className="text-zinc-500">{app.phone}</div>
                    </td>
                    <td className="py-4 px-5 text-brand-goldLight font-medium">{app.position}</td>
                    <td className="py-4 px-5">
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand-gold hover:underline"
                      >
                        <span>Open Resume</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-4 px-5 font-mono text-zinc-400">
                      {app.date || app.createdAt?.split("T")[0] || "2026-10-22"}
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-semibold">
                        {app.status || "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONSULTATIONS, HEALTH CHECKUPS, AND LEAD MAGNETS VIEWS */}
      {(activeTab === "consultations" ||
        activeTab === "healthCheckups" ||
        activeTab === "leadMagnets") && (
        <div className="glass-panel metallic-border rounded-3xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white capitalize">
            {activeTab.replace(/([A-Z])/g, " $1")} Records
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(store[activeTab] || []).map((rec) => (
              <div
                key={rec.id || rec._id}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {rec.businessName || rec.company || rec.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold font-semibold">
                    {rec.score ? `Score: ${rec.score}/100` : rec.status || "New"}
                  </span>
                </div>
                <p className="text-zinc-300">
                  Contact: {rec.contactName || rec.name} • {rec.email} • {rec.phone}
                </p>
                {(rec.serviceInterest || rec.primaryChallenge || rec.challenge) && (
                  <p className="text-brand-goldLight">
                    Focus: {rec.serviceInterest || rec.primaryChallenge || rec.challenge}
                  </p>
                )}
                <p className="text-zinc-500 font-mono">
                  Date: {rec.date || rec.createdAt?.split("T")[0] || "2026-10-22"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
