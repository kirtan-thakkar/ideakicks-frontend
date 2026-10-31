import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowsClockwise } from "@phosphor-icons/react";
import { IDEAKICKS_CHARACTERS, IdeakicksCharacter } from "../../data/characters";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

export function FooterCharacters() {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close flipped card on escape or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setFlippedCardId(null);
    }
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFlippedCardId(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleCardClick(id: string) {
    setFlippedCardId((prev) => (prev === id ? null : id));
  }

  return (
    <div
      ref={containerRef}
      id="ideakicks-characters"
      className="relative w-full border-b border-white/10 pb-24 pt-4 mb-16 scroll-mt-24"
      style={{ fontFamily: SAT }}
    >
      {/* Editorial Header */}
      <div className="mb-14 text-center sm:text-left">
        <h3
          className="text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight mb-2"
          style={{ fontFamily: CD }}
        >
          Backed by character
        </h3>
        <p className="text-white/65 text-base sm:text-lg max-w-xl">
          Hover on desktop or tap on mobile to reveal their story.
        </p>
      </div>

      {/* 5 3D Flip Character Cards */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 pt-4 pb-10">
        {IDEAKICKS_CHARACTERS.map((char) => {
          const isFlipped = flippedCardId === char.id;

          return (
            <div
              key={char.id}
              className="flip-card-container group h-[420px] w-full max-w-[320px] mx-auto lg:max-w-none cursor-pointer select-none transition-transform duration-500 ease-out"
              style={{
                transform: isFlipped
                  ? "rotate(0deg) translateY(-10px) scale(1.02)"
                  : `rotate(${char.rotationDeg}deg) translateY(${char.yOffsetPx}px)`,
              }}
              onClick={() => handleCardClick(char.id)}
              role="region"
              aria-label={`${char.name} - ${char.title}. Hover or tap to flip.`}
            >
              <div className={`flip-card-inner rounded-3xl ${isFlipped ? "is-flipped" : ""}`}>
                {/* ─── FRONT FACE ─── */}
                <div className="flip-card-front bg-white/08 hover:bg-white/12 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-[#6FD179]/60 shadow-[0_16px_36px_rgba(0,0,0,0.35)] flex flex-col items-center justify-between transition-colors duration-300">
                  {/* Subtle top indicator */}
                  <div className="w-full flex items-center justify-end text-white/40 group-hover:text-[#6FD179] transition-colors">
                    <span className="text-[0.7rem] flex items-center gap-1 font-medium">
                      <ArrowsClockwise size={13} className="transition-transform duration-500 group-hover:rotate-180" />
                      Flip
                    </span>
                  </div>

                  {/* Character Illustration */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center my-auto">
                    {/* Soft ambient glow behind illustration */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-full blur-2xl transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle, rgba(111,209,121,0.35) 0%, transparent 70%)",
                      }}
                    />
                    <img
                      src={char.svg}
                      alt={`${char.name} - ${char.title}`}
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_14px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Character Name & Role */}
                  <div className="text-center w-full pt-2">
                    <h4
                      className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-[#6FD179] transition-colors"
                      style={{ fontFamily: CD }}
                    >
                      {char.name}
                    </h4>
                    <p className="text-sm text-white/75 font-medium mt-1">
                      {char.title}
                    </p>
                  </div>
                </div>

                {/* ─── BACK FACE ─── */}
                <div
                  className="flip-card-back bg-[#06243E] backdrop-blur-2xl rounded-3xl p-6 border-2 border-[#6FD179]/70 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between text-white"
                  onClick={(e) => {
                    // Prevent closing when clicking links or buttons on the back
                    if ((e.target as HTMLElement).closest("a")) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {/* Top Bar: Icon + Name */}
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 p-1.5 border border-white/20 flex-shrink-0 flex items-center justify-center">
                      <img src={char.svg} alt={char.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4
                        className="text-xl sm:text-2xl font-semibold text-white leading-tight"
                        style={{ fontFamily: CD }}
                      >
                        {char.name}
                      </h4>
                      <p className="text-xs text-[#6FD179] font-semibold uppercase tracking-wider">
                        {char.title}
                      </p>
                    </div>
                  </div>

                  {/* Middle Content: Tagline & Bio */}
                  <div className="my-auto py-2">
                    <p className="text-sm text-white/95 italic font-medium leading-snug mb-3">
                      "{char.tagline}"
                    </p>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {char.bio}
                    </p>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="pt-3 border-t border-white/10">
                    <Link
                      to={char.link}
                      className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-[#6FD179] text-[#082D4D] hover:bg-[#5bc468] transition-all duration-200 group/link shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{char.linkLabel}</span>
                      <ArrowRight size={14} weight="bold" className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
