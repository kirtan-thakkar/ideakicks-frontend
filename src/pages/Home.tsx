import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, Users, RocketLaunch, Coins, Handshake } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/common/AnimatedSection";
import { GradientCanvas } from "../components/common/GradientCanvas";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const FEATURED = {
  id: "evo-air",
  title: "Evo-AIR: The Ultimate High-Performance Makeup Airbrush System",
  creator: "Evoluir Beauty",
  creatorHandle: "@evoluir_beauty",
  creatorAvatar: "/campaigns/evo-air/logo.png",
  image: "/campaigns/evo-air/box.png",
  category: "Beauty & Tech",
  tagline:
    "A versatile, high-performance airbrush system designed for everyone—from everyday users to professional makeup artists. Achieve a flawless finish with minimal effort.",
  funded: 340,
  backers: 4205,
  daysLeft: 12,
  raised: "₹255,000",
  goal: "₹75,000",
};

const CURATED = [
  {
    id: "evo-air",
    title: "Evo-AIR: The Ultimate High-Performance Makeup Airbrush System",
    creator: "Evoluir Beauty",
    creatorAvatar: "/campaigns/evo-air/logo.png",
    image: "/campaigns/evo-air/box.png",
    category: "Technology",
    funded: 410,
    backers: 4205,
    daysLeft: 12,
    raised: "₹307,500",
    goal: "₹75,000",
  },
  {
    id: "scrubbitt",
    title: "Scrubbitt: Done Before It Used To Start",
    creator: "Scrubbitt Home",
    creatorAvatar: "/campaigns/scrubbitt/logo.png",
    image: "/campaigns/scrubbitt/banner.jpg",
    category: "Technology",
    funded: 56,
    backers: 42,
    daysLeft: 24,
    raised: "₹28,000",
    goal: "₹50,000",
  },
];



// ─── Featured Project Card ────────────────────────────────────────────────────

function FeaturedCard() {
  return (
    <article className="group flex flex-col rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_34px_rgba(8,45,77,0.08)] border border-[#0F4C82]/08 h-full">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] bg-[#082D4D]/05 flex-shrink-0">
        <ImageWithFallback
          src={FEATURED.image}
          alt={FEATURED.title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/35 via-[#082D4D]/05 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-8 md:p-10 lg:p-12 font-sans flex-1">
        {/* Creator */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#6FD179]/25">
            <ImageWithFallback src={FEATURED.creatorAvatar} alt={FEATURED.creator} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-base text-[#082D4D] font-heading font-semibold leading-none mb-1">
              {FEATURED.creator}
            </p>
            <p className="text-xs text-[#082D4D]/50">{FEATURED.creatorHandle}</p>
          </div>
        </div>

        <h2 className="heading-card mb-4">
          {FEATURED.title}
        </h2>
        <p className="body-large mb-auto">{FEATURED.tagline}</p>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-[#082D4D]/06">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl text-[#082D4D] font-heading font-medium leading-none">{FEATURED.raised}</p>
              <p className="mt-1 text-xs text-[#082D4D]/50">pledged of {FEATURED.goal} goal</p>
            </div>
            <span className="text-sm font-bold text-[#6FD179]">{FEATURED.funded}% funded</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#082D4D]/10">
            <div className="h-full rounded-full bg-[#6FD179]" style={{ width: `${Math.min(FEATURED.funded, 100)}%` }} />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-[0.75rem] text-[#082D4D]/50">
          <span className="text-[#6FD179] font-bold uppercase tracking-[0.08em]">{FEATURED.category}</span>
          <div className="flex flex-wrap justify-end gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5"><Users size={11} /> {FEATURED.backers.toLocaleString()} backers</span>
            <span className="flex items-center gap-1.5"><Clock size={11} /> {FEATURED.daysLeft} days left</span>
          </div>
        </div>

        <Link
          to={`/campaign/${FEATURED.id}`}
          className="mt-5 btn-primary btn-lg bg-[#6FD179] text-white hover:bg-[#5bc468] self-start rounded-full"
        >
          Back this project <ArrowRight size={20} />
        </Link>
      </div>
    </article>
  );
}

// ─── Curated Project Card ─────────────────────────────────────────────────────

function ProjectCard({ p }: { p: typeof CURATED[0] }) {
  return (
    <Link to={`/campaign/${p.id}`} className="group block h-full">
      <article className="flex flex-col bg-white rounded-[2rem] h-full overflow-hidden border border-[#0F4C82]/06 shadow-[0_1px_12px_rgba(8,45,77,0.05)] hover:shadow-[0_6px_32px_rgba(8,45,77,0.11)] transition-all duration-300 hover:-translate-y-1.5">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10] bg-[#082D4D]/05">
          <ImageWithFallback
            src={p.image}
            alt={p.title}
            className="w-full h-full object-contain transition-transform duration-600 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/40 to-transparent" />
          {/* Creator overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
              <ImageWithFallback src={p.creatorAvatar} alt={p.creator} className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-[0.75rem] font-medium drop-shadow-sm">{p.creator}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6 font-sans">
          <span className="text-xs font-bold tracking-[0.08em] uppercase text-[#6FD179] mb-2">{p.category}</span>
          <h3 className="font-heading text-lg font-medium text-[#082D4D] leading-snug mb-4 flex-1">
            {p.title}
          </h3>

          {/* Thin progress line */}
          <div className="mt-auto pt-4 border-t border-[#082D4D]/06">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#082D4D] font-bold">{p.raised}</span>
              <span className="text-[#082D4D]/50">{p.funded}% funded</span>
            </div>
            <div className="h-[2px] bg-[#082D4D]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#6FD179] rounded-full" style={{ width: `${Math.min(p.funded, 100)}%` }} />
            </div>
            <div className="flex items-center gap-3 mt-2.5 text-xs text-[#082D4D]/45">
              <span className="flex items-center gap-1"><Users size={10} /> {p.backers.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {p.daysLeft}d left</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Home() {
  return (
    <main className="bg-[#FFFFFF] min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative z-0 min-h-[calc(100dvh+10rem)] w-full overflow-hidden font-sans flex flex-col">
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.96]"
          aria-hidden="true"
        >
          <GradientCanvas />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(15,76,130,0.03)_42%,rgba(15,76,130,0.12)_76%,rgba(8,45,77,0.20)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(8,45,77,0.14)_0%,rgba(15,76,130,0.05)_17%,rgba(15,76,130,0)_50%,rgba(15,76,130,0.05)_83%,rgba(8,45,77,0.14)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-x-24 -top-40 z-0 h-[30rem] blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 18% 6%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.34) 30%, rgba(255,255,255,0) 66%), radial-gradient(ellipse at 74% 0%, rgba(15,76,130,0.24) 0%, rgba(15,76,130,0.10) 36%, rgba(15,76,130,0) 72%), radial-gradient(ellipse at 44% 10%, rgba(111,209,121,0.16) 0%, rgba(111,209,121,0.06) 38%, rgba(111,209,121,0) 76%)",
          }}
          aria-hidden="true"
        />

        <div className="container-base relative z-10 w-full h-[100dvh] pt-[68px] mx-auto flex flex-col items-center justify-center">
          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center text-center">
            <AnimatedSection direction="up" delay={0} className="w-full flex flex-col items-center justify-center">
              <h1 className="hero-motion-lockup mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#082D4D] to-[#0A4B85]" aria-label="MOTION STARTS HERE">
                <span className="hero-motion-line hero-line-motion font-bold">MOTION</span>
                <span className="hero-motion-line hero-line-starts font-bold">STARTS</span>
                <span className="hero-motion-line hero-line-here font-bold">HERE</span>
              </h1>
              <p className="body-large max-w-2xl mx-auto text-[#082D4D]/75 mt-8 font-sans font-medium text-lg lg:text-xl">
                A curated launchpad where bold visions find the resources and support to become reality.
                We remove the noise so you can focus on building what matters.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link
                  to="/explore"
                  className="btn-primary bg-[#6FD179] text-white hover:bg-[#5bc468] rounded-full px-8 py-3.5 text-base font-semibold shadow-[0_6px_24px_rgba(111,209,121,0.35)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Discover Projects <ArrowRight size={20} />
                </Link>
                <Link
                  to="/start"
                  className="text-base font-semibold text-[#0F4C82] hover:text-[#082D4D] px-8 py-3.5 rounded-full hover:bg-[#082D4D]/05 transition-all duration-200 flex items-center justify-center"
                >
                  Start a Campaign
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Blur Merge Effect */}
      <div
        className="pointer-events-none relative z-20 -mt-40 h-40"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 70%)"
        }}
        aria-hidden="true"
      />

      {/* ── Bento Intro Section ─────────────────────────────────────────────── */}
      <section className="relative z-10 w-full bg-white">
        <div className="container-base pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,400px)] gap-6">
          {/* Pictogram CTA */}
          <AnimatedSection direction="up" delay={0.1} className="bg-[#082D4D] rounded-[2rem] shadow-xl overflow-hidden relative flex flex-col justify-center">
             <div className="grid grid-cols-1 sm:grid-cols-3 w-full h-full">
               {/* Step 1: Idea */}
               <div className="group relative w-full h-full min-h-[300px] sm:min-h-[400px] overflow-hidden flex flex-col justify-end">
                 <img
                   src="/images/step_idea.jpg"
                   alt="Idea concept and review"
                   className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                 <div className="relative z-10 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h4 className="font-heading font-semibold text-2xl mb-2 text-white tracking-wide">
                     1. Idea
                   </h4>
                   <p className="text-white/90 text-sm md:text-base leading-relaxed">
                     Submit your vision for rigorous human review.
                   </p>
                 </div>
               </div>

               {/* Step 2: Campaign */}
               <div className="group relative w-full h-full min-h-[300px] sm:min-h-[400px] overflow-hidden flex flex-col justify-end">
                 <img
                   src="/images/step_campaign.jpg"
                   alt="Campaign launch with community"
                   className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                 <div className="relative z-10 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h4 className="font-heading font-semibold text-2xl mb-2 text-white tracking-wide">
                     2. Campaign
                   </h4>
                   <p className="text-white/90 text-sm md:text-base leading-relaxed">
                     Launch to our community of early believers.
                   </p>
                 </div>
               </div>

               {/* Step 3: Product */}
               <div className="group relative w-full h-full min-h-[300px] sm:min-h-[400px] overflow-hidden flex flex-col justify-end">
                 <img
                   src="/images/step_product.jpg"
                   alt="Product crafted and shipped"
                   className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                 <div className="relative z-10 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <h4 className="font-heading font-semibold text-2xl mb-2 text-white tracking-wide">
                     3. Product
                   </h4>
                   <p className="text-white/90 text-sm md:text-base leading-relaxed">
                     Get funded, build momentum, and ship it.
                   </p>
                 </div>
               </div>
             </div>
          </AnimatedSection>

          {/* Subtitle & Actions */}
          <AnimatedSection direction="up" delay={0.2} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_34px_rgba(8,45,77,0.06)] flex flex-col justify-between min-h-[340px]">
            <p className="font-sans text-lg leading-relaxed text-[#082D4D]/80 mb-8 font-medium">
              Ideakicks goes beyond traditional crowdfunding. We are a launchpad for innovation where bold concepts find their community, and visionary builders get the momentum they need to succeed.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/explore"
                className="btn-primary w-full bg-[#6FD179] text-white hover:bg-[#5bc468] rounded-full text-base py-4 font-semibold shadow-[0_6px_24px_rgba(111,209,121,0.35)] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Discover Projects <ArrowRight size={20} />
              </Link>
              <Link
                to="/start"
                className="w-full text-base font-semibold text-[#0F4C82] hover:text-[#082D4D] py-4 rounded-full hover:bg-[#082D4D]/04 transition-all duration-200 flex items-center justify-center"
              >
                Start a Campaign
              </Link>
            </div>
          </AnimatedSection>
        </div>
        </div>
      </section>

      {/* ── Featured & Live Campaigns ─────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white container-base section-padding">
        <AnimatedSection direction="up">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="heading-card">
              Featured & Live Campaigns
            </h2>
            <Link
              to="/explore"
              className="text-base text-[#0F4C82] font-medium hover:underline flex items-center gap-1 font-sans"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 h-full">
            <StaggerItem className="h-full">
              <FeaturedCard />
            </StaggerItem>
          </div>
          {CURATED.map((p) => (
            <div key={p.id} className="h-full">
              <StaggerItem className="h-full">
                <ProjectCard p={p} />
              </StaggerItem>
            </div>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Core Roles (Redesigned) ─────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-base">
          <div className="mb-12 text-center">
            <h2 className="heading-section text-[#082D4D]">Choose your path</h2>
            <p className="body-large text-[#082D4D]/60 max-w-xl mx-auto mt-3">
              Explore how Ideakicks empowers each member of our innovation ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Box 1: For Creators */}
            <div className="group relative rounded-[2rem] p-8 flex flex-col justify-between text-white overflow-hidden shadow-lg min-h-[380px]">
              <img
                src="/images/creators_path.jpg"
                alt="For Creators"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/95 via-[#082D4D]/70 to-[#082D4D]/20 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-heading text-3xl font-medium mb-3 text-white shadow-sm drop-shadow-md">For Creators</h3>
                  <p className="text-white/95 text-base leading-relaxed mb-8 font-sans drop-shadow-sm">
                    Launch your next big idea with a dedicated 1-on-1 coach and a community that backs things it believes in.
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/20">
                  <Link 
                    to="/start" 
                    className="inline-flex items-center gap-2 text-white font-bold hover:text-[#6FD179] transition-colors font-sans text-sm group/link"
                  >
                    Start a project <ArrowRight size={16} weight="bold" className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Box 2: For Backers */}
            <div className="group relative rounded-[2rem] p-8 flex flex-col justify-between text-white overflow-hidden shadow-lg min-h-[380px]">
              <img
                src="/images/backers_path.jpg"
                alt="For Backers"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/95 via-[#082D4D]/70 to-[#082D4D]/20 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-heading text-3xl font-medium mb-3 text-white shadow-sm drop-shadow-md">For Backers</h3>
                  <p className="text-white/95 text-base leading-relaxed mb-8 font-sans drop-shadow-sm">
                    Fund curated campaigns that have passed human review. No noise, just great ideas worth backing.
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/20">
                  <Link 
                    to="/backers" 
                    className="inline-flex items-center gap-2 text-white font-bold hover:text-[#6FD179] transition-colors font-sans text-sm group/link"
                  >
                    Explore campaigns <ArrowRight size={16} weight="bold" className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Box 3: For Partners */}
            <div className="group relative rounded-[2rem] p-8 flex flex-col justify-between text-white overflow-hidden shadow-lg min-h-[380px]">
              <img
                src="/images/partners_path.jpg"
                alt="For Partners"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/95 via-[#082D4D]/70 to-[#082D4D]/20 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-heading text-3xl font-medium mb-3 text-white shadow-sm drop-shadow-md">For Partners</h3>
                  <p className="text-white/95 text-base leading-relaxed mb-8 font-sans drop-shadow-sm">
                    Join our network of trusted vendors and service providers to support funded creators with zero platform fees.
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-white/20">
                  <Link 
                    to="/partners" 
                    className="inline-flex items-center gap-2 text-white font-bold hover:text-[#6FD179] transition-colors font-sans text-sm group/link"
                  >
                    Join the network <ArrowRight size={16} weight="bold" className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto strip ───────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-base grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <h2 className="heading-section mb-5 text-[#082D4D]">
              We curate so you{" "}
              <span className="italic" style={{ color: "#6FD179" }}>don't have to scroll.</span>
            </h2>
            <p className="body-large max-w-sm mb-7">
              Creators get a coach. Backers get confidence. Partners get reach.
              One platform built around the people who make things happen. Motion starts here.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[#6FD179] text-sm font-medium hover:gap-3 transition-all duration-200 font-sans"
            >
              About ideakicks <ArrowRight size={13} />
            </Link>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { value: "100%", label: "Curated by hand" },
              { value: "48 hrs", label: "Avg. review time" },
              { value: "0%", label: "Platform fee (Beta)" },
              { value: "Direct", label: "Founder access" },
            ].map((s) => (
              <StaggerItem key={s.label}>
                <div className="border-t border-[#082D4D]/10 pt-4 font-sans">
                  <p className="font-heading text-2xl font-medium text-[#082D4D] mb-1.5">{s.value}</p>
                  <p className="text-[#082D4D]/45 text-sm tracking-wide">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

    </main>
  );
}
