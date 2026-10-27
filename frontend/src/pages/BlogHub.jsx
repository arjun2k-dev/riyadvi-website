import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, Sparkles, Tag, Database } from "lucide-react";
import { useContent } from "../context/ContentContext";
import { BLOG_CATEGORIES } from "../data/blogData";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

export default function BlogHub() {
  const { blogs, telemetry } = useContent();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const featuredArticle = blogs.find((b) => b.featured) || blogs[0];
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags || [])));

  const filteredArticles = blogs.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesTag = !selectedTag || (article.tags || []).includes(selectedTag);
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Dynamic MongoDB Knowledge Hub • {blogs.length} Published Insights</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Riyadvi <span className="text-gold-gradient">Insights & Research</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Deep-dive engineering playbooks on Web Development, Mobile Apps, Digital Marketing, AI & Automation, and Business Growth.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
          <Database className="w-3.5 h-3.5 text-brand-gold" />
          <span>Synced from {telemetry.source}</span>
        </div>
      </div>

      {/* Featured Article Spotlight */}
      {featuredArticle && (
        <div className="glass-gold rounded-3xl p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-gold-gradient text-black font-bold">
                Featured Insight
              </span>
              <span className="text-brand-goldLight font-medium">
                {featuredArticle.category}
              </span>
              <span className="text-zinc-400">• {featuredArticle.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              {featuredArticle.title}
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {featuredArticle.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {(featuredArticle.tags || []).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-[11px] bg-black/50 border border-brand-gold/30 text-brand-goldLight"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to={`/blog/${featuredArticle.slug}`}
              className="px-6 py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-md inline-flex items-center gap-2"
            >
              <span>Read Featured Article</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Search + Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-gold-gradient text-black shadow-gold-sm"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-white focus:border-brand-gold focus:outline-none"
          />
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500 flex items-center gap-1 mr-1">
          <Tag className="w-3.5 h-3.5 text-brand-gold" /> Filter by tag:
        </span>
        <button
          onClick={() => setSelectedTag("")}
          className={`px-2.5 py-1 rounded-md text-[11px] ${
            !selectedTag
              ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
              : "bg-zinc-900 text-zinc-400"
          }`}
        >
          All Tags
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
            className={`px-2.5 py-1 rounded-md text-[11px] ${
              selectedTag === tag
                ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <MagneticTiltCard
            key={article.slug}
            className="p-6 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-brand-gold font-semibold">{article.category}</span>
                <span className="text-zinc-500">{article.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{article.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{article.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">{article.date}</span>
              <Link
                to={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:underline"
              >
                <span>Read Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </MagneticTiltCard>
        ))}
      </div>
    </div>
  );
}
