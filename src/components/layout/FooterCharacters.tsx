import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkle, ShieldCheck, Lightning, Users, Crosshair, Wrench, X } from "@phosphor-icons/react";
import { IDEAKICKS_CHARACTERS, IdeakicksCharacter } from "../../data/characters";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

export function FooterCharacters() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active character is either hovered or explicitly clicked/pinned
  const activeId = hoveredId || selectedId;
  const activeCharacter = IDEAKICKS_CHARACTERS.find((c) => c.id === activeId);

  // Close pinned on escape or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setHoveredId(null);
        setSelectedId(null);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setHoveredId(null);
        setSelectedId(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="ideakicks-characters"
      className="relative w-full border-b border-white/10 pb-16 pt-2 mb-16 scroll-mt-24"
      style={{ fontFamily: SAT }}
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/08 border border-white/12 text-[#6FD179] text-xs font-semibold uppercase tracking-[0.16em] mb-3">
            <Sparkle size={13} weight="fill" />
            The Spirits of Ideakicks
          </div>
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight"
            style={{ fontFamily: CD }}
          >
            Meet the five forces powering our ecosystem
          </h3>
          <p className="text-white/60 text-sm mt-1 max-w-xl">
            Every breakthrough campaign on ideakicks is guided by these characters. Hover over any character to reveal their superpower, story, and role in our community.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/50">
          <span className="w-2 h-2 rounded-full bg-[#6FD179] animate-pulse" />
          <span>Hover to explore · Click to pin</span>
        </div>
      </div>

      {/* Characters Selector Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {IDEAKICKS_CHARACTERS.map((char) => {
          const isThisActive = activeId === char.id;

          return (
            <button
              key={char.id}
              type="button"
              onMouseEnter={() => setHoveredId(char.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedId(selectedId === char.id ? null : char.id)}
              aria-expanded={isThisActive}
              aria-label={`View information about ${char.name}`}
              className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl transition-all duration-300 backdrop-blur-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6FD179] ${
                isThisActive
                  ? "bg-white/18 border-white/40 shadow-[0_16px_40px_rgba(0,0,0,0.4)] -translate-y-2 ring-1"
                  : "bg-white/06 hover:bg-white/12 border border-white/10 hover:border-white/25 hover:-translate-y-1"
              }`}
              style={{
                ringColor: isThisActive ? char.themeColor : "transparent",
              }}
            >
              {/* Dynamic Glow Aura */}
              <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none blur-xl -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${char.glowColor} 0%, transparent 70%)`,
                  opacity: isThisActive ? 0.6 : 0,
                }}
              />

              {/* Character Avatar Canvas */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2.5 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle, ${char.glowColor} 0%, rgba(255,255,255,0.03) 70%)`,
                    border: `1.5px solid ${char.themeColor}44`,
                  }}
                />
                <img
                  src={char.svg}
                  alt={char.name}
                  className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-1"
                  loading="lazy"
                />
              </div>

              {/* Title & Tag */}
              <span
                className="text-sm sm:text-base font-medium text-white mb-1 group-hover:text-white transition-colors"
                style={{ fontFamily: CD }}
              >
                {char.name}
              </span>

              <span
                className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full transition-colors mb-1"
                style={{
                  backgroundColor: `${char.themeColor}22`,
                  color: char.themeColor,
                  border: `1px solid ${char.themeColor}55`,
                }}
              >
                {char.stats[0]?.label}: {char.stats[0]?.value}
              </span>

              <span className="text-[0.68rem] text-white/55 line-clamp-1 leading-snug">
                {char.role.split("&")[0]}
              </span>

              {/* Active pointer indicator */}
              <div
                className="mt-2.5 flex items-center gap-1 text-[0.65rem] transition-colors"
                style={{ color: isThisActive ? char.themeColor : "rgba(255,255,255,0.4)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: char.themeColor,
                    transform: isThisActive ? "scale(1.4)" : "scale(1)",
                  }}
                />
                <span>{isThisActive ? "Active" : "Hover to view"}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Interactive Spotlight Dossier */}
      <AnimatePresence>
        {activeCharacter && (
          <motion.div
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 12, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-6"
          >
            <div
              className="relative overflow-hidden rounded-3xl bg-[#06243E]/90 backdrop-blur-2xl border border-white/20 p-5 sm:p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
              style={{
                boxShadow: `0 20px 60px -15px ${activeCharacter.glowColor}, inset 0 1px 0 rgba(255,255,255,0.15)`,
              }}
            >
              {/* Background ambient lighting */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30"
                style={{ backgroundColor: activeCharacter.themeColor }}
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: activeCharacter.themeColor }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[170px_1fr_auto] gap-6 items-center">
                {/* Left: Large character showcase */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-3 flex items-center justify-center border transition-transform duration-500 hover:scale-105"
                    style={{
                      backgroundColor: `${activeCharacter.themeColor}12`,
                      borderColor: `${activeCharacter.themeColor}35`,
                      boxShadow: `0 12px 30px ${activeCharacter.glowColor}`,
                    }}
                  >
                    <img
                      src={activeCharacter.svg}
                      alt={activeCharacter.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                    />
                  </div>
                  <span
                    className="mt-2.5 text-[0.65rem] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${activeCharacter.themeColor}25`,
                      color: activeCharacter.themeColor,
                    }}
                  >
                    {activeCharacter.codename}
                  </span>
                </div>

                {/* Center: Details & Story */}
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4
                      className="text-2xl sm:text-3xl text-white font-medium"
                      style={{ fontFamily: CD }}
                    >
                      {activeCharacter.name}
                    </h4>
                    <span className="text-white/40 text-sm">·</span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: activeCharacter.themeColor }}
                    >
                      {activeCharacter.role}
                    </span>
                  </div>

                  <p className="text-base text-white/90 font-medium italic mb-3">
                    "{activeCharacter.tagline}"
                  </p>

                  <p className="text-sm text-white/75 leading-relaxed mb-4 max-w-2xl">
                    {activeCharacter.bio}
                  </p>

                  {/* Ecosystem Role banner */}
                  <div className="p-3.5 rounded-2xl bg-white/06 border border-white/10 flex items-start gap-3">
                    <div
                      className="p-1.5 rounded-lg mt-0.5"
                      style={{ backgroundColor: `${activeCharacter.themeColor}20`, color: activeCharacter.themeColor }}
                    >
                      <Sparkle size={16} weight="fill" />
                    </div>
                    <div>
                      <p className="text-[0.7rem] uppercase font-bold tracking-wider text-white/40">
                        Ecosystem Role
                      </p>
                      <p className="text-xs sm:text-sm text-white/90 leading-snug">
                        {activeCharacter.ecosystemRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Key Stats & Action CTA */}
                <div className="flex flex-col justify-between sm:border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 gap-5 min-w-[220px]">
                  <div>
                    <p className="text-[0.7rem] uppercase font-bold tracking-wider text-white/40 mb-3">
                      Platform Indicators
                    </p>
                    <div className="space-y-2.5">
                      {activeCharacter.stats.map((s) => (
                        <div key={s.label} className="flex items-center justify-between gap-4 text-xs">
                          <span className="text-white/60">{s.label}</span>
                          <span className="font-semibold text-white" style={{ color: activeCharacter.themeColor }}>
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={activeCharacter.link}
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group/btn shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      backgroundColor: activeCharacter.themeColor,
                      color: activeCharacter.id === "bee" || activeCharacter.id === "eagle" ? "#082D4D" : "#FFFFFF",
                    }}
                  >
                    <span>{activeCharacter.linkLabel}</span>
                    <ArrowRight size={14} weight="bold" className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
