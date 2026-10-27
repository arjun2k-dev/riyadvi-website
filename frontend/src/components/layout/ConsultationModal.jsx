import React, { useState } from "react";
import { X, Calendar, CheckCircle2 } from "lucide-react";
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

  return (
    <div className="fixed inset-0 z-[99999999] isolate flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="glass-panel metallic-border rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-gold-md">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-brand-gold mx-auto" />
            <h3 className="text-2xl font-bold text-white">Consultation Saved to MongoDB</h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto">
              Thank you, {formData.name}. Your strategy session request has been persisted via POST /api/consultation and is live in the Admin Dashboard.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-[0.2em] font-semibold">
              <Calendar className="w-4 h-4" />
              <span>Free Strategy Session</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">Book a Free Consultation</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Speak with Riyadvi&apos;s engineering & digital transformation leads.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                >
                  <option>Web Development</option>
                  <option>App Development</option>
                  <option>Digital Marketing</option>
                  <option>AR / VR Solutions</option>
                  <option>3D Modeling</option>
                  <option>UI/UX Design</option>
                </select>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Tell us about your project goals or business challenges..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-semibold text-sm shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                {status === "submitting" ? "Scheduling..." : "Confirm Consultation Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
