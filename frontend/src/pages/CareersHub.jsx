import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { CAREERS_DATA } from "../data/careersData";

export default function CareersHub() {
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");

  const departments = ["All", ...Array.from(new Set(CAREERS_DATA.map((j) => j.department)))];
  const designations = ["All", ...Array.from(new Set(CAREERS_DATA.map((j) => j.designation)))];
  const experiences = ["All", ...Array.from(new Set(CAREERS_DATA.map((j) => j.experience)))];

  const filteredJobs = CAREERS_DATA.filter((job) => {
    const matchDept = departmentFilter === "All" || job.department === departmentFilter;
    const matchDesig = designationFilter === "All" || job.designation === designationFilter;
    const matchExp = experienceFilter === "All" || job.experience === experienceFilter;
    return matchDept && matchDesig && matchExp;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold">
          Join Riyadvi Software Technologies
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Build the Future of <span className="text-gold-gradient">3D, AI & Full-Stack</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Filter open roles by Department, Designation, and Experience level.
        </p>
      </div>

      {/* Required Department, Designation, and Experience Filters (Section 22) */}
      <div className="glass-panel metallic-border rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Department Filter
          </label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Designation Filter
          </label>
          <select
            value={designationFilter}
            onChange={(e) => setDesignationFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
          >
            {designations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Experience Filter
          </label>
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
          >
            {experiences.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.jobSlug}
            className="glass-panel rounded-3xl p-6 md:p-8 border border-zinc-800 hover:border-brand-gold/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold font-semibold">
                  {job.department}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                  {job.designation}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{job.title}</h2>
              <p className="text-sm text-zinc-400 max-w-2xl">{job.summary}</p>
              <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-brand-gold" />
                  {job.experience}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  {job.type}
                </span>
              </div>
            </div>

            <Link
              to={`/careers/${job.jobSlug}`}
              className="px-6 py-3.5 rounded-full bg-gold-gradient text-black font-bold text-xs shadow-gold-sm inline-flex items-center justify-center gap-2 shrink-0"
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
