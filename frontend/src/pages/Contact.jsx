import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Send,
  ExternalLink
} from "lucide-react";
import { submitLeadWithFallback } from "../utils/leadStorage";

/**
 * 23. CONTACT PAGE (/contact)
 * Includes: Contact form (Name, Email, Phone, Company, Requirement, Message)
 * Integrations: Backend API, Database, Email notification trigger, WhatsApp, Calendly, Location/Map
 */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "Web Development",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+91 phone No";
  const calendlyUrl =
    import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/riyadvi-consultation";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLeadWithFallback("/contact", "contacts", form);
    setStatus("success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          Partner With Riyadvi
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Let&apos;s Architect Your{" "}
          <span className="text-gold-gradient">Digital Transformation</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Submit a project enquiry, start an instant WhatsApp conversation, or book a Calendly strategy call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 glass-panel metallic-border rounded-3xl p-8 md:p-10">
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto" />
              <h2 className="text-3xl font-bold text-white">Enquiry Received!</h2>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Thank you, {form.name}. Your requirement for <strong>{form.requirement}</strong> has been stored in our database and an email notification has been dispatched to our solutions team.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    requirement: "Web Development",
                    message: ""
                  });
                }}
                className="px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold text-white">Send a Project Enquiry</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Company *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Company Name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Primary Requirement *</label>
                <select
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                >
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>Digital Marketing</option>
                  <option>AR / VR Solutions</option>
                  <option>3D Modeling</option>
                  <option>UI/UX Design</option>
                  <option>End-to-End Digital Transformation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Project Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project goals, timeline, and key requirements..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{status === "submitting" ? "Sending Enquiry..." : "Submit Enquiry"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Integrations: WhatsApp, Calendly & Location Map (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Direct Integration */}
          <div className="glass-gold rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Connect</span>
            </div>
            <h3 className="text-xl font-bold text-white">Chat With Our Solutions Team</h3>
            <p className="text-xs text-zinc-300">
              Prefer real-time messaging? Start a direct WhatsApp conversation with our engineering lead.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi Riyadvi team, I would like to discuss a software / digital transformation project."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
            >
              <span>Message on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Calendly Integration */}
          <div className="glass-panel rounded-3xl p-6 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
              <Calendar className="w-4 h-4" />
              <span>Calendly Scheduling</span>
            </div>
            <h3 className="text-xl font-bold text-white">Book a 30-Minute Discovery Call</h3>
            <p className="text-xs text-zinc-400">
              Pick a convenient slot on our live Calendly schedule for a technical walkthrough.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-brand-gold/40 text-brand-goldLight hover:bg-brand-gold/10 font-semibold text-xs"
            >
              <span>Open Calendly Scheduler</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Contact Details & Location Map Card */}
          <div className="glass-panel rounded-3xl p-6 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Corporate Headquarters</h3>
            <div className="space-y-2.5 text-xs text-zinc-300">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Riyadvi Software Technologies, Chennai, Tamil Nadu, India</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>info@riyadvisoftwaretechnologies.com</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 (Direct & WhatsApp Business Support)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
