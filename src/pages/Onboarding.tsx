import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Lightbulb, Users, GraduationCap, Wrench } from "@phosphor-icons/react";
import { Logo } from "../components/layout/Logo";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

type Role = "creator" | "backer" | "mentor" | "vendor";

const ROLES = [
  {
    id: "creator" as Role,
    icon: Lightbulb,
    title: "Creator",
    desc: "I have an idea or project I want to fund",
    color: "#6FD179",
    bg: "rgba(111,209,121,0.08)",
  },
  {
    id: "backer" as Role,
    icon: Users,
    title: "Backer",
    desc: "I want to discover and fund creative projects",
    color: "#0F4C82",
    bg: "rgba(15,76,130,0.08)",
  },
  {
    id: "mentor" as Role,
    icon: GraduationCap,
    title: "Mentor",
    desc: "I want to share expertise and guide creators",
    color: "#082D4D",
    bg: "rgba(8,45,77,0.06)",
  },
  {
    id: "vendor" as Role,
    icon: Wrench,
    title: "Vendor",
    desc: "I provide manufacturing or marketing services",
    color: "#082D4D",
    bg: "rgba(8,45,77,0.06)",
  },
];

const CATEGORIES = [
  "Technology", "Art & Design", "Music", "Film & Video",
  "Games", "Publishing", "Food & Craft", "Fashion",
  "Community", "Environment", "Education", "Health",
];

function StepIndicator({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-300"
          style={{
            width: i === current ? "24px" : "8px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: i <= current ? "#0F4C82" : "rgba(8,45,77,0.15)",
          }}
        />
      ))}
    </div>
  );
}

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [role, setRole] = useState<Role | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [profile, setProfile] = useState({ name: "", username: "", bio: "" });

  function next() {
    setDirection(1);
    setStep((s) => s + 1);
  }
  function back() {
    setDirection(-1);
    setStep((s) => s - 1);
  }
  function toggleInterest(cat: string) {
    setInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF] flex flex-col" style={{ fontFamily: SAT }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#082D4D]/06">
        <Logo scale={1.1} color="#082D4D" />
        <div className="flex items-center gap-4">
          <StepIndicator total={4} current={step} />
          {step < 3 && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-[#082D4D]/40 hover:text-[#082D4D]/70 transition-colors"
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs tracking-widest uppercase text-[#082D4D]/40 mb-3">Step 1 of 4</p>
                <h1 className="text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 500, fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  How do you want to use ideakicks?
                </h1>
                <p className="text-[#082D4D]/60 mb-10">Choose your primary role. You can always change this later.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className="relative text-left p-5 rounded-2xl border-2 transition-all duration-200"
                      style={{
                        borderColor: role === r.id ? r.color : "rgba(8,45,77,0.10)",
                        backgroundColor: role === r.id ? r.bg : "white",
                      }}
                    >
                      {role === r.id && (
                        <div
                          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: r.color }}
                        >
                          <Check size={11} color="white" strokeWidth={3} />
                        </div>
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: r.bg }}
                      >
                        <r.icon size={20} style={{ color: r.color }} />
                      </div>
                      <h3 className="text-[#082D4D] mb-1" style={{ fontFamily: CD, fontSize: "1.125rem", fontWeight: 500 }}>
                        {r.title}
                      </h3>
                      <p className="text-sm text-[#082D4D]/60 leading-relaxed">{r.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={next}
                  disabled={!role}
                  className="w-full h-13 flex items-center justify-center gap-2 bg-[#0F4C82] text-white rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#082D4D]"
                  style={{ height: "52px" }}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs tracking-widest uppercase text-[#082D4D]/40 mb-3">Step 2 of 4</p>
                <h1 className="text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 500, fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  What are you interested in?
                </h1>
                <p className="text-[#082D4D]/60 mb-8">Pick at least 2 categories to personalize your feed.</p>
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {CATEGORIES.map((cat) => {
                    const active = interests.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleInterest(cat)}
                        className="px-4 py-2 rounded-full text-sm border-2 transition-all duration-200"
                        style={{
                          borderColor: active ? "#0F4C82" : "rgba(8,45,77,0.12)",
                          backgroundColor: active ? "#0F4C82" : "white",
                          color: active ? "white" : "rgba(8,45,77,0.70)",
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={back}
                    className="h-13 px-6 rounded-full border-2 border-[#0F4C82]/20 text-[#082D4D]/60 hover:border-[#0F4C82]/40 transition-all"
                    style={{ height: "52px" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={next}
                    disabled={interests.length < 2}
                    className="flex-1 h-13 flex items-center justify-center gap-2 bg-[#0F4C82] text-white rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#082D4D]"
                    style={{ height: "52px" }}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs tracking-widest uppercase text-[#082D4D]/40 mb-3">Step 3 of 4</p>
                <h1 className="text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 500, fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  Set up your profile
                </h1>
                <p className="text-[#082D4D]/60 mb-8">Help the community know who you are.</p>

                {/* Avatar placeholder */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: "#0F4C82", fontFamily: CD, fontSize: "1.25rem", fontWeight: 500 }}
                  >
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="text-sm text-[#082D4D]/70">Profile photo</p>
                    <button className="text-sm text-[#0F4C82] hover:underline">Upload photo</button>
                  </div>
                </div>

                <div className="flex flex-col gap-5 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-[#082D4D] mb-1.5">Display name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Alex Johnson"
                      className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#082D4D] mb-1.5">Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#082D4D]/40">@</span>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value.toLowerCase().replace(/\s/g, "") }))}
                        placeholder="alexj"
                        className="w-full h-12 pl-8 pr-4 rounded-xl border border-[#0F4C82]/20 bg-white text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#082D4D] mb-1.5">Bio <span className="font-normal text-[#082D4D]/40">(optional)</span></label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell us a bit about yourself..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#0F4C82]/20 bg-white text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={back}
                    className="h-13 px-6 rounded-full border-2 border-[#0F4C82]/20 text-[#082D4D]/60 hover:border-[#0F4C82]/40 transition-all"
                    style={{ height: "52px" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={next}
                    disabled={!profile.name || !profile.username}
                    className="flex-1 h-13 flex items-center justify-center gap-2 bg-[#0F4C82] text-white rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#082D4D]"
                    style={{ height: "52px" }}
                  >
                    Finish Setup <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                  style={{ backgroundColor: "rgba(111,209,121,0.12)" }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#6FD179] flex items-center justify-center">
                    <Check size={28} color="white" strokeWidth={2.5} />
                  </div>
                </motion.div>
                <h1 className="text-[#082D4D] mb-3" style={{ fontFamily: CD, fontWeight: 500, fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                  You're all set{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}!
                </h1>
                <p className="text-[#082D4D]/60 mb-2 max-w-sm mx-auto leading-relaxed">
                  Your ideakicks account is ready. Start exploring projects or launch your own campaign.
                </p>

                {role && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 mt-2" style={{ backgroundColor: "rgba(15,76,130,0.08)" }}>
                    <span className="text-sm text-[#0F4C82] font-medium">
                      Joined as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="h-13 px-8 bg-[#0F4C82] text-white rounded-full flex items-center justify-center gap-2 hover:bg-[#082D4D] transition-colors"
                    style={{ height: "52px" }}
                  >
                    Go to Dashboard <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => navigate("/explore")}
                    className="h-13 px-8 border-2 border-[#0F4C82]/20 text-[#082D4D]/70 rounded-full flex items-center justify-center gap-2 hover:border-[#0F4C82]/40 transition-colors"
                    style={{ height: "52px" }}
                  >
                    Explore Projects
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
