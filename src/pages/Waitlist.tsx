import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  EnvelopeSimple, 
  Phone, 
  User, 
  Users, 
  X, 
  Eye, 
  RocketLaunch, 
  Cpu, 
  Lock, 
  Headphones, 
  CheckFat, 
  CaretLeft, 
  CaretRight, 
  Sparkle, 
  ShieldCheck, 
  Wrench, 
  Copy, 
  SealCheck,
  ShareNetwork
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const CD = "'Clash Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const SAT = "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type PersonaRole = "backer" | "creator" | "partner";

export interface ProductionProject {
  id: "evoluir" | "goodknocks" | "n-node" | "prx";
  name: string;
  shortName: string;
  tagline: string;
  category: string;
  stage: string;
  statusBadge: string;
  creator: string;
  creatorAvatar: string;
  location: string;
  image: string;
  icon: any;
  summary: string;
  fullPitch: string;
  tangibleCraft: string;
  raised: string;
  goal: string;
  funded: number;
  backers: number;
  timeline: string;
  milestones: { label: string; status: "done" | "in_progress" | "upcoming" }[];
  backerPerks: {
    discount: string;
    edition: string;
    description: string;
  };
}

const IN_PRODUCTION_PROJECTS: ProductionProject[] = [
  {
    id: "evoluir",
    name: "Evo-AIR: Handheld Contactless Makeup Micro-Airbrush",
    shortName: "Evoluir (Evo-AIR)",
    tagline: "The Ultimate High-Performance Makeup Airbrush System",
    category: "Beauty Tech & Hardware",
    stage: "Phase 3: Mould Validation",
    statusBadge: "In Production · 410% Funded",
    creator: "Evoluir Beauty",
    creatorAvatar: "/campaigns/evo-air/logo.png",
    location: "Ahmedabad, India",
    image: "/campaigns/evo-air/box.png",
    icon: Sparkle,
    summary: "Patented 0.3mm contactless micro-aero atomization engine. Eliminates makeup sponges and bacteria while cutting cosmetic waste by 40%.",
    fullPitch: "For decades, makeup application has remained tied to dirty brushes, sponges that absorb liquid, and unhygienic skin contact. Evo-AIR brings aerospace micro-compression into a sleek, portable handheld airbrush device. Using magnetic snap-in Evo-Fill cartridges, it disperses liquid foundation, serums, and skincare into a breathable micro-mist with salon-grade finish.",
    tangibleCraft: "Micro-Aero compression motor machined to 0.02mm tolerances, USB-C 45-minute fast charge, and proprietary magnetic snap-and-spray cartridge locking.",
    raised: "₹3,07,500",
    goal: "₹75,000",
    funded: 410,
    backers: 842,
    timeline: "Batch 01 Dec 2026",
    milestones: [
      { label: "Micro-Aero 0.3mm compression nozzle patented", status: "done" },
      { label: "Magnetic snap-in Evo-Fill cartridge tooling", status: "done" },
      { label: "Pilot batch mould validation & CE/FCC safety compliance", status: "in_progress" },
      { label: "Mass production dispatch for founding backers", status: "upcoming" },
    ],
    backerPerks: {
      discount: "Save 38% off retail",
      edition: "Founding Pioneer Edition",
      description: "Includes Evo-AIR system, 3 refillable magnetic cartridges, cleaning solution, and priority numbered delivery.",
    },
  },
  {
    id: "goodknocks",
    name: "Goodknocks: Solid Billet Offline Matter Smart Deadbolt",
    shortName: "Goodknocks",
    tagline: "Minimalist Mechanical Smart Deadbolt with Zero Cloud Dependency",
    category: "Smart Home & Hardware",
    stage: "Phase 2: CNC Stress Testing",
    statusBadge: "In Production · 260% Funded",
    creator: "Goodknocks Labs",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    location: "Bengaluru, India",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
    icon: Lock,
    summary: "Solid billet aerospace aluminum smart lock. Local Matter & Thread mesh, offline cryptographic key exchange, and zero subscription fees.",
    fullPitch: "Smart locks shouldn't be made of creaky plastic or rely on cloud servers that go down when your Wi-Fi hiccups. Goodknocks is CNC-machined from a solid block of 6061-T6 aerospace aluminum. It runs completely offline on Matter and Thread mesh networks, operating with military-grade asymmetric key exchange and kinetic backup power.",
    tangibleCraft: "Bead-blasted matte anodized finish, Swiss-engineered planetary gearbox, tactile mechanical knurled thumbturn with satisfying haptic feedback.",
    raised: "₹1,95,000",
    goal: "₹75,000",
    funded: 260,
    backers: 520,
    timeline: "Batch 01 Jan 2027",
    milestones: [
      { label: "CNC milled prototype & planetary gearbox validated", status: "done" },
      { label: "Offline Matter/Thread firmware security audit", status: "done" },
      { label: "100,000-cycle mechanical stress & torture test", status: "in_progress" },
      { label: "Anodizing production run & founding assembly", status: "upcoming" },
    ],
    backerPerks: {
      discount: "Save 35% off retail",
      edition: "Matte Obsidian Founder Serial",
      description: "Includes Goodknocks Deadbolt, 2 Brass Kinetic NFC Cards, Matter Bridge dongle, and free worldwide priority shipping.",
    },
  },
  {
    id: "n-node",
    name: "N-Node: Silent Extruded Aluminum Edge Cluster & Personal Cloud",
    shortName: "N-Node",
    tagline: "Passively Cooled Modular Private Cloud & Local AI Mesh Computer",
    category: "Edge Compute & Hardware",
    stage: "Phase 3: Thermal Tuning",
    statusBadge: "In Production · 190% Funded",
    creator: "Node Systems Co.",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    location: "Pune, India",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    icon: Cpu,
    summary: "Silent, zero-fan extruded aluminum edge node. Dual RISC-V/ARM carrier board, hot-swappable NVMe, and private self-hosted cloud.",
    fullPitch: "Take your data back from big cloud providers. N-Node is a compact, silent personal server designed to sit quietly on your desk while hosting your private file vault, local language models, media library, and home automation. Built with an extruded aluminum convection heatsink that requires zero cooling fans.",
    tangibleCraft: "Heavyweight passive finned heatsink casing, dual 2.5GbE Intel Ethernet, quick-release dual NVMe sleds, and open-source hardware schematics.",
    raised: "₹2,28,000",
    goal: "₹1,20,000",
    funded: 190,
    backers: 412,
    timeline: "Batch 01 Feb 2027",
    milestones: [
      { label: "Dual-SoC carrier PCB layout & fabrication", status: "done" },
      { label: "Passive thermal convection cooling benchmarked", status: "done" },
      { label: "FCC Class B & CE electromagnetic emission certification", status: "in_progress" },
      { label: "Pilot production batch for developer backers", status: "upcoming" },
    ],
    backerPerks: {
      discount: "Save 30% off retail",
      edition: "Developer Founder Tier",
      description: "Includes N-Node with 32GB Unified Memory, pre-installed 2TB NVMe SSD, aluminum desk mount, and VIP developer discord invite.",
    },
  },
  {
    id: "prx",
    name: "PRX-01: Ultra-Low Latency Planar Magnetic Spatial Headset",
    shortName: "PRX",
    tagline: "Ultra-Low Latency Planar Magnetic Wireless Spatial Headset",
    category: "Acoustic Engineering & Audio",
    stage: "Phase 2: Driver Tooling",
    statusBadge: "In Production · 340% Funded",
    creator: "PRX Acoustics",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    location: "Hyderabad, India",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    icon: Headphones,
    summary: "Custom 50mm planar magnetic transducers with 1.2ms ultra-low RF latency and lossless uncompressed 24-bit/96kHz audio.",
    fullPitch: "Audiophiles demand planar magnetic resolution; gamers demand zero latency; creators demand flat, uncolored frequency response. PRX unites all three into a single featherweight titanium frame. With a proprietary 2.4GHz RF uncompressed transceiver, experience 1.2ms latency—completely imperceptible to human ears.",
    tangibleCraft: "50mm sub-micron planar diaphragm, laser-cut titanium spring headband, memory foam protein leather earcups, and CNC volume dial.",
    raised: "₹2,55,000",
    goal: "₹75,000",
    funded: 340,
    backers: 684,
    timeline: "Batch 01 Jan 2027",
    milestones: [
      { label: "50mm sub-micron planar magnetic driver designed", status: "done" },
      { label: "1.2ms lossless 2.4GHz RF protocol developed", status: "done" },
      { label: "Anechoic chamber acoustic equalization & tuning", status: "in_progress" },
      { label: "First batch injection tooling & titanium headband stamping", status: "upcoming" },
    ],
    backerPerks: {
      discount: "Save 40% off retail",
      edition: "Serialized Founder Edition",
      description: "Custom laser-engraved serial number, braided silver-plated OFC cable, magnetic swappable velour earpads, and hard travel shell.",
    },
  },
];

interface WaitlistEntry {
  name: string;
  email: string;
  phone: string;
  role: PersonaRole;
  selectedProject?: string;
  projectName?: string;
  note?: string;
  timestamp: string;
  queueNumber: number;
}

const STORAGE_KEY = "ideakicks_waitlist";

const FAQ_ITEMS = [
  {
    q: "When will priority early access unlock?",
    a: "We admit waitlist members in batches beginning Q4 2026. Access is ordered strictly by registration queue number, meaning earlier reservations lock in their batch delivery date first.",
  },
  {
    q: "How does project-specific priority work for backers?",
    a: "When you select a project (such as Evo-AIR, Goodknocks, N-Node, or PRX), you are reserved a spot in that specific campaign's Super Early Bird discount tier (up to 40% off) and receive private weekly prototyping logs.",
  },
  {
    q: "How does Ideakicks Milestone Escrow safeguard pledges?",
    a: "Unlike traditional crowdfunding platforms that release 100% of capital immediately upon campaign close, Ideakicks locks backer pledges in an audited escrow account. Funds disburse in phases only after verified production milestones.",
  },
  {
    q: "What privileges do founding creators receive?",
    a: "Verified founding creators launch at 0% platform commission, receive 48-hour 1-on-1 pitch and campaign coaching, and get matched directly with vetted manufacturing suppliers in The Guild.",
  },
];

// ─── Holographic Interactive Backer Pass ───────────────────────────────────────

function InteractiveFounderPass({
  name,
  selectedProject,
  queueNumber,
}: {
  name: string;
  selectedProject: ProductionProject | null;
  queueNumber: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const displayName = name.trim() ? name.toUpperCase() : "YOUR NAME HERE";
  const passSerial = `IK-2026-${String(queueNumber).padStart(4, "0")}`;
  const perkLabel = selectedProject ? selectedProject.backerPerks.discount : "FOUNDING BACKER TIER";
  const projectCode = selectedProject ? selectedProject.shortName.toUpperCase() : "ALL 4 WORKSHOP PROJECTS";

  return (
    <div style={{ perspective: 1000 }} className="w-full max-w-[420px] mx-auto select-none">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.12s ease-out",
        }}
        className="relative aspect-[1.58/1] rounded-[24px] p-6 sm:p-7 bg-[#082D4D] text-white overflow-hidden shadow-[0_24px_50px_-16px_rgba(8,45,77,0.45),0_0_0_1px_rgba(255,255,255,0.12)] border border-[#6FD179]/30"
      >
        {/* Holographic Sheen Layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(111, 209, 121, ${glare.opacity}), rgba(255, 255, 255, ${glare.opacity * 0.7}) 22%, transparent 65%)`,
            opacity: glare.opacity > 0 ? 1 : 0,
          }}
        />

        {/* Ambient background glow accents */}
        <div className="absolute -right-14 -top-14 w-48 h-48 rounded-full bg-[#6FD179]/15 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-[#0F4C82]/50 blur-2xl pointer-events-none" />

        {/* Top Header: Logo + Chip + Priority Queue */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-white text-base" style={{ fontFamily: CD }}>
              ideakicks<span className="text-[#6FD179]">.</span>
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.14em] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
              Pass v1.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Holographic simulated gold/green hardware chip */}
            <div className="w-8 h-6 rounded-md bg-gradient-to-br from-[#6FD179] via-[#e2f9e4] to-[#2A7A37] border border-white/40 shadow-inner flex items-center justify-center">
              <div className="w-4 h-3 border border-[#082D4D]/50 rounded-xs grid grid-cols-2 gap-0.5 opacity-70">
                <div className="border-r border-b border-[#082D4D]/50" />
                <div className="border-b border-[#082D4D]/50" />
                <div className="border-r border-[#082D4D]/50" />
                <div />
              </div>
            </div>
            <span className="text-[0.65rem] font-bold text-[#6FD179] bg-[#6FD179]/15 border border-[#6FD179]/30 px-2 py-0.5 rounded-full">
              QUEUE #{queueNumber}
            </span>
          </div>
        </div>

        {/* Middle: Holder Name & Cohort Badge */}
        <div className="relative z-10 my-4 sm:my-5">
          <span className="text-[0.62rem] tracking-[0.16em] uppercase text-white/50 block font-mono">
            AUTHORIZED BACKER HOLDER
          </span>
          <h4
            className="text-lg sm:text-2xl font-bold tracking-wide text-white truncate drop-shadow-sm mt-0.5"
            style={{ fontFamily: CD }}
          >
            {displayName}
          </h4>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[0.68rem] px-2.5 py-0.5 rounded-full bg-[#6FD179]/20 text-[#6FD179] font-bold border border-[#6FD179]/40 truncate max-w-[220px]">
              {projectCode}
            </span>
            <span className="text-[0.68rem] text-white/70 font-mono">
              {perkLabel}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Serial Number & Stylized Barcode */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-end justify-between gap-3 text-xs">
          <div>
            <span className="text-[0.58rem] font-mono tracking-widest text-white/40 block">PASS SERIAL</span>
            <span className="font-mono text-[0.74rem] font-semibold tracking-wider text-white/90">{passSerial}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[0.68rem] text-white/60">
            <div className="flex items-center gap-0.5 h-4 opacity-75">
              {[3, 1, 4, 2, 5, 2, 4, 1, 3, 2, 5, 1, 3].map((h, i) => (
                <div key={i} className="w-0.5 bg-white" style={{ height: `${h * 2.8}px` }} />
              ))}
            </div>
            <span className="hidden sm:inline text-[#6FD179] font-bold">READY</span>
          </div>
        </div>
      </div>

      <div className="text-center text-[0.72rem] text-[#6B7681] mt-3 flex items-center justify-center gap-1.5">
        <Sparkle size={13} className="text-[#2A7A37]" />
        <span>Interactive 3D pass. Tilt with cursor &amp; updates live as you type.</span>
      </div>
    </div>
  );
}

// ─── Main Waitlist Component ───────────────────────────────────────────────────

export function Waitlist() {
  const [role, setRole] = useState<PersonaRole>("backer");
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProductionProject | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<WaitlistEntry | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const currentSpotlight = IN_PRODUCTION_PROJECTS[activeSpotlightIdx];
  const selectedProjObj = IN_PRODUCTION_PROJECTS.find((p) => p.id === selectedProjectId) || null;

  // Queue calculation
  const baseQueue = 142;
  const currentQueueNum = baseQueue + 1;

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const proj = IN_PRODUCTION_PROJECTS.find((p) => p.id === projectId);
    toast.success(
      projectId === "all"
        ? "Selected: All 4 Projects (Ecosystem Backer Pass)"
        : `Selected: ${proj?.shortName || projectId}`
    );
  };

  const handleConvinceFromModal = (project: ProductionProject) => {
    setSelectedProjectId(project.id);
    setActiveModalProject(null);
    toast.success(`We got you convinced! ${project.shortName} selected for your early access pass.`);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      toast.error("Please enter a valid phone number (at least 8 digits).");
      return;
    }

    setIsSubmitting(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing: WaitlistEntry[] = stored ? JSON.parse(stored) : [];
      const queueNumber = baseQueue + existing.length + 1;

      const projectName = role === "backer" 
        ? (selectedProjectId === "all" ? "All 4 Projects (Ecosystem Backer)" : selectedProjObj?.shortName || "Curated Projects")
        : undefined;

      const newEntry: WaitlistEntry = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        role,
        selectedProject: role === "backer" ? selectedProjectId : undefined,
        projectName,
        note: note.trim() || undefined,
        timestamp: new Date().toISOString(),
        queueNumber,
      };

      const updated = [newEntry, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Trigger Confetti Celebration
      try {
        const confettiModule = await import("canvas-confetti");
        confettiModule.default({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6FD179", "#082D4D", "#0F4C82", "#2A7A37"],
        });
      } catch {
        // Ignore confetti error
      }

      setSubmittedData(newEntry);
      toast.success("Priority reservation confirmed! Welcome to Ideakicks.");
    } catch {
      toast.error("Something went wrong saving your reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferralLink = () => {
    const url = window.location.origin + "/waitlist";
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast.success("Waitlist invite link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const resetForm = () => {
    setSubmittedData(null);
    setName("");
    setEmail("");
    setPhone("");
    setNote("");
  };

  return (
    <div className="min-h-screen bg-white text-[#082D4D]" style={{ fontFamily: SAT }}>
      
      {/* ── Hero Section (Atmospheric & Kinetic) ───────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pb-20 text-center">
        {/* Soft background aura */}
        <div 
          className="pointer-events-none absolute inset-x-0 -top-24 h-[480px] bg-gradient-to-b from-[#E8F8EA]/40 via-[#F7F9FA]/60 to-transparent blur-3xl -z-10"
          aria-hidden="true" 
        />

        <div className="max-w-[840px] mx-auto px-6">
          
          {/* Live Status Pill with pulse */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFE3E7] shadow-xs text-xs font-semibold text-[#082D4D] mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6FD179] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2A7A37]" />
            </span>
            <span>Batch 01 Priority Queue · 1,428 Makers &amp; Backers Live</span>
          </motion.div>

          {/* Minimalist Editorial Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#082D4D] tracking-tight leading-[1.08] max-w-[20ch] mx-auto"
            style={{ fontFamily: CD }}
          >
            Back tangible craft before it hits the <em className="italic text-[#6FD179] font-normal">world.</em>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#6B7681] max-w-[50ch] mx-auto mt-4 leading-relaxed"
          >
            A curated launchpad for physical hardware and tangible design. Claim your founder pass below for verified prototype milestones and early cohort pricing.
          </motion.p>

          {/* Fluid Persona Pill Switcher with Spring Animation */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-[#F0F4F8] border border-[#DFE3E7] shadow-xs">
              {(
                [
                  { id: "backer", label: "For Backers", sub: "Explore Projects" },
                  { id: "creator", label: "For Creators", sub: "0% Commission" },
                  { id: "partner", label: "For Guild Partners", sub: "Supply Chain" },
                ] as const
              ).map((tab) => {
                const isActive = role === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRole(tab.id)}
                    className="relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeRolePill"
                        className="absolute inset-0 rounded-full bg-[#082D4D] shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={isActive ? "text-white" : "text-[#6B7681] hover:text-[#082D4D]"}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── KINETIC WORKSHOP STAGE: 4 In-Production Projects (Fluid Carousel) ── */}
      {role === "backer" && (
        <section className="pb-16 sm:pb-20 max-w-[1040px] mx-auto px-6">
          <div className="bg-[#FAFBFD] border border-[#0F4C82]/10 rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_4px_32px_-12px_rgba(8,45,77,0.1)]">
            
            {/* Stage Header & Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E8EBEE]">
              <div>
                <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#2A7A37] flex items-center gap-1.5">
                  <RocketLaunch size={14} weight="fill" />
                  Currently in Tooling &amp; Prototyping
                </span>
                <h3 
                  className="text-2xl sm:text-3xl font-semibold text-[#082D4D] tracking-tight mt-1"
                  style={{ fontFamily: CD }}
                >
                  Featured Hardware Projects
                </h3>
              </div>

              {/* Project Navigation Dots & Arrow Controls */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveSpotlightIdx((prev) => (prev === 0 ? IN_PRODUCTION_PROJECTS.length - 1 : prev - 1))}
                  className="w-9 h-9 rounded-full bg-white border border-[#DFE3E7] hover:border-[#082D4D] text-[#082D4D] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  aria-label="Previous project"
                >
                  <CaretLeft size={16} weight="bold" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {IN_PRODUCTION_PROJECTS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSpotlightIdx(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSpotlightIdx === idx ? "w-6 bg-[#6FD179]" : "w-2 bg-[#DFE3E7] hover:bg-[#A3ACB5]"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSpotlightIdx((prev) => (prev === IN_PRODUCTION_PROJECTS.length - 1 ? 0 : prev + 1))}
                  className="w-9 h-9 rounded-full bg-white border border-[#DFE3E7] hover:border-[#082D4D] text-[#082D4D] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  aria-label="Next project"
                >
                  <CaretRight size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Tactile Project Navigator Rail */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
              {IN_PRODUCTION_PROJECTS.map((proj, idx) => {
                const isActive = activeSpotlightIdx === idx;
                const isSelected = selectedProjectId === proj.id;
                const IconComp = proj.icon;

                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveSpotlightIdx(idx)}
                    className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-white border-[#082D4D] text-[#082D4D] shadow-sm"
                        : "bg-white/60 border-[#E8EBEE] text-[#6B7681] hover:text-[#082D4D] hover:bg-white"
                    }`}
                  >
                    <IconComp size={15} weight={isActive ? "fill" : "regular"} className={isActive ? "text-[#0F4C82]" : "text-[#6B7681]"} />
                    <span>{proj.shortName}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#6FD179] ring-2 ring-white" />
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handleSelectProject("all")}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedProjectId === "all"
                    ? "bg-[#6FD179] text-white border-[#6FD179] shadow-sm"
                    : "bg-white/60 border-[#DFE3E7] text-[#082D4D] hover:bg-[#E8F8EA]"
                }`}
              >
                {selectedProjectId === "all" && <CheckFat size={13} weight="fill" />}
                <span>Back All 4 Projects</span>
              </button>
            </div>

            {/* Cinematic Animated Spotlight Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpotlight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-[#E8EBEE] shadow-sm"
              >
                {/* Left: Product Visual with 16:10 Container */}
                <div className="lg:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden bg-[#082D4D]/05 group">
                  <ImageWithFallback
                    src={currentSpotlight.image}
                    alt={currentSpotlight.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/60 via-transparent to-transparent" />

                  {/* Top-Right Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-bold bg-white/95 backdrop-blur-md text-[#2A7A37] border border-[#6FD179]/40 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A7A37] animate-pulse" />
                      {currentSpotlight.statusBadge}
                    </span>
                  </div>

                  {/* Bottom Creator Attribution */}
                  <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0 bg-white">
                      <ImageWithFallback src={currentSpotlight.creatorAvatar} alt={currentSpotlight.creator} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white text-[0.75rem] font-medium drop-shadow-md">
                      {currentSpotlight.creator} · {currentSpotlight.location}
                    </span>
                  </div>
                </div>

                {/* Right: Tangible Story & Metrics */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#6FD179]">
                        {currentSpotlight.category}
                      </span>
                      <span className="text-[#082D4D]/30">•</span>
                      <span className="text-[0.7rem] font-medium text-[#082D4D]/60">
                        {currentSpotlight.stage}
                      </span>
                    </div>

                    <h4 
                      className="text-xl sm:text-2xl font-semibold text-[#082D4D] leading-snug mb-2"
                      style={{ fontFamily: CD }}
                    >
                      {currentSpotlight.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#082D4D]/75 leading-relaxed mb-4">
                      {currentSpotlight.summary}
                    </p>

                    {/* Escrow Funding Stat Bar */}
                    <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E8EBEE] mb-5">
                      <div className="flex items-end justify-between gap-3 mb-2">
                        <div>
                          <p className="text-base font-bold text-[#082D4D]">{currentSpotlight.raised}</p>
                          <p className="text-[0.7rem] text-[#082D4D]/45">pledged of {currentSpotlight.goal} milestone goal</p>
                        </div>
                        <span className="text-sm font-bold text-[#6FD179]">{currentSpotlight.funded}%</span>
                      </div>
                      <div className="h-2 bg-[#082D4D]/08 rounded-full overflow-hidden mb-2.5">
                        <div
                          className="h-full bg-[#6FD179] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(currentSpotlight.funded, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[0.7rem] text-[#082D4D]/55 font-medium">
                        <span className="flex items-center gap-1"><Users size={12} className="text-[#0F4C82]" /> {currentSpotlight.backers.toLocaleString()} backers</span>
                        <span className="flex items-center gap-1"><Clock size={12} className="text-[#0F4C82]" /> {currentSpotlight.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectProject(currentSpotlight.id)}
                      className={`w-full sm:flex-1 h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedProjectId === currentSpotlight.id
                          ? "bg-[#6FD179] text-white shadow-md hover:bg-[#62c76c]"
                          : "bg-[#082D4D] hover:bg-[#0c3c64] text-white shadow-xs"
                      }`}
                    >
                      {selectedProjectId === currentSpotlight.id ? (
                        <>
                          <Check size={16} weight="bold" />
                          <span>Selected for Your Pass</span>
                        </>
                      ) : (
                        <>
                          <span>Select {currentSpotlight.shortName}</span>
                          <ArrowRight size={14} weight="bold" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModalProject(currentSpotlight)}
                      className="w-full sm:w-auto h-11 px-5 rounded-xl border border-[#DFE3E7] hover:border-[#082D4D] bg-white text-[#082D4D] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye size={15} />
                      <span>Inspect Specs</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </section>
      )}

      {/* ── THE RESERVATION STUDIO (Form + Interactive Holographic Pass) ─ */}
      <section ref={formRef} className="pb-20 sm:pb-28 max-w-[1040px] mx-auto px-6">
        <div className="bg-white border border-[#0F4C82]/10 rounded-[28px] p-6 sm:p-9 md:p-12 shadow-[0_12px_40px_-16px_rgba(8,45,77,0.12)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Interactive 3D Holographic Founder Pass (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <InteractiveFounderPass
                name={name}
                selectedProject={selectedProjObj}
                queueNumber={currentQueueNum}
              />
            </div>

            {/* Right Column: Streamlined Input Form (7 cols) */}
            <div className="lg:col-span-7">
              {!submittedData ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="pb-1 border-b border-[#E8EBEE]">
                    <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#2A7A37]">
                      PRIORITY PASS ALLOCATION
                    </span>
                    <h3 
                      className="text-2xl sm:text-3xl font-semibold text-[#082D4D] tracking-tight mt-0.5"
                      style={{ fontFamily: CD }}
                    >
                      {role === "backer"
                        ? "Reserve your founder backer tier"
                        : role === "creator"
                        ? "Apply for founding creator cohort"
                        : "Join the Guild manufacturing network"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7681] mt-1">
                      {role === "backer"
                        ? `Lock in priority prototype delivery and early pricing for ${
                            selectedProjectId === "all" ? "all 4 workshop projects" : selectedProjObj?.shortName
                          }.`
                        : role === "creator"
                        ? "Launch with ₹0 platform commission and 48-hour prototype coaching."
                        : "Connect directly with pre-funded hardware creators seeking production partners."}
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="wl-name" className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D] flex items-center gap-1.5">
                      <User size={13} className="text-[#0F4C82]" />
                      Full Name <span className="text-[#C2412D]">*</span>
                    </label>
                    <input
                      id="wl-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="h-[44px] rounded-[10px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="wl-email" className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D] flex items-center gap-1.5">
                      <EnvelopeSimple size={13} className="text-[#0F4C82]" />
                      Email Address <span className="text-[#C2412D]">*</span>
                    </label>
                    <input
                      id="wl-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="h-[44px] rounded-[10px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
                    />
                  </div>

                  {/* Phone number field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="wl-phone" className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D] flex items-center gap-1.5">
                      <Phone size={13} className="text-[#0F4C82]" />
                      Phone / WhatsApp <span className="text-[#C2412D]">*</span>
                    </label>
                    <input
                      id="wl-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="h-[44px] rounded-[10px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full font-bold text-sm text-[#082D4D] bg-[#6FD179] hover:bg-[#62c76c] shadow-[0_8px_20px_-6px_rgba(111,209,121,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {isSubmitting ? (
                      <span>Securing your spot...</span>
                    ) : (
                      <>
                        <span>Claim My Priority Backer Pass</span>
                        <ArrowRight size={16} weight="bold" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[0.7rem] text-[#6B7681] pt-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-[#2A7A37]" />
                      <span>Zero spam · Escrow guaranteed access</span>
                    </span>
                    <span className="font-mono">Queue #{currentQueueNum}</span>
                  </div>
                </form>
              ) : (
                /* Confirmed State Ticket */
                <div className="flex flex-col items-center text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-[#E8F8EA] text-[#2A7A37] flex items-center justify-center mb-4">
                    <SealCheck size={32} weight="fill" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#082D4D]" style={{ fontFamily: CD }}>
                    You are in the cohort, {submittedData.name}!
                  </h4>
                  <p className="text-sm text-[#6B7681] mt-1 max-w-md">
                    Your spot is locked at <strong className="text-[#082D4D]">Queue #{submittedData.queueNumber}</strong> for{" "}
                    <strong className="text-[#082D4D]">{submittedData.projectName || "Ideakicks Cohort"}</strong>.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
                    <button
                      type="button"
                      onClick={copyReferralLink}
                      className="w-full h-10 rounded-full bg-[#082D4D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      {copiedLink ? <Check size={14} /> : <ShareNetwork size={14} />}
                      <span>{copiedLink ? "Link Copied!" : "Share Waitlist Link"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full h-10 rounded-full border border-[#DFE3E7] hover:border-[#082D4D] text-[#082D4D] font-bold text-xs transition-colors cursor-pointer"
                    >
                      Add Another Pass
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ── THE 4 PILLARS OF TANGIBLE CRAFT (Minimalist Kinetic Strip) ─── */}
      <section className="py-16 bg-[#F7F9FA] border-y border-[#E8EBEE]">
        <div className="max-w-[1040px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-[#E8EBEE] shadow-xs">
              <span className="w-9 h-9 rounded-xl bg-[#E8F8EA] text-[#2A7A37] flex items-center justify-center font-bold mb-3">
                <Sparkle size={18} weight="fill" />
              </span>
              <h5 className="font-semibold text-base text-[#082D4D]" style={{ fontFamily: CD }}>₹0 Platform Commission</h5>
              <p className="text-xs text-[#6B7681] mt-1 leading-relaxed">The first 100 verified founding campaigns launch at 0% platform fee.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8EBEE] shadow-xs">
              <span className="w-9 h-9 rounded-xl bg-[#E8F8EA] text-[#2A7A37] flex items-center justify-center font-bold mb-3">
                <Clock size={18} weight="fill" />
              </span>
              <h5 className="font-semibold text-base text-[#082D4D]" style={{ fontFamily: CD }}>48h Human Review</h5>
              <p className="text-xs text-[#6B7681] mt-1 leading-relaxed">Direct 1-on-1 prototype vetting and milestone coaching from Bodhi.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8EBEE] shadow-xs">
              <span className="w-9 h-9 rounded-xl bg-[#E8F8EA] text-[#2A7A37] flex items-center justify-center font-bold mb-3">
                <ShieldCheck size={18} weight="fill" />
              </span>
              <h5 className="font-semibold text-base text-[#082D4D]" style={{ fontFamily: CD }}>Milestone Escrow</h5>
              <p className="text-xs text-[#6B7681] mt-1 leading-relaxed">Pledges disburse sequentially as tangible manufacturing milestones are validated.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8EBEE] shadow-xs">
              <span className="w-9 h-9 rounded-xl bg-[#E8F8EA] text-[#2A7A37] flex items-center justify-center font-bold mb-3">
                <Wrench size={18} weight="fill" />
              </span>
              <h5 className="font-semibold text-base text-[#082D4D]" style={{ fontFamily: CD }}>The Guild Network</h5>
              <p className="text-xs text-[#6B7681] mt-1 leading-relaxed">Direct matchmaking with pre-vetted CNC, injection tooling, and fulfillment hubs.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CURATED FAQ (Crisp Accordion) ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#2A7A37] block mb-1">
              COMMON QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#082D4D]" style={{ fontFamily: CD }}>
              Frequently asked <em className="italic text-[#6FD179] font-normal">questions</em>
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-center text-xs text-[#6B7681] mt-10">
            Have a question? Reach our team directly at{" "}
            <a href="mailto:hello@ideakicks.com" className="text-[#0F4C82] font-semibold hover:underline">
              hello@ideakicks.com
            </a>
          </p>
        </div>
      </section>

      {/* ── PROJECT SPECS MODAL (With "Got You Convinced" CTA) ──────────── */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl border border-[#E8EBEE] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Hero */}
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-[#082D4D]/05 border-b border-[#E8EBEE]">
              <ImageWithFallback
                src={activeModalProject.image}
                alt={activeModalProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082D4D]/80 via-[#082D4D]/25 to-transparent" />
              
              <div className="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white hover:bg-white flex items-center justify-center text-[#082D4D] cursor-pointer transition-colors shadow-sm"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0 bg-white shadow-xs">
                    <ImageWithFallback src={activeModalProject.creatorAvatar} alt={activeModalProject.creator} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold drop-shadow-sm block">{activeModalProject.creator}</span>
                    <span className="text-white/80 text-[0.68rem] drop-shadow-sm">{activeModalProject.location}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-bold bg-[#6FD179] text-[#082D4D] shadow-sm">
                  {activeModalProject.statusBadge}
                </span>
              </div>
            </div>

            {/* Modal Title Bar */}
            <div className="p-6 pb-4 border-b border-[#E8EBEE] bg-[#F7F9FA]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#6FD179]">
                  {activeModalProject.category}
                </span>
                <span className="text-[#082D4D]/30">•</span>
                <span className="text-[0.7rem] font-medium text-[#082D4D]/60">
                  {activeModalProject.stage}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-[#082D4D]" style={{ fontFamily: CD }}>
                {activeModalProject.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7681] mt-1">{activeModalProject.tagline}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-[#0F4C82] mb-2">
                  The Innovation &amp; Problem Solved
                </h4>
                <p className="text-sm text-[#33424F] leading-relaxed">{activeModalProject.fullPitch}</p>
              </div>

              <div className="bg-[#F7F9FA] rounded-[16px] p-4 border border-[#E8EBEE]">
                <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-[#082D4D] mb-1.5 flex items-center gap-1.5">
                  <Wrench size={14} className="text-[#0F4C82]" />
                  Tangible Craft &amp; Engineering Specs
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7681] leading-relaxed">{activeModalProject.tangibleCraft}</p>
              </div>

              {/* Milestones */}
              <div>
                <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-[#082D4D] mb-3">
                  Production Milestone Tracker
                </h4>
                <div className="space-y-2.5">
                  {activeModalProject.milestones.map((m, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-[12px] border text-xs sm:text-sm"
                      style={{
                        backgroundColor: m.status === "done" ? "#E8F8EA" : m.status === "in_progress" ? "#FFFFFF" : "#F7F9FA",
                        borderColor: m.status === "done" ? "#6FD179" : m.status === "in_progress" ? "#0F4C82" : "#E8EBEE",
                      }}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.7rem] font-bold shrink-0 ${
                        m.status === "done"
                          ? "bg-[#2A7A37] text-white"
                          : m.status === "in_progress"
                          ? "bg-[#0F4C82] text-white"
                          : "bg-[#DFE3E7] text-[#6B7681]"
                      }`}>
                        {m.status === "done" ? "✓" : idx + 1}
                      </span>
                      <span className={`flex-1 font-medium ${
                        m.status === "done" ? "text-[#2A7A37]" : m.status === "in_progress" ? "text-[#082D4D] font-bold" : "text-[#6B7681]"
                      }`}>
                        {m.label}
                      </span>
                      <span className="text-[0.7rem] uppercase tracking-wider font-bold">
                        {m.status === "done" && <span className="text-[#2A7A37]">Validated</span>}
                        {m.status === "in_progress" && <span className="text-[#0F4C82]">In Progress</span>}
                        {m.status === "upcoming" && <span className="text-[#6B7681]">Next</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backer Perk */}
              <div className="bg-[#082D4D] text-white rounded-[16px] p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6FD179]">Exclusive Backer Perk</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#6FD179] text-[#082D4D]">
                    {activeModalProject.backerPerks.discount}
                  </span>
                </div>
                <h5 className="text-base font-semibold text-white mb-1" style={{ fontFamily: CD }}>
                  {activeModalProject.backerPerks.edition}
                </h5>
                <p className="text-xs text-white/75 leading-relaxed">{activeModalProject.backerPerks.description}</p>
              </div>
            </div>

            {/* Modal Footer with Convince CTA */}
            <div className="p-4 sm:p-5 border-t border-[#E8EBEE] bg-[#F7F9FA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#6B7681] text-center sm:text-left">
                Escrow protected · Super Early Bird pricing locked.
              </span>
              <button
                type="button"
                onClick={() => handleConvinceFromModal(activeModalProject)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-bold text-sm text-[#082D4D] bg-[#6FD179] hover:bg-[#62c76c] shadow-[0_6px_16px_-8px_rgba(60,170,75,0.7)] transition-all cursor-pointer"
              >
                <span>Got you convinced? Back {activeModalProject.shortName}</span>
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Waitlist;
