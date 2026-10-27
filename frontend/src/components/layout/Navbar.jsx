import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Sparkles, ArrowUpRight, Database } from "lucide-react";
import { useContent } from "../../context/ContentContext";

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const location = useLocation();
  const { services, telemetry } = useContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesHover(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999999] isolate transition-all duration-300 ${
        scrolled ? "glass-panel py-3 shadow-gold-sm" : "bg-black/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-black font-display font-extrabold text-xl shadow-gold-sm group-hover:scale-105 transition-transform">
            R
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-white block leading-none">
              RIYADVI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold block mt-0.5">
              Software Technologies
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-brand-gold transition-colors ${isActive ? "text-brand-gold" : ""}`
            }
          >
            Home
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setServicesHover(true)}
            onMouseLeave={() => setServicesHover(false)}
          >
            <Link
              to="/services"
              className="flex items-center gap-1 hover:text-brand-gold transition-colors py-2"
            >
              <span>Services </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesHover ? "rotate-180 text-brand-gold" : ""
                }`}
              />
            </Link>

            {servicesHover && (
              <div className="absolute top-full left-0 w-[540px] pt-2">
                <div className="bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-4 border border-brand-gold/30 shadow-gold-md grid grid-cols-2 gap-2">
                  {services.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/services/${item.slug}`}
                      className="p-3 rounded-xl hover:bg-brand-gold/10 border border-transparent hover:border-brand-gold/30 transition-all group"
                    >
                      <div className="flex items-center justify-between text-white group-hover:text-brand-gold font-medium text-sm">
                        <span>{item.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                        {item.tagline || item.visualType}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `hover:text-brand-gold transition-colors ${isActive ? "text-brand-gold" : ""}`
            }
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-brand-gold transition-colors ${isActive ? "text-brand-gold" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `hover:text-brand-gold transition-colors ${isActive ? "text-brand-gold" : ""}`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              `hover:text-brand-gold transition-colors ${isActive ? "text-brand-gold" : ""}`
            }
          >
            Careers
          </NavLink>
          <NavLink
            to="/business-health-checkup"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold hover:border-brand-gold transition-all ${
                isActive ? "border-brand-gold" : ""
              }`
            }
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Health Checkup</span>
          </NavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/admin"
            className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-brand-gold/50 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5"
            title="Full-Stack MongoDB & Dynamic CMS Dashboard"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                telemetry.connected ? "bg-emerald-400 animate-pulse" : "bg-brand-gold"
              }`}
            />
            <Database className="w-3 h-3 text-brand-gold" />
            <span>{telemetry.connected ? "DB Live" : "CMS"}</span>
          </Link>
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm hover:shadow-gold-md hover:scale-[1.02] transition-all"
          >
            Book a Free Consultation
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-zinc-800 text-zinc-300 hover:text-brand-gold"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Screen Opaque Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] z-[9999999] bg-black/98 backdrop-blur-2xl overflow-y-auto px-6 py-6 space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Home
            </Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              All Services ({services.length})
            </Link>
            <div className="pl-3 border-l border-brand-gold/30 grid grid-cols-1 gap-1.5 my-1">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-zinc-400 hover:text-brand-gold py-1"
                >
                  {s.title}
                </Link>
              ))}
            </div>
            <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Portfolio
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              About
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Blog
            </Link>
            <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Careers
            </Link>
            <Link
              to="/business-health-checkup"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-brand-gold font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Business Health Checkup
            </Link>
            <Link
              to="/software-project-planning-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-zinc-300 hover:text-brand-gold text-sm"
            >
              Download Project Planning Guide
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Contact
            </Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2 text-brand-goldLight font-mono text-xs">
              Admin Dashboard & Dynamic CMS
            </Link>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm"
          >
            Book a Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}
