/**
 * Dynamic Blog Data Model (Section 21):
 * Structured with standard CMS fields (id, slug, title, excerpt, content, category, tags, author, publishedAt, featured)
 * so it can be swapped seamlessly with Strapi, Sanity, WordPress GraphQL, or MongoDB API endpoints.
 */
export const BLOG_CATEGORIES = [
  "All",
  "3D & WebGL",
  "Full-Stack Engineering",
  "AI & Automation",
  "Digital Transformation",
  "UI/UX & Conversion"
];

export const BLOG_DATA = [
  {
    id: "blog-1",
    slug: "why-3d-webgl-experiences-redefine-b2b-conversion",
    title: "Why Interactive 3D & WebGL Experiences Redefine Enterprise B2B Conversion",
    excerpt:
      "How modern companies use Three.js, React Three Fiber, and scroll-driven storytelling to transform static corporate websites into high-converting digital ecosystems.",
    category: "3D & WebGL",
    tags: ["Three.js", "React Three Fiber", "GSAP", "Conversion Optimization"],
    author: "Riyadvi Architecture Team",
    authorRole: "Principal WebGL & Frontend Architects",
    publishedAt: "October 12, 2026",
    readTime: "6 min read",
    featured: true,
    content: [
      "Decision-makers evaluating technology partners spend less than 15 seconds forming an initial impression of technical capability. When a corporate website relies on generic stock photography and static cards, it signals commodity execution.",
      "By integrating real-time 3D ecosystems with React Three Fiber and GSAP ScrollTrigger, brands allow prospects to physically interact with their architecture, product twins, and methodology right inside the browser.",
      "The key to production-grade 3D on the web is balancing visual spectacle with strict performance budgets: adaptive device pixel ratios (DPR), IntersectionObserver render pausing, and graceful mobile GPU fallbacks ensure 60fps usability across every device."
    ]
  },
  {
    id: "blog-2",
    slug: "architecting-scalable-dynamic-content-systems-react-mongodb",
    title: "Architecting Scalable Multi-Page Websites with Reusable React Templates & MongoDB",
    excerpt:
      "Stop hardcoding individual service and portfolio pages. Learn how data-driven templates let your marketing and engineering teams ship new pages in minutes.",
    category: "Full-Stack Engineering",
    tags: ["React.js", "Node.js", "MongoDB", "System Architecture"],
    author: "Riyadvi Engineering Lead",
    authorRole: "Full-Stack Systems Architect",
    publishedAt: "September 28, 2026",
    readTime: "5 min read",
    featured: false,
    content: [
      "A common anti-pattern in agency web development is creating separate hardcoded components for every service offering or client case study. As the company grows, maintenance becomes brittle and inconsistent.",
      "By decoupling structured content schemas (Services, Case Studies, Blog Posts, Job Openings) from reusable React view templates, adding a new service or portfolio project requires zero UI code changes.",
      "Whether sourced from MongoDB collections, Strapi, Sanity, or headless WordPress, a unified schema contract guarantees consistent typography, SEO metadata, and cross-linking across the entire digital ecosystem."
    ]
  },
  {
    id: "blog-3",
    slug: "ai-assisted-software-engineering-human-in-the-loop",
    title: "AI-Assisted Engineering: Combining LLM Speed with Senior Architectural Control",
    excerpt:
      "AI tools accelerate boilerplate and shader prototyping, but real production quality comes from human debugging, performance profiling, and domain customization.",
    category: "AI & Automation",
    tags: ["AI Workflow", "Code Quality", "Full-Stack", "Performance"],
    author: "Riyadvi AI Practice",
    authorRole: "AI Solutions Director",
    publishedAt: "September 14, 2026",
    readTime: "7 min read",
    featured: false,
    content: [
      "Modern engineering teams leverage AI assistants for rapid scaffolding, schema drafting, and initial 3D math exploration. However, raw AI output rarely accounts for brand-specific design tokens, mobile GPU limits, or strict API validation.",
      "At Riyadvi, our AI-assisted workflow pairs rapid generation with rigorous manual refinement: every component is audited for accessibility, state cleanliness, security middleware, and Lighthouse performance.",
      "This human-in-the-loop discipline delivers 3x faster delivery timelines while maintaining enterprise-grade reliability."
    ]
  },
  {
    id: "blog-4",
    slug: "digital-health-checkup-diagnosing-growth-bottlenecks",
    title: "The 5-Pillar Digital Health Checkup: Diagnosing Hidden Revenue Bottlenecks",
    excerpt:
      "Before writing a single line of code, high-growth businesses audit their digital presence, technology stack, and conversion funnels.",
    category: "Digital Transformation",
    tags: ["Business Strategy", "Lead Generation", "CRO", "Digital Audit"],
    author: "Riyadvi Strategy Group",
    authorRole: "Digital Transformation Partners",
    publishedAt: "August 30, 2026",
    readTime: "5 min read",
    featured: false,
    content: [
      "Many software projects fail because they solve symptoms rather than root business bottlenecks. Redesigning a homepage won't fix a broken lead qualification pipeline or an unindexed product catalog.",
      "Our 6-step Business Health Checkup evaluates Website Presence, Marketing Attribution, Technology Debt, and Operational Friction to produce a prioritized transformation roadmap.",
      "When strategy precedes execution, every engineering sprint directly compounds revenue and customer retention."
    ]
  }
];

export function getBlogBySlug(slug) {
  return BLOG_DATA.find((b) => b.slug === slug) || BLOG_DATA[0];
}
