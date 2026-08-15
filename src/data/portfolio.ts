/**
 * Single source of truth for the site.
 *
 * Every claim here is transcribed from resume_data.json. Do not add a number,
 * a skill or a company name that is not in that file.
 *
 * Internal product codenames are kept off this surface entirely. The hardware
 * is always "our OEM headsets" and the SDK is always the "OEM SDK", because
 * the company presents itself as an OEM. See CONTEXT.md section 4.
 */

export type Metric = {
  /** Canonical text. Rendered verbatim on the server, without JS, and under
   *  reduced motion, so the correct figure is never dependent on animation. */
  value: string;
  label: string;
  /** Target for the count animation. Omit to keep the figure static. */
  to?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type WorkBlock = {
  id: string;
  title: string;
  body: string;
  tags?: string[];
};

export type Role = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  lead?: string;
  blocks?: WorkBlock[];
  bullets?: string[];
};

export type FeaturedProject = {
  id: string;
  name: string;
  kicker: string;
  status: string;
  live: boolean;
  href: string | null;
  hrefLabel: string | null;
  summary: string;
  detail: string;
  stats?: Metric[];
  tags: string[];
  /** Drives which generated visual the card renders. */
  glyph: "cortexa" | "hue" | "lens";
};

export type SmallProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  href: string;
  image: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const personal = {
  name: "Prateek Kumar",
  title: "Software Engineer, Backend & AI Systems",
  headline: "I build real-time backend, Android at Device Owner level, and AI platforms.",
  bio: "Backend engineer with 2+ years on production systems. Real-time services on Node.js and WebSockets, multi-tenant RAG infrastructure on FastAPI and pgvector, and native Android device management at Device Owner level.",
  location: "Gurugram, Delhi NCR",
  email: "prateekkhohal@outlook.com",
  phone: "+91 8901805058",
  resume: "/Assets/PDF/Prateek_Kumar_Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/prateek-khohal/",
    github: "https://github.com/prateekkhohal",
  },
};

export const metrics: Metric[] = [
  {
    value: "~0.5s",
    to: 0.5,
    prefix: "~",
    suffix: "s",
    decimals: 1,
    label: "WebRTC latency, class of 10 headsets live",
  },
  { value: "50+", to: 50, suffix: "+", label: "concurrent streams, stress tested" },
  { value: "7", to: 7, label: "deployment targets" },
  // Aggregate, not a new claim: 100+ Unity modules, 37 AR lenses, 11 client
  // projects and 6 public repos already in resume_data.json come to ~154. The
  // label names its components on purpose, so the figure can be broken down on
  // the spot. Do not restate it as "independent projects" or claim architect
  // credit across the whole count: the architecture claim belongs to the
  // platform, and it would not survive being asked to walk through three.
  // Still worth adding to the archive so resume and site agree.
  {
    value: "150+",
    to: 150,
    suffix: "+",
    label: "builds shipped: VR modules, AR lenses, client work",
  },
  {
    value: "14.5M",
    to: 14.5,
    suffix: "M",
    decimals: 1,
    label: "views on shipped consumer work",
  },
];

export const experience: Role[] = [
  {
    id: "phygitech",
    company: "Phygitech",
    role: "Software Engineer, Backend and Systems",
    dates: "03/2025 – Present",
    location: "Gurugram",
    lead: "I architected and shipped the company's real-time device fleet control platform, from first design through to production. One system, two halves: a control plane and the Android agent that answers to it.",
    blocks: [
      {
        id: "platform",
        title: "The control platform",
        body: "Next.js on a custom Node.js WebSocket server, PostgreSQL with Drizzle, and a bundled MediaMTX streaming server. It runs on AWS EC2 and is packaged for 7 targets across cloud, desktop and Android. The same codebase runs fully online against an LMS or completely air-gapped, switched by configuration alone.",
        tags: ["Next.js", "Node.js", "WebSocket", "PostgreSQL", "Drizzle", "MediaMTX", "AWS EC2"],
      },
      {
        id: "protocol",
        title: "The control protocol",
        body: "The platform is the server. The on-headset Android MDM is the client, over WebSocket on LAN or cloud. Exactly one command channel stays live at a time, so a device can never receive conflicting commands from two sources. Operators switch a fleet between LAN and cloud on the fly.",
        tags: ["Protocol design", "Real-time systems"],
      },
      {
        id: "scale",
        title: "What it holds up to",
        body: "A full class of 10 headsets in a school, every one streaming live at roughly 0.5s WebRTC latency over LAN. Stress tested to 50+ concurrent streaming connections served from mid-tier hardware. Screencasting picks one of three transports automatically, with HLS as fallback.",
        tags: ["WebRTC", "HLS", "Load testing"],
      },
      {
        id: "mdm",
        title: "Android at Device Owner privilege",
        body: "The on-device half, in Kotlin. Device Owner is granted through the OEM SDK on our own headsets, and with it silent install and uninstall, shutdown and reboot all work. Stock consumer hardware such as Oculus Quest will not grant Device Owner at all. One APK covers both cases: it detects what the platform allows and degrades cleanly, because it targets Android rather than any single hardware platform.",
        tags: ["Kotlin", "DevicePolicyManager", "AIDL", "PackageInstaller", "Room"],
      },
      {
        id: "security",
        title: "A client that is never trusted",
        body: "Role-based permission tiers, cryptographically signed offline tokens for disconnected use, and a CI guard that fails the build when access-control rules break. The server checks authority on every command rather than believing the caller.",
        tags: ["RBAC", "Applied cryptography", "CI guard"],
      },
      {
        id: "protection",
        title: "In-house content protection",
        body: "Encryption at source, with decryption running inside the Android playback path and no measurable frame impact. It removed the need for third-party DRM licensing across the content library while leaving the viewing experience untouched.",
        tags: ["Applied cryptography", "Android"],
      },
      {
        id: "ai",
        title: "AI tooling across the team",
        body: "I set up how the team uses AI for development. GitHub Copilot first, then agentic tools with custom MCP server integrations wired into their editors, and I trained colleagues on all of it. Measured roughly 40% time saved across the team.",
        tags: ["MCP", "Custom MCP servers", "Agentic workflows"],
      },
      {
        id: "content",
        title: "Learning content at scale",
        body: "100+ Unity learning modules for Grades 1 to 12 (CBSE/NCERT), built for three targets: our OEM headsets through their native SDK, OpenXR headsets, and WebGL in the browser. I wrote native Hindi, Gujarati, Marathi and Odia text renderers alongside them, and refactored the OEM SDK so Unity Editor tooling runs on macOS.",
        tags: ["Unity", "OpenXR", "WebGL"],
      },
    ],
  },
  {
    id: "wrexa",
    company: "Wrexa",
    role: "Software Developer, Interactive Applications",
    dates: "05/2024 – 03/2025",
    location: "Remote",
    bullets: [
      "Shipped 11 interactive projects for brands including Samsung and Cadbury, across Unity, PlayCanvas and Lens Studio in C#, C++ and JavaScript.",
      "Built a multi-user 3D metaverse for Samsung in PlayCanvas and WebGL, with custom avatars and live multi-user interaction.",
      "Owned the browser performance work on it, which is what let it hold frame rate on mid-range Android handsets where the first build could not.",
      "Built the Oreo Space Dunk AR lens for Cadbury in Snap AR, with face and hand tracking and physics-based gameplay.",
      "Led a team of developers and 3D artists. Ran requirement gathering directly with clients and turned briefs into technical scope.",
    ],
  },
  {
    id: "drdo",
    company: "DRDO–INMAS",
    role: "Software Developer (R&D Intern)",
    dates: "05/2023 – 07/2023",
    location: "New Delhi",
    bullets: [
      "Built a Unity VR training simulation for a defence research lab, instrumented with a real-time data analysis layer that captured trainee behaviour mid-run rather than only at the end. It cut completion time 20% against the method already in use.",
      "Wrote the telemetry pipeline behind it, so the lab could compare performance across sessions instead of scoring one final result.",
    ],
  },
];

export type ClientPhase = {
  id: string;
  step: string;
  title: string;
  body: string;
  tags: string[];
};

/**
 * The forward deployed half of the work.
 *
 * Ordered to mirror how the role is actually described in job postings:
 * requirements in the field, business logic modelled on the customer, then
 * integration against their systems, deployment under their constraints, AI
 * against their own data, and adoption inside their team.
 *
 * Sourced from the Wrexa bullets and the VR Classroom Management Platform
 * entry in engineeringProjects. The 40% AI figure is deliberately absent here:
 * it appears exactly once, in the Work section.
 *
 * Phase 05 is Cortexa, which is Prateek's own product and has no connection to
 * Phygitech. It sits in this sequence because it shows the same judgement
 * applied to a problem he identified himself, and it is labelled as his own so
 * it is never read as delivered client work.
 */
export const clientWork: ClientPhase[] = [
  {
    id: "requirements",
    step: "01",
    title: "Requirements taken in the room, not from a ticket",
    body: "At Wrexa I ran requirement gathering directly with clients and turned briefs into technical scope, across 11 projects for brands including Samsung and Cadbury. I led a team of developers and 3D artists and kept delivery on schedule. Most of that job was working out what the client actually needed before any of it became code.",
    tags: ["Requirement gathering", "Scoping", "Client-facing", "Team lead"],
  },
  {
    id: "business-logic",
    step: "02",
    title: "Business logic modelled on how the customer operates",
    body: "The control platform is built around three kinds of user: teachers, IT admins and superadmins. Each gets a different surface and holds different authority, because a teacher running a class and an admin provisioning devices want opposite things. The server checks that authority on every command rather than trusting the caller.",
    tags: ["Domain modelling", "RBAC", "Access control"],
  },
  {
    id: "integration",
    step: "03",
    title: "Integrated with the systems the customer already runs",
    body: "Login integrates with the school's LMS and falls back to a guest path, so a lesson can still start when the LMS is unreachable. The same codebase runs fully online against that LMS or completely air-gapped, switched by configuration alone, and ships to 7 deployment targets across cloud, desktop and Android.",
    tags: ["LMS integration", "Identity and access", "Config-driven", "Packaging"],
  },
  {
    id: "onsite",
    step: "04",
    title: "Deployed on site, under the site's constraints",
    body: "It runs in a real school, not a demo environment. A full class of 10 headsets streams live over the LAN, on mid-tier hardware, on a network I did not control. Screencasting picks one of three transports automatically because the right one depends on the site.",
    tags: ["On-site deployment", "Real network conditions", "Fallback paths"],
  },
  {
    id: "ai",
    step: "05",
    title: "AI built as an independent layer",
    body: "Cortexa is my own product, not client work. It is aimed at directors, lawyers and doctors who lose hours going through their own documents for one detail, and who are not going to hand that material to somebody else. Cortexa's own ingestion, retrieval and ranking does the work, each client keyed by their own salt. Generative AI sits behind that as a swappable layer, so the provider is a configuration choice and the platform depends on no single model, cloud or local.",
    tags: ["RAG", "pgvector", "Client-keyed salt", "Provider-agnostic", "My own product"],
  },
  {
    id: "adoption",
    step: "06",
    title: "Adoption, which is the part that usually fails",
    body: "I moved a team that was not using AI onto it. GitHub Copilot first, then agentic tools, with custom MCP servers wired into their editors, and I trained colleagues on all of it. Buying the tool is the easy half. Getting engineers to change how they work, and measuring whether it helped, is the half that decides whether the money was worth spending.",
    tags: ["MCP", "Custom MCP servers", "Team enablement", "Change management"],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "cortexa",
    name: "Cortexa",
    // My own product. Unconnected to Phygitech, and not client work: the
    // audience, the problem and the architecture are all mine.
    kicker: "My own product, an independent AI knowledge layer",
    status: "In development",
    live: false,
    href: null,
    hrefLabel: null,
    summary:
      "Built for the people who cannot hand a document search to somebody else. A director, a lawyer or a doctor going through their own files for one detail, on their own information, on their own hardware. Each one is a tenant in their own right, whether that is a firm or a single person.",
    detail:
      "The model is never the point. Cortexa's own layer does the work: ingestion, chunking, embedding, retrieval and ranking, with each client keyed by their own salt. Generative AI sits behind that as a swappable layer, which makes Groq, Claude, OpenAI and Ollama a configuration choice rather than an architectural one. FastAPI, pgvector for embedding search, Redis and Celery for ingestion, JWT RS256 auth.",
    tags: [
      "FastAPI",
      "PostgreSQL + pgvector",
      "Redis",
      "Celery",
      "JWT RS256",
      "Client-keyed salt",
      "Provider-agnostic",
      "Docker",
    ],
    glyph: "cortexa",
  },
  {
    id: "hue-and-seek",
    name: "Hue & Seek",
    kicker: "Hosted WebAR lens, opens on your phone with no install",
    status: "Live",
    live: true,
    href: "https://bit.ly/hue-and-seek",
    hrefLabel: "bit.ly/hue-and-seek",
    summary:
      "Rebuilds the core loop of the hit mobile game Meccha Chameleon: paint a 3D character to blend into the background before the timer runs out. It fits under 8 MB and runs straight in the browser, where the original is a full app download.",
    detail:
      "Samples real background pixels through procedural textures, paints by raycasting dabs onto capsule colliders, and scores with my own blend, creativity and coverage algorithms.",
    stats: [
      { value: "< 8 MB", to: 8, prefix: "< ", suffix: " MB", label: "total size" },
      { value: "0", to: 0, label: "installs required" },
    ],
    tags: ["Lens Studio", "TypeScript", "Snap AR", "WebAR"],
    glyph: "hue",
  },
  {
    id: "snap-portfolio",
    name: "Snap AR Lens Portfolio",
    kicker: "37 shipped lenses",
    status: "Live",
    live: true,
    href: "https://bit.ly/prateek-snap-portfolio",
    hrefLabel: "bit.ly/prateek-snap-portfolio",
    summary:
      "Brand campaigns for Castrol, Colgate and MinuteMaid, festival activations, and gameplay lenses built on face tracking, multi-object detection, VFX and physics.",
    detail:
      "Top performers: SpaceShooterAR and Highway Chase. The numbers below are lifetime, across all 37 lenses.",
    stats: [
      { value: "14.5M", to: 14.5, suffix: "M", decimals: 1, label: "views" },
      { value: "216K", to: 216, suffix: "K", label: "shares" },
    ],
    tags: ["Lens Studio", "JavaScript", "Snap AR"],
    glyph: "lens",
  },
];

export const smallProjects: SmallProject[] = [
  {
    id: "merry-snowball",
    name: "Merry Snowball Showdown",
    category: "Unity VR",
    description: "Physics-based hand-tracked throwing with real-time collision detection on HTC VIVE PRO.",
    href: "https://github.com/Prateekkhohal/Merry_Snowball_VR_Game",
    image: "/Assets/IMAGES/Merry_Snowball_Game.webp",
  },
  {
    id: "mario-2d",
    name: "Mario 2D Remake",
    category: "Unity 2D",
    description: "A 2D platformer rebuild with tile-based levels and classic run and jump movement.",
    href: "https://github.com/Prateekkhohal/Mario_2D",
    image: "/Assets/IMAGES/Mario_2D.webp",
  },
  {
    id: "color-switch",
    name: "Color Switch",
    category: "Unity 2D",
    description: "Arcade game built around colour-matched collision: the ball only passes through matching segments.",
    href: "https://github.com/Prateekkhohal/Color_Switch",
    image: "/Assets/IMAGES/Color_Switch.webp",
  },
  {
    id: "speed-racer",
    name: "Speed Racer",
    category: "Unity 3D",
    description: "A racing game built around vehicle physics and track collision handling.",
    href: "https://github.com/Prateekkhohal/Car_Racing_Game",
    image: "/Assets/IMAGES/Car_Racing_Game.webp",
  },
  {
    id: "appetizers",
    name: "Appetizers",
    category: "iOS, SwiftUI",
    description: "SwiftUI iOS app for browsing and ordering food, with a cart and an account screen.",
    href: "https://github.com/Prateekkhohal/appetizers",
    image: "/Assets/IMAGES/Appetizers.webp",
  },
  {
    id: "weather-app",
    name: "Weather App",
    category: "iOS, SwiftUI",
    description: "SwiftUI iOS weather client reading current conditions from a live forecast API.",
    href: "https://github.com/Prateekkhohal/weather--app",
    image: "/Assets/IMAGES/ios-weather.webp",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript/JavaScript", "Kotlin", "C#", "Python", "C", "C++", "SQL", "Swift"],
  },
  {
    category: "Backend & Full Stack",
    items: [
      "Node.js",
      "FastAPI",
      "Next.js (App Router)",
      "React",
      "PostgreSQL",
      "Redis",
      "WebSocket protocol design",
      "REST API design",
      "TCP binary protocols",
      "pgvector",
      "Drizzle ORM",
      "Celery",
      "WebRTC",
      "MediaMTX",
      "Tauri",
    ],
  },
  {
    category: "Mobile & Systems",
    items: [
      "Android (Kotlin)",
      "Device Owner / MDM",
      "DevicePolicyManager",
      "AIDL",
      "PackageInstaller",
      "Room",
      "Foreground Services",
    ],
  },
  {
    category: "AI-Assisted Engineering",
    items: [
      "Claude Code",
      "GitHub Copilot",
      "Codex",
      "Antigravity",
      "MCP (Model Context Protocol)",
      "Custom MCP Servers",
      "Agentic Coding Workflows",
      "Prompt Engineering",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EC2, Elastic IP, Security Groups)",
      "Docker",
      "Linux",
      "CI/CD Pipelines",
      "Multi-platform Build & Packaging",
      "Git/GitHub",
    ],
  },
  {
    category: "XR & Graphics",
    items: ["Unity (AR/VR/2D/3D)", "OpenXR", "WebGL", "PlayCanvas", "Lens Studio", "Blender"],
  },
  {
    category: "Concepts",
    items: [
      "System Design & Architecture",
      "Real-Time & Distributed Systems",
      "RAG & Vector Search",
      "RBAC / Access Control",
      "Applied Cryptography",
      "Multi-Tenant Architecture",
      "LLM Integration",
      "Data Structures & Algorithms",
    ],
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "Ch. Ranbir Singh State Institute of Engineering & Technology",
  dates: "2020 – 2024",
  note: "GATE 2024 qualified, top 14% of 124,000 candidates.",
};

export const sections = [
  { id: "work", label: "Work" },
  { id: "clients", label: "Forward Deployed" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
