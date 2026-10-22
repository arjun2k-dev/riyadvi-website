import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, Sparkles, Tag } from "lucide-react";
import { BLOG_DATA, BLOG_CATEGORIES } from "../data/blogData";
import MagneticTiltCard from "../components/animations/MagneticTiltCard";

export default function BlogHub() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const featuredArticle = BLOG_DATA.find((b) => b.featured) || BLOG_DATA[0];
  const allTags = Array.from(new Set(BLOG_DATA.flatMap((b) => b.tags)));

  const filteredArticles = BLOG_DATA.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-goldLight text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>CMS-Ready Dynamic Blog Architecture (Strapi / Sanity / MongoDB Ready)</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Engineering & <span className="text-gold-gradient">Strategy Insights</span>
        </h1>
      </div>

      {/* Featured Article Banner */}
      <div className="glass-gold rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-brand-gold text-black font-bold">
              Featured Article
            </span>
            <span className="text-brand-goldLight">{featuredArticle.category}</span>
            <span className="text-zinc-400">• {featuredArticle.readTime}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {featuredArticle.title}
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">{featuredArticle.excerpt}</p>
        </div>
        <div className="lg:col-span-4 flex lg:justify-end">
          <Link
            to={`/blog/${featuredArticle.slug}`}
            className="px-7 py-4 rounded-full bg-gold-gradient text-black font-bold text-sm shadow-gold-sm inline-flex items-center gap-2"
          >
            <span>Read Featured Article</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Search, Categories & Tags Filter Bar */}
      <div className="glass-panel rounded-3xl p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by keyword, architecture, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div className="md:col-span-7 flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gold-gradient text-black font-bold"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500 flex items-center gap-1 mr-2">
            <Tag className="w-3.5 h-3.5 text-brand-gold" /> Filter by Tag:
          </span>
          <button
            type="button"
            onClick={() => setSelectedTag("")}
            className={`px-2.5 py-1 rounded-full text-[11px] ${
              !selectedTag ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40" : "text-zinc-400"
            }`}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
              className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${
                selectedTag === tag
                  ? "bg-brand-gold text-black font-semibold border-brand-gold"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-brand-gold/40"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <MagneticTiltCard key={article.id} className="p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="text-brand-gold font-semibold">{article.category}</span>
                <span>{article.publishedAt} • {article.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{article.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{article.excerpt}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline shrink-0"
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
