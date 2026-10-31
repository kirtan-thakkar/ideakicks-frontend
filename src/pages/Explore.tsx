import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Clock, MagnifyingGlass, Users } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

type Category = "All" | "Technology" | "Art" | "Music" | "Film" | "Games" | "Community" | "Fashion" | "Food";
const CATEGORIES: Category[] = ["All", "Technology", "Art", "Music", "Film", "Games", "Community", "Fashion", "Food"];

const PROJECTS = [
  { id: "evo-air", title: "Evo-AIR: The Ultimate High-Performance Makeup Airbrush System", creator: "Evoluir Beauty", creatorAvatar: "/campaigns/evo-air/logo.png", category: "Technology" as Category, image: "/campaigns/evo-air/box.png", funded: 410, backers: 4205, daysLeft: 12, raised: "₹307,500", goal: "₹75,000" },
  { id: "1", title: "EcoLife: Revolutionary Solar-Powered Water Purifier", creator: "Sarah Martinez", creatorAvatar: "https://images.unsplash.com/photo-1768471126011-2e2002832826?w=200&q=80", category: "Technology" as Category, image: "https://images.unsplash.com/photo-1684326203813-3986af3ecc04?w=1200&q=80", funded: 127, backers: 2847, daysLeft: 18, raised: "₹63,500", goal: "₹50,000" },
  { id: "scrubbitt", title: "Scrubbitt: Done Before It Used To Start", creator: "Scrubbitt Home", creatorAvatar: "/campaigns/scrubbitt/logo.png", category: "Technology" as Category, image: "/campaigns/scrubbitt/banner.jpg", funded: 56, backers: 42, daysLeft: 24, raised: "₹28,000", goal: "₹50,000" },
  { id: "lumina", title: "Lumina: Biophilic Desk Light & Circadian System", creator: "Studio Nook", creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", category: "Art" as Category, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80", funded: 184, backers: 1420, daysLeft: 8, raised: "₹46,200", goal: "₹25,000" },
  { id: "soundsculpt", title: "SoundSculpt: Handcrafted Ceramic Acoustic Synthesizer", creator: "Echo Labs", creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", category: "Music" as Category, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80", funded: 92, backers: 680, daysLeft: 15, raised: "₹38,000", goal: "₹40,000" },
  { id: "horizon-film", title: "The Silent Forest: 70mm Visual Nature Documentary", creator: "WildEarth Collective", creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", category: "Film" as Category, image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80", funded: 115, backers: 910, daysLeft: 20, raised: "₹57,500", goal: "₹50,000" },
  { id: "arcadia-tabletop", title: "Chronicles of Arcadia: Modular Tabletop RPG", creator: "MythicForge Games", creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80", category: "Games" as Category, image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1200&q=80", funded: 320, backers: 3150, daysLeft: 5, raised: "₹96,000", goal: "₹30,000" },
  { id: "terra-apparel", title: "Komorebi: Zero-Waste Hemp & Organic Merino Outerwear", creator: "Atelier Terra", creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", category: "Fashion" as Category, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80", funded: 145, backers: 1280, daysLeft: 11, raised: "₹43,500", goal: "₹30,000" },
  { id: "heritage-ferment", title: "The Artisanal Miso & Fermentation Starter Vessel", creator: "Kobo Studio", creatorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80", category: "Food" as Category, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80", funded: 88, backers: 540, daysLeft: 19, raised: "₹22,000", goal: "₹25,000" },
  { id: "clean-harbors", title: "OceanGuard: Autonomous Community Harbor Skimmer", creator: "Harbor Clean Initiative", creatorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", category: "Community" as Category, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", funded: 210, backers: 2400, daysLeft: 14, raised: "₹105,000", goal: "₹50,000" },
];

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const pct = Math.min(p.funded, 100);
  return (
    <Link to={`/campaign/${p.id}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#0F4C82]/08 bg-white shadow-[0_1px_12px_rgba(8,45,77,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_34px_rgba(8,45,77,0.12)]">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10] bg-[#082D4D]/05">
          <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/45 via-[#082D4D]/05 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
              <ImageWithFallback src={p.creatorAvatar} alt={p.creator} className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-[0.75rem] font-medium drop-shadow-sm" style={{ fontFamily: SAT }}>{p.creator}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5" style={{ fontFamily: SAT }}>

          <h3 className="text-[#082D4D] leading-snug mb-2 flex-1 line-clamp-2" style={{ fontFamily: CD, fontSize: "1.0625rem", fontWeight: 500 }}>
            {p.title}
          </h3>
          <p className="mb-4 text-[0.75rem] text-[#082D4D]/45">by {p.creator}</p>

          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#082D4D]">{p.raised}</p>
              <p className="text-[0.7rem] text-[#082D4D]/45">pledged of {p.goal}</p>
            </div>
            <span className="text-[0.75rem] font-bold text-[#6FD179]">{p.funded}%</span>
          </div>
          <div className="h-2 bg-[#082D4D]/08 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[#6FD179] rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-auto flex gap-3 text-[0.7rem] text-[#082D4D]/48">
            <span className="flex items-center gap-1"><Users size={10} />{p.backers.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{p.daysLeft}d left</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function Explore() {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [query, setQuery] = useState(qParam);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const filtered = PROJECTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.creator.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <main className="bg-[#FFFFFF] min-h-screen" style={{ fontFamily: SAT }}>

      {/* Page header */}
      <section className="relative overflow-hidden pb-14 pt-36 text-center">
        <PublicHeroGradient />
        <div className="container-base relative z-10 mx-auto max-w-2xl">
          <h1 className="heading-hero text-[#082D4D] mb-4">
            Discover Campaigns
          </h1>
          <p className="body-large text-[#082D4D]/68 max-w-xl mx-auto">
            Browse ideas with real makers, visible progress, and the context you need before backing.
          </p>
        </div>
      </section>

      <div className="container-base">
        <div className="mb-10 pb-2">
          <div className="mb-5 flex max-w-xl mx-auto items-center gap-2 rounded-full bg-[#082D4D]/05 px-5 py-3 border border-[#082D4D]/06">
            <MagnifyingGlass size={16} className="text-[#082D4D]/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search projects or creators..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#082D4D] placeholder:text-[#082D4D]/35 outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:justify-center" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-9 flex-shrink-0 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#082D4D] text-white"
                    : "bg-[#082D4D]/05 text-[#082D4D]/65 hover:bg-[#082D4D]/10 hover:text-[#082D4D]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.8125rem] font-bold text-[#082D4D]">
              {filtered.length} campaign{filtered.length !== 1 ? "s" : ""}
            </p>
            <p className="text-[0.75rem] text-[#082D4D]/45">Sorted for credibility, momentum, and creator clarity.</p>
          </div>
          <p className="text-[0.75rem] text-[#082D4D]/45">Showing {activeCategory === "All" ? "all categories" : activeCategory}</p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#0F4C82]/08 py-20 text-center px-6">
            <p className="text-[#082D4D] mb-1" style={{ fontFamily: CD, fontSize: "1.25rem", fontWeight: 500 }}>No campaigns found</p>
            <p className="text-sm text-[#082D4D]/50">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        )}

        <div className="h-16" />
      </div>
    </main>
  );
}
