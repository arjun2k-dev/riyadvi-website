import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send, Briefcase, MapPin } from "lucide-react";
import { getJobBySlug } from "../data/careersData";
import { submitLeadWithFallback } from "../utils/leadStorage";

export default function JobDetail() {
  const { jobSlug } = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    await submitLeadWithFallback("/applications", "applications", {
      ...form,
      jobSlug: job.jobSlug
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
        {/* Job Details, Responsibilities & Requirements */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-panel metallic-border rounded-3xl p-8 space-y-4">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold font-semibold">
                {job.department}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                {job.designation}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{job.title}</h1>
            <div className="flex flex-wrap gap-5 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-brand-gold" /> {job.experience}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold" /> {job.location} • {job.type}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed pt-2">{job.summary}</p>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-4">
            <h2 className="text-xl font-bold text-white">Key Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-zinc-800 space-y-4">
            <h2 className="text-xl font-bold text-white">Requirements & Qualifications</h2>
            <ul className="space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Application Form (Section 22: Name, Email, Phone, Position, Resume, Message) */}
        <div className="lg:col-span-5">
          <div className="glass-gold rounded-3xl p-8 sticky top-28 space-y-6">
            {status === "success" ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-brand-gold mx-auto" />
                <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
                <p className="text-sm text-zinc-300">
                  Thank you, {form.name}. Your application for <strong>{job.title}</strong> has been stored in our database and is visible in the Admin Dashboard.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
                    Apply Now
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">Submit Your Application</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Position *"
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-sm text-brand-goldLight focus:outline-none focus:border-brand-gold"
                  />
                  <input
                    type="url"
                    required
                    placeholder="Resume / Portfolio / GitHub Link (https://...) *"
                    value={form.resume}
                    onChange={(e) => setForm({ ...form, resume: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder="Why are you excited to join Riyadvi? Mention key 3D/full-stack projects *"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === "submitting" ? "Submitting..." : "Submit Application"}</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
