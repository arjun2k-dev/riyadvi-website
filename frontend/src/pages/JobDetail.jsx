import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send, Briefcase, MapPin } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { submitLeadWithFallback } from "../utils/leadStorage";

export default function JobDetail() {
  const { jobSlug } = useParams();
  const { getJobBySlug } = useContent();
  const job = getJobBySlug(jobSlug);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: job.title,
    resume: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setForm((prev) => ({ ...prev, position: job.title }));
  }, [job.title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLeadWithFallback("/applications", "applications", {
      ...form,
      jobSlug: job.jobSlug || job.slug,
      department: job.department
    });
    setStatus("success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Link
        to="/careers"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-brand-gold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Open Roles</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-4">
            <span className="px-3 py-1 rounded-full glass-gold text-brand-gold text-xs font-semibold">
              {job.department} • {job.type || "Full-Time"}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-brand-gold" />
                Experience: {job.experience}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold" />
                {job.location}
              </span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed pt-2">
              {job.summary || job.overview}
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Key Responsibilities</h2>
              <ul className="space-y-2.5 text-sm text-zinc-300">
                {(job.responsibilities || []).map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <h2 className="text-xl font-bold text-white mb-3">Requirements & Skills</h2>
              <ul className="space-y-2.5 text-sm text-zinc-300">
                {(job.requirements || []).map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-panel metallic-border rounded-3xl p-8 sticky top-24">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">
              Direct Application Portal
            </span>
            <h2 className="text-2xl font-bold text-white mt-1 mb-6">
              Apply for {job.title}
            </h2>

            {status === "success" ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Application Submitted!</h3>
                <p className="text-xs text-zinc-300">
                  Your application for {job.title} has been received. Our recruitment team will review your profile and reach out regarding next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Position Applied</label>
                  <input
                    type="text"
                    readOnly
                    value={form.position}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-brand-gold font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Resume / Portfolio Link (Google Drive, GitHub, LinkedIn) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://github.com/yourprofile or Drive resume link"
                    value={form.resume}
                    onChange={(e) => setForm({ ...form, resume: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Cover Note / Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Submitting..." : "Submit Application"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}