import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowUpRight, Database } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function CareersHub() {
  const { careers, telemetry } = useContent();
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");

  const departments = ["All", ...Array.from(new Set(careers.map((j) => j.department)))];
  const designations = ["All", ...Array.from(new Set(careers.map((j) => j.designation)))];
  const experiences = ["All", ...Array.from(new Set(careers.map((j) => j.experience)))];

  const filteredJobs = careers.filter((job) => {
    const matchDept = departmentFilter === "All" || job.department === departmentFilter;
    const matchDesig = designationFilter === "All" || job.designation === designationFilter;
    const matchExp = experienceFilter === "All" || job.experience === experienceFilter;
    return matchDept && matchDesig && matchExp;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          Careers & Recruitment Portal
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Build the <span className="text-gold-gradient">Future With Us</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Join our team of full-stack engineers, 3D creative technologists, AR/VR builders, and digital growth strategists.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <Database className="w-3.5 h-3.5 text-brand-gold" />
          <span>Synced from {telemetry.source} ({careers.length} open positions)</span>
        </div>
      </div>

      {/* Multi-Filter Bar: Department, Designation, Experience */}
      <div className="glass-panel rounded-2xl p-6 border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">Filter by Department</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">Filter by Designation</label>
          <select
            value={designationFilter}
            onChange={(e) => setDesignationFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
          >
            {designations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">Filter by Experience</label>
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
          >
            {experiences.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.slug}
            className="glass-panel rounded-2xl p-6 md:p-8 border border-zinc-800 hover:border-brand-gold/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="px-3 py-1 rounded-full glass-gold text-brand-gold font-semibold">
                  {job.department}
                </span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-brand-gold" />
                  {job.designation}
                </span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  {job.experience}
                </span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  {job.location}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{job.title}</h2>
              <p className="text-xs text-zinc-400 max-w-2xl">{job.overview}</p>
            </div>

            <Link
              to={`/careers/${job.slug}`}
              className="px-6 py-3.5 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm inline-flex items-center gap-2 shrink-0 self-start md:self-center"
            >
              <span>View Role & Apply</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
