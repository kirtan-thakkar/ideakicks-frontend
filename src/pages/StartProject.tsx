import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";
import { CreatorJourneyMerged } from "../components/common/CreatorJourneyMerged";
import { CreatorPricing } from "../components/common/CreatorPricing";
import { motion } from "motion/react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const STARTING_STATES = [
  {
    title: "The early idea",
    desc: "You have a concept but need help turning it into something concrete, validated, and actionable.",
  },
  {
    title: "Actively building",
    desc: "You have a prototype or draft but need help with specific execution gaps to cross the finish line.",
  },
  {
    title: "Almost ready",
    desc: "Your product is built. You need narrative polish, backer discovery, and launch support to scale.",
  },
];

const FAQS = [
  { q: "Is there a fee to list or apply?", a: "No upfront fees whatsoever. Ideakicks operates strictly on a 'No success, no fee' model — we take a transparent 5% platform fee only if and when your campaign is successfully funded." },
  { q: "What kinds of projects do you accept?", a: "We're category-agnostic — technology, hardware, art, music, design, food, fashion, and community projects. What matters most is authenticity, viability, and clear execution plans." },
  { q: "How long does the human review take?", a: "Every submission is reviewed by our real curation committee within 48 hours. We provide thorough, actionable feedback on your prototype and pitch regardless of the outcome." },
  { q: "What happens if I don't reach my funding goal?", a: "If your campaign doesn't hit its target, you owe us nothing. Zero platform fees, zero penalty charges, zero financial liability. Backers' pledges are released with complete transparency." },
  { q: "Do I get a dedicated campaign coach?", a: "Yes! Every approved creator is paired with a dedicated campaign coach who assists with reward tiers, narrative storytelling, video direction, and launch scheduling at no extra charge." },
];

export function StartProject() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero */}
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
              Launch your next <br /><span className="italic text-[#6FD179]">big idea.</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-lg md:text-xl text-[#082D4D]/75 leading-relaxed text-balance mb-10">
              ideakicks is a curated launchpad. Every project gets a real human review, a dedicated coach, and access to a community that genuinely wants to see you succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/start/application"
                className="btn-primary btn-lg bg-[#6FD179] text-white hover:bg-[#5bc468] rounded-full px-8 shadow-lg shadow-[#6FD179]/20 font-bold transition-all flex items-center gap-2"
              >
                Start Application <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Where do you fit in? */}
      <section className="section-padding bg-[#082D4D]/[0.02] border-y border-[#082D4D]/05">
        <div className="container-base">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#082D4D]">Where do you fit in?</h2>
            <p className="body-large text-[#082D4D]/68 max-w-2xl mx-auto mt-4">
              We support creators at three crucial starting stages under one founding principle:{" "}
              <strong className="text-[#082D4D] font-bold">No success, no fee.</strong> You only pay if you reach your goal.
            </p>
          </div>

          {/* Three Starting Stages (Clean typography, no card boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto pt-4">
            {STARTING_STATES.map((s, i) => (
              <div key={i} className="text-left">
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 400,
                    fontSize: "3rem",
                    color: "rgba(8,45,77,0.18)",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 
                  className="text-xl font-normal text-[#082D4D] mb-2.5"
                  style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 400 }}
                >
                  {s.title}
                </h4>
                <p className="body-base text-[#082D4D]/65 leading-relaxed text-sm">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Merged What we provide & Journey with Scroll Animation ("The journey to launch") */}
      <CreatorJourneyMerged />

      {/* 4. Pricing Component (Placed directly after "The journey to launch") */}
      <CreatorPricing />

      {/* 5. FAQ */}
      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl mx-auto">
          <h2 className="heading-section text-[#082D4D] mb-10 text-center">Common questions</h2>
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
