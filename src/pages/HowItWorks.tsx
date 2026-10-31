import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";
import {
  ArrowRight,
  RocketLaunch,
  Coins,
  Handshake,
} from "@phosphor-icons/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const ecosystemFlow = [
  { num: "01", title: "Idea Submitted", body: "Creators pitch their concepts to our curation team." },
  { num: "02", title: "Curated & Refined", body: "We review every project and pair creators with coaches." },
  { num: "03", title: "Community Launch", body: "Backers fund the idea while the community provides support." },
  { num: "04", title: "Brought to Life", body: "The project becomes a reality, rewarding everyone involved." },
];

const roleJourneys = {
  creators: {
    id: "creators",
    label: "For Creators",
    image: "/images/creators_path.jpg",
    shortDesc: "Launch your idea with 1-on-1 human coaching, community validation, and flexible funding.",
    title: "Launch with confidence",
    desc: "From your raw initial concept to launch-day celebrations — here is the streamlined path.",
    steps: [
      { title: "Apply", body: "Submit a 5-minute application. We review every submission within 48 hours." },
      { title: "Build", body: "Work with a dedicated campaign coach to craft your page and set reward tiers." },
      { title: "Launch", body: "Go live to our community. Choose all-or-nothing or flexible funding." },
    ],
    ctaText: "Start your application",
    ctaLink: "/start",
  },
  backers: {
    id: "backers",
    label: "For Backers",
    image: "/images/backers_path.jpg",
    shortDesc: "Discover and support hand-curated campaigns before they hit the mainstream market.",
    title: "Back ideas worth backing",
    desc: "Support curated, high-quality projects and help bring them to life.",
    steps: [
      { title: "Discover", body: "Browse hand-curated campaigns that have passed human review. No spam." },
      { title: "Pledge", body: "Choose a reward tier that fits you and pledge your support." },
      { title: "Engage", body: "Follow the creator's journey, get updates, and receive your rewards." },
    ],
    ctaText: "Explore projects",
    ctaLink: "/explore",
  },
  partners: {
    id: "partners",
    label: "For Partners",
    image: "/images/partners_path.jpg",
    shortDesc: "Connect with fully-funded campaigns to provide manufacturing, marketing, and logistics services.",
    title: "Partner with funded creators",
    desc: "Connect your agency or manufacturing facility with high-potential campaigns ready to build.",
    steps: [
      { title: "Apply", body: "Submit your agency profile and portfolio in under 2 minutes." },
      { title: "Match", body: "Get curated introductions to funded creators at their exact stage of need." },
      { title: "Execute", body: "Work directly with founders with zero platform commissions or middleman cuts." },
    ],
    ctaText: "Join partner network",
    ctaLink: "/partners",
  },
};

const faqItems = [
  { q: "Is ideakicks free for backers?", a: "Yes. Browsing and backing is completely free. We take a platform percentage from creators only on successful campaigns." },
  { q: "What's the platform fee?", a: "We charge a small percentage of successfully raised funds. There are no listing fees or upfront costs." },
  { q: "Can I back a campaign from anywhere?", a: "Yes. ideakicks works internationally. Currency conversion applies at checkout." },
  { q: "What if a creator doesn't deliver rewards?", a: "We hold creators to our standards. If a creator fails to deliver, backers can report this and we investigate directly." },
  { q: "How long do campaigns run?", a: "Most campaigns run 30–60 days. Creators set their own duration when launching." },
];

export function HowItWorks() {
  const [activeRole, setActiveRole] = useState<keyof typeof roleJourneys>("creators");
  
  const currentJourney = roleJourneys[activeRole];

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center section-padding text-center">
        <PublicHeroGradient />
        <div className="container-base relative z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <h1 
              className="mb-6 font-heading text-[#082D4D] text-balance" 
              style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)', lineHeight: 1.05, fontWeight: 500, letterSpacing: '-0.03em' }}
            >
              How ideakicks works
            </h1>
            <p className="body-large max-w-2xl mx-auto text-lg md:text-xl text-[#082D4D]/75 leading-relaxed text-balance">
              ideakicks isn't just a directory — it's a curated ecosystem of Creators and Backers, working together toward the same outcome: bringing ideas to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shared Ecosystem Flow */}
      <section className="section-padding bg-[#082D4D]/[0.02]">
        <motion.div 
          className="container-base"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-12">
            <h2 className="heading-section">The Ecosystem Flow</h2>
            <p className="body-base mt-4 text-[#082D4D]/60">One unified path from idea to reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemFlow.map((step) => (
              <div key={step.num} className="flex flex-col items-start py-8">
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "3.5rem",
                    color: "rgba(8,45,77,0.08)",
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </p>
                <h4 className="text-xl font-heading font-normal text-[#082D4D] mb-3">
                  {step.title}
                </h4>
                <p className="body-base">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Role Selector & Journey */}
      <section className="section-padding">
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 className="heading-section mb-8">Choose your role</h2>
            
            {/* Roles in Boxes with Small Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {(Object.keys(roleJourneys) as Array<keyof typeof roleJourneys>).map((roleKey) => {
                const role = roleJourneys[roleKey];
                const isSelected = activeRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => setActiveRole(roleKey)}
                    className={`group relative overflow-hidden p-6 sm:p-7 rounded-[1.5rem] text-left transition-all flex flex-col justify-between cursor-pointer min-h-[260px] ${
                      isSelected
                        ? "ring-4 ring-[#6FD179] shadow-lg shadow-[#6FD179]/20 scale-[1.02]"
                        : "border border-[#082D4D]/08 hover:shadow-md"
                    }`}
                  >
                    <img src={role.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      isSelected 
                        ? "bg-gradient-to-t from-[#082D4D]/95 via-[#082D4D]/70 to-[#082D4D]/20" 
                        : "bg-gradient-to-t from-[#082D4D]/90 via-[#082D4D]/70 to-[#082D4D]/40 group-hover:from-[#082D4D]/95"
                    }`} />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex items-center justify-between mb-4">
                        <div /> {/* Spacer for flex layout */}
                        {isSelected && (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#6FD179] text-[#082D4D] shadow-sm tracking-wide">
                            Selected
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-medium text-white mb-2 shadow-sm drop-shadow-md">
                          {role.label}
                        </h3>
                        <p className="text-white/95 text-sm leading-relaxed drop-shadow-sm">
                          {role.shortDesc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Role Content */}
          <div className="max-w-5xl mx-auto mt-10 bg-white border border-[#082D4D]/08 rounded-3xl p-8 md:p-12 shadow-sm transition-all">
            <div className="mb-10 text-center">
              <h3 className="heading-section text-[#082D4D]">{currentJourney.title}</h3>
              <p className="body-large text-[#082D4D]/65 mt-3 max-w-2xl mx-auto">{currentJourney.desc}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {currentJourney.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start py-8">
                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontWeight: 400,
                      fontSize: "3.5rem",
                      color: "rgba(8,45,77,0.08)",
                      lineHeight: 1,
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h4 className="text-xl font-heading font-normal text-[#082D4D] mb-3">
                    {step.title}
                  </h4>
                  <p className="body-base">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Link to={currentJourney.ctaLink} className="btn-primary btn-lg bg-[#6FD179] text-white hover:bg-[#5bc468] rounded-full px-8 shadow-md shadow-[#6FD179]/20 font-bold transition-all">
                {currentJourney.ctaText} <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#082D4D]/[0.02]">
        <div className="container-base max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="heading-section">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </main>
  );
}
