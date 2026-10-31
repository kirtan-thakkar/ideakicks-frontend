export interface IdeakicksCharacter {
  id: string;
  name: string;
  codename: string;
  role: string;
  tagline: string;
  bio: string;
  superpower: string;
  ecosystemRole: string;
  themeColor: string;
  glowColor: string;
  svg: string;
  png: string;
  link: string;
  linkLabel: string;
  stats: { label: string; value: string }[];
}

export const IDEAKICKS_CHARACTERS: IdeakicksCharacter[] = [
  {
    id: "ant",
    name: "The Ant",
    codename: "Antony · The Builder",
    role: "Makers & Relentless Execution",
    tagline: "Carrying 50x its weight from blueprint to boxed product.",
    bio: "The tireless maker spirit of ideakicks. Antony represents the engineers, fabricators, and hardware builders who grind through prototypes, tooling runs, and packaging lines until the product is real.",
    superpower: "Precision Manufacturing & Heavy-lifting Execution",
    ecosystemRole: "Connects creators to vetted factory tooling, supply-chain partners, and 0% commission vendor contracts.",
    themeColor: "#6FD179",
    glowColor: "rgba(111, 209, 121, 0.45)",
    svg: "/characters/ant.svg",
    png: "/characters/ant.png",
    link: "/partners",
    linkLabel: "Explore Maker Network",
    stats: [
      { label: "Execution Grit", value: "100%" },
      { label: "Tooling Support", value: "0% Fees" },
      { label: "Focus", value: "Hardware & Craft" },
    ],
  },
  {
    id: "bee",
    name: "The Bee",
    codename: "Bea · The Pollinator",
    role: "Community Buzz & Backer Momentum",
    tagline: "Uniting the hive to turn spark into an unstoppable swarm.",
    bio: "The vibrant lifeblood of every campaign. Bea pollinates word-of-mouth excitement across communities, rallies early super-backers, and transforms great ideas into shared cultural movements.",
    superpower: "Cross-Pollination & Viral Grassroots Traction",
    ecosystemRole: "Amplifies project visibility through backer milestone rewards, community newsletters, and organic hype.",
    themeColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.45)",
    svg: "/characters/bee.svg",
    png: "/characters/bee.png",
    link: "/backers",
    linkLabel: "Join the Backer Hive",
    stats: [
      { label: "Community Buzz", value: "High" },
      { label: "Backer Network", value: "500K+" },
      { label: "Focus", value: "Social Proof & Love" },
    ],
  },
  {
    id: "eagle",
    name: "The Eagle",
    codename: "Aquila · The Visionary",
    role: "Bold Ambition & High-Altitude Vision",
    tagline: "Soaring far above algorithmic noise to spot breakout frontiers.",
    bio: "Far-sighted and fearless. Aquila sees what others miss: boundary-pushing inventions and generational products. Inspires creators to dream beyond small iterations and take daring flights.",
    superpower: "Strategic Clarity & Trend Anticipation",
    ecosystemRole: "Identifies breakthrough category creators and pairs them with growth advisors and global scale channels.",
    themeColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    svg: "/characters/eagle.svg",
    png: "/characters/eagle.png",
    link: "/start",
    linkLabel: "Launch Your Vision",
    stats: [
      { label: "Altitude", value: "Limitless" },
      { label: "Curated Spotlights", value: "Handpicked" },
      { label: "Focus", value: "Category Creation" },
    ],
  },
  {
    id: "octopus",
    name: "The Octopus",
    codename: "Octo · The Multi-Tasker",
    role: "Agile Problem-Solving & Orchestration",
    tagline: "Eight nimble arms mastering every moving part simultaneously.",
    bio: "Hyper-adaptable and brilliantly resourceful. Octo juggles industrial design, bill-of-materials, live updates, shipping customs, and backer support without breaking a sweat.",
    superpower: "Fluid Multi-Disciplinary Coordination",
    ecosystemRole: "Powers the Creator Studio workflow, keeping campaign timelines, pledge fulfillment, and inventory in sync.",
    themeColor: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.45)",
    svg: "/characters/octopus.svg",
    png: "/characters/octopus.png",
    link: "/explore",
    linkLabel: "Discover Active Projects",
    stats: [
      { label: "Coordination", value: "8 Arms" },
      { label: "Escrow Protection", value: "Milestone-Backed" },
      { label: "Focus", value: "Full-Stack Logistics" },
    ],
  },
  {
    id: "owl",
    name: "The Owl",
    codename: "Athena · The Guardian",
    role: "100% Human Review & Wise Curation",
    tagline: "Keen eyes watching over authenticity, safety, and true merit.",
    bio: "The guardian of trust on ideakicks. Athena examines every single project submission by hand within 48 hours. No algorithms or automated bots—only thoughtful, experienced human critique and guidance.",
    superpower: "Zero-Bullshit Prototype Vetting & Founder Mentorship",
    ecosystemRole: "Reviews bills of materials, tests physical prototypes, and guarantees every live campaign is genuine.",
    themeColor: "#A78BFA",
    glowColor: "rgba(167, 139, 250, 0.45)",
    svg: "/characters/owl.svg",
    png: "/characters/owl.png",
    link: "/about",
    linkLabel: "Read Our Curation Promise",
    stats: [
      { label: "Review Speed", value: "48 Hours" },
      { label: "Human Review", value: "100% Hand-Vetted" },
      { label: "Focus", value: "Trust & Quality" },
    ],
  },
];
