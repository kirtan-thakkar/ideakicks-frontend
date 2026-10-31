import { Link } from "react-router";
import { TwitterLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { GradientCanvas } from "../common/GradientCanvas";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const NAV = [
  {
    heading: "Journeys",
    links: [
      { label: "Explore projects", to: "/explore" },
      { label: "How ideakicks works", to: "/how-it-works" },
      { label: "For Creators", to: "/start" },
      { label: "For Backers", to: "/backers" },
      { label: "For Partners", to: "/partners" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Pricing", to: "/pricing" },
      { label: "Success Stories", to: "/success-stories" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const SOCIAL = [
  { icon: TwitterLogo, label: "Twitter", href: "#" },
  { icon: InstagramLogo, label: "Instagram", href: "#" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "#" },
  { icon: YoutubeLogo, label: "YouTube", href: "#" },
];

export function Footer() {

  return (
    <footer className="relative overflow-hidden bg-[#082D4D] pt-56 text-white md:pt-64" style={{ fontFamily: SAT }}>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-95" aria-hidden="true">
        <GradientCanvas variant="footer" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#082D4D]/34 backdrop-blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.035)_18%,rgba(0,9,35,0.38)_100%),radial-gradient(ellipse_at_16%_0%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_28%,rgba(255,255,255,0)_62%),radial-gradient(ellipse_at_86%_8%,rgba(19,211,238,0.16)_0%,rgba(19,211,238,0.055)_34%,rgba(19,211,238,0)_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.96)_12%,rgba(255,255,255,0.78)_28%,rgba(255,255,255,0.48)_48%,rgba(255,255,255,0.18)_68%,rgba(255,255,255,0)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-10 z-0 h-64 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.14)_24%,rgba(0,0,0,0.44)_52%,rgba(0,0,0,0)_100%)]"
        aria-hidden="true"
      />

      {/* Main footer body */}
      <div className="relative z-10 container-base pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16">

          {/* Left: Brand block */}
          <div className="max-w-xs">
            <div className="mb-6">
              <Logo scale={1.2} color="#FFFFFF" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              A curated crowdfunding platform for ambitious creators and discerning backers. Every project reviewed by hand.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/06 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/12 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Navigation columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 lg:gap-12">
            {NAV.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-[0.65rem] tracking-[0.18em] uppercase text-[#FFFFFF] font-bold mb-5"
                  style={{ fontFamily: SAT }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/25" style={{ fontFamily: SAT }}>
            © 2026 ideakicks, Unipessoal Lda · Lisbon, Portugal
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {["Terms", "Privacy", "Cookies", "Accessibility"].map((item) => {
              const tab = item.toLowerCase() === "terms"
                ? "terms"
                : item.toLowerCase() === "privacy"
                ? "privacy"
                : item.toLowerCase() === "cookies"
                ? "cookies"
                : "accessibility";
              return (
                <Link
                  key={item}
                  to={`/legal?tab=${tab}`}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
                  style={{ fontFamily: SAT }}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
