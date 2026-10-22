import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { getBlogBySlug, BLOG_DATA } from "../data/blogData";

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getBlogBySlug(slug);
  const relatedArticles = BLOG_DATA.filter((b) => b.slug !== article.slug).slice(0, 2);

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
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-gold" />
              {article.author} ({article.authorRole})
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-gold" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-gold" />
              {article.readTime}
            </span>
          </div>
        </div>

        <div className="space-y-5 text-zinc-300 text-base leading-relaxed">
          {article.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-800">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-zinc-900 text-brand-goldLight border border-brand-gold/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              className="glass-panel rounded-2xl p-6 border border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-brand-gold font-semibold">{rel.category}</span>
                <h3 className="text-lg font-bold text-white mt-1">{rel.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{rel.excerpt}</p>
              </div>
              <Link
                to={`/blog/${rel.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold mt-4 hover:underline"
              >
                <span>Read Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
