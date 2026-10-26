import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Sparkles, ArrowUpRight } from "lucide-react";

const SERVICE_LINKS = [
  { name: "Web Development", slug: "/services/web-development", desc: "Scalable enterprise & custom web platforms" },
  { name: "App Development", slug: "/services/app-development", desc: "Native & cross-platform iOS/Android apps" },
  { name: "Digital Marketing", slug: "/services/digital-marketing", desc: "Data-driven performance & SEO growth" },
  { name: "AR / VR Solutions", slug: "/services/ar-vr", desc: "Immersive spatial & XR experiences" },
  { name: "3D Modeling", slug: "/services/3d-modeling", desc: "Interactive WebGL & high-poly 3D assets" },
  { name: "UI/UX Design", slug: "/services/ui-ux-design", desc: "Human-centered product & design systems" }
];

export default function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const location = useLocation();

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
      className={`fixed top-0 left-0 right-0 z-[9999999] transition-all duration-300 ${
        scrolled ? "glass-panel py-3 shadow-gold-sm" : "bg-black/90 py-5"
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

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
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
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesHover ? "rotate-180 text-brand-gold" : ""
                }`}
              />
            </Link>

            {servicesHover && (
              <div className="absolute top-full left-0 w-[520px] pt-2">
                <div className="glass-panel rounded-2xl p-4 border border-brand-gold/25 shadow-gold-md grid grid-cols-2 gap-2">
                  {SERVICE_LINKS.map((item) => (
                    <Link
                      key={item.slug}
                      to={item.slug}
                      className="p-3 rounded-xl hover:bg-brand-gold/10 border border-transparent hover:border-brand-gold/30 transition-all group"
                    >
                      <div className="flex items-center justify-between text-white group-hover:text-brand-gold font-medium text-sm">
                        <span>{item.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{item.desc}</p>
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

      {mobileMenuOpen && (
            <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-zinc-800 mt-3 px-6 py-6 space-y-4 relative z-[9999999]">          <div className="grid grid-cols-1 gap-2">
            <Link to="/" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Home
            </Link>
            <Link to="/services" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              All Services
            </Link>
            <div className="pl-3 border-l border-brand-gold/30 grid grid-cols-1 gap-1.5 my-1">
              {SERVICE_LINKS.map((s) => (
                <Link
                  key={s.slug}
                  to={s.slug}
                  className="text-xs text-zinc-400 hover:text-brand-gold py-1"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <Link to="/portfolio" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Portfolio
            </Link>
            <Link to="/about" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              About
            </Link>
            <Link to="/blog" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Blog
            </Link>
            <Link to="/careers" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Careers
            </Link>
            <Link
              to="/business-health-checkup"
              className="py-2 text-brand-gold font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Business Health Checkup
            </Link>
            <Link
              to="/software-project-planning-guide"
              className="py-2 text-zinc-300 hover:text-brand-gold text-sm"
            >
              Download Project Planning Guide
            </Link>
            <Link to="/contact" className="py-2 text-zinc-200 hover:text-brand-gold font-medium">
              Contact
            </Link>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full py-3 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm"
          >
            Book a Free Consultation
          </button>
        </div>
      )}
    </header>
  );
}
