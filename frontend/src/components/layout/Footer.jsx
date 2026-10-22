import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function Footer({ onOpenConsultation }) {
  return (
    <footer className="bg-brand-surface border-t border-zinc-900 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-gold rounded-3xl p-8 md:p-10 mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
              Technology & Digital Solutions Partner
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
              Ready to architect your next digital growth stage?
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm hover:scale-[1.02] transition-transform"
            >
              Book a Free Consultation
            </button>
            <Link
              to="/business-health-checkup"
              className="px-6 py-3 rounded-full border border-brand-gold/40 text-brand-goldLight hover:bg-brand-gold/10 text-sm font-medium transition-colors"
            >
              Take Business Health Checkup
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center text-black font-display font-extrabold text-lg">
                R
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                RIYADVI SOFTWARE TECHNOLOGIES
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Founded in 2021, Riyadvi is a technology and digital solutions partner combining
              custom engineering, 3D/interactive design, and business strategy to help enterprises
              scale.
            </p>
            <div className="space-y-2 text-xs text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold" />
                <span>info@riyadvisoftwaretechnologies.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>+91 (Available via WhatsApp & Direct Call)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services/web-development" className="hover:text-brand-gold">Web Development</Link></li>
              <li><Link to="/services/app-development" className="hover:text-brand-gold">App Development</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-brand-gold">Digital Marketing</Link></li>
              <li><Link to="/services/ar-vr" className="hover:text-brand-gold">AR / VR Experiences</Link></li>
              <li><Link to="/services/3d-modeling" className="hover:text-brand-gold">3D Modeling</Link></li>
              <li><Link to="/services/ui-ux-design" className="hover:text-brand-gold">UI/UX Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-brand-gold">About Riyadvi</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-gold">Portfolio & Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-brand-gold">Insights & Blog</Link></li>
              <li><Link to="/careers" className="hover:text-brand-gold">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Growth Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/business-health-checkup"
                  className="text-brand-gold hover:underline flex items-center gap-1"
                >
                  <span>Business Health Checkup</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/software-project-planning-guide"
                  className="hover:text-brand-gold flex items-center gap-1"
                >
                  <span>Project Planning Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-brand-gold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Riyadvi Software Technologies. All rights reserved.</p>
          <p>Crafted with React, Three.js, GSAP & Node.js</p>
        </div>
      </div>
    </footer>
  );
}
