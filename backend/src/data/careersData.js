export const CAREERS_DATA = [
  {
    jobSlug: "senior-full-stack-developer-react-node",
    title: "Senior Full-Stack Developer (React.js / Node.js / 3D Web)",
    department: "Engineering",
    designation: "Senior Full-Stack Engineer",
    experience: "3–5 Years",
    location: "Chennai / Hybrid",
    type: "Full-Time",
    summary:
      "Lead the architecture and delivery of interactive full-stack web applications, 3D WebGL experiences, and scalable Node.js + MongoDB APIs for global clients.",
    responsibilities: [
      "Architect modular React.js frontends with TailwindCSS, GSAP ScrollTrigger, and React Three Fiber.",
      "Design and maintain secure RESTful APIs using Node.js, Express.js, and MongoDB.",
      "Optimize WebGL 3D scenes, code-splitting, and mobile GPU fallbacks for 90+ Lighthouse scores.",
      "Use AI-assisted development tools effectively while maintaining strict code quality and git hygiene.",
      "Collaborate with UI/UX designers and business strategists to translate client goals into technical solutions."
    ],
    requirements: [
      "Strong production experience with React.js, modern JavaScript (ES6+), and TailwindCSS.",
      "Hands-on backend proficiency with Node.js, Express.js, and MongoDB schema design.",
      "Experience with Three.js, React Three Fiber, GSAP, or Framer Motion for interactive web experiences.",
      "Solid understanding of REST API validation, error handling, and cloud deployment (Vercel / Render).",
      "Clear communication skills and a passion for clean, reusable component architecture."
    ]
  },
  {
    jobSlug: "3d-webgl-creative-developer",
    title: "3D & WebGL Creative Developer (Three.js / R3F / Blender)",
    department: "3D & Interactive",
    designation: "Creative Technologist",
    experience: "2–4 Years",
    location: "Chennai / Remote",
    type: "Full-Time",
    summary:
      "Craft immersive 3D product configurators, AR/VR WebXR environments, and scroll-driven storytelling experiences.",
    responsibilities: [
      "Build real-time 3D scenes in React Three Fiber, Three.js, and Drei.",
      "Model, retopologize, and compress GLTF/GLB assets in Blender using Draco/KTX2 pipelines.",
      "Choreograph scroll-based camera timelines using GSAP ScrollTrigger and Lenis.",
      "Profile shader and geometry performance across desktop and mobile GPUs."
    ],
    requirements: [
      "Strong portfolio of live Three.js / React Three Fiber or WebGL projects.",
      "Working knowledge of Blender for asset optimization, UV baking, and PBR materials.",
      "Familiarity with React component lifecycle and responsive canvas design.",
      "Eye for lighting, metallic/glass shaders, and fluid micro-interactions."
    ]
  },
  {
    jobSlug: "ui-ux-product-designer",
    title: "Senior UI/UX Product Designer (Design Systems & 3D Interfaces)",
    department: "Design",
    designation: "Product Designer",
    experience: "2–5 Years",
    location: "Chennai / Hybrid",
    type: "Full-Time",
    summary:
      "Design futuristic, high-converting digital products, enterprise design systems, and interactive prototypes.",
    responsibilities: [
      "Lead end-to-end UX research, wireframing, and high-fidelity Figma design systems.",
      "Create futuristic dark-and-gold glassmorphic interfaces with clear conversion hierarchy.",
      "Define motion guidelines and micro-interaction specs in collaboration with frontend engineers.",
      "Conduct usability testing and conversion rate optimization (CRO) audits."
    ],
    requirements: [
      "Mastery of Figma, auto-layout, component variants, and design tokens.",
      "Demonstrated experience designing multi-page B2B/SaaS websites and mobile applications.",
      "Understanding of responsive grids, WCAG contrast standards, and modern web animation capabilities."
    ]
  },
  {
    jobSlug: "digital-growth-seo-strategist",
    title: "Digital Growth & Technical SEO Strategist",
    department: "Marketing",
    designation: "Growth Lead",
    experience: "1–3 Years",
    location: "Chennai / On-Site",
    type: "Full-Time",
    summary:
      "Drive measurable lead generation, technical SEO dominance, and high-ROAS performance campaigns for Riyadvi and our enterprise clients.",
    responsibilities: [
      "Execute technical SEO audits, schema markup, and high-intent content strategies.",
      "Manage Google Ads, Meta, and LinkedIn conversion campaigns with strict ROAS targets.",
      "Optimize multi-step lead funnels such as the Business Health Checkup and Lead Magnet guides.",
      "Build full-funnel attribution dashboards using GA4 and CRM data."
    ],
    requirements: [
      "Proven track record in B2B/B2C lead generation, technical SEO, and paid media.",
      "Analytical mindset with proficiency in GA4, Google Tag Manager, and search consoles.",
      "Strong copywriting skills for landing pages and diagnostic funnels."
    ]
  }
];

export function getJobBySlug(jobSlug) {
  return CAREERS_DATA.find((j) => j.jobSlug === jobSlug) || CAREERS_DATA[0];
}
