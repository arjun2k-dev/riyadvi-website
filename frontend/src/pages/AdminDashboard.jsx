import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Mail,
  Calendar,
  Activity,
  Download,
  Briefcase,
  RefreshCw,
  Search,
  PlusCircle,
  Cpu,
  Database,
  CheckCircle2
} from "lucide-react";
import { apiClient } from "../api/client";
import { getLocalLeads } from "../utils/leadStorage";
import { useContent } from "../context/ContentContext";

function formatDate(item) {
  const raw = item?.createdAt || item?.date;
  if (!raw) return "Recent";
  const d = new Date(raw);
  return isNaN(d.getTime()) ? String(raw) : d.toLocaleDateString();
}

export default function AdminDashboard() {
  const { services, portfolio, blogs, careers, refreshContent } = useContent();
  const [store, setStore] = useState(() => ({
    ...getLocalLeads(),
    aiBlueprints: []
  }));
  const [activeTab, setActiveTab] = useState("enquiries");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSource, setDataSource] = useState("Syncing with MongoDB Atlas...");
  const [loading, setLoading] = useState(false);

  // Dynamic CMS state (uses singular "service", "portfolio", "blog", "career" to match backend API)
  const [cmsType, setCmsType] = useState("service");
  const [cmsStatus, setCmsStatus] = useState("");
  const [cmsForm, setCmsForm] = useState({
    title: "",
    slug: "",
    tagline: "",
    industry: "FinTech & Banking",
    category: "AI & Automation",
    department: "Engineering",
    summary: "",
    technologies: "React.js, Three.js, Node.js, MongoDB"
  });

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
          applications: res.data.applications?.length ? res.data.applications : localData.applications,
          aiBlueprints: res.data.aiBlueprints || []
        });
        setDataSource("Connected to MongoDB Atlas REST API");
      }
    } catch {
      setStore({ ...localData, aiBlueprints: [] });
      setDataSource("Local Browser Persistence (Backend Offline Fallback)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handlePublishCmsContent = async (e) => {
    e.preventDefault();
    setCmsStatus("Publishing to MongoDB Atlas...");
    const cleanSlug =
      cmsForm.slug.trim() ||
      cmsForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const techList = cmsForm.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    let payload = {};
    if (cmsType === "service") {
      payload = {
        slug: cleanSlug,
        title: cmsForm.title,
        shortTitle: cmsForm.title,
        tagline: cmsForm.tagline || "Enterprise Digital Engineering Practice",
        visualType: "Interactive 3D Visualizer",
        heroDescription: cmsForm.summary,
        problem: "Organizations struggle with legacy bottlenecks and fragmented user experiences.",
        solution: cmsForm.summary,
        keyFeatures: [
          "Custom Full-Stack React & Node.js Architecture",
          "Interactive 3D WebGL & GSAP Motion System",
          "Cloud Auto-Scaling & MongoDB Integration"
        ],
        techStack: techList
      };
    } else if (cmsType === "portfolio") {
      payload = {
        slug: cleanSlug,
        client: cmsForm.title,
        title: `${cmsForm.title} — Digital Transformation`,
        industry: cmsForm.industry,
        summary: cmsForm.summary,
        challenge: "Client required a modern full-stack, 3D-enabled platform to replace legacy workflows.",
        solution: cmsForm.summary,
        technologies: techList
      };
    } else if (cmsType === "blog") {
      payload = {
        slug: cleanSlug,
        title: cmsForm.title,
        category: cmsForm.category,
        tags: techList,
        excerpt: cmsForm.summary,
        content: [
          cmsForm.summary,
          "Modern digital products require tight integration between 3D spatial interfaces, AI automation, and resilient Node.js + MongoDB backends."
        ]
      };
    } else if (cmsType === "career") {
      payload = {
        jobSlug: cleanSlug,
        title: cmsForm.title,
        department: cmsForm.department,
        designation: cmsForm.tagline || "Senior Engineer",
        experience: "2–5 Years",
        location: "Chennai / Hybrid",
        summary: cmsForm.summary,
        requirements: techList
      };
    }

    try {
      await apiClient.post(`/admin/content/${cmsType}`, payload);
      await refreshContent();
      setCmsStatus(`Published "${cmsForm.title}" to MongoDB! Live route created at /${cmsType === "career" ? "careers" : cmsType === "blog" ? "blog" : cmsType === "service" ? "services" : "portfolio"}/${cleanSlug}`);
      setCmsForm({
        ...cmsForm,
        title: "",
        slug: "",
        tagline: "",
        summary: ""
      });
    } catch (err) {
      setCmsStatus("Error publishing content: " + (err?.message || "Check connection"));
    }
  };

  const kpiCards = [
    {
      id: "enquiries",
      label: "Total Enquiries",
      count: store.contacts?.length || 0,
      icon: Mail,
      desc: "Contact form submissions"
    },
    {
      id: "consultations",
      label: "Consultation & Calendly",
      count: store.consultations?.length || 0,
      icon: Calendar,
      desc: "Strategy & Calendly bookings"
    },
    {
      id: "healthCheckups",
      label: "Health Checkup Leads",
      count: store.healthCheckups?.length || 0,
      icon: Activity,
      desc: "Diagnostic tool completions"
    },
    {
      id: "leadMagnets",
      label: "Lead Magnet Leads",
      count: store.leadMagnets?.length || 0,
      icon: Download,
      desc: "Planning guide downloads"
    },
    {
      id: "applications",
      label: "Job Applications",
      count: store.applications?.length || 0,
      icon: Briefcase,
      desc: "Careers portal candidates"
    },
    {
      id: "aiBlueprints",
      label: "AI Architect Logs",
      count: store.aiBlueprints?.length || 0,
      icon: Cpu,
      desc: "AI-generated system blueprints"
    }
  ];

  const filteredContacts = (store.contacts || []).filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.requirement?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-brand-gold font-semibold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Riyadvi Executive Command Center • /admin</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
            Full-Stack Lead & Dynamic CMS Portal
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Data Source: <span className="text-brand-gold font-semibold">{dataSource}</span> • Live MongoDB Content:{" "}
            <span className="text-zinc-200 font-mono">
              {services.length} Services, {portfolio.length} Case Studies, {blogs.length} Blogs, {careers.length} Jobs
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center">
          <button
            onClick={() => setActiveTab("cms")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Dynamic CMS Publisher</span>
          </button>
          <button
            onClick={fetchDashboardData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 border border-brand-gold/40 text-brand-goldLight text-xs font-semibold hover:bg-brand-gold/10 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync MongoDB</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          const isActive = activeTab === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className={`text-left p-4 rounded-2xl transition-all border ${
                isActive
                  ? "glass-gold border-brand-gold shadow-gold-sm"
                  : "glass-panel border-zinc-800 hover:border-brand-gold/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] font-mono uppercase text-zinc-400">Live DB</span>
              </div>
              <p className="text-2xl font-extrabold text-white mt-2">{card.count}</p>
              <p className="text-xs font-bold text-brand-goldLight mt-1">{card.label}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">{card.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "enquiries", label: "Enquiries Table" },
            { id: "consultations", label: "Consultations & Calendly" },
            { id: "healthCheckups", label: "Health Checkup Leads" },
            { id: "leadMagnets", label: "Lead Magnet Leads" },
            { id: "applications", label: "Job Applications" },
            { id: "aiBlueprints", label: "AI Blueprint Logs" },
            { id: "cms", label: "✨ Dynamic CMS Publisher" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gold-gradient text-black font-bold"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "enquiries" && (
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, company, requirement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Dynamic CMS Publisher Tab */}
      {activeTab === "cms" && (
        <div className="glass-panel metallic-border rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-brand-gold font-semibold uppercase tracking-widest">
                <Database className="w-4 h-4" />
                <span>MongoDB Dynamic Content Management System</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                Publish New Dynamic Page to MongoDB Atlas
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                New items created here are stored in MongoDB via `POST /api/admin/content/:type` and immediately generate live routes on the website.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "service", label: `Services (${services.length})` },
                { id: "portfolio", label: `Portfolio (${portfolio.length})` },
                { id: "blog", label: `Blogs (${blogs.length})` },
                { id: "career", label: `Careers (${careers.length})` }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCmsType(t.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold ${
                    cmsType === t.id
                      ? "bg-gold-gradient text-black font-bold"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handlePublishCmsContent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                {cmsType === "portfolio" ? "Client / Project Title *" : "Title *"}
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Enterprise GenAI Copilot Engineering"
                value={cmsForm.title}
                onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                URL Slug (auto-generated if blank)
              </label>
              <input
                type="text"
                placeholder="e.g., enterprise-genai-copilot"
                value={cmsForm.slug}
                onChange={(e) => setCmsForm({ ...cmsForm, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                {cmsType === "portfolio"
                  ? "Industry"
                  : cmsType === "blog"
                  ? "Article Category"
                  : cmsType === "career"
                  ? "Department"
                  : "Service Tagline"}
              </label>
              <input
                type="text"
                placeholder="e.g., FinTech / AI & Automation / Engineering"
                value={
                  cmsType === "portfolio"
                    ? cmsForm.industry
                    : cmsType === "blog"
                    ? cmsForm.category
                    : cmsType === "career"
                    ? cmsForm.department
                    : cmsForm.tagline
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (cmsType === "portfolio") setCmsForm({ ...cmsForm, industry: val });
                  else if (cmsType === "blog") setCmsForm({ ...cmsForm, category: val });
                  else if (cmsType === "career") setCmsForm({ ...cmsForm, department: val });
                  else setCmsForm({ ...cmsForm, tagline: val });
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Technologies / Tags (comma-separated)
              </label>
              <input
                type="text"
                value={cmsForm.technologies}
                onChange={(e) => setCmsForm({ ...cmsForm, technologies: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-400 mb-1">
                Executive Summary / Solution Description *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe the solution, architecture, and measurable outcomes..."
                value={cmsForm.summary}
                onChange={(e) => setCmsForm({ ...cmsForm, summary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Directly to MongoDB ({cmsType})</span>
              </button>
              {cmsStatus && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {cmsStatus}
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Data Tables */}
      {activeTab !== "cms" && (
        <div className="glass-panel metallic-border rounded-3xl overflow-hidden">
          {activeTab === "enquiries" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-brand-gold">
                    <th className="py-4 px-5">Name</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5">Phone</th>
                    <th className="py-4 px-5">Company</th>
                    <th className="py-4 px-5">Requirement</th>
                    <th className="py-4 px-5">Date</th>
                    <th className="py-4 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs text-zinc-300">
                  {filteredContacts.map((item, i) => (
                    <tr key={item._id || item.id || i} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-white">{item.name}</td>
                      <td className="py-4 px-5">{item.email}</td>
                      <td className="py-4 px-5">{item.phone}</td>
                      <td className="py-4 px-5 text-brand-goldLight font-medium">{item.company}</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-[11px]">
                          {item.requirement}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-zinc-400">{formatDate(item)}</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[11px] font-semibold">
                          {item.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "consultations" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-brand-gold">
                    <th className="py-4 px-5">Name</th>
                    <th className="py-4 px-5">Email & Phone</th>
                    <th className="py-4 px-5">Company</th>
                    <th className="py-4 px-5">Service Interest</th>
                    <th className="py-4 px-5">Preferred Slot</th>
                    <th className="py-4 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs text-zinc-300">
                  {(store.consultations || []).map((item, i) => (
                    <tr key={item._id || item.id || i} className="hover:bg-zinc-900/50">
                      <td className="py-4 px-5 font-bold text-white">{item.name}</td>
                      <td className="py-4 px-5">
                        {item.email} • {item.phone}
                      </td>
                      <td className="py-4 px-5">{item.company || "—"}</td>
                      <td className="py-4 px-5 text-brand-goldLight">
                        {item.serviceInterest || item.serviceType || "Digital Transformation"}
                      </td>
                      <td className="py-4 px-5 font-mono">{item.preferredDate || "Flexible"}</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px]">
                          {item.status || "Requested"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "healthCheckups" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-brand-gold">
                    <th className="py-4 px-5">Contact</th>
                    <th className="py-4 px-5">Company & Industry</th>
                    <th className="py-4 px-5">Digital Score</th>
                    <th className="py-4 px-5">Primary Challenge</th>
                    <th className="py-4 px-5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs text-zinc-300">
                  {(store.healthCheckups || []).map((item, i) => (
                    <tr key={item._id || item.id || i} className="hover:bg-zinc-900/50">
                      <td className="py-4 px-5">
                        <p className="font-bold text-white">{item.contactName || item.name || "Executive Lead"}</p>
                        <p className="text-zinc-500">{item.email}</p>
                      </td>
                      <td className="py-4 px-5">
                        <p className="text-brand-goldLight font-medium">{item.businessName || item.company}</p>
                        <p className="text-zinc-500">{item.industry}</p>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-base font-extrabold text-gold-gradient">
                          {item.score || item.overallScore || 78}/100
                        </span>
                      </td>
                      <td className="py-4 px-5 text-zinc-300">
                        {item.primaryChallenge || item.challenge || "Full-Stack Transformation"}
                      </td>
                      <td className="py-4 px-5 text-zinc-400">{formatDate(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "leadMagnets" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-brand-gold">
                    <th className="py-4 px-5">Name</th>
                    <th className="py-4 px-5">Email</th>
                    <th className="py-4 px-5">Phone</th>
                    <th className="py-4 px-5">Company</th>
                    <th className="py-4 px-5">Asset Downloaded</th>
                    <th className="py-4 px-5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs text-zinc-300">
                  {(store.leadMagnets || []).map((item, i) => (
                    <tr key={item._id || item.id || i} className="hover:bg-zinc-900/50">
                      <td className="py-4 px-5 font-bold text-white">{item.name}</td>
                      <td className="py-4 px-5">{item.email}</td>
                      <td className="py-4 px-5">{item.phone}</td>
                      <td className="py-4 px-5 text-brand-goldLight">{item.company}</td>
                      <td className="py-4 px-5">
                        {item.downloadedGuide || item.guideTitle || "Software Project Planning Guide"}
                      </td>
                      <td className="py-4 px-5 text-zinc-400">{formatDate(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-brand-gold">
                    <th className="py-4 px-5">Candidate Name</th>
                    <th className="py-4 px-5">Email & Phone</th>
                    <th className="py-4 px-5">Position Applied</th>
                    <th className="py-4 px-5">Resume / Portfolio</th>
                    <th className="py-4 px-5">Message</th>
                    <th className="py-4 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs text-zinc-300">
                  {(store.applications || []).map((item, i) => (
                    <tr key={item._id || item.id || i} className="hover:bg-zinc-900/50">
                      <td className="py-4 px-5 font-bold text-white">{item.name}</td>
                      <td className="py-4 px-5">
                        <p>{item.email}</p>
                        <p className="text-zinc-500">{item.phone}</p>
                      </td>
                      <td className="py-4 px-5 text-brand-goldLight font-semibold">
                        {item.position}
                      </td>
                      <td className="py-4 px-5">
                        <span className="underline text-brand-gold">{item.resume}</span>
                      </td>
                      <td className="py-4 px-5 max-w-xs truncate">{item.message}</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[11px]">
                          {item.status || "Under Review"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "aiBlueprints" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] uppercase tracking-wider text-brand-gold">
                    <th className="py-4 px-5">Industry & Prompt</th>
                    <th className="py-4 px-5">AI Recommended Stack</th>
                    <th className="py-4 px-5">Estimated Timeline</th>
                    <th className="py-4 px-5">Architecture Summary</th>
                    <th className="py-4 px-5">Generated At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs text-zinc-300">
                  {(store.aiBlueprints || []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-zinc-500">
                        No AI Blueprint logs yet. Try the interactive AI Solutions Architect on the Homepage!
                      </td>
                    </tr>
                  ) : (
                    store.aiBlueprints.map((item, i) => (
                      <tr key={item._id || i} className="hover:bg-zinc-900/50">
                        <td className="py-4 px-5">
                          <p className="font-bold text-white">{item.industry}</p>
                          <p className="text-zinc-400 text-[11px]">{item.prompt || item.projectGoal}</p>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex flex-wrap gap-1">
                            {(item.recommendedStack || []).map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded bg-zinc-900 border border-brand-gold/30 text-brand-goldLight text-[10px]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-5 font-mono text-brand-gold">
                          {item.estimatedWeeks || item.estimatedTimeline || "6–10 Weeks"}
                        </td>
                        <td className="py-4 px-5 text-zinc-300 max-w-xs truncate">
                          {item.architectureSummary || item.estimatedImpact || "Full-Stack + 3D Ecosystem"}
                        </td>
                        <td className="py-4 px-5 text-zinc-400">{formatDate(item)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
