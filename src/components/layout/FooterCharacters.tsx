import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { IDEAKICKS_CHARACTERS, IdeakicksCharacter } from "../../data/characters";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

export function FooterCharacters() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeId = hoveredId || pinnedId;

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/08 border border-white/15 text-[#6FD179] text-xs font-semibold tracking-wide mb-3">
            <Sparkle size={13} weight="fill" />
            The Ideakicks Archetypes
          </div>
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight"
            style={{ fontFamily: CD }}
          >
            Backed by character
          </h3>
          <p className="text-white/60 text-sm mt-1 max-w-xl">
            Meet the five forces powering our ecosystem. Hover over each character to reveal their story.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
          <span className="w-2 h-2 rounded-full bg-[#6FD179] animate-pulse" />
          <span>Interactive Character Gallery</span>
        </div>
      </div>

      {/* 5 Playfully Tilted Character Cards */}
      <div className="relative max-w-5xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-center gap-5 sm:gap-6 lg:gap-7 pt-4 pb-10">
        {IDEAKICKS_CHARACTERS.map((char, index) => {
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
                aria-label={`View info for ${char.name} - ${char.title}`}
                className={`group relative flex flex-col items-center p-4 sm:p-5 rounded-3xl cursor-pointer outline-none transition-all duration-300 ease-out backdrop-blur-md ${
                  isActive
                    ? "bg-white/20 border-2 border-[#6FD179] shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-30"
                    : isAnyActive
                    ? "bg-white/06 border border-white/15 opacity-45 hover:opacity-100 z-10"
                    : "bg-white/08 hover:bg-white/15 border border-white/20 hover:border-white/40 shadow-[0_16px_36px_rgba(0,0,0,0.3)] z-10"
                }`}
                style={{
                  transform: isActive
                    ? "rotate(0deg) translateY(-14px) scale(1.08)"
                    : `rotate(${char.rotationDeg}deg) translateY(${char.yOffsetPx}px)`,
                  minWidth: "155px",
                  maxWidth: "180px",
                }}
              >
                {/* Unified Ambient Brand Glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl blur-xl transition-opacity duration-300 -z-10"
                  style={{
                    background: "radial-gradient(circle at center, rgba(111,209,121,0.35) 0%, transparent 75%)",
                    opacity: isActive ? 0.8 : 0,
                  }}
                />

                {/* Character Illustration with Contrast Canvas */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
                  <div className="absolute inset-0 rounded-full bg-white/12 border border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/18" />
                  <img
                    src={char.svg}
                    alt={`${char.name} (${char.animal})`}
                    className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Name & Title */}
                <span
                  className="text-base font-semibold text-white tracking-wide mb-0.5"
                  style={{ fontFamily: CD }}
                >
                  {char.name}
                </span>

                <span className="text-xs text-white/80 font-medium mb-2">
                  {char.title}
                </span>

                {/* Animal badge */}
                <span className="text-[0.65rem] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/15">
                  {char.animal}
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
                    className={`absolute top-[calc(100%+14px)] z-50 w-[280px] sm:w-[310px] pointer-events-auto ${
                      index === 0
                        ? "left-0 sm:left-1/2 sm:-translate-x-1/2"
                        : index === IDEAKICKS_CHARACTERS.length - 1
                        ? "right-0 sm:left-1/2 sm:-translate-x-1/2"
                        : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <div
                      className="relative rounded-2xl bg-[#06243E]/95 backdrop-blur-2xl border border-white/20 p-5 text-white shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
                      style={{
                        boxShadow: "0 20px 50px -10px rgba(111,209,121,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                      }}
                    >
                      {/* Caret pointing UP to the character */}
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#06243E] border-l border-t border-white/20 transform rotate-45"
                      />

                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-semibold text-white" style={{ fontFamily: CD }}>
                              {char.name}
                            </h4>
                            <span className="text-[0.65rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#6FD179]/20 text-[#6FD179] border border-[#6FD179]/30">
                              {char.animal}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 font-medium">{char.title}</p>
                        </div>

                        <div className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 border border-white/15 bg-white/08 flex-shrink-0">
                          <img src={char.svg} alt={char.name} className="w-full h-full object-contain" />
                        </div>
                      </div>

                      {/* Motto */}
                      <p className="text-xs text-white/90 italic font-medium leading-snug mb-2.5">
                        "{char.tagline}"
                      </p>

                      {/* Narrative description */}
                      <p className="text-xs leading-relaxed text-white/70 mb-4">
                        {char.bio}
                      </p>

                      {/* CTA link */}
                      <Link
                        to={char.link}
                        className="inline-flex items-center justify-between w-full py-2 px-3.5 rounded-xl text-xs font-semibold bg-[#6FD179] text-[#082D4D] hover:bg-[#5bc468] transition-all duration-200 group/link"
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
