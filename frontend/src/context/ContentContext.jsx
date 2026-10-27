import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { apiClient } from "../api/client";
import { SERVICES_DATA } from "../data/servicesData";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { BLOG_DATA } from "../data/blogData";
import { CAREERS_DATA } from "../data/careersData";

const ContentContext = createContext(null);

function normalizeService(s) {
  if (!s) return {};
  return {
    ...s,
    badge: s.badge || s.visualType || s.shortTitle || "Core Practice",
    shortDescription: s.shortDescription || s.heroDescription || s.tagline || "",
    heroDescription: s.heroDescription || s.shortDescription || s.tagline || "",
    technologies: s.technologies?.length ? s.technologies : s.techStack || [],
    techStack: s.techStack?.length ? s.techStack : s.technologies || [],
    relatedSlugs: s.relatedSlugs?.length ? s.relatedSlugs : s.relatedPortfolio || [],
    relatedPortfolio: s.relatedPortfolio?.length ? s.relatedPortfolio : s.relatedSlugs || []
  };
}

function normalizePortfolio(p) {
  if (!p) return {};
  return {
    ...p,
    title: p.title || p.client || "Enterprise Case Study",
    client: p.client || p.title || "Enterprise Client",
    timeline: p.timeline || "10–12 Weeks",
    technologies: p.technologies || [],
    results: p.results?.length ? p.results : [{ metric: "+210%", label: "Digital ROI" }],
    visuals: p.visuals || [],
    relatedServices: p.relatedServices || ["web-development"]
  };
}

function normalizeBlog(b) {
  if (!b) return {};
  return {
    ...b,
    date: b.publishedAt || b.date || "October 2026",
    publishedAt: b.publishedAt || b.date || "October 2026",
    tags: b.tags || [],
    content: Array.isArray(b.content) ? b.content : [b.excerpt || ""]
  };
}

function normalizeCareer(j) {
  if (!j) return {};
  const slugVal = j.jobSlug || j.slug || "software-engineer";
  return {
    ...j,
    slug: slugVal,
    jobSlug: slugVal,
    summary: j.summary || j.overview || "",
    overview: j.overview || j.summary || "",
    responsibilities: j.responsibilities || [],
    requirements: j.requirements || []
  };
}

export function ContentProvider({ children }) {
  const [rawServices, setRawServices] = useState(SERVICES_DATA);
  const [rawPortfolio, setRawPortfolio] = useState(PORTFOLIO_DATA);
  const [rawBlogs, setRawBlogs] = useState(BLOG_DATA);
  const [rawCareers, setRawCareers] = useState(CAREERS_DATA);
  const [telemetry, setTelemetry] = useState({
    connected: false,
    source: "syncing",
    latencyMs: null,
    aiBlueprints: 0
  });

  const refreshContent = useCallback(async () => {
    const start = performance.now();
    try {
      const res = await apiClient.get("/content");
      if (res?.success && res?.data) {
        if (res.data.services?.length) setRawServices(res.data.services);
        if (res.data.portfolio?.length) setRawPortfolio(res.data.portfolio);
        if (res.data.blogs?.length) setRawBlogs(res.data.blogs);
        if (res.data.careers?.length) setRawCareers(res.data.careers);
        setTelemetry({
          connected: true,
          source: res.source || "mongodb",
          latencyMs: res.latencyMs || Math.round(performance.now() - start),
          aiBlueprints: res.counts?.aiBlueprints || 0
        });
      }
    } catch {
      setTelemetry({
        connected: false,
        source: "local-cache",
        latencyMs: null,
        aiBlueprints: 0
      });
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const services = useMemo(() => (rawServices || SERVICES_DATA).map(normalizeService), [rawServices]);
  const portfolio = useMemo(() => (rawPortfolio || PORTFOLIO_DATA).map(normalizePortfolio), [rawPortfolio]);
  const blogs = useMemo(() => (rawBlogs || BLOG_DATA).map(normalizeBlog), [rawBlogs]);
  const careers = useMemo(() => (rawCareers || CAREERS_DATA).map(normalizeCareer), [rawCareers]);

  const getServiceBySlug = useCallback(
    (slug) => services.find((s) => s.slug === slug) || services[0] || normalizeService(SERVICES_DATA[0]),
    [services]
  );

  const getCaseStudyBySlug = useCallback(
    (slug) => portfolio.find((p) => p.slug === slug) || portfolio[0] || normalizePortfolio(PORTFOLIO_DATA[0]),
    [portfolio]
  );

  const getBlogBySlug = useCallback(
    (slug) => blogs.find((b) => b.slug === slug) || blogs[0] || normalizeBlog(BLOG_DATA[0]),
    [blogs]
  );

  const getJobBySlug = useCallback(
    (jobSlug) =>
      careers.find((j) => j.jobSlug === jobSlug || j.slug === jobSlug) ||
      careers[0] ||
      normalizeCareer(CAREERS_DATA[0]),
    [careers]
  );

  return (
    <ContentContext.Provider
      value={{
        services,
        portfolio,
        blogs,
        careers,
        telemetry,
        refreshContent,
        getServiceBySlug,
        getCaseStudyBySlug,
        getBlogBySlug,
        getJobBySlug
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    const fallbackServices = SERVICES_DATA.map(normalizeService);
    const fallbackPortfolio = PORTFOLIO_DATA.map(normalizePortfolio);
    const fallbackBlogs = BLOG_DATA.map(normalizeBlog);
    const fallbackCareers = CAREERS_DATA.map(normalizeCareer);
    return {
      services: fallbackServices,
      portfolio: fallbackPortfolio,
      blogs: fallbackBlogs,
      careers: fallbackCareers,
      telemetry: { connected: false, source: "fallback", latencyMs: null, aiBlueprints: 0 },
      refreshContent: () => {},
      getServiceBySlug: (slug) => fallbackServices.find((s) => s.slug === slug) || fallbackServices[0],
      getCaseStudyBySlug: (slug) => fallbackPortfolio.find((p) => p.slug === slug) || fallbackPortfolio[0],
      getBlogBySlug: (slug) => fallbackBlogs.find((b) => b.slug === slug) || fallbackBlogs[0],
      getJobBySlug: (jobSlug) => fallbackCareers.find((j) => j.jobSlug === jobSlug || j.slug === jobSlug) || fallbackCareers[0]
    };
  }
  return ctx;
}
