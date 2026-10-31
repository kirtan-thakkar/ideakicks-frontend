import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
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
      className="relative w-full border-b border-white/10 pb-24 pt-4 mb-16 scroll-mt-24"
      style={{ fontFamily: SAT }}
    >
      {/* Editorial Header - Clean & Minimal */}
      <div className="mb-14 text-center sm:text-left">
        <h3
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight mb-2"
          style={{ fontFamily: CD }}
        >
          Backed by character
        </h3>
        <p className="text-white/65 text-base sm:text-lg max-w-xl">
          Hover over each character to reveal their story.
        </p>
      </div>

      {/* 5 Organic Characters with Rotations (No Card Boxes, No Borders) */}
      <div className="relative max-w-6xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 sm:gap-10 lg:gap-12 pt-6 pb-12">
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
              {/* Character Cutout Button - Free-floating illustration without card borders */}
              <button
                type="button"
                onClick={() => setPinnedId(pinnedId === char.id ? null : char.id)}
                aria-expanded={isActive}
                aria-label={`View info for ${char.name} - ${char.title}`}
                className={`group relative flex flex-col items-center cursor-pointer outline-none transition-all duration-300 ease-out select-none ${
                  isActive
                    ? "z-30"
                    : isAnyActive
                    ? "opacity-40 hover:opacity-100 z-10"
                    : "opacity-95 hover:opacity-100 z-10"
                }`}
                style={{
                  transform: isActive
                    ? "rotate(0deg) translateY(-16px) scale(1.12)"
                    : `rotate(${char.rotationDeg}deg) translateY(${char.yOffsetPx}px)`,
                }}
              >
                {/* Soft Ambient Glow on Hover */}
                <div
                  className="pointer-events-none absolute -inset-6 rounded-full blur-2xl transition-opacity duration-300 -z-10"
                  style={{
                    background: "radial-gradient(circle, rgba(111,209,121,0.45) 0%, transparent 70%)",
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* Character Illustration - Large & Prominent */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 flex items-center justify-center mb-3">
                  <img
                    src={char.svg}
                    alt={`${char.name} - ${char.title}`}
                    className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Character Name - Large, Clear, Clash Display */}
                <span
                  className="text-2xl sm:text-3xl font-semibold text-white tracking-tight transition-colors duration-200 group-hover:text-[#6FD179]"
                  style={{ fontFamily: CD }}
                >
                  {char.name}
                </span>

                {/* Title / Role - Legible, Clean, Satoshi */}
                <span className="text-sm sm:text-base text-white/75 font-medium mt-1 transition-colors duration-200 group-hover:text-white">
                  {char.title}
                </span>
              </button>

              {/* Floating Info Popover Card */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.94 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute top-[calc(100%+18px)] z-50 w-[310px] sm:w-[350px] pointer-events-auto ${
                      index === 0
                        ? "left-0 sm:left-1/2 sm:-translate-x-1/2"
                        : index === IDEAKICKS_CHARACTERS.length - 1
                        ? "right-0 sm:left-1/2 sm:-translate-x-1/2"
                        : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <div
                      className="relative rounded-2xl bg-[#06243E]/95 backdrop-blur-2xl border border-white/20 p-6 text-white shadow-[0_28px_65px_rgba(0,0,0,0.75)]"
                      style={{
                        boxShadow: "0 20px 50px -10px rgba(111,209,121,0.28), inset 0 1px 0 rgba(255,255,255,0.2)",
                      }}
                    >
                      {/* Caret pointing UP to the character */}
                      <div
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#06243E] border-l border-t border-white/20 transform rotate-45"
                      />

                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h4
                            className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
                            style={{ fontFamily: CD }}
                          >
                            {char.name}
                          </h4>
                          <p className="text-sm sm:text-base text-[#6FD179] font-medium mt-0.5">
                            {char.title}
                          </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5 border border-white/15 bg-white/08 flex-shrink-0">
                          <img src={char.svg} alt={char.name} className="w-full h-full object-contain" />
                        </div>
                      </div>

                      {/* Motto */}
                      <p className="text-sm sm:text-base text-white/95 italic font-medium leading-snug mb-3">
                        "{char.tagline}"
                      </p>

                      {/* Narrative description */}
                      <p className="text-sm leading-relaxed text-white/80 mb-5">
                        {char.bio}
                      </p>

                      {/* CTA link */}
                      <Link
                        to={char.link}
                        className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#6FD179] text-[#082D4D] hover:bg-[#5bc468] transition-all duration-200 group/link shadow-md hover:shadow-lg"
                      >
                        <span>{char.linkLabel}</span>
                        <ArrowRight size={15} weight="bold" className="transition-transform group-hover/link:translate-x-1" />
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
