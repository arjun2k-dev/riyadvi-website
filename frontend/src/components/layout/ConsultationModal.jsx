import React, { useState } from "react";
import { X, Send, CheckCircle2, Calendar, Phone, Mail } from "lucide-react";
import { submitLeadWithFallback } from "../../utils/leadStorage";

export default function ConsultationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "Web Development",
    preferredDate: "",
    notes: ""
  });
  const [status, setStatus] = useState("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLeadWithFallback("/consultation", "consultations", formData);
    setStatus("success");
  };

  const handleResetAndClose = () => {
    setStatus("idle");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "Web Development",
      preferredDate: "",
      notes: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999999] isolate flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel metallic-border p-6 sm:p-8 bg-zinc-950/95 shadow-2xl">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "success" ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center mx-auto text-brand-gold">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Request Confirmed</h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. Your strategy session request has been received. Our solutions architect will review your project details and connect with you within 24 hours.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold font-bold">
                Direct Engineering Discovery
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Book a Free Consultation</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Share your requirements for a technical discovery call and preliminary roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Arjun Mehta"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="arjun@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company / Startup"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Primary Practice</label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
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
                <label className="block text-xs text-zinc-400 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Project Brief</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Briefly describe your goals, timeline, and key requirements..."
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-md hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{status === "submitting" ? "Registering..." : "Schedule Strategy Session"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}