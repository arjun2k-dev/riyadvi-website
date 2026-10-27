import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiClient } from "../api/client";
import { SERVICES_DATA } from "../data/servicesData";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { BLOG_DATA } from "../data/blogData";
import { CAREERS_DATA } from "../data/careersData";

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [services, setServices] = useState(SERVICES_DATA);
  const [portfolio, setPortfolio] = useState(PORTFOLIO_DATA);
  const [blogs, setBlogs] = useState(BLOG_DATA);
  const [careers, setCareers] = useState(CAREERS_DATA);
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
        if (res.data.services?.length) setServices(res.data.services);
        if (res.data.portfolio?.length) setPortfolio(res.data.portfolio);
        if (res.data.blogs?.length) setBlogs(res.data.blogs);
        if (res.data.careers?.length) setCareers(res.data.careers);
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

  return (
    <ContentContext.Provider
      value={{
        services,
        portfolio,
        blogs,
        careers,
        telemetry,
        refreshContent
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return {
      services: SERVICES_DATA,
      portfolio: PORTFOLIO_DATA,
      blogs: BLOG_DATA,
      careers: CAREERS_DATA,
      telemetry: { connected: false, source: "fallback", latencyMs: null, aiBlueprints: 0 },
      refreshContent: () => {}
    };
  }
  return ctx;
}
