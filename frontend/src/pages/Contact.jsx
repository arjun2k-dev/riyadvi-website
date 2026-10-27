import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  ExternalLink
} from "lucide-react";
import { submitLeadWithFallback } from "../utils/leadStorage";

const TIME_SLOTS = [
  "10:00 AM IST",
  "11:30 AM IST",
  "02:30 PM IST",
  "04:30 PM IST",
  "06:30 PM IST"
];

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

  // Built-in Interactive Calendly Discovery Call Scheduler state (saves directly to MongoDB)
  const [showScheduler, setShowScheduler] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    slot: "11:30 AM IST",
    topic: "Full-Stack & 3D Architecture Discovery Call"
  });
  const [bookingStatus, setBookingStatus] = useState("idle");

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918072487427";
  const customCalendlyUrl = import.meta.env.VITE_CALENDLY_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLeadWithFallback("/contact", "contacts", form);
    setStatus("success");
  };

  const handleCalendlyBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus("submitting");
    await submitLeadWithFallback("/consultation", "consultations", {
      name: bookingForm.name,
      email: bookingForm.email,
      phone: bookingForm.phone,
      company: bookingForm.company || "Calendly Discovery Booking",
      serviceType: bookingForm.topic,
      preferredDate: `${bookingForm.date} (${bookingForm.slot})`,
      notes: `Scheduled 30-Min Discovery Call for ${bookingForm.date} at ${bookingForm.slot}`
    });
    setBookingStatus("success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          Partner With Riyadvi
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Let’s Architect Your <span className="text-gold-gradient">Digital Future</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Submit a project enquiry, book a 30-minute discovery slot, or start an instant WhatsApp conversation with our engineering leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Contact Enquiry Form (7 Cols) */}
        <div className="lg:col-span-7 glass-panel metallic-border rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-2">Send a Project Enquiry</h2>
          <p className="text-xs text-zinc-400 mb-6">
            Connected to `POST /api/contact` • Persisted in MongoDB Atlas + visible in `/admin`.
          </p>

          {status === "success" ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Enquiry Received!</h3>
              <p className="text-sm text-zinc-300">
                Thank you, {form.name}. Your requirement for{" "}
                <span className="text-brand-gold font-semibold">{form.requirement}</span> has been logged in our MongoDB database and routed to our solutions architect.
              </p>
              <button
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
                className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-brand-gold font-semibold"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Arjun Mehta"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="arjun@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="your phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Company Name *</label>
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

        {/* Direct Integrations: WhatsApp, Embedded Calendly Slot Scheduler & Location Map (5 Cols) */}
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

          {/* Interactive Calendly 30-Minute Discovery Call Scheduler (Zero 404s, Direct DB Persistence) */}
          <div className="glass-panel rounded-3xl p-6 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Calendly Discovery Scheduler</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                Live Slot Engine
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Book a 30-Minute Discovery Call</h3>
            <p className="text-xs text-zinc-400">
              Pick a date and IST time slot below to lock in a technical walkthrough with our Lead Solutions Architect.
            </p>

            {bookingStatus === "success" ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Discovery Slot Confirmed!</span>
                </div>
                <p className="text-zinc-300">
                  Booked for <span className="text-brand-gold font-semibold">{bookingForm.date}</span> at{" "}
                  <span className="text-brand-gold font-semibold">{bookingForm.slot}</span>. Saved to MongoDB Consultation Requests.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingStatus("idle")}
                  className="text-brand-gold underline text-[11px] font-semibold"
                >
                  Book another slot
                </button>
              </div>
            ) : !showScheduler ? (
              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowScheduler(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Select Date & Time Slot</span>
                </button>
                {customCalendlyUrl && (
                  <a
                    href={customCalendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-brand-gold/40 text-brand-goldLight hover:bg-brand-gold/10 font-semibold text-xs"
                  >
                    <span>External Calendly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleCalendlyBookingSubmit} className="space-y-3 pt-2 border-t border-zinc-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                  />
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <span className="block text-[11px] text-zinc-400 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brand-gold" /> Select 30-Minute Time Slot:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setBookingForm({ ...bookingForm, slot })}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                          bookingForm.slot === slot
                            ? "bg-gold-gradient text-black"
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={bookingStatus === "submitting"}
                    className="flex-1 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm"
                  >
                    {bookingStatus === "submitting" ? "Confirming Slot..." : "Confirm 30-Min Call"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowScheduler(false)}
                    className="px-3 py-2.5 rounded-full bg-zinc-900 text-zinc-400 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
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
