import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  SquaresFour, Bookmark, TrendUp, Heart, Gear,
  ArrowSquareOut, CheckCircle, Clock, Bell,
  Rocket, CaretRight, Package, Truck, Star, PlusCircle,
  X, User, SignOut, PencilSimple, Camera, ArrowRight,
} from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const BACKED = [
  {
    id: "1",
    title: "EcoLife: Solar Water Purifier",
    creator: "Sarah Martinez",
    status: "Funded",
    statusDate: "Goal reached Feb 15, 2026",
    funded: 127,
    backers: 2847,
    pledged: "₹149",
    reward: "Early Backer Kit — Solar Purifier + Field Guide",
    rewardStatus: "In Production",
    rewardIcon: Package,
    eta: "Aug 2026",
    image: "https://images.unsplash.com/photo-1684326203813-3986af3ecc04?w=400&q=80",
    updates: 6,
  },
  {
    id: "2",
    title: "Indie Game: Starlights Chronicles",
    creator: "Pixel Dreams Studio",
    status: "Active",
    statusDate: "31 days remaining",
    funded: 89,
    backers: 1204,
    pledged: "₹25",
    reward: "Digital Edition + Soundtrack",
    rewardStatus: "Pending Funding",
    rewardIcon: Clock,
    eta: "Dec 2026",
    image: "https://images.unsplash.com/photo-1600869009498-8d429f88d4f5?w=400&q=80",
    updates: 2,
  },
  {
    id: "3",
    title: "Nomad Espresso Machine",
    creator: "BrewLab Co.",
    status: "Shipped",
    statusDate: "Delivered Apr 3, 2026",
    funded: 340,
    backers: 5822,
    pledged: "₹99",
    reward: "Nomad Espresso + Carry Case",
    rewardStatus: "Delivered",
    rewardIcon: Truck,
    eta: "Delivered",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
    updates: 14,
  },
];

const SAVED = [
  {
    id: "4",
    title: "Smart Garden System",
    creator: "GreenTech Labs",
    funded: 68,
    daysLeft: 17,
    goal: "₹40,000",
    raised: "₹27,200",
    image: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=400&q=80",
  },
  {
    id: "5",
    title: "Ocean Stories Documentary",
    creator: "Nomad Films",
    funded: 42,
    daysLeft: 38,
    goal: "₹80,000",
    raised: "₹33,600",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80",
  },
  {
    id: "6",
    title: "Modular Backpack System",
    creator: "Atlas Gear",
    funded: 215,
    daysLeft: 5,
    goal: "₹25,000",
    raised: "₹53,750",
    image: "https://images.unsplash.com/photo-1524666041070-9d87656c25ea?w=400&q=80",
  },
  {
    id: "7",
    title: "Handmade Ceramic Cookware",
    creator: "Clay & Fire Studio",
    funded: 55,
    daysLeft: 22,
    goal: "₹15,000",
    raised: "₹8,250",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
];

const NOTIFICATIONS = [
  { id: 1, type: "update", icon: Bell, title: "EcoLife posted an update", body: "Manufacturing update: first batch quality-tested and approved.", time: "2 hours ago", unread: true },
  { id: 2, type: "funded", icon: CheckCircle, title: "Nomad Espresso fully funded", body: "The campaign you backed exceeded its goal by 340%.", time: "Yesterday", unread: true },
  { id: 3, type: "review", icon: CheckCircle, title: "Profile review complete", body: "Your profile has been reviewed. You're eligible for early creator access.", time: "3 days ago", unread: false },
  { id: 4, type: "saved", icon: Bookmark, title: "Smart Garden ends soon", body: "A project you saved has 17 days remaining.", time: "4 days ago", unread: false },
  { id: 5, type: "update", icon: Bell, title: "Starlights Chronicles update", body: "Demo version now available for backers — download link in updates.", time: "1 week ago", unread: false },
];

const STATS = [
  { icon: TrendUp, value: "3", label: "Backed Projects", color: "#6FD179" },
  { icon: Heart, value: "₹273", label: "Total Pledged", color: "#6FD179" },
  { icon: Rocket, value: "1", label: "Campaigns Live", color: "#6FD179" },
  { icon: Bookmark, value: "4", label: "Saved", color: "#6FD179" },
];

type Tab = "overview" | "backed" | "saved" | "campaigns" | "notifications" | "settings";

const NAV_ITEMS: { id: Tab; label: string; icon: typeof SquaresFour; badge?: number }[] = [
  { id: "overview", label: "Overview", icon: SquaresFour },
  { id: "backed", label: "Backed Projects", icon: TrendUp },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "campaigns", label: "My Campaigns", icon: Rocket },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 2 },
  { id: "settings", label: "Settings", icon: Gear },
];

// ─── Shared card style ─────────────────────────────────────────────────────────

const CARD = "bg-white rounded-2xl border border-[#082D4D]/06 overflow-hidden";

// ─── Overview Panel ───────────────────────────────────────────────────────────

function OverviewPanel({ setTab }: { setTab: (t: Tab) => void }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#FFFFFF] rounded-2xl border border-[#082D4D]/08 p-5 lg:p-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "rgba(111,209,121,0.12)" }}
            >
              <s.icon size={15} style={{ color: "#6FD179" }} />
            </div>
            <p className="text-[#082D4D] leading-none mb-1" style={{ fontFamily: CD, fontSize: "2rem", fontWeight: 400 }}>
              {s.value}
            </p>
            <p className="text-xs text-[#082D4D]/45" style={{ fontFamily: SAT }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity + quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent backed */}
        <div className={`${CARD} lg:col-span-2`}>
          <div className="flex items-center justify-between px-6 pt-6 pb-5">
            <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>
              Recent Activity
            </h3>
            <button
              onClick={() => setTab("backed")}
              className="flex items-center gap-1 text-xs text-[#0F4C82] hover:text-[#082D4D] transition-colors"
              style={{ fontFamily: SAT }}
            >
              See all <CaretRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-[#082D4D]/05">
            {BACKED.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#082D4D] truncate text-sm" style={{ fontFamily: CD, fontWeight: 400 }}>{p.title}</p>
                  <p className="text-xs text-[#082D4D]/45 mt-0.5">Pledged {p.pledged}</p>
                </div>
                <span
                  className={`flex-shrink-0 text-[0.6875rem] px-2.5 py-1 rounded-full ${
                    p.status === "Shipped" ? "bg-[#6FD179]/12 text-[#2a8a33]" :
                    p.status === "Funded" ? "bg-[#0F4C82]/10 text-[#0F4C82]" :
                    "bg-amber-50 text-amber-700"
                  }`}
                  style={{ fontFamily: SAT }}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#082D4D] rounded-2xl p-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
            >
              <Rocket size={16} color="white" />
            </div>
            <h3 className="text-white mb-2" style={{ fontFamily: CD, fontSize: "1.0625rem", fontWeight: 400 }}>
              Launch a Campaign
            </h3>
            <p className="text-white/55 text-xs mb-5 leading-relaxed" style={{ fontFamily: SAT }}>
              Ready to bring your idea to life? Apply in 5 minutes.
            </p>
            <Link
              to="/start"
              className="inline-flex items-center gap-1.5 text-sm text-[#6FD179] hover:text-white transition-colors"
              style={{ fontFamily: SAT }}
            >
              Apply now <ArrowRight size={13} />
            </Link>
          </div>

          <div className={CARD}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h4 className="text-[#082D4D] text-sm" style={{ fontFamily: CD, fontWeight: 400 }}>Unread</h4>
              <span
                className="text-[0.625rem] bg-[#082D4D] text-white px-1.5 py-0.5 rounded-full"
                style={{ fontFamily: SAT }}
              >
                2
              </span>
            </div>
            <div className="divide-y divide-[#082D4D]/05">
              {NOTIFICATIONS.filter((n) => n.unread).map((n) => (
                <div key={n.id} className="px-5 py-3">
                  <p className="text-xs text-[#082D4D]" style={{ fontFamily: SAT }}>{n.title}</p>
                  <p className="text-xs text-[#082D4D]/40 mt-0.5" style={{ fontFamily: SAT }}>{n.time}</p>
                </div>
              ))}
            </div>
            <div className="px-5 pb-4 pt-2">
              <button
                onClick={() => setTab("notifications")}
                className="flex items-center gap-1 text-xs text-[#0F4C82] hover:text-[#082D4D] transition-colors"
                style={{ fontFamily: SAT }}
              >
                View all <CaretRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved ending soon */}
      {SAVED.filter((s) => s.daysLeft <= 17).length > 0 && (
        <div className={CARD}>
          <div className="flex items-center justify-between px-6 pt-6 pb-5">
            <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>
              Ending Soon
            </h3>
            <button
              onClick={() => setTab("saved")}
              className="flex items-center gap-1 text-xs text-[#0F4C82] hover:text-[#082D4D] transition-colors"
              style={{ fontFamily: SAT }}
            >
              View saved <CaretRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 pb-6">
            {SAVED.filter((s) => s.daysLeft <= 17).map((s) => (
              <Link key={s.id} to={`/campaign/${s.id}`} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#082D4D] truncate" style={{ fontFamily: CD, fontWeight: 400 }}>{s.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-[#082D4D]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#6FD179] rounded-full" style={{ width: `${Math.min(s.funded, 100)}%` }} />
                    </div>
                    <span className="text-xs text-amber-600 flex-shrink-0" style={{ fontFamily: SAT }}>{s.daysLeft}d left</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Backed Panel ─────────────────────────────────────────────────────────────

function BackedPanel() {
  return (
    <div className="flex flex-col gap-5">
      {BACKED.map((p) => {
        const RewardIcon = p.rewardIcon;
        return (
          <div key={p.id} className={CARD}>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-36 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1.125rem", fontWeight: 400 }}>
                    {p.title}
                  </h3>
                  <span
                    className={`flex items-center gap-1.5 text-[0.6875rem] px-3 py-1 rounded-full flex-shrink-0 ${
                      p.status === "Shipped" ? "bg-[#6FD179]/12 text-[#2a8a33]" :
                      p.status === "Funded" ? "bg-[#0F4C82]/10 text-[#0F4C82]" :
                      "bg-amber-50 text-amber-700"
                    }`}
                    style={{ fontFamily: SAT }}
                  >
                    {p.status === "Shipped" ? <Truck size={11} /> : p.status === "Funded" ? <CheckCircle size={11} /> : <Clock size={11} />}
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-[#082D4D]/45 mb-5" style={{ fontFamily: SAT }}>
                  by {p.creator} · {p.statusDate}
                </p>

                {/* Reward card */}
                <div className="flex items-start gap-3 bg-[#FFFFFF] rounded-xl p-4 mb-5 border border-[#082D4D]/06">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(15,76,130,0.08)" }}
                  >
                    <RewardIcon size={14} color="#0F4C82" />
                  </div>
                  <div>
                    <p className="text-xs text-[#082D4D]/45 mb-0.5" style={{ fontFamily: SAT }}>Your reward</p>
                    <p className="text-sm text-[#082D4D]" style={{ fontFamily: CD, fontWeight: 400 }}>{p.reward}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={`text-xs ${
                          p.rewardStatus === "Delivered" ? "text-[#6FD179]" :
                          p.rewardStatus === "In Production" ? "text-[#0F4C82]" :
                          "text-[#082D4D]/45"
                        }`}
                        style={{ fontFamily: SAT }}
                      >
                        {p.rewardStatus}
                      </span>
                      {p.eta !== "Delivered" && (
                        <>
                          <span className="text-[#082D4D]/20">·</span>
                          <span className="text-xs text-[#082D4D]/40" style={{ fontFamily: SAT }}>Est. {p.eta}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm text-[#082D4D]/55" style={{ fontFamily: SAT }}>
                    Pledged <span className="text-[#082D4D]">{p.pledged}</span>
                  </span>
                  {p.updates > 0 && (
                    <span className="text-sm text-[#082D4D]/55" style={{ fontFamily: SAT }}>
                      <span className="text-[#082D4D]">{p.updates}</span> updates
                    </span>
                  )}
                  <Link
                    to={`/campaign/${p.id}`}
                    className="flex items-center gap-1.5 text-sm text-[#0F4C82] hover:text-[#082D4D] transition-colors ml-auto"
                    style={{ fontFamily: SAT }}
                  >
                    View Campaign <ArrowSquareOut size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Saved Panel ──────────────────────────────────────────────────────────────

function SavedPanel() {
  const [saved, setSaved] = useState(SAVED.map((s) => s.id));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {SAVED.filter((p) => saved.includes(p.id)).map((p) => (
        <div
          key={p.id}
          className="group bg-white rounded-2xl border border-[#082D4D]/06 overflow-hidden hover:shadow-[0_6px_24px_rgba(8,45,77,0.09)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="relative h-44 overflow-hidden">
            <ImageWithFallback
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
            <button
              onClick={() => setSaved((s) => s.filter((id) => id !== p.id))}
              className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#082D4D]/50 hover:text-red-500 hover:bg-white transition-all"
              title="Remove from saved"
            >
              <X size={13} />
            </button>
            {p.daysLeft <= 10 && (
              <div
                className="absolute top-3 left-3 text-white text-[0.65rem] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#082D4D", fontFamily: SAT }}
              >
                {p.daysLeft}d left
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-[#082D4D] mb-0.5 line-clamp-1" style={{ fontFamily: CD, fontSize: "0.9375rem", fontWeight: 400 }}>
              {p.title}
            </h3>
            <p className="text-xs text-[#082D4D]/45 mb-4" style={{ fontFamily: SAT }}>by {p.creator}</p>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#082D4D]/70" style={{ fontFamily: SAT }}>{p.raised} raised</span>
              <span className="text-[#082D4D]" style={{ fontFamily: SAT }}>{p.funded}%</span>
            </div>
            <div className="h-1 bg-[#082D4D]/08 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#6FD179] rounded-full transition-all"
                style={{ width: `${Math.min(p.funded, 100)}%` }}
              />
            </div>
            <Link
              to={`/campaign/${p.id}`}
              className="flex items-center justify-between w-full h-10 px-4 rounded-xl bg-[#082D4D] text-white text-sm hover:bg-[#0F4C82] transition-colors"
              style={{ fontFamily: SAT }}
            >
              Back this project <CaretRight size={14} />
            </Link>
          </div>
        </div>
      ))}
      {saved.length === 0 && (
        <div className="col-span-full text-center py-16">
          <Bookmark size={28} className="mx-auto mb-3 text-[#082D4D]/20" />
          <p className="text-[#082D4D]/45 text-sm" style={{ fontFamily: SAT }}>No saved projects yet.</p>
          <Link
            to="/explore"
            className="text-sm text-[#0F4C82] hover:text-[#082D4D] transition-colors mt-1 inline-block"
            style={{ fontFamily: SAT }}
          >
            Explore campaigns
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Campaigns Panel ──────────────────────────────────────────────────────────

const MY_CAMPAIGNS = [
  {
    id: "c1",
    title: "Ether Mechanical Keyboard",
    status: "Live",
    funded: 62,
    raised: "₹93,000",
    goal: "₹150,000",
    backers: 441,
    daysLeft: 19,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
  },
  {
    id: "scrubbitt",
    title: "Scrubbitt: Done Before It Used To Start",
    status: "Live",
    funded: 56,
    raised: "₹28,000",
    goal: "₹50,000",
    backers: 42,
    daysLeft: 24,
    image: "/campaigns/scrubbitt/banner.jpg",
  },
];

function CampaignsPanel() {
  return (
    <div className="flex flex-col gap-6">
      {MY_CAMPAIGNS.map((c) => (
        <div key={c.id} className={CARD}>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-44 h-44 sm:h-auto flex-shrink-0 overflow-hidden bg-[#082D4D]/05">
              <ImageWithFallback src={c.image} alt={c.title} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 p-6 lg:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1.375rem", fontWeight: 400 }}>
                  {c.title}
                </h3>
                <span
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#6FD179]/12 text-[#2a8a33]"
                  style={{ fontFamily: SAT }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6FD179] animate-pulse" />
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                {[
                  { label: "Raised", value: c.raised },
                  { label: "Backers", value: c.backers.toLocaleString() },
                  { label: "Days Left", value: String(c.daysLeft) },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[#082D4D] leading-none mb-1" style={{ fontFamily: CD, fontSize: "1.5rem", fontWeight: 400 }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#082D4D]/45" style={{ fontFamily: SAT }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#082D4D]/60" style={{ fontFamily: SAT }}>{c.funded}% of {c.goal}</span>
                </div>
                <div className="h-1.5 bg-[#082D4D]/08 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0F4C82] rounded-full" style={{ width: `${Math.min(c.funded, 100)}%` }} />
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link
                  to={`/campaign/${c.id}`}
                  className="flex items-center gap-1.5 h-9 px-5 rounded-full bg-[#082D4D] text-white text-sm hover:bg-[#0F4C82] transition-colors"
                  style={{ fontFamily: SAT }}
                >
                  View Campaign <ArrowSquareOut size={12} />
                </Link>
                <Link
                  to={`/creator-studio/${c.id}`}
                  className="flex items-center gap-1.5 h-9 px-5 rounded-full border border-[#082D4D]/15 text-[#082D4D]/60 text-sm hover:border-[#082D4D]/30 hover:text-[#082D4D] transition-all"
                  style={{ fontFamily: SAT }}
                >
                  <PencilSimple size={13} /> Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        className="flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-[#082D4D]/15 text-center hover:border-[#082D4D]/30 transition-colors cursor-pointer group"
        onClick={() => window.location.href = "/start"}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#082D4D]/10 transition-colors"
          style={{ backgroundColor: "rgba(8,45,77,0.06)" }}
        >
          <PlusCircle size={20} color="#082D4D" style={{ opacity: 0.5 }} />
        </div>
        <p className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>
          Start a new campaign
        </p>
        <p className="text-xs text-[#082D4D]/45 mt-1" style={{ fontFamily: SAT }}>
          5-minute application, reviewed within 48 hours
        </p>
      </div>
    </div>
  );
}

// ─── Notifications Panel ──────────────────────────────────────────────────────

function NotificationsPanel() {
  const [items, setItems] = useState(NOTIFICATIONS);
  function markRead(id: number) {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));
  }
  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }
  const unreadCount = items.filter((n) => n.unread).length;

  return (
    <div className={CARD}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#082D4D]/06">
        <div className="flex items-center gap-2">
          <h3 style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400, color: "#082D4D" }}>Notifications</h3>
          {unreadCount > 0 && (
            <span
              className="text-[0.625rem] bg-[#082D4D] text-white px-1.5 py-0.5 rounded-full"
              style={{ fontFamily: SAT }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-[#0F4C82] hover:text-[#082D4D] transition-colors"
            style={{ fontFamily: SAT }}
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="divide-y divide-[#082D4D]/05">
        {items.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 px-6 py-5 transition-colors ${n.unread ? "bg-[#FFFFFF]" : ""}`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${n.unread ? "bg-[#082D4D]/10" : "bg-[#082D4D]/05"}`}
            >
              <n.icon size={15} color="#082D4D" style={{ opacity: n.unread ? 0.8 : 0.35 }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm ${n.unread ? "text-[#082D4D]" : "text-[#082D4D]/60"}`}
                style={{ fontFamily: SAT }}
              >
                {n.title}
              </p>
              <p className="text-xs text-[#082D4D]/45 mt-0.5 leading-relaxed" style={{ fontFamily: SAT }}>{n.body}</p>
              <p className="text-xs text-[#082D4D]/30 mt-1" style={{ fontFamily: SAT }}>{n.time}</p>
            </div>
            {n.unread && (
              <button
                onClick={() => markRead(n.id)}
                className="flex-shrink-0 w-2 h-2 rounded-full bg-[#0F4C82] mt-2 hover:opacity-60 transition-opacity"
                title="Mark as read"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

const INPUT = "w-full h-11 px-4 rounded-xl border border-[#082D4D]/12 bg-[#FFFFFF] text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm";
const LABEL = "block text-[0.65rem] tracking-widest uppercase text-[#082D4D]/40 mb-1.5";

function SettingsPanel() {
  const [form, setForm] = useState({
    name: "Alex Johnson",
    username: "alexj",
    email: "alex@example.com",
    bio: "Passionate backer of creative and sustainable projects.",
    twitter: "@alexj",
    website: "",
    newsletter: true,
    projectUpdates: true,
    campaignAlerts: false,
  });
  const [saved, setSaved] = useState(false);

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }
  function toggle(k: string) {
    setForm((f) => ({ ...f, [k]: !(f as Record<string, unknown>)[k] }));
  }
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 items-stretch">
      {/* Main Column */}
      <div className="flex flex-col h-full">
        {/* Profile */}
      <div className={`${CARD} h-full flex flex-col`}>
        <div className="px-6 pt-6 pb-1">
          <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>Profile</h3>
        </div>
        <div className="px-6 py-5 border-b border-[#082D4D]/06">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: "#082D4D", fontFamily: CD, fontSize: "1.375rem", fontWeight: 400 }}
              >
                {form.name.charAt(0)}
              </div>
              <button
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#0F4C82] transition-colors"
                style={{ backgroundColor: "#0F4C82" }}
              >
                <Camera size={11} color="white" />
              </button>
            </div>
            <div>
              <p className="text-[#082D4D]" style={{ fontFamily: CD, fontWeight: 400 }}>{form.name}</p>
              <p className="text-sm text-[#082D4D]/45" style={{ fontFamily: SAT }}>@{form.username}</p>
              <p className="text-xs text-[#082D4D]/30 mt-0.5" style={{ fontFamily: SAT }}>Member since January 2024</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSave} className="px-6 py-5 flex flex-col gap-4 flex-1">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL} style={{ fontFamily: SAT }}>Display Name</label>
              <input type="text" value={form.name} onChange={set("name")} className={INPUT} style={{ fontFamily: SAT }} />
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: SAT }}>Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#082D4D]/40" style={{ fontFamily: SAT }}>@</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={set("username")}
                  className={INPUT + " pl-7"}
                  style={{ fontFamily: SAT }}
                />
              </div>
            </div>
          </div>
          <div>
            <label className={LABEL} style={{ fontFamily: SAT }}>Email Address</label>
            <input type="email" value={form.email} onChange={set("email")} className={INPUT} style={{ fontFamily: SAT }} />
          </div>
          <div className="flex-1 flex flex-col">
            <label className={LABEL} style={{ fontFamily: SAT }}>Bio</label>
            <textarea
              value={form.bio}
              onChange={set("bio")}
              className="w-full px-4 py-3 rounded-xl border border-[#082D4D]/12 bg-[#FFFFFF] text-[#082D4D] outline-none focus:border-[#0F4C82] transition-colors text-sm resize-none flex-1 min-h-[5rem]"
              style={{ fontFamily: SAT }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL} style={{ fontFamily: SAT }}>TwitterLogo / X</label>
              <input
                type="text"
                value={form.twitter}
                onChange={set("twitter")}
                placeholder="@handle"
                className={INPUT}
                style={{ fontFamily: SAT }}
              />
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: SAT }}>Website</label>
              <input
                type="text"
                value={form.website}
                onChange={set("website")}
                placeholder="https://"
                className={INPUT}
                style={{ fontFamily: SAT }}
              />
            </div>
          </div>
          <div className="pt-2 mt-auto">
            <button
              type="submit"
              className={`h-10 px-7 rounded-full text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                saved ? "bg-[#6FD179] text-white" : "bg-[#082D4D] text-white hover:bg-[#0F4C82]"
              }`}
              style={{ fontFamily: SAT }}
            >
              {saved ? <><CheckCircle size={14} /> Saved</> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      </div>

      {/* Sidebar Column */}
      <div className="flex flex-col gap-6 h-full">
        {/* Notification preferences */}
        <div className={CARD}>
        <div className="px-6 pt-6 pb-4">
          <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>Notifications</h3>
        </div>
        <div className="px-6 pb-5">
          {[
            { key: "newsletter", label: "Newsletter & platform news" },
            { key: "projectUpdates", label: "Updates from backed campaigns" },
            { key: "campaignAlerts", label: "Campaigns ending soon" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-4 border-t border-[#082D4D]/05 first:border-t-0">
              <span className="text-sm text-[#082D4D]/75" style={{ fontFamily: SAT }}>{label}</span>
              <button
                onClick={() => toggle(key)}
                className="relative flex-shrink-0"
                style={{ width: "40px", height: "22px" }}
              >
                <div
                  className="absolute inset-0 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: (form as Record<string, unknown>)[key] ? "#082D4D" : "rgba(8,45,77,0.15)" }}
                />
                <div
                  className="w-4 h-4 bg-white rounded-full shadow absolute top-[3px] transition-all duration-200"
                  style={{ left: (form as Record<string, unknown>)[key] ? "22px" : "3px" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className={CARD}>
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>Security</h3>
          <p className="text-xs text-[#082D4D]/40 mt-1" style={{ fontFamily: SAT }}>Keep your account safe.</p>
        </div>
        <div className="px-6 pb-6 pt-4 flex flex-col gap-3">
          <button
            className="w-full flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-[#082D4D]/12 text-sm text-[#082D4D]/80 hover:border-[#082D4D]/30 hover:text-[#082D4D] transition-all bg-[#FAFBFD]"
            style={{ fontFamily: SAT }}
          >
            Change Password
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-[#082D4D]/12 text-sm text-[#082D4D]/80 hover:border-[#082D4D]/30 hover:text-[#082D4D] transition-all bg-[#FAFBFD]"
            style={{ fontFamily: SAT }}
          >
            Enable 2FA
          </button>
        </div>
      </div>

      {/* Account */}
      <div className={`${CARD} flex-1 flex flex-col justify-end`}>
        <div className="px-6 pt-6 pb-2 mb-auto">
          <h3 className="text-[#082D4D]" style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400 }}>Account</h3>
          <p className="text-xs text-[#082D4D]/40 mt-1" style={{ fontFamily: SAT }}>Manage your account access and data.</p>
        </div>
        <div className="px-6 pb-6 pt-4 flex flex-col gap-3">
          <button
            className="w-full flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-[#082D4D]/15 text-sm text-[#082D4D]/60 hover:border-[#082D4D]/30 hover:text-[#082D4D] transition-all"
            style={{ fontFamily: SAT }}
          >
            <SignOut size={13} /> Sign Out
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-red-200 text-sm text-red-400 hover:border-red-400 hover:text-red-600 transition-all"
            style={{ fontFamily: SAT }}
          >
            Delete Account
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function Dashboard() {
  const location = useLocation();
  const initialTab = location.hash === "#settings" ? "settings" : "overview";
  const [tab, setTab] = useState<Tab>(initialTab as Tab);

  useEffect(() => {
    if (location.hash === "#settings") {
      setTab("settings");
    }
  }, [location.hash]);

  return (
    <main className="bg-[#FFFFFF] min-h-screen" style={{ fontFamily: SAT }}>
      {/* ── Profile Banner ────────────────────────────────────────────── */}
      <div className="bg-[#082D4D] pt-32 pb-16">
        <div className="container-base flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center text-white ring-4 ring-[#FFFFFF]/10 flex-shrink-0"
              style={{ backgroundColor: "rgba(255,250,240,0.12)", fontFamily: CD, fontSize: "2.5rem", fontWeight: 400 }}
            >
              A
            </div>
            <div className="mb-2">
              <h1 className="text-white mb-1" style={{ fontFamily: CD, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400 }}>
                Alex Johnson
              </h1>
              <p className="text-white/60 text-sm mb-3" style={{ fontFamily: SAT }}>@alexj</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <span className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                  <TrendUp size={13} className="text-[#6FD179]" /> 3 Backed
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                  <Rocket size={13} className="text-[#6FD179]" /> 1 Campaign
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                  <Bookmark size={13} className="text-[#6FD179]" /> 4 Saved
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link
              to="/explore"
              className="flex items-center gap-2 h-10 px-5 bg-white/10 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
              style={{ fontFamily: SAT }}
            >
              Discover Projects
            </Link>
            <Link
              to="/start"
              className="flex items-center gap-2 h-10 px-5 bg-[#6FD179] text-[#082D4D] font-medium text-sm rounded-full hover:bg-[#5bc468] transition-colors"
              style={{ fontFamily: SAT }}
            >
              <PlusCircle size={14} /> New Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ───────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-[#FFFFFF]/80 backdrop-blur-xl border-b border-[#082D4D]/08">
        <div className="container-base overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-1 md:gap-4 w-max py-3">
            {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all duration-200 relative ${
                  tab === id
                    ? "bg-[#082D4D] text-white"
                    : "text-[#082D4D]/60 hover:text-[#082D4D] hover:bg-[#082D4D]/05"
                }`}
                style={{ fontFamily: SAT }}
              >
                <Icon size={14} />
                {label}
                {badge && badge > 0 && (
                  <span
                    className={`ml-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center ${
                      tab === id ? "bg-[#6FD179] text-[#082D4D]" : "bg-[#082D4D] text-white"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="container-base py-10 lg:py-16">
        {tab === "overview" && <OverviewPanel setTab={setTab} />}
        {tab === "backed" && <BackedPanel />}
        {tab === "saved" && <SavedPanel />}
        {tab === "campaigns" && <CampaignsPanel />}
        {tab === "notifications" && <NotificationsPanel />}
        {tab === "settings" && (
          <div className="max-w-5xl mx-auto">
            <SettingsPanel />
          </div>
        )}
      </div>
    </main>
  );
}
