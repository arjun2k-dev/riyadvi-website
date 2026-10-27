import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/layout/ScrollToTop";
import { ContentProvider } from "./context/ContentContext";

const Home = lazy(() => import("./pages/Home"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const PortfolioHub = lazy(() => import("./pages/PortfolioHub"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const About = lazy(() => import("./pages/About"));
const BlogHub = lazy(() => import("./pages/BlogHub"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const CareersHub = lazy(() => import("./pages/CareersHub"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const BusinessHealthCheckup = lazy(() => import("./pages/BusinessHealthCheckup"));
const LeadMagnetGuide = lazy(() => import("./pages/LeadMagnetGuide"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-black">
      <div className="w-12 h-12 rounded-full border-2 border-brand-gold/20 border-t-brand-gold animate-spin mb-4" />
      <p className="text-xs uppercase tracking-[0.25em] text-brand-gold/80 font-display">
        Syncing Dynamic Full-Stack Experience...
      </p>
    </div>
  );
}

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <MainLayout
          onOpenConsultation={() => setIsConsultationOpen(true)}
          isConsultationOpen={isConsultationOpen}
          onCloseConsultation={() => setIsConsultationOpen(false)}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={<Home onOpenConsultation={() => setIsConsultationOpen(true)} />}
              />
              <Route path="/services" element={<ServicesOverview />} />
              <Route
                path="/services/:slug"
                element={<ServiceDetail onOpenConsultation={() => setIsConsultationOpen(true)} />}
              />
              <Route path="/portfolio" element={<PortfolioHub />} />
              <Route path="/portfolio/:slug" element={<CaseStudyDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<BlogHub />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/careers" element={<CareersHub />} />
              <Route path="/careers/:jobSlug" element={<JobDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/business-health-checkup" element={<BusinessHealthCheckup />} />
              <Route path="/software-project-planning-guide" element={<LeadMagnetGuide />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </ContentProvider>
  );
}
