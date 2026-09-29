import {
  Profile,
  SocialLink,
  Skill,
  Technology,
  Project,
  Experience,
  Education,
  Certification,
  Achievement,
  Service,
  Testimonial,
  SiteSettings
} from '../types/portfolio.ts';

export const initialProfile: Profile = {
  name: "Alex Mercer",
  title: "Senior Full-Stack Engineer & Distributed Systems Architect",
  tagline: "Building resilient cloud architectures, real-time distributed systems, and modern web applications that scale effortlessly.",
  shortIntro: "8+ years designing fault-tolerant backends, reactive user interfaces, and cloud-native microservices. Obsessed with clean abstractions, developer ergonomics, and microsecond latencies.",
  bio: "I am a full-stack engineer and software architect with eight years of production experience scaling web services and cloud infrastructure from zero to millions of daily active users. My work spans high-throughput distributed messaging, reactive TypeScript web applications, and multi-tenant SaaS platforms.",
  aboutText: "Throughout my career, I've led technical initiatives across modern fintech and developer tools. I believe exceptional software lives at the intersection of robust type safety, predictable state machines, and ergonomic user interfaces. When I'm not tuning database query plans or benchmarking WebSockets, I contribute to open-source tooling and mentor aspiring engineers.",
  avatarUrl: "/src/assets/images/hero_dev_portrait_1790704527613.jpg",
  location: "San Francisco, CA / Remote",
  email: "deve3859@gmail.com",
  phone: "+1 (415) 890-4321",
  website: "https://alexmercer.dev",
  resumeUrl: "#resume",
  yearsOfExperience: 8,
  completedProjects: 46,
  happyClients: 32,
  technologiesCount: 28,
  isAvailableForHire: true,
  statusText: "Open to Staff/Lead Full-Stack Opportunities & Advisory"
};

export const initialSocialLinks: SocialLink[] = [
  { platform: 'github', label: 'GitHub', url: 'https://github.com', icon: 'Github', order: 1, isEnabled: true },
  { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', order: 2, isEnabled: true },
  { platform: 'twitter', label: 'X (Twitter)', url: 'https://twitter.com', icon: 'Twitter', order: 3, isEnabled: true },
  { platform: 'email', label: 'Email', url: 'mailto:deve3859@gmail.com', icon: 'Mail', order: 4, isEnabled: true },
  { platform: 'website', label: 'Personal Blog', url: 'https://alexmercer.dev', icon: 'Globe', order: 5, isEnabled: true }
];

export const initialSkills: Skill[] = [
  // Frontend
  { name: 'React 19 & Next.js App Router', category: 'Frontend', proficiency: 96, icon: 'Layers', order: 1, isEnabled: true, description: 'Server Components, SSR/SSG, Suspense streaming, dynamic route caching' },
  { name: 'TypeScript & Type-Level Metaprogramming', category: 'Frontend', proficiency: 94, icon: 'Code', order: 2, isEnabled: true, description: 'Strict typing, generic infer, AST transformation, Zod schemas' },
  { name: 'Tailwind CSS & Design Systems', category: 'Frontend', proficiency: 92, icon: 'Palette', order: 3, isEnabled: true, description: 'Component libraries, token systems, micro-interactions, responsive math' },
  { name: 'State Management & WebSockets', category: 'Frontend', proficiency: 90, icon: 'Zap', order: 4, isEnabled: true, description: 'Zustand, TanStack Query, SSE, binary protocol streaming' },

  // Backend
  { name: 'Node.js & Express / Fastify', category: 'Backend', proficiency: 95, icon: 'Server', order: 5, isEnabled: true, description: 'High-concurrency async runtimes, worker threads, stream pipelines' },
  { name: 'Go / Golang Microservices', category: 'Backend', proficiency: 88, icon: 'Cpu', order: 6, isEnabled: true, description: 'Goroutines, channel concurrency, gRPC protocols, memory optimization' },
  { name: 'REST & GraphQL APIs', category: 'Backend', proficiency: 93, icon: 'Share2', order: 7, isEnabled: true, description: 'OpenAPI 3.1, schema stitching, DataLoader, rate-limiting algorithms' },
  
  // Database
  { name: 'PostgreSQL & Drizzle / Prisma ORM', category: 'Database', proficiency: 94, icon: 'Database', order: 8, isEnabled: true, description: 'Index optimization, partitioning, vacuum strategies, ACID transactions' },
  { name: 'Redis & Upstash Cache', category: 'Database', proficiency: 91, icon: 'HardDrive', order: 9, isEnabled: true, description: 'Pub/Sub message brokers, TTL eviction, distributed locks, rate limiters' },
  { name: 'Firestore & Firebase Suite', category: 'Database', proficiency: 90, icon: 'Flame', order: 10, isEnabled: true, description: 'Real-time synchronization, composite indexing, security rules' },

  // Cloud & DevOps
  { name: 'Docker & Kubernetes', category: 'DevOps & Cloud', proficiency: 89, icon: 'Box', order: 11, isEnabled: true, description: 'Multi-stage builds, Helm charts, ingress controllers, pod scheduling' },
  { name: 'AWS & Google Cloud Platform', category: 'DevOps & Cloud', proficiency: 90, icon: 'Cloud', order: 12, isEnabled: true, description: 'Cloud Run, ECS, Lambda, IAM, VPC peering, Cloudflare Workers' },
  { name: 'CI/CD & Infrastructure as Code', category: 'DevOps & Cloud', proficiency: 92, icon: 'GitBranch', order: 13, isEnabled: true, description: 'GitHub Actions, Terraform, blue-green deployments, canary testing' },

  // Architecture & Tools
  { name: 'System Design & Distributed Consensus', category: 'Architecture & Tools', proficiency: 93, icon: 'Compass', order: 14, isEnabled: true, description: 'Event-driven architectures, saga patterns, idempotent job queues' },
  { name: 'Security & Auth Protocols', category: 'Architecture & Tools', proficiency: 91, icon: 'Shield', order: 15, isEnabled: true, description: 'OAuth2/OIDC, JWT claims, PKCE, CSRF protection, RBAC/ABAC' }
];

export const initialTechnologies: Technology[] = [
  { name: 'Next.js', category: 'Frontend', icon: 'Code', isFeatured: true, order: 1 },
  { name: 'React 19', category: 'Frontend', icon: 'Layers', isFeatured: true, order: 2 },
  { name: 'TypeScript', category: 'Languages', icon: 'FileCode', isFeatured: true, order: 3 },
  { name: 'Node.js', category: 'Backend', icon: 'Server', isFeatured: true, order: 4 },
  { name: 'PostgreSQL', category: 'Database', icon: 'Database', isFeatured: true, order: 5 },
  { name: 'Docker', category: 'DevOps', icon: 'Box', isFeatured: true, order: 6 },
  { name: 'Tailwind CSS', category: 'Styling', icon: 'Palette', isFeatured: true, order: 7 },
  { name: 'Redis', category: 'Database', icon: 'HardDrive', isFeatured: true, order: 8 },
  { name: 'GraphQL', category: 'API', icon: 'Share2', isFeatured: true, order: 9 },
  { name: 'Google Cloud', category: 'Cloud', icon: 'Cloud', isFeatured: true, order: 10 },
  { name: 'Prisma / Drizzle', category: 'Database', icon: 'Terminal', isFeatured: true, order: 11 },
  { name: 'Framer Motion', category: 'Frontend', icon: 'Play', isFeatured: true, order: 12 }
];

export const initialProjects: Project[] = [
  {
    title: "Synthex Cloud Platform",
    slug: "synthex-cloud-platform",
    shortDescription: "A distributed observability and telemetry pipeline for high-scale microservices processing over 120M metric events daily.",
    fullDescription: "Synthex is an enterprise-grade cloud telemetry control plane designed for engineering teams running distributed systems on Kubernetes. It features sub-millisecond query aggregation, custom anomaly alerting pipelines, and an interactive real-time dashboard written in Next.js and WebGL. Architected with Go ingest workers, Apache Kafka message buses, and PostgreSQL partitioned storage with TimescaleDB extensions.",
    thumbnail: "/src/assets/images/project_cloud_saas_1790704539221.jpg",
    images: ["/src/assets/images/project_cloud_saas_1790704539221.jpg"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Go", "Docker", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://synthex.example.com",
    category: "Cloud & DevOps",
    isFeatured: true,
    isPublished: true,
    order: 1,
    year: "2025",
    client: "Internal / Open-Source",
    role: "Lead Full-Stack Architect",
    metrics: "120M+ events/day, <15ms p99 query latency"
  },
  {
    title: "NeuroPulse AI Engine",
    slug: "neuropulse-ai-engine",
    shortDescription: "Developer orchestration playground for multi-agent LLM evaluation, prompt regression testing, and token usage optimization.",
    fullDescription: "NeuroPulse enables machine learning engineering teams to evaluate LLM output accuracy, compute vector embedding distance metrics, and execute multi-model benchmark matrices. Incorporates streaming token responses, side-by-side semantic diffing, and automated cost optimization algorithms. Built with React 19, FastAPI backend, Redis vector caches, and Tailwind UI.",
    thumbnail: "/src/assets/images/project_ai_platform_1790704550498.jpg",
    images: ["/src/assets/images/project_ai_platform_1790704550498.jpg"],
    technologies: ["React 19", "Python / FastAPI", "TypeScript", "Redis", "Vector DB"],
    githubUrl: "https://github.com",
    liveUrl: "https://neuropulse.example.com",
    category: "AI & Data",
    isFeatured: true,
    isPublished: true,
    order: 2,
    year: "2024",
    client: "AI Tech Accelerator",
    role: "Principal Engineer",
    metrics: "45% reduction in token infer costs"
  },
  {
    title: "Aura Commerce Architecture",
    slug: "aura-commerce-architecture",
    shortDescription: "Headless e-commerce infrastructure supporting multi-currency checkout, dynamic inventory synchronization, and edge caching.",
    fullDescription: "A high-performance headless commerce ecosystem built for enterprise retailers with global distribution. Features edge-rendered storefronts on Cloudflare Workers, real-time inventory locking with Redis redlock algorithms, and an admin CMS with granular permission models. Achieved 99+ Lighthouse performance scores across international locations.",
    thumbnail: "/src/assets/images/project_commerce_sys_1790704563559.jpg",
    images: ["/src/assets/images/project_commerce_sys_1790704563559.jpg"],
    technologies: ["Next.js", "Node.js", "Stripe API", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://aura-commerce.example.com",
    category: "Full-Stack",
    isFeatured: true,
    isPublished: true,
    order: 3,
    year: "2024",
    client: "Global Retail Brand",
    role: "Full-Stack Tech Lead",
    metrics: "99 Lighthouse score, $4.2M processed GMV"
  },
  {
    title: "Krypton Distributed Key-Value Store",
    slug: "krypton-distributed-kv",
    shortDescription: "An in-memory, Raft-consensus replicated key-value storage engine engineered in Go with HTTP/gRPC interfaces.",
    fullDescription: "A lightweight distributed storage engine implementing the Raft consensus protocol for leader election, log replication, and cluster membership reconfiguration. Includes snapshot compaction, dynamic peer discovery, and an administrative dashboard showing cluster topology and heartbeats.",
    thumbnail: "/src/assets/images/project_cloud_saas_1790704539221.jpg",
    images: ["/src/assets/images/project_cloud_saas_1790704539221.jpg"],
    technologies: ["Go", "gRPC", "Docker", "React", "TypeScript"],
    githubUrl: "https://github.com",
    category: "Distributed Systems",
    isFeatured: false,
    isPublished: true,
    order: 4,
    year: "2023",
    role: "Sole Creator",
    metrics: "Sub-5ms replication consensus"
  }
];

export const initialExperiences: Experience[] = [
  {
    company: "Vanguard Systems",
    position: "Staff Full-Stack Engineer",
    location: "San Francisco, CA (Hybrid)",
    startDate: "2023",
    endDate: "Present",
    isCurrent: true,
    description: "Spearheaded core platform modernization, transitioning legacy monoliths into distributed microservices and modern Next.js client experiences.",
    highlights: [
      "Engineered high-throughput event pipeline reducing ingest latency from 450ms to 28ms under peak load.",
      "Mentored a team of 9 engineers across frontend and backend squads; standardized TypeScript design system.",
      "Achieved 99.99% service availability across multi-region AWS and Cloud Run deployments."
    ],
    technologies: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Kubernetes", "AWS"],
    order: 1
  },
  {
    company: "Apex Cloud Labs",
    position: "Senior Software Engineer",
    location: "New York, NY (Remote)",
    startDate: "2020",
    endDate: "2023",
    isCurrent: false,
    description: "Architected developer-facing tools, real-time collaboration canvas, and relational data layers supporting 400k+ active developers.",
    highlights: [
      "Built real-time synchronization engine using WebSockets and operational transformation protocols.",
      "Optimized PostgreSQL queries and database indexing, slashing database CPU usage by 65%.",
      "Created reusable shadcn/Tailwind UI library deployed across 6 internal and customer products."
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    order: 2
  },
  {
    company: "Starlight Digital",
    position: "Full-Stack Software Engineer",
    location: "Austin, TX",
    startDate: "2018",
    endDate: "2020",
    isCurrent: false,
    description: "Designed customer-facing web applications, payment checkout integrations, and automated testing pipelines for venture-backed SaaS startups.",
    highlights: [
      "Integrated Stripe Connect and webhook processors handling $15M+ annual recurring revenue transactions.",
      "Maintained 94%+ automated test coverage using Vitest, Jest, and Playwright E2E suites."
    ],
    technologies: ["TypeScript", "React", "Express", "MongoDB", "Jest", "Stripe"],
    order: 3
  }
];

export const initialEducations: Education[] = [
  {
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science & Engineering",
    startDate: "2014",
    endDate: "2018",
    description: "Focused on Distributed Systems, Compilers, Database Internals, and Computer Architecture. Magna Cum Laude honors.",
    location: "Berkeley, CA",
    order: 1
  }
];

export const initialCertifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024",
    credentialId: "AWS-PSA-89410",
    credentialUrl: "https://aws.amazon.com/verification",
    order: 1
  },
  {
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    issueDate: "2023",
    credentialId: "GCP-PCA-33821",
    credentialUrl: "https://cloud.google.com/certification",
    order: 2
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    issueDate: "2023",
    credentialId: "CKA-77490",
    credentialUrl: "https://www.cncf.io/certification/cka/",
    order: 3
  }
];

export const initialAchievements: Achievement[] = [
  {
    title: "Open Source Contributor of the Year",
    description: "Recognized for core contributions to developer ecosystem runtime tooling and high-concurrency stream drivers.",
    metric: "4.8k+ GitHub Stars",
    year: "2024",
    order: 1
  },
  {
    title: "Keynote Speaker: Distributed Systems Summit",
    description: "Delivered technical talk on 'Zero-Downtime Schema Migrations in Active-Active PostgreSQL Clusters'.",
    metric: "1,400+ Live Attendees",
    year: "2023",
    order: 2
  },
  {
    title: "Hackathon Grand Prize Winner",
    description: "Built an autonomous real-time incident resolution bot with multi-tier failover verification in 48 hours.",
    metric: "1st Place / 180 Teams",
    year: "2022",
    order: 3
  }
];

export const initialServices: Service[] = [
  {
    title: "Full-Stack Web Application Development",
    description: "Turnkey development of responsive, accessible, high-performance web applications using modern React, Next.js, and TypeScript architectures.",
    icon: "Layout",
    features: [
      "Server-side rendering & streaming components",
      "Type-safe API layer & schema validation",
      "Responsive, mobile-first design systems",
      "Comprehensive E2E and unit test coverage"
    ],
    order: 1,
    isEnabled: true
  },
  {
    title: "Cloud Infrastructure & Backend Architecture",
    description: "Designing resilient backend microservices, database schemas, and automated deployment pipelines that withstand scale.",
    icon: "Server",
    features: [
      "PostgreSQL database modeling & query tuning",
      "High-throughput caching with Redis",
      "Containerization with Docker & Kubernetes",
      "CI/CD automated build & release workflows"
    ],
    order: 2,
    isEnabled: true
  },
  {
    title: "Technical Architecture Advisory & Auditing",
    description: "Deep-dive codebase reviews, security audits, database indexing analysis, and technical leadership for scaling teams.",
    icon: "ShieldCheck",
    features: [
      "Performance bottlenecks & latency optimization",
      "Security hardening & auth protocol review",
      "Zero-downtime database migration planning",
      "Engineering team mentoring and standards"
    ],
    order: 3,
    isEnabled: true
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    name: "Elena Rostova",
    role: "VP of Engineering",
    company: "Synthex Technologies",
    content: "Alex is that rare 1% engineer who bridges deep low-level systems architecture with flawless UI craftsmanship. He transformed our core pipeline from a fragile prototype into an rock-solid platform handling hundreds of millions of events.",
    rating: 5,
    isEnabled: true,
    order: 1
  },
  {
    name: "Marcus Sterling",
    role: "Founder & CEO",
    company: "Aura Commerce",
    content: "Working with Alex was the highest-leverage decision we made last year. He delivered our headless platform on time, with flawless performance and exceptional code quality that our internal team loves building on.",
    rating: 5,
    isEnabled: true,
    order: 2
  },
  {
    name: "Dr. Sarah Chen",
    role: "Head of Product",
    company: "NeuroPulse AI",
    content: "Alex doesn't just write code; he thinks like a product designer and system architect. His attention to detail, reliability, and technical intuition set a new bar for our engineering organization.",
    rating: 5,
    isEnabled: true,
    order: 3
  }
];

export const initialSiteSettings: SiteSettings = {
  siteTitle: "Alex Mercer | Senior Full-Stack Engineer & Architect",
  siteDescription: "Portfolio of Alex Mercer, Senior Full-Stack Engineer and Distributed Systems Architect specializing in modern TypeScript, React, Go, and cloud infrastructure.",
  author: "Alex Mercer",
  keywords: "Full-Stack Engineer, Software Architect, Next.js, TypeScript, React, PostgreSQL, Cloud Infrastructure, Docker, Distributed Systems",
  ogImage: "/src/assets/images/project_cloud_saas_1790704539221.jpg",
  favicon: "⚡",
  sectionsEnabled: {
    hero: true,
    about: true,
    skills: true,
    technologies: true,
    services: true,
    projects: true,
    experience: true,
    education: true,
    certifications: true,
    achievements: true,
    testimonials: true,
    resume: true,
    contact: true,
    footer: true
  },
  navigationLabels: {
    about: "About",
    skills: "Skills & Tech",
    services: "Services",
    projects: "Selected Work",
    experience: "Experience",
    contact: "Get in Touch"
  },
  themeDefault: "dark"
};
