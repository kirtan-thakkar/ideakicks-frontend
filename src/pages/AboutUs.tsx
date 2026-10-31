import { motion, useScroll, useSpring } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

function KickerLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 361 528" 
      className={`${className} inline-block`}
      fill="currentColor"
      aria-label="ideakicks"
    >
      <path d="M 79.3 0.0 L 77.0 1.3 L 75.3 4.3 L 58.3 100.3 L 57.0 108.3 L 57.0 111.3 L 58.3 113.3 L 61.3 114.8 L 69.3 116.3 L 162.3 132.7 L 164.3 132.7 L 166.3 131.8 L 167.8 130.3 L 168.7 128.3 L 174.3 96.3 L 173.8 92.3 L 84.0 1.3 L 81.3 0.0 L 79.3 0.0 Z" />
      <path d="M 54.3 139.3 L 52.3 140.7 L 50.8 143.3 L 40.3 202.3 L 39.0 211.3 L 39.0 216.3 L 40.0 221.3 L 43.0 227.3 L 47.3 232.3 L 107.3 274.0 L 110.7 277.3 L 114.7 284.3 L 115.7 288.3 L 115.8 295.3 L 114.8 300.3 L 113.3 304.3 L 108.3 311.0 L 103.3 314.7 L 96.3 317.7 L 31.3 339.0 L 25.3 342.0 L 22.3 344.3 L 19.3 347.3 L 15.3 354.3 L 13.8 361.3 L 0.0 519.3 L 0.0 524.3 L 1.0 526.3 L 3.3 527.8 L 7.3 527.7 L 13.3 525.7 L 16.3 524.0 L 21.3 522.7 L 24.3 521.0 L 29.3 519.7 L 32.3 518.0 L 37.3 516.7 L 40.3 515.0 L 42.3 514.7 L 50.3 510.7 L 56.3 506.7 L 61.0 502.3 L 65.3 497.3 L 72.3 484.3 L 73.3 480.3 L 75.3 476.3 L 76.3 472.3 L 78.3 468.3 L 79.3 464.3 L 81.3 460.3 L 82.3 456.3 L 84.3 452.3 L 85.3 448.3 L 87.3 444.3 L 88.3 440.3 L 90.3 436.3 L 91.3 432.3 L 93.3 428.3 L 106.8 391.3 L 110.3 384.3 L 114.3 379.8 L 118.3 377.0 L 123.3 374.7 L 128.3 373.7 L 136.3 374.0 L 139.3 374.8 L 146.3 378.3 L 158.3 387.3 L 163.3 390.3 L 175.3 399.3 L 180.3 402.3 L 192.3 411.3 L 197.3 414.3 L 209.3 423.3 L 214.3 426.3 L 226.3 435.3 L 272.3 467.3 L 284.3 476.3 L 289.3 479.3 L 345.3 519.3 L 348.3 520.8 L 351.3 520.7 L 354.3 517.3 L 360.8 488.3 L 360.7 475.3 L 360.0 474.3 L 359.7 470.3 L 357.7 464.3 L 353.7 456.3 L 333.3 431.3 L 191.0 262.3 L 188.3 258.3 L 186.0 253.3 L 185.7 250.3 L 185.0 249.3 L 185.0 244.3 L 185.3 241.3 L 187.3 235.3 L 191.3 229.3 L 196.3 225.0 L 199.3 223.3 L 202.3 222.0 L 207.3 221.0 L 308.3 223.7 L 314.3 222.7 L 315.3 222.0 L 321.3 220.7 L 329.3 216.7 L 334.3 213.3 L 343.3 204.3 L 357.3 186.3 L 359.0 182.3 L 358.7 180.3 L 357.3 178.3 L 355.3 177.3 L 348.3 176.3 L 75.3 141.3 L 56.3 139.0 L 54.3 139.3 Z" />
    </svg>
  );
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  badge: string;
  story: string;
  highlights: string[];
}

const TEAM: TeamMember[] = [
  {
    id: "priya",
    name: "Priya Sharma",
    role: "Co-founder & CEO",
    avatar: "https://images.unsplash.com/photo-1768471126011-2e2002832826?w=400&q=80",
    quote: "We built ideakicks because we were tired of great ideas getting lost in the noise.",
    badge: "Hardware Pioneer",
    story: "Before founding ideakicks, Priya spent nearly a decade building consumer hardware across Bangalore and San Francisco. After experiencing firsthand the heartbreak of algorithmic noise burying genuine innovations, she partnered with Marcus to build a platform rooted in 100% human review, milestone-based escrow protection, and hands-on creator mentorship.",
    highlights: ["10+ years in hardware design & production", "Launched 2 viral hardware campaigns", "Mentored 120+ early stage creators"]
  },
  {
    id: "marcus",
    name: "Marcus Webb",
    role: "Co-founder & CTO",
    avatar: "https://images.unsplash.com/photo-1766159806781-297956eccd31?w=400&q=80",
    quote: "Technology should serve the creator, not the other way around.",
    badge: "Systems Architect",
    story: "Marcus previously spearheaded core infrastructure at high-growth fintech scale-ups. Frustrated by legacy crowdfunding platforms that took hefty cuts while leaving backers unprotected, he engineered ideakicks' secure smart-pledge escrow and creator studio from scratch so creators can focus entirely on fabrication without worrying about platform volatility.",
    highlights: ["Distributed systems & security architect", "Pioneered milestone escrow for pledges", "Passionate open-source contributor"]
  },
  {
    id: "leila",
    name: "Leila Okafor",
    role: "Head of Curation",
    avatar: "https://images.unsplash.com/photo-1758922584983-82ffd5720c6a?w=400&q=80",
    quote: "Every project that goes live has passed through my hands personally.",
    badge: "Design Critic",
    story: "With a background in industrial design from the Royal College of Art, Leila has scrutinized more than 3,000 product prototypes throughout her career. At ideakicks, she heads the curation committee that thoroughly tests physical prototypes, reviews bill of materials, and validates supply chain timelines before giving any campaign the green light.",
    highlights: ["RCA Industrial Design alumna", "Reviewed 3,000+ hardware prototypes", "Zero-tolerance for misleading CGI mockups"]
  },
  {
    id: "james",
    name: "James Tanaka",
    role: "Head of Community",
    avatar: "https://images.unsplash.com/photo-1571059315340-08a148d5c412?w=400&q=80",
    quote: "Backers aren't just funders — they're the first community every creator builds.",
    badge: "Backer Advocate",
    story: "James backed his first crowdfunding project in 2013 as an engineering student and has spent over a decade studying backer psychology and brand resonance. He works closely with our creators on transparent communication, backer milestone rewards, and storytelling that turns one-time backers into lifelong product champions.",
    highlights: ["10+ years building creator communities", "Super-backer of 150+ hardware campaigns", "Advocate for radical backer transparency"]
  },
];

const PROBLEM_POINTS = [
  {
    broken: "Algorithmic Noise",
    brokenDesc: "Legacy open platforms flood feeds with thousands of unvetted dropshipping schemes. Genuine physical creations get buried in pay-to-play ad auctions.",
    ideakicks: "Strict Human Curation",
    ideakicksDesc: "We deliberately cap live campaigns so every creator gets focused spotlight and every backer browses vetted, authentic innovations."
  },
  {
    broken: "CGI Vaporware & Broken Trust",
    brokenDesc: "Anyone can post a slick 3D rendering with no factory partner or bill of materials. When campaigns fail to ship, backers are burned and cynical.",
    ideakicks: "Physical Prototype Inspection",
    ideakicksDesc: "Our curation committee examines real functional prototypes and validates manufacturing contracts before approval."
  },
  {
    broken: "Creators Stranded Post-Funding",
    brokenDesc: "Platforms take their 5–8% cut on day 30 and vanish, leaving first-time founders alone to navigate supply chain delays and logistics nightmares.",
    ideakicks: "End-to-End Launch Co-pilot",
    ideakicksDesc: "Every campaign is paired with a dedicated coach and connected to vetted manufacturing, tooling, and fulfillment partners."
  }
];

const PILLARS = [
  {
    num: "01",
    tag: "THE FILTER",
    title: "A Curated Sanctuary, Not an Open Directory",
    desc: "We review every single pitch by hand within 48 hours. By saying 'no' to 85% of submissions, we protect the visibility of the remarkable 15% that truly deserve to exist.",
    image: "/images/step_idea.jpg",
    stats: "85% Filtered for Quality"
  },
  {
    num: "02",
    tag: "THE ESCROW",
    title: "Milestone-Backed Trust For Backers",
    desc: "Backers aren't donors; they are early believers. Our smart escrow aligns incentives: funds are released in transparent phases as creators hit production milestones.",
    image: "/images/step_product.jpg",
    stats: "100% Escrow Aligned"
  },
  {
    num: "03",
    tag: "THE GUILD",
    title: "Vetted Ecosystem of Makers & Mentors",
    desc: "Capital alone doesn't manufacture a product. We connect creators directly with trusted industrial designers, tooling facilities, and certified logistics experts.",
    image: "/images/step_campaign.jpg",
    stats: "50+ Vetted Partners"
  }
];

const VALUES = [
  { 
    image: "/images/value_human_first.jpg", 
    title: "Human first", 
    desc: "Every submission is reviewed by a real person. Every backer question is answered by our team. No bots, no automation where it matters." 
  },
  { 
    image: "/images/value_trust_above.jpg", 
    title: "Trust above all", 
    desc: "We hold creators to high standards of transparency. Clear timelines, honest updates, and accountability are non-negotiable on our platform." 
  },
  { 
    image: "/images/value_speed_care.jpg", 
    title: "Speed with care", 
    desc: "48-hour reviews. Same-day responses. We move fast without cutting corners — because creators deserve a platform that respects their time." 
  },
  { 
    image: "/images/value_open_everyone.jpg", 
    title: "Open to everyone", 
    desc: "Great ideas come from everywhere. We actively seek out creators from underrepresented backgrounds, regions, and disciplines." 
  },
];

const TIMELINE = [
  { year: "2022", event: "ideakicks founded in a shared studio in Lisbon by Priya and Marcus after experiencing broken legacy platforms." },
  { year: "2023", event: "Launched private beta. Successfully funded our first 10 pilot hardware campaigns with 100% fulfillment." },
  { year: "2024", event: "Leila joins as Head of Curation. Physical prototype validation and the 48-hr human review become our hallmark." },
  { year: "2025", event: "Introduced smart-pledge escrow and our vetted vendor directory to support creators from tooling to final delivery." },
  { year: "2026", event: "Today — a vibrant community of ambitious creators and 500K+ backers proving that quality beats algorithmic noise." },
];

function StoryTimelineComponent({ timeline }: { timeline: typeof TIMELINE }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);

  const [lineBounds, setLineBounds] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const updateLine = () => {
      if (!firstNodeRef.current || !lastNodeRef.current || !stepsListRef.current) return;
      const containerRect = stepsListRef.current.getBoundingClientRect();
      const firstRect = firstNodeRef.current.getBoundingClientRect();
      const lastRect = lastNodeRef.current.getBoundingClientRect();
      
      // Since the first/last nodes are static wrapper divs, the circle center is exactly 
      // 0px (no top padding) + 22px (half of h-11) = 22px from the top of the wrapper.
      const top = firstRect.top + 22 - containerRect.top;
      const bottom = lastRect.top + 22 - containerRect.top;
      const height = Math.max(0, bottom - top);
      
      setLineBounds({ top, height });
    };

    updateLine();
    const timer = setTimeout(updateLine, 150);
    
    const observer = new ResizeObserver(() => {
      updateLine();
    });

    if (stepsListRef.current) {
      observer.observe(stepsListRef.current);
    }
    window.addEventListener("resize", updateLine);
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", updateLine);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div ref={stepsListRef} className="relative">
        {/* Static Background Track Line */}
        <div
          className="absolute left-[1.375rem] w-[2px] bg-[#082D4D]/10 -translate-x-1/2 pointer-events-none"
          style={{ top: `${lineBounds.top}px`, height: `${lineBounds.height}px` }}
        />
        {/* Animated Line Container with Overflow Hidden to prevent spring overshoot */}
        <div
          className="absolute left-[1.375rem] w-[20px] -translate-x-1/2 pointer-events-none overflow-hidden"
          style={{ top: `${lineBounds.top}px`, height: `${lineBounds.height}px` }}
        >
          <motion.div
            className="absolute left-1/2 w-[2.5px] h-full bg-[#6FD179] -translate-x-1/2 pointer-events-none shadow-[0_0_8px_rgba(111,209,121,0.6)]"
            style={{ scaleY, originY: 0 }}
          />
        </div>
        
        <div className="space-y-8 md:space-y-12">
          {timeline.map((t, index) => {
            const isFirst = index === 0;
            const isLast = index === timeline.length - 1;

            return (
              <div key={t.year} ref={isFirst ? firstNodeRef : isLast ? lastNodeRef : undefined}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-6 group"
                >
                    {/* Node Container */}
                    <div className="w-11 shrink-0 flex items-center justify-center">
                      <div
                        className="w-11 h-11 rounded-full bg-[#FAFBFD] border-2 border-[#6FD179] text-[#082D4D] flex items-center justify-center font-bold text-xs shadow-sm relative z-10 group-hover:bg-[#6FD179] group-hover:text-white transition-colors duration-300"
                        style={{ fontFamily: SAT }}
                      >
                        {t.year}
                      </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className="flex-1 min-w-0 bg-white rounded-2xl p-6 sm:p-8 border border-[#082D4D]/08 shadow-sm group-hover:shadow-md transition-shadow">
                      <p className="text-[#082D4D]/80 leading-relaxed text-sm sm:text-[1.0625rem] font-medium">
                        {t.event}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}


export function AboutUs() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <main className="bg-[#FFFFFF] min-h-screen text-[#082D4D]" style={{ fontFamily: SAT }}>

      {/* 1. HERO: The Core Story & Spark */}
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
              Where craft meets <br /><span className="italic text-[#6FD179]">conviction.</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-lg md:text-xl text-[#082D4D]/75 leading-relaxed text-balance mb-10">
              Crowdfunding was born to democratize creation. But over the last decade, algorithms drowned out true craft, and empty CGI mockups broke backer trust. 
              <strong className="text-[#082D4D]"> ideakicks was built to restore that promise</strong> — with 100% human curation, verified prototypes, and real creator partnership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proof Metrics Section */}
      <section className="py-20 bg-white border-b border-[#082D4D]/05">
        <div className="container-base max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-normal text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 500 }}>100%</p>
              <p className="text-sm text-[#082D4D]/60 font-medium">Physical Prototype Vetting</p>
            </div>
            <div className="text-center sm:border-l sm:border-[#082D4D]/08">
              <p className="text-4xl sm:text-5xl font-normal text-[#6FD179] mb-2" style={{ fontFamily: CD, fontWeight: 500 }}>₹0</p>
              <p className="text-sm text-[#082D4D]/60 font-medium">Upfront Listing Fee</p>
            </div>
            <div className="text-center sm:border-l sm:border-[#082D4D]/08">
              <p className="text-4xl sm:text-5xl font-normal text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 500 }}>48h</p>
              <p className="text-sm text-[#082D4D]/60 font-medium">Human Review Guarantee</p>
            </div>
            <div className="text-center sm:border-l sm:border-[#082D4D]/08">
              <p className="text-4xl sm:text-5xl font-normal text-[#6FD179] mb-2" style={{ fontFamily: CD, fontWeight: 500 }}>98%</p>
              <p className="text-sm text-[#082D4D]/60 font-medium">Fulfillment Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY & THE PROBLEM WE ARE SOLVING: Visual Side-by-Side Breakdown */}
      <section className="py-20 lg:py-28 bg-[#FAFBFD] border-y border-[#082D4D]/06">
        <div className="container-base max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-section text-[#082D4D] mb-4">
              The problem with open crowdfunding
            </h2>
            <p className="body-large text-[#082D4D]/65 max-w-2xl mx-auto">
              Traditional platforms optimized for sheer campaign volume and ad revenue, sacrificing quality and leaving both creators and backers burned.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-16 shadow-[0_4px_40px_rgba(8,45,77,0.03)] border border-[#082D4D]/05">
            {/* Headers */}
            <div className="grid grid-cols-1 md:grid-cols-2 pb-8 border-b border-[#082D4D]/05 mb-8 relative">
               <div className="md:pr-12 text-sm font-bold text-[#082D4D]/40 uppercase tracking-widest hidden md:flex items-center">
                 Legacy Platforms
               </div>
               <div className="md:pl-12 text-sm font-bold text-[#6FD179] uppercase tracking-widest hidden md:flex items-center gap-2">
                 <img src="/ideakicks-wordmark.svg" alt="ideakicks" className="h-3.5 sm:h-4 opacity-80" />
                 <span className="translate-y-[3px]">Approach</span>
               </div>
            </div>

            <div className="space-y-12 md:space-y-16 relative">
               {/* Continuous middle line */}
               <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#082D4D]/05 -translate-x-1/2" />
               
               {PROBLEM_POINTS.map((item, i) => (
                 <div key={i} className="grid grid-cols-1 md:grid-cols-2 group">
                   {/* Legacy Side */}
                   <div className="md:pr-12 relative pb-8 md:pb-0">
                     <div className="md:hidden text-xs font-bold text-[#082D4D]/40 uppercase tracking-widest mb-3">Legacy Platforms</div>
                     <h3 className="text-xl font-medium text-[#082D4D]/40 mb-3" style={{ fontFamily: CD }}>{item.broken}</h3>
                     <p className="text-sm text-[#082D4D]/50 leading-relaxed">{item.brokenDesc}</p>
                   </div>
                   
                   {/* ideakicks Side */}
                   <div className="md:pl-12 relative">
                     {/* Hover effect line */}
                     <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[#6FD179]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     {/* Glowing Dot */}
                     <div className="hidden md:block absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#6FD179] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(111,209,121,0.5)] z-10" />
                     
                     <div className="md:hidden text-xs font-bold text-[#6FD179] uppercase tracking-widest mb-3 flex items-center gap-2">
                       <img src="/ideakicks-wordmark.svg" alt="ideakicks" className="h-3 opacity-80" />
                       <span className="translate-y-[3px]">Approach</span>
                     </div>
                     <h3 className="text-xl font-medium text-[#0F4C82] mb-3" style={{ fontFamily: CD }}>{item.ideakicks}</h3>
                     <p className="text-sm text-[#082D4D]/80 leading-relaxed">{item.ideakicksDesc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT IDEAKICKS IS: Visual 3-Pillar Deep Dive */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-base max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-section text-[#082D4D] mb-4">
              A curated launchpad built for substance
            </h2>
            <p className="body-large text-[#082D4D]/65 max-w-2xl mx-auto">
              We aren’t a bulletin board where anyone can post a render and walk away. We are a dedicated launch ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((p, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl border border-[#0F4C82]/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#082D4D]/05">
                    <ImageWithFallback 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-xs text-[#0F4C82] font-mono font-bold mb-1">{p.num}</p>
                    <h3 className="text-lg font-normal text-[#082D4D] mb-3 leading-snug" style={{ fontFamily: CD, fontWeight: 400 }}>
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#082D4D]/65 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION: Immersive Editorial Typography */}
      <section className="py-24 lg:py-32 bg-[#082D4D] text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#6FD179]/[0.03] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        
        <div className="container-base max-w-5xl mx-auto relative z-10 pl-4 md:pl-12">
          
          {/* Mission */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-[#6FD179] w-8 md:w-12" />
              <h2 className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#6FD179]">Our Mission</h2>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white mb-8 leading-[1.1]" style={{ fontFamily: CD }}>
              Empowering physical creation without compromise.
            </h3>
            <p className="text-white/70 text-lg md:text-2xl leading-relaxed max-w-3xl font-light">
              To eliminate the friction, fraud, and noise in bringing ambitious ideas to life — giving authentic creators the coaching and tools to build, and backers the certainty to believe again.
            </p>
          </div>

          {/* Vision */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-[#6FD179] w-8 md:w-12" />
              <h2 className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#6FD179]">Our Vision</h2>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white mb-8 leading-[1.1]" style={{ fontFamily: CD }}>
              A global renaissance of tangible craft.
            </h3>
            <p className="text-white/70 text-lg md:text-2xl leading-relaxed max-w-3xl font-light">
              A future where craftsmanship, sustainable technology, and purposeful design triumph over disposable consumerism and algorithmic hype. We envision a world where anyone with a viable prototype can bring it to production.
            </p>
          </div>

        </div>
      </section>

      {/* 5. THE TEAM: Interactive 3D Flip Story Cards */}
      <section className="py-20 lg:py-28 bg-[#FAFBFD] border-b border-[#082D4D]/06">
        <div className="container-base max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="heading-section text-[#082D4D] mb-3">Meet the curators</h2>
            <p className="body-large text-[#082D4D]/60 max-w-xl mx-auto">
              Small by design. Every person here has a direct impact on every creator we work with. <strong>Hover over any card to read their full story.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m) => {
              const isFlipped = activeCardId === m.id;
              return (
                <div
                  key={m.id}
                  className="h-[460px] sm:h-[480px] w-full flip-card-container group rounded-2xl cursor-pointer"
                  onMouseEnter={() => setActiveCardId(m.id)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onPointerEnter={() => setActiveCardId(m.id)}
                  onPointerLeave={() => setActiveCardId(null)}
                  onClick={() => setActiveCardId((prev) => (prev === m.id ? null : m.id))}
                  role="region"
                  aria-label={`${m.name}, ${m.role}. Hover to read story.`}
                >
                  <div className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}>
                    {/* FRONT FACE */}
                    <div className="flip-card-front bg-white rounded-2xl overflow-hidden border border-[#0F4C82]/08 shadow-[0_4px_20px_rgba(8,45,77,0.06)] group-hover:shadow-[0_12px_32px_rgba(8,45,77,0.12)] transition-shadow duration-300 flex flex-col">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#082D4D]/05">
                        <ImageWithFallback
                          src={m.avatar}
                          alt={m.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5">
                        <h3
                          className="text-[#082D4D] text-lg mb-0.5 leading-snug"
                          style={{ fontFamily: CD, fontWeight: 500 }}
                        >
                          {m.name}
                        </h3>
                        <p className="text-xs text-[#6FD179] font-bold tracking-wide uppercase mb-3">
                          {m.role}
                        </p>
                        <p className="text-sm text-[#082D4D]/65 leading-relaxed italic line-clamp-3">
                          "{m.quote}"
                        </p>
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="flip-card-back bg-gradient-to-br from-[#082D4D] via-[#0A365D] to-[#082D4D] text-white rounded-2xl overflow-hidden p-6 border border-[#6FD179]/20 shadow-[0_12px_36px_rgba(8,45,77,0.25)] flex flex-col justify-between">
                      <div className="flex flex-col h-full justify-between">
                        {/* Header */}
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <h3
                                className="text-white text-lg leading-tight mb-0.5"
                                style={{ fontFamily: CD, fontWeight: 500 }}
                              >
                                {m.name}
                              </h3>
                              <p className="text-xs text-[#6FD179] font-medium tracking-wide uppercase">
                                {m.role}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Story Body */}
                        <div
                          className="flex-1 overflow-y-auto pr-1 text-xs sm:text-[0.8125rem] text-white/85 leading-relaxed space-y-3 my-2"
                          style={{ scrollbarWidth: "thin" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p>{m.story}</p>
                        </div>

                        {/* Footer Cue */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[0.75rem] text-white/60">
                          <span>Curator Journey</span>
                          <span className="text-[#6FD179] flex items-center" title="ideakicks">
                            <KickerLogo className="h-3.5 w-auto" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. OUR VALUES: Core Tenets */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-base max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="heading-section text-[#082D4D] mb-3">Our operating values</h2>
            <p className="body-large text-[#082D4D]/60 max-w-xl mx-auto">
              The four principles that guide every decision we make — from platform features to campaign approvals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div 
                key={v.title} 
                className="bg-white rounded-2xl border border-[#0F4C82]/08 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#082D4D]/05">
                  <ImageWithFallback
                    src={v.image}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-[#082D4D] text-lg mb-2" style={{ fontFamily: CD, fontWeight: 500 }}>
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#082D4D]/65 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TIMELINE: The Journey So Far */}
      <section className="py-20 lg:py-24 bg-[#FAFBFD] border-t border-[#082D4D]/05">
        <div className="container-base max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="heading-section text-[#082D4D] mb-3">Our story so far</h2>
            <p className="body-large text-[#082D4D]/60 max-w-xl mx-auto">
              From an idea sketched in a Lisbon studio to a trusted platform protecting creators and backers globally.
            </p>
          </div>
          <StoryTimelineComponent timeline={TIMELINE} />
        </div>
      </section>

    </main>
  );
}
