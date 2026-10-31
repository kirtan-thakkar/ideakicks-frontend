import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { IDEAKICKS_CHARACTERS, IdeakicksCharacter } from "../../data/characters";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

interface CharacterStickerConfig {
  id: string;
  rotationDeg: number;
  yOffsetPx: number;
}

// 4 characters with distinct hand-tuned rotations & offsets
const CHARACTER_CONFIG: CharacterStickerConfig[] = [
  { id: "eagle", rotationDeg: -7, yOffsetPx: 6 },
  { id: "bee", rotationDeg: 5, yOffsetPx: -8 },
  { id: "octopus", rotationDeg: -4, yOffsetPx: 8 },
  { id: "owl", rotationDeg: 7, yOffsetPx: -4 },
];

export function FooterCharacters() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [activeMakersCharacter, setActiveMakersCharacter] = useState<"octopus" | "ant">("octopus");
  const containerRef = useRef<HTMLDivElement>(null);

  const activeId = hoveredId || pinnedId;

  // Build the 4 characters list (allowing swap between Octopus and Ant if user wants Ant)
  const displayedConfig = CHARACTER_CONFIG.map((cfg) => {
    if (cfg.id === "octopus" && activeMakersCharacter === "ant") {
      return { id: "ant", rotationDeg: -5, yOffsetPx: 6 };
    }
    return cfg;
  });

  const activeChar = IDEAKICKS_CHARACTERS.find((c) => c.id === activeId);

  // Close pinned on escape or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setHoveredId(null);
        setPinnedId(null);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setHoveredId(null);
        setPinnedId(null);
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
      className="relative w-full border-b border-white/10 pb-20 pt-4 mb-16 scroll-mt-24"
      style={{ fontFamily: SAT }}
    >
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/08 border border-white/15 text-[#6FD179] text-xs font-semibold tracking-wide mb-3">
            <Sparkle size={13} weight="fill" />
            Ideakicks Mascot Spirits
          </div>
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight"
            style={{ fontFamily: CD }}
          >
            Backed by character
          </h3>
          <p className="text-white/60 text-sm mt-1 max-w-xl">
            Four distinct forces guiding every project from raw spark to real-world launch. Hover over each to reveal their role.
          </p>
        </div>

        {/* Character swap toggle (Ant vs Octopus) */}
        <div className="flex items-center justify-center sm:justify-end gap-2 text-xs">
          <span className="text-white/40">3rd spirit:</span>
          <button
            type="button"
            onClick={() => setActiveMakersCharacter("octopus")}
            className={`px-2.5 py-1 rounded-full text-[0.7rem] font-medium transition-all cursor-pointer ${
              activeMakersCharacter === "octopus"
                ? "bg-white/20 text-white border border-white/40"
                : "bg-white/05 text-white/50 hover:text-white"
            }`}
          >
            Octopus
          </button>
          <button
            type="button"
            onClick={() => setActiveMakersCharacter("ant")}
            className={`px-2.5 py-1 rounded-full text-[0.7rem] font-medium transition-all cursor-pointer ${
              activeMakersCharacter === "ant"
                ? "bg-white/20 text-white border border-white/40"
                : "bg-white/05 text-white/50 hover:text-white"
            }`}
          >
            Ant
          </button>
        </div>
      </div>

      {/* 4 Playfully Tilted Character Stickers / Cards */}
      <div className="relative max-w-4xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-center gap-6 sm:gap-8 lg:gap-10 pt-4 pb-6">
        {displayedConfig.map((cfg, index) => {
          const char = IDEAKICKS_CHARACTERS.find((c) => c.id === cfg.id);
          if (!char) return null;

          const isActive = activeId === char.id;
          const isAnyActive = activeId !== null;

          return (
            <div
              key={char.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredId(char.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Character Sticker Button */}
              <button
                type="button"
                onClick={() => setPinnedId(pinnedId === char.id ? null : char.id)}
                aria-expanded={isActive}
                aria-label={`View info for ${char.name}`}
                className={`group relative flex flex-col items-center p-5 rounded-3xl cursor-pointer outline-none transition-all duration-300 ease-out backdrop-blur-md ${
                  isActive
                    ? "bg-white/20 border-2 border-white/60 shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-30"
                    : isAnyActive
                    ? "bg-white/08 border border-white/15 opacity-55 hover:opacity-100 z-10"
                    : "bg-white/10 hover:bg-white/18 border border-white/20 hover:border-white/50 shadow-[0_16px_36px_rgba(0,0,0,0.3)] z-10"
                }`}
                style={{
                  transform: isActive
                    ? "rotate(0deg) translateY(-14px) scale(1.1)"
                    : `rotate(${cfg.rotationDeg}deg) translateY(${cfg.yOffsetPx}px)`,
                  minWidth: "160px",
                }}
              >
                {/* Glowing Colored Ambient Backdrop */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl blur-xl transition-opacity duration-300 -z-10"
                  style={{
                    background: `radial-gradient(circle at center, ${char.glowColor} 0%, transparent 75%)`,
                    opacity: isActive ? 0.75 : 0,
                  }}
                />

                {/* Character Illustration */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-3">
                  <img
                    src={char.svg}
                    alt={char.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Name & Role Badge */}
                <span
                  className="text-base font-semibold text-white tracking-wide mb-1"
                  style={{ fontFamily: CD }}
                >
                  {char.name}
                </span>

                <span
                  className="text-[0.68rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${char.themeColor}25`,
                    color: char.themeColor,
                    border: `1px solid ${char.themeColor}45`,
                  }}
                >
                  {char.role.split("&")[0].trim()}
                </span>
              </button>

              {/* Floating Info Popover Card directly attached to this character */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.94 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute top-[calc(100%+16px)] z-50 w-[290px] sm:w-[320px] pointer-events-auto ${
                      index === 0
                        ? "left-0 sm:left-1/2 sm:-translate-x-1/2"
                        : index === displayedConfig.length - 1
                        ? "right-0 sm:left-1/2 sm:-translate-x-1/2"
                        : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <div
                      className="relative rounded-2xl bg-[#06243E]/95 backdrop-blur-2xl border border-white/20 p-5 text-white shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
                      style={{
                        boxShadow: `0 20px 50px -10px ${char.glowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                      }}
                    >
                      {/* Caret pointing UP to the character */}
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#06243E] border-l border-t border-white/20 transform rotate-45"
                      />

                      {/* Top aura */}
                      <div
                        className="pointer-events-none absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-40"
                        style={{ backgroundColor: char.themeColor }}
                      />

                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-semibold text-white" style={{ fontFamily: CD }}>
                              {char.name}
                            </h4>
                            <span
                              className="text-[0.62rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${char.themeColor}30`,
                                color: char.themeColor,
                              }}
                            >
                              {char.stats[0]?.value}
                            </span>
                          </div>
                          <p className="text-xs text-white/50">{char.codename}</p>
                        </div>

                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 border flex-shrink-0"
                          style={{
                            backgroundColor: `${char.themeColor}18`,
                            borderColor: `${char.themeColor}40`,
                          }}
                        >
                          <img src={char.svg} alt={char.name} className="w-full h-full object-contain" />
                        </div>
                      </div>

                      {/* Role & Quote */}
                      <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-white/70 mb-1">
                        {char.role}
                      </p>
                      <p className="text-xs text-white/90 italic font-medium leading-snug mb-3">
                        "{char.tagline}"
                      </p>

                      {/* Narrative description */}
                      <p className="text-xs leading-relaxed text-white/70 mb-3.5">
                        {char.bio}
                      </p>

                      {/* CTA link */}
                      <Link
                        to={char.link}
                        className="inline-flex items-center justify-between w-full py-2 px-3.5 rounded-xl text-xs font-semibold transition-all duration-200 group/link"
                        style={{
                          backgroundColor: char.themeColor,
                          color: char.id === "bee" || char.id === "eagle" ? "#082D4D" : "#FFFFFF",
                        }}
                      >
                        <span>{char.linkLabel}</span>
                        <ArrowRight size={13} weight="bold" className="transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
