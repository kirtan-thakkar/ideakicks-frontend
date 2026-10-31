import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { List, MagnifyingGlass, User, X, CaretDown } from "@phosphor-icons/react";
import { Logo } from "./Logo";

type NavItem = {
  label: string;
  href?: string;
  isDropdown?: boolean;
  items?: { label: string; href: string }[];
};

const NAV_LINKS: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "How It Works", href: "/how-it-works" },
  { 
    label: "Solutions", 
    isDropdown: true,
    items: [
      { label: "For Creators", href: "/start" },
      { label: "For Backers", href: "/backers" },
      { label: "For Partners", href: "/partners" }
    ]
  },
  { label: "About Us", href: "/about" },
];

const GRADIENT_HEADER_ROUTES = new Set([
  "/",
  "/explore",
  "/start",
  "/how-it-works",
  "/about",
  "/backers",
  "/partners",
  "/vendors",
  "/pricing",
  "/success-stories",
  "/contact",
  "/legal",
]);

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [glassProgress, setGlassProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const usesGradientHeader = GRADIENT_HEADER_ROUTES.has(location.pathname);

  // Dynamic glass calculation on scroll - transitions quickly within 24px of scroll
  useEffect(() => {
    const updateGlassProgress = () => {
      if (!usesGradientHeader) {
        setGlassProgress(1);
        return;
      }

      // Smoothly transition into frosted glass within the first 24px of scroll
      const progress = Math.min(1, Math.max(0, window.scrollY / 24));
      setGlassProgress(progress);
    };

    updateGlassProgress();
    window.addEventListener("scroll", updateGlassProgress, { passive: true });
    window.addEventListener("resize", updateGlassProgress);
    return () => {
      window.removeEventListener("scroll", updateGlassProgress);
      window.removeEventListener("resize", updateGlassProgress);
    };
  }, [usesGradientHeader, location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Click outside and escape key handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setSearchQuery("");
    }
  };

  // Helper to determine active state of navigation links
  const isLinkActive = (href: string, currentPath: string) => {
    if (href === currentPath) return true;
    if (href === "/start" && (currentPath.startsWith("/start") || currentPath === "/creators")) return true;
    if (href === "/partners" && (currentPath === "/partners" || currentPath === "/vendors")) return true;
    if (href === "/backers" && currentPath === "/backers") return true;
    if (href === "/how-it-works" && currentPath === "/how-it-works") return true;
    if (href === "/about" && currentPath === "/about") return true;
    if (href === "/explore" && (currentPath === "/explore" || currentPath.startsWith("/campaign"))) return true;
    return false;
  };

  const effectiveGlass = mobileOpen || searchOpen ? 1 : glassProgress;
  const backgroundAlpha = usesGradientHeader ? (effectiveGlass > 0.05 ? 0.94 : 0.02) : 0.95;
  const blurAmount = effectiveGlass > 0.05 ? 20 : 0;
  const borderAlpha = effectiveGlass > 0.05 ? 0.08 : 0;
  const shadowStyle = effectiveGlass > 0.05 ? "0 4px 20px rgba(8,45,77,0.06)" : "none";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-200 font-sans"
      style={{
        backgroundColor: `rgba(255,255,255,${backgroundAlpha})`,
        borderBottom: `1px solid rgba(8,45,77,${borderAlpha})`,
        backdropFilter: `blur(${blurAmount}px) saturate(${1 + effectiveGlass * 0.35})`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${1 + effectiveGlass * 0.35})`,
        boxShadow: shadowStyle,
      }}
    >
      <div className="relative flex h-[68px] items-center justify-between gap-4 container-base">
        {/* Left: Logo */}
        <Link
          to="/"
          className="relative z-10 flex-shrink-0 select-none flex items-center group transition-transform active:scale-[0.98]"
          aria-label="ideakicks home"
        >
          <Logo scale={1.5} color="#082D4D" />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 h-full items-center justify-center gap-4 xl:gap-7 px-2 transition-opacity duration-200 ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {NAV_LINKS.map((link) => {
            if (link.isDropdown) {
              const isActive = link.items!.some((item) => isLinkActive(item.href, location.pathname));
              return (
                <div key={link.label} className="relative group py-1">
                  <button
                    className={`relative flex items-center gap-1 text-[0.875rem] xl:text-[0.9375rem] transition-colors duration-200 whitespace-nowrap ${
                      isActive
                        ? "font-semibold text-[#0F4C82]"
                        : "font-medium text-[#082D4D]/70 group-hover:text-[#082D4D]"
                    }`}
                  >
                    {link.label}
                    <CaretDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6FD179] rounded-full" />
                    )}
                  </button>
                  <div className="absolute top-full pt-4 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(8,45,77,0.12)] border border-[#082D4D]/08 py-2 w-48 flex flex-col font-sans relative">
                      {link.items!.map((item) => {
                        const itemActive = isLinkActive(item.href, location.pathname);
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`px-4 py-2.5 text-sm transition-colors text-left ${
                              itemActive 
                                ? "font-semibold text-[#0F4C82] bg-[#082D4D]/04" 
                                : "text-[#082D4D]/70 hover:text-[#082D4D] hover:bg-[#082D4D]/04"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const active = isLinkActive(link.href!, location.pathname);
            return (
              <Link
                key={link.href}
                to={link.href!}
                className={`relative py-1 text-[0.875rem] xl:text-[0.9375rem] transition-colors duration-200 whitespace-nowrap ${
                  active
                    ? "font-semibold text-[#0F4C82]"
                    : "font-medium text-[#082D4D]/70 hover:text-[#082D4D]"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#6FD179] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Collapsible search */}
          <div ref={searchRef} className="relative flex items-center">
            <div
              className={`flex items-center rounded-full transition-all duration-300 overflow-hidden border ${
                searchOpen
                  ? "w-44 sm:w-56 bg-white shadow-sm border-[#082D4D]/15"
                  : "w-9 border-transparent"
              }`}
            >
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search campaigns…"
                  className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-[#082D4D] placeholder:text-[#082D4D]/40 outline-none pl-3.5 py-1.5 font-sans"
                />
              )}
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (searchOpen) setSearchQuery("");
                }}
                aria-label={searchOpen ? "Close search" : "Open search"}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-[#082D4D]/80 hover:text-[#0F4C82] transition-colors"
              >
                {searchOpen ? <X size={18} /> : <MagnifyingGlass size={18} />}
              </button>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div ref={profileRef} className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Account menu"
              className={`flex flex-shrink-0 w-9 h-9 items-center justify-center rounded-full transition-colors ${
                profileOpen
                  ? "bg-[#082D4D]/08 text-[#0F4C82]"
                  : "text-[#082D4D]/80 hover:text-[#0F4C82] hover:bg-[#082D4D]/04"
              }`}
            >
              <User size={19} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-[0_12px_36px_rgba(8,45,77,0.12)] border border-[#082D4D]/08 py-2 flex flex-col font-sans overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-[#082D4D]/06">
                  <p className="text-xs font-semibold text-[#082D4D]">Account Menu</p>
                  <p className="text-[11px] text-[#082D4D]/50 truncate">Welcome to ideakicks</p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2.5 text-sm text-[#082D4D] hover:bg-[#082D4D]/04 transition-colors font-medium flex items-center justify-between"
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/dashboard#settings"
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2.5 text-sm text-[#082D4D]/80 hover:bg-[#082D4D]/04 transition-colors flex items-center justify-between"
                >
                  <span>Settings</span>
                </Link>
                <div className="h-px bg-[#082D4D]/06 my-1" />
                <Link
                  to="/login"
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2 text-sm text-[#082D4D]/70 hover:bg-[#082D4D]/04 hover:text-[#082D4D] transition-colors text-left w-full"
                >
                  Sign In / Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Merged Sign In / Sign Up CTA */}
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-xs xl:text-sm font-bold text-[#082D4D] bg-[#6FD179] hover:bg-[#5ec468] hover:shadow-[0_2px_12px_rgba(111,209,121,0.32)] rounded-full transition-all duration-200 whitespace-nowrap active:scale-[0.98]"
          >
            Sign In / Sign Up
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center text-[#082D4D]/75 hover:text-[#082D4D] rounded-full hover:bg-[#082D4D]/04"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="flex flex-col border-t border-[#082D4D]/08 bg-white/95 px-6 pb-8 pt-4 backdrop-blur-2xl lg:hidden shadow-xl">
          {/* Mobile search bar */}
          <div className="mb-4 flex items-center gap-2 rounded-full bg-[#082D4D]/06 px-4 py-2.5">
            <MagnifyingGlass size={18} className="text-[#082D4D]/50 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search campaigns…"
              className="flex-1 min-w-0 bg-transparent text-sm text-[#082D4D] placeholder:text-[#082D4D]/40 outline-none font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[#082D4D]/40 hover:text-[#082D4D]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Mobile navigation links */}
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.label} className="flex flex-col py-2 border-b border-[#082D4D]/06">
                    <div className="text-[0.9375rem] font-medium text-[#082D4D]/75 py-2">
                      {link.label}
                    </div>
                    <div className="flex flex-col pl-4 gap-2 border-l-2 border-[#082D4D]/10 ml-2 mt-1">
                      {link.items!.map(item => {
                        const active = isLinkActive(item.href, location.pathname);
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between py-2 text-sm transition-colors ${
                              active
                                ? "font-semibold text-[#0F4C82]"
                                : "text-[#082D4D]/60 hover:text-[#0F4C82]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {active && <span className="w-1.5 h-1.5 rounded-full bg-[#6FD179] mr-2" />}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                );
              }

              const active = isLinkActive(link.href!, location.pathname);
              return (
                <Link
                  key={link.href}
                  to={link.href!}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-3 border-b border-[#082D4D]/06 text-[0.9375rem] transition-colors ${
                    active
                      ? "font-semibold text-[#0F4C82]"
                      : "text-[#082D4D]/75 hover:text-[#0F4C82]"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#6FD179]" />}
                </Link>
              );
            })}
          </div>

          {/* Mobile Action Button (Merged) */}
          <div className="mt-5 pt-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-11 px-5 text-sm font-bold text-[#082D4D] bg-[#6FD179] hover:bg-[#5ec468] rounded-full shadow-sm transition-all"
            >
              Sign In / Sign Up
            </Link>
          </div>

          {/* Secondary links */}
          <div className="mt-4 flex items-center justify-center gap-6 pt-3 border-t border-[#082D4D]/06 text-xs text-[#082D4D]/55">
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="hover:text-[#082D4D]"
            >
              Dashboard
            </Link>
            <span>·</span>
            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="hover:text-[#082D4D]"
            >
              Pricing
            </Link>
            <span>·</span>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="hover:text-[#082D4D]"
            >
              Help & Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
