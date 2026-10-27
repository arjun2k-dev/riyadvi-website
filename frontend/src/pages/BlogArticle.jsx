import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function BlogArticle() {
  const { slug } = useParams();
  const { blogs, getBlogBySlug } = useContent();
  const article = getBlogBySlug(slug);
  const relatedArticles = blogs.filter((b) => b.slug !== article.slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-brand-gold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Blog Insights</span>
      </Link>

      <article className="glass-panel metallic-border rounded-3xl p-8 md:p-12 space-y-8">
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <span className="px-3 py-1 rounded-full glass-gold text-brand-gold text-xs font-semibold">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-400 pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-gold" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              {article.readTime}
            </span>
          </div>
        </div>

        <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
          <p className="text-lg text-white font-medium">{article.excerpt}</p>
          {(article.content || []).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-brand-goldLight"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link
            to="/business-health-checkup"
            className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs"
          >
            Run Free Business Diagnostic
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Related Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.slug}
              to={`/blog/${rel.slug}`}
              className="glass-panel rounded-2xl p-6 border border-zinc-800 hover:border-brand-gold/40 transition-all space-y-2"
            >
              <span className="text-xs text-brand-gold font-semibold">{rel.category}</span>
              <h3 className="text-lg font-bold text-white">{rel.title}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-brand-gold pt-2">
                <span>Read Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
