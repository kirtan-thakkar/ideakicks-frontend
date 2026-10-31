export interface IdeakicksCharacter {
  id: string;
  name: string;
  title: string;
  animal: string;
  tagline: string;
  bio: string;
  svg: string;
  png: string;
  link: string;
  linkLabel: string;
  rotationDeg: number;
  yOffsetPx: number;
}

export const IDEAKICKS_CHARACTERS: IdeakicksCharacter[] = [
  {
    id: "navi",
    name: "Navi",
    title: "The Creator",
    animal: "Octopus",
    tagline: "Eight arms of ingenuity mastering every moving part of the build.",
    bio: "The creative architect of ideakicks. Navi juggles industrial design, story crafting, and engineering with effortless agility to bring bold visions to life.",
    svg: "/characters/octopus.svg",
    png: "/characters/octopus.png",
    link: "/start",
    linkLabel: "Start as Creator",
    rotationDeg: -6,
    yOffsetPx: 6,
  },
  {
    id: "bodhi",
    name: "Bodhi",
    title: "The Mentor",
    animal: "Owl",
    tagline: "Wise eyes watching over platform trust, authenticity, and merit.",
    bio: "The guardian of quality. Bodhi personally reviews prototypes within 48 hours, providing honest human feedback and strategic guidance without bots or algorithms.",
    svg: "/characters/owl.svg",
    png: "/characters/owl.png",
    link: "/about",
    linkLabel: "Review Promise",
    rotationDeg: 4,
    yOffsetPx: -8,
  },
  {
    id: "mimi",
    name: "Mimi",
    title: "The Vendor",
    animal: "Bee",
    tagline: "Industrious partner turning supply chains into a sweet, humming hive.",
    bio: "The trusted production powerhouse. Mimi connects validated creators to reliable tooling, component sourcing, packaging, and zero-commission fulfillment.",
    svg: "/characters/bee.svg",
    png: "/characters/bee.png",
    link: "/partners",
    linkLabel: "Vendor Network",
    rotationDeg: -4,
    yOffsetPx: 8,
  },
  {
    id: "myrme",
    name: "Myrme",
    title: "The Backers",
    animal: "Ant",
    tagline: "Carrying 50x their weight to turn early sparks into cultural shifts.",
    bio: "The unstoppable foundation. Myrme represents the discerning backer community that rallies behind ambitious creators with early belief and escrow-protected pledges.",
    svg: "/characters/ant.svg",
    png: "/characters/ant.png",
    link: "/backers",
    linkLabel: "Explore Backer Perks",
    rotationDeg: 5,
    yOffsetPx: -6,
  },
  {
    id: "avari",
    name: "Avari",
    title: "The Venture Capitalist",
    animal: "Eagle",
    tagline: "High-altitude vision spotting breakthrough innovations on the horizon.",
    bio: "The long-range strategic patron. Avari soars above algorithmic noise to identify category-defining products and fuel large-scale commercial expansion.",
    svg: "/characters/eagle.svg",
    png: "/characters/eagle.png",
    link: "/explore",
    linkLabel: "Discover Projects",
    rotationDeg: -5,
    yOffsetPx: 5,
  },
];
