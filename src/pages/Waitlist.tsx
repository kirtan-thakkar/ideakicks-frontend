import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Sparkle, 
  Wrench, 
  Copy, 
  Check, 
  Clock, 
  EnvelopeSimple, 
  Phone, 
  User,
  X,
  Eye,
  RocketLaunch,
  Cpu,
  Lock,
  Headphones,
  CheckFat,
  Buildings
} from "@phosphor-icons/react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const CD = "'Clash Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const SAT = "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type PersonaRole = "creator" | "backer" | "partner";

export interface ProductionProject {
  id: "evoluir" | "goodknocks" | "n-node" | "prx";
  name: string;
  shortName: string;
  tagline: string;
  category: string;
  stage: string;
  statusBadge: string;
  creator: string;
  location: string;
  image: string;
  icon: any;
  summary: string;
  fullPitch: string;
  tangibleCraft: string;
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
    name: "Evo-AIR by Evoluir Beauty",
    shortName: "Evoluir (Evo-AIR)",
    tagline: "The Ultimate High-Performance Makeup Airbrush System",
    category: "Beauty & Consumer Hardware",
    stage: "Phase 3: Mould Validation & Pilot Assembly",
    statusBadge: "In Production · 410% Funded",
    creator: "Evoluir Beauty",
    location: "Ahmedabad, India",
    image: "/campaigns/evo-air/box.png",
    icon: Sparkle,
    summary: "Patented 0.3mm contactless micro-aero atomization engine. Eliminates makeup sponges and bacteria while cutting product waste by 40%.",
    fullPitch: "For decades, makeup application has remained tied to dirty brushes, sponges that absorb liquid, and unhygienic skin contact. Evo-AIR brings aerospace micro-compression into a sleek, portable handheld airbrush device. Using magnetic snap-in Evo-Fill cartridges, it disperses liquid foundation, serums, and skincare into a breathable micro-mist with salon-grade finish.",
    tangibleCraft: "Micro-Aero compression motor machined to 0.02mm tolerances, USB-C 45-minute fast charge, and proprietary magnetic snap-and-spray cartridge locking.",
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
    name: "Goodknocks Tactile Entry",
    shortName: "Goodknocks",
    tagline: "Minimalist Mechanical Smart Deadbolt with Zero Cloud Dependency",
    category: "Smart Home & Hardware Craft",
    stage: "Phase 2: CNC Machining & Stress Testing",
    statusBadge: "In Production · Pre-Launch Beta",
    creator: "Goodknocks Labs",
    location: "Bengaluru, India",
    image: "/campaigns/scrubbitt/action.jpg",
    icon: Lock,
    summary: "Solid billet aerospace aluminum smart lock. Local Matter & Thread mesh, offline cryptographic key exchange, and zero subscription fees.",
    fullPitch: "Smart locks shouldn't be made of creaky plastic or rely on cloud servers that go down when your Wi-Fi hiccups. Goodknocks is CNC-machined from a solid block of 6061-T6 aerospace aluminum. It runs completely offline on Matter and Thread mesh networks, operating with military-grade asymmetric key exchange and kinetic backup power.",
    tangibleCraft: "Bead-blasted matte anodized finish, Swiss-engineered planetary gearbox, tactile mechanical knurled thumbturn with satisfying haptic feedback.",
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
    name: "N-Node Personal Edge Cluster",
    shortName: "N-Node",
    tagline: "Passively Cooled Modular Private Cloud & Local AI Mesh Computer",
    category: "Edge Computing & Infrastructure",
    stage: "Phase 3: Thermal Tuning & Carrier Assembly",
    statusBadge: "In Production · Hardware Rev 2",
    creator: "Node Systems Co.",
    location: "Pune, India",
    image: "/images/vendor_industrial_design.jpg",
    icon: Cpu,
    summary: "Silent, zero-fan extruded aluminum edge node. Dual RISC-V/ARM carrier board, hot-swappable NVMe, and private self-hosted cloud.",
    fullPitch: "Take your data back from big cloud providers. N-Node is a compact, silent personal server designed to sit quietly on your desk while hosting your private file vault, local language models, media library, and home automation. Built with an extruded aluminum convection heatsink that requires zero cooling fans.",
    tangibleCraft: "Heavyweight passive finned heatsink casing, dual 2.5GbE Intel Ethernet, quick-release dual NVMe sleds, and open-source hardware schematics.",
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
    name: "PRX Spatial Audio Wearable",
    shortName: "PRX",
    tagline: "Ultra-Low Latency Planar Magnetic Wireless Spatial Headset",
    category: "Acoustic Engineering & Audio",
    stage: "Phase 2: Acoustic Calibration & Driver Tooling",
    statusBadge: "In Production · Acoustic Tuning",
    creator: "PRX Acoustics",
    location: "Hyderabad, India",
    image: "/images/vendor_manufacturing.jpg",
    icon: Headphones,
    summary: "Custom 50mm planar magnetic transducers with 1.2ms ultra-low RF latency and lossless uncompressed 24-bit/96kHz audio.",
    fullPitch: "Audiophiles demand planar magnetic resolution; gamers demand zero latency; creators demand flat, uncolored frequency response. PRX unites all three into a single featherweight titanium frame. With a proprietary 2.4GHz RF uncompressed transceiver, experience 1.2ms latency—completely imperceptible to human ears.",
    tangibleCraft: "50mm sub-micron planar diaphragm, laser-cut titanium spring headband, memory foam protein leather earcups, and CNC volume dial.",
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
    q: "When will early access begin?",
    a: "We are admitting waitlist members in batches beginning Q4 2026. Waitlist priority is ordered by registration timestamp, so earlier registrations receive access first.",
  },
  {
    q: "How does project-specific early access work for backers?",
    a: "When you select a project (like Evoluir, Goodknocks, N-Node, or PRX), you are placed on that project's private backer cohort. You receive first-look prototype updates, production milestone alerts, and priority access to limited Super Early Bird discount tiers.",
  },
  {
    q: "What are the qualifications to launch as a creator?",
    a: "Creators must have a functional prototype, CAD drawings, or clear technical proof-of-concept. Ideakicks does not permit render-only concepts or unverified claims.",
  },
  {
    q: "What privileges do founding cohort members receive?",
    a: "Founding creators receive 0% platform commission on their first campaign, 48-hour pitch coaching, and direct access to vetted manufacturing suppliers. Early backers get priority pledge access.",
  },
  {
    q: "How does milestone escrow protect backer pledges?",
    a: "Unlike traditional platforms that disburse 100% of funds immediately, Ideakicks holds capital in escrow. Funds are disbursed in tranches as creators provide verified milestone updates.",
  },
  {
    q: "Can international founders and backers participate?",
    a: "Yes. While founded in India, Ideakicks supports cross-border backing, global currency processing, and international logistics partnerships.",
  },
  {
    q: "How will I know when my early access invitation is ready?",
    a: "We will notify you via email and send your invitation code directly to the phone number you provided when your cohort opens.",
  },
];

export function Waitlist() {
  const [role, setRole] = useState<PersonaRole>("backer");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProductionProject | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<WaitlistEntry | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  // Load existing submission if user already signed up on this device
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: WaitlistEntry[] = JSON.parse(stored);
        if (parsed.length > 0) {
          // Keep in storage
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

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
      // Fetch or initialize stored entries
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing: WaitlistEntry[] = stored ? JSON.parse(stored) : [];
      
      // Calculate queue number
      const baseQueue = 142;
      const queueNumber = baseQueue + existing.length + 1;

      const selectedProjObj = IN_PRODUCTION_PROJECTS.find((p) => p.id === selectedProjectId);
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

      // Simulate a quick network validation for smooth UX
      await new Promise((r) => setTimeout(r, 600));

      existing.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      setSubmittedData(newEntry);
      toast.success("Welcome aboard! You've secured your early access spot.");

      // Confetti burst on success
      try {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#6FD179", "#082D4D", "#0F4C82", "#9DE8CC", "#6CC3EA"],
        });
      } catch {
        // Fallback gracefully
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/waitlist?ref=${encodeURIComponent(
      submittedData?.name || "early-access"
    )}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2400);
    }).catch(() => {
      toast.error("Could not copy link automatically.");
    });
  };

  const resetForm = () => {
    setSubmittedData(null);
    setName("");
    setEmail("");
    setPhone("");
    setNote("");
  };

  return (
    <div className="min-h-screen bg-white text-[#33424F] selection:bg-[#6FD179]/30" style={{ fontFamily: SAT }}>
      {/* ── Signature Sky Gradient Hero ───────────────────────────────────── */}
      <section 
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#E8EBEE]"
        style={{
          background: `
            radial-gradient(55% 70% at 22% 18%, #9de8cc 0%, rgba(157, 232, 204, 0) 70%),
            radial-gradient(50% 60% at 92% 58%, #6cc3ea 0%, rgba(108, 195, 234, 0) 70%),
            linear-gradient(180deg, #c9f0e6 0%, #e6f7f6 55%, #ffffff 100%)
          `
        }}
      >
        <div className="max-w-[1120px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Clash Display Headline with exactly one italic Spark word */}
          <h1 
            className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem] font-semibold text-[#082D4D] leading-[1.06] tracking-[-0.025em] max-w-[20ch] mb-6"
            style={{ fontFamily: CD }}
          >
            Be first in <em className="italic text-[#6FD179] font-normal">line.</em>
          </h1>

          {/* Subtitle from Ideakicks Brand Guidelines Foundations */}
          <p className="text-base sm:text-lg md:text-xl text-[#33424F] max-w-[62ch] leading-relaxed mb-10">
            A dependable way for ideas to find backing through transparent goals, 
            structured progress milestones, and community-driven validation. Join the waitlist 
            to secure priority access before public launch.
          </p>

          {/* ── Interactive Role Switcher ─────────────────────────────────── */}
          <div className="w-full max-w-[540px] mb-8">
            <div className="inline-flex p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E8EBEE] shadow-sm gap-1 w-full" role="tablist">
              {(
                [
                  { id: "backer", label: "For Backers", sub: "Explore 4 in-work projects" },
                  { id: "creator", label: "For Creators", sub: "₹0 fee founding launch" },
                  { id: "partner", label: "For Partners", sub: "Join the Guild network" },
                ] as const
              ).map((item) => {
                const active = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`flex-1 flex flex-col items-center justify-center py-2.5 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-[#082D4D] text-white shadow-md"
                        : "text-[#6B7681] hover:text-[#082D4D] hover:bg-white/50"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── BACKER WORKSHOP SHOWCASE: 4 In-Production Projects ────────── */}
          {role === "backer" && (
            <div className="w-full max-w-[960px] mx-auto text-left mb-10 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="bg-white/90 backdrop-blur-md border border-[#E8EBEE] rounded-[24px] p-6 sm:p-8 shadow-[0_4px_24px_-10px_rgba(8,45,77,0.12)]">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-[#E8EBEE]">
                  <div>
                    <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#2A7A37] flex items-center gap-1.5">
                      <RocketLaunch size={14} weight="fill" />
                      Currently in the workshop
                    </span>
                    <h3 
                      className="text-xl sm:text-2xl font-semibold text-[#082D4D] tracking-tight mt-1"
                      style={{ fontFamily: CD }}
                    >
                      Projects in production &amp; development
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B7681] mt-0.5">
                      Select which project you want exclusive early backer perks for, or inspect details below.
                    </p>
                  </div>

                  {/* "All Projects" Quick selector */}
                  <button
                    type="button"
                    onClick={() => handleSelectProject("all")}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      selectedProjectId === "all"
                        ? "bg-[#E8F8EA] text-[#2A7A37] border-[#6FD179] shadow-xs"
                        : "bg-white text-[#082D4D] border-[#DFE3E7] hover:border-[#082D4D]"
                    }`}
                  >
                    {selectedProjectId === "all" && <CheckFat size={13} weight="fill" />}
                    <span>Back All 4 Projects</span>
                  </button>
                </div>

                {/* 4 Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {IN_PRODUCTION_PROJECTS.map((proj) => {
                    const isSelected = selectedProjectId === proj.id;
                    const IconComp = proj.icon;

                    return (
                      <div
                        key={proj.id}
                        className={`group relative rounded-[16px] p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? "bg-white border-[#6FD179] ring-2 ring-[#6FD179]/40 shadow-[0_8px_20px_-8px_rgba(111,209,121,0.3)]"
                            : "bg-[#F7F9FA] hover:bg-white border-[#E8EBEE] hover:border-[#082D4D]/25 shadow-xs"
                        }`}
                      >
                        {/* Top row: badge + category */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold bg-[#E8F8EA] text-[#2A7A37] border border-[#6FD179]/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2A7A37] animate-pulse" />
                              {proj.statusBadge}
                            </span>
                            <span className="text-[0.7rem] font-medium text-[#6B7681]">
                              {proj.category}
                            </span>
                          </div>

                          {/* Title + icon */}
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-9 h-9 rounded-xl bg-white border border-[#E8EBEE] flex items-center justify-center text-[#0F4C82] shadow-xs shrink-0 mt-0.5">
                              <IconComp size={18} weight="bold" />
                            </div>
                            <div>
                              <h4 
                                className="text-base sm:text-lg font-semibold text-[#082D4D] leading-tight group-hover:text-[#0F4C82] transition-colors"
                                style={{ fontFamily: CD }}
                              >
                                {proj.name}
                              </h4>
                              <p className="text-xs text-[#082D4D]/60 mt-0.5">
                                by {proj.creator} · {proj.location}
                              </p>
                            </div>
                          </div>

                          {/* Summary pitch */}
                          <p className="text-xs text-[#6B7681] leading-relaxed mb-4 line-clamp-2">
                            {proj.summary}
                          </p>
                        </div>

                        {/* Bottom action row: Inspect details + Select button */}
                        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E8EBEE]">
                          <button
                            type="button"
                            onClick={() => setActiveModalProject(proj)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C82] hover:text-[#082D4D] hover:underline cursor-pointer"
                          >
                            <Eye size={14} />
                            <span>View details &amp; perks</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSelectProject(proj.id)}
                            className={`inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#082D4D] text-white shadow-xs"
                                : "bg-white border border-[#DFE3E7] hover:border-[#082D4D] text-[#082D4D]"
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check size={13} weight="bold" />
                                <span>Selected</span>
                              </>
                            ) : (
                              <span>Select project</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Backer Banner Hint */}
                <div className="mt-5 p-3 rounded-[12px] bg-[#E8F8EA]/60 border border-[#6FD179]/40 flex items-center justify-between gap-3 text-xs text-[#2A7A37]">
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={16} weight="fill" className="shrink-0" />
                    <span>
                      Currently selected for early access:{" "}
                      <strong className="text-[#082D4D]">
                        {selectedProjectId === "all"
                          ? "All 4 Projects (Ecosystem Backer Pass)"
                          : IN_PRODUCTION_PROJECTS.find((p) => p.id === selectedProjectId)?.shortName}
                      </strong>
                    </span>
                  </span>
                  <span className="hidden sm:inline text-[0.72rem] text-[#6B7681]">
                    You can change or inspect details anytime
                  </span>
                </div>

              </div>

            </div>
          )}

          {/* ── Waitlist Form Shell ───────────────────────────────────────── */}
          <div ref={formRef} className="w-full max-w-[620px] mx-auto text-left">
            <div className="bg-white border border-[#E8EBEE] rounded-[24px] shadow-[0_1px_2px_rgba(8,45,77,0.04),0_8px_24px_-14px_rgba(8,45,77,0.14)] p-6 sm:p-9 transition-all">
              
              {!submittedData ? (
                /* ── Input Form ───────────────────────────────────────── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1 pb-1 border-b border-[#E8EBEE]">
                    <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#2A7A37]">
                      {role === "backer" ? "Project-Wise Early Access" : "Priority Reservation"}
                    </span>
                    <h2 
                      className="text-xl sm:text-2xl font-semibold text-[#082D4D] tracking-tight"
                      style={{ fontFamily: CD }}
                    >
                      {role === "backer"
                        ? `Reserve early backer tier`
                        : role === "creator"
                        ? `Apply as a founding creator`
                        : `Join the manufacturing guild`}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B7681]">
                      {role === "backer"
                        ? `Lock in early bird discounts and private milestone invites for ${
                            selectedProjectId === "all"
                              ? "all 4 projects"
                              : IN_PRODUCTION_PROJECTS.find((p) => p.id === selectedProjectId)?.shortName
                          }.`
                        : role === "creator"
                        ? `Launch with ₹0 platform commission and 48-hour 1-on-1 coaching.`
                        : `Get pre-funded creator matchmaking for prototyping, tooling, and fulfillment.`}
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
                      className="h-[44px] rounded-[8px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
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
                      className="h-[44px] rounded-[8px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
                    />
                  </div>

                  {/* Phone number field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="wl-phone" className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D] flex items-center gap-1.5">
                      <Phone size={13} className="text-[#0F4C82]" />
                      Phone Number <span className="text-[#C2412D]">*</span>
                    </label>
                    <input
                      id="wl-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="h-[44px] rounded-[8px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
                    />
                    <span className="text-[0.72rem] text-[#6B7681]">
                      We will SMS / WhatsApp your private access token prior to public launch.
                    </span>
                  </div>

                  {/* Contextual role note */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="wl-note" className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D]">
                      {role === "creator"
                        ? "What are you looking to launch? (Optional)"
                        : role === "backer"
                        ? "Any specific feedback or questions for the creator? (Optional)"
                        : "What manufacturing or services do you provide? (Optional)"}
                    </label>
                    <input
                      id="wl-note"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={
                        role === "creator"
                          ? "e.g. Consumer Hardware, Sustainable Design, Clean Energy..."
                          : role === "backer"
                          ? "e.g. Interested in custom finishes, developer SDK, shipping..."
                          : "e.g. CNC Machining, PCB Assembly, Tooling, Fulfillment..."
                      }
                      className="h-[44px] rounded-[8px] border border-[#DFE3E7] bg-white px-3.5 text-sm font-medium text-[#082D4D] placeholder:text-[#A3ACB5] focus:outline-none focus:border-[#082D4D] focus:ring-4 focus:ring-[#6FD179]/30 transition-all"
                    />
                  </div>

                  {/* Agreement checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#DFE3E7] text-[#082D4D] accent-[#082D4D] focus:ring-[#6FD179]"
                    />
                    <span className="text-xs text-[#6B7681] leading-relaxed">
                      Send me project milestone updates, early backer secret discount links, and private previews.
                    </span>
                  </label>

                  {/* Submit Button (Spark Primary Pill Button) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-bold text-sm sm:text-base text-[#082D4D] bg-[#6FD179] hover:bg-[#62c76c] shadow-[0_6px_16px_-8px_rgba(60,170,75,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:pointer-events-none mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#082D4D] border-t-transparent rounded-full animate-spin" />
                        <span>Securing your spot...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {role === "backer" && selectedProjectId !== "all"
                            ? `Join waitlist for ${IN_PRODUCTION_PROJECTS.find((p) => p.id === selectedProjectId)?.shortName}`
                            : `Join the early access waitlist`}
                        </span>
                        <ArrowRight size={17} weight="bold" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[0.72rem] text-[#6B7681] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-[#2A7A37]" /> No spam, guaranteed
                    </span>
                    <span>•</span>
                    <span>Direct founder updates</span>
                    <span>•</span>
                    <span>Unsubscribe anytime</span>
                  </div>
                </form>
              ) : (
                /* ── Success Confirmation Screen ─────────────────────── */
                <div className="flex flex-col items-center text-center py-4">
                  {/* Green Checkmark Disc */}
                  <div className="w-16 h-16 rounded-full bg-[#E8F8EA] flex items-center justify-center text-[#2A7A37] mb-5 shadow-sm">
                    <CheckCircle size={36} weight="fill" />
                  </div>

                  {/* Position badge */}
                  <span className="inline-flex items-center h-7 px-3.5 rounded-full bg-[#082D4D] text-white text-xs font-bold tracking-wide mb-3">
                    Early Access Pass #{submittedData.queueNumber}
                  </span>

                  <h3 
                    className="text-2xl sm:text-3xl font-semibold text-[#082D4D] mb-2 tracking-tight"
                    style={{ fontFamily: CD }}
                  >
                    You are in <em className="italic text-[#6FD179] font-normal">line!</em>
                  </h3>

                  <p className="text-sm text-[#33424F] max-w-[46ch] leading-relaxed mb-6">
                    Thank you, <strong className="text-[#082D4D]">{submittedData.name}</strong>. 
                    We have reserved your founding spot as a{" "}
                    <strong className="text-[#082D4D] capitalize">{submittedData.role}</strong>. 
                    {submittedData.projectName && (
                      <span className="block mt-1 text-[#2A7A37] font-semibold">
                        Priority Registered for: {submittedData.projectName}
                      </span>
                    )}
                  </p>

                  {/* Details summary box */}
                  <div className="w-full bg-[#F7F9FA] border border-[#E8EBEE] rounded-[16px] p-4 text-left flex flex-col gap-2 mb-6 text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-[#6B7681]">
                      <span>Reserved for:</span>
                      <strong className="text-[#082D4D]">{submittedData.name}</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#6B7681]">
                      <span>Email address:</span>
                      <strong className="text-[#082D4D]">{submittedData.email}</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#6B7681]">
                      <span>Contact phone:</span>
                      <strong className="text-[#082D4D]">{submittedData.phone}</strong>
                    </div>
                    {submittedData.projectName && (
                      <div className="flex justify-between items-center text-[#6B7681]">
                        <span>Project Interest:</span>
                        <strong className="text-[#082D4D]">{submittedData.projectName}</strong>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-[#6B7681]">
                      <span>Ecosystem role:</span>
                      <strong className="text-[#082D4D] capitalize">{submittedData.role}</strong>
                    </div>
                  </div>

                  {/* Share referral card */}
                  <div className="w-full bg-[#E8F8EA]/50 border border-[#6FD179]/40 rounded-[16px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#082D4D]">Invite another founder or backer</p>
                      <p className="text-[0.72rem] text-[#6B7681]">Bring members of your network to fast-track cohort admission.</p>
                    </div>
                    <button
                      type="button"
                      onClick={copyReferralLink}
                      className="shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-white border border-[#DFE3E7] hover:border-[#082D4D] text-[#082D4D] text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check size={14} className="text-[#2A7A37]" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy link
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reset action */}
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-semibold text-[#0F4C82] hover:text-[#082D4D] hover:underline cursor-pointer"
                  >
                    ← Submit another reservation
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ── Project Details Modal ────────────────────────────────────────── */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl border border-[#E8EBEE] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-[#E8EBEE] flex items-start justify-between gap-4 bg-[#F7F9FA]">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold bg-[#E8F8EA] text-[#2A7A37] border border-[#6FD179]/30 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A7A37] animate-pulse" />
                  {activeModalProject.statusBadge}
                </span>
                <h3 
                  className="text-2xl font-semibold text-[#082D4D] leading-tight"
                  style={{ fontFamily: CD }}
                >
                  {activeModalProject.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7681] mt-1">
                  {activeModalProject.tagline} · by <strong className="text-[#082D4D]">{activeModalProject.creator}</strong> ({activeModalProject.location})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#DFE3E7] hover:border-[#082D4D] flex items-center justify-center text-[#082D4D] cursor-pointer transition-colors shrink-0"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Innovation pitch */}
              <div>
                <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-[#0F4C82] mb-2">
                  The Innovation &amp; Problem Solved
                </h4>
                <p className="text-sm text-[#33424F] leading-relaxed">
                  {activeModalProject.fullPitch}
                </p>
              </div>

              {/* Tangible craft & hardware specs */}
              <div className="bg-[#F7F9FA] rounded-[16px] p-4 border border-[#E8EBEE]">
                <h4 className="text-xs font-bold tracking-[0.08em] uppercase text-[#082D4D] mb-1.5 flex items-center gap-1.5">
                  <Wrench size={14} className="text-[#0F4C82]" />
                  Tangible Craft &amp; Engineering Specs
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7681] leading-relaxed">
                  {activeModalProject.tangibleCraft}
                </p>
              </div>

              {/* Structured Milestones */}
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

              {/* Early Backer Perks Box */}
              <div className="bg-[#082D4D] text-white rounded-[16px] p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6FD179]">
                    Exclusive Waitlist Backer Privilege
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#6FD179] text-[#082D4D]">
                    {activeModalProject.backerPerks.discount}
                  </span>
                </div>
                <h5 className="text-base font-semibold text-white mb-1" style={{ fontFamily: CD }}>
                  {activeModalProject.backerPerks.edition}
                </h5>
                <p className="text-xs text-white/75 leading-relaxed">
                  {activeModalProject.backerPerks.description}
                </p>
              </div>

            </div>

            {/* Modal Footer with the requested Convince CTA */}
            <div className="p-4 sm:p-5 border-t border-[#E8EBEE] bg-[#F7F9FA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#6B7681] text-center sm:text-left">
                Pledges are held in milestone escrow until proof of delivery.
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

      {/* ── Founding Cohort Privileges (Mist Ground) ───────────────────── */}
      <section className="py-20 md:py-28 bg-[#F7F9FA] border-b border-[#E8EBEE]">
        <div className="max-w-[1120px] mx-auto px-6">
          
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-[#2A7A37] mb-2">
              Founding Cohort Privileges
            </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-[2.65rem] font-semibold text-[#082D4D] tracking-tight leading-tight max-w-[24ch]"
              style={{ fontFamily: CD }}
            >
              Why join early <em className="italic text-[#6FD179] font-normal">access?</em>
            </h2>
            <p className="text-base text-[#6B7681] max-w-[52ch] mt-3">
              We are building a launchpad for substance over hype. Early waitlist members receive guaranteed founding advantages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Zero Fee */}
            <div className="bg-white border border-[#E8EBEE] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(8,45,77,0.04),0_8px_24px_-14px_rgba(8,45,77,0.14)] flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#E8F8EA] flex items-center justify-center text-[#2A7A37] font-bold text-sm mb-4">
                <Sparkle size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-semibold text-[#082D4D] mb-2" style={{ fontFamily: CD }}>
                ₹0 Platform Fee
              </h4>
              <p className="text-sm text-[#6B7681] leading-relaxed">
                The first 100 verified founding campaigns launch at 0% platform commission. Keep 100% of your pledged capital.
              </p>
            </div>

            {/* Card 2: 48h Review */}
            <div className="bg-white border border-[#E8EBEE] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(8,45,77,0.04),0_8px_24px_-14px_rgba(8,45,77,0.14)] flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#E8F8EA] flex items-center justify-center text-[#2A7A37] font-bold text-sm mb-4">
                <Clock size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-semibold text-[#082D4D] mb-2" style={{ fontFamily: CD }}>
                48h Human Review
              </h4>
              <p className="text-sm text-[#6B7681] leading-relaxed">
                Direct 1-on-1 coaching and milestone goal validation from Bodhi and our review board to build launch readiness.
              </p>
            </div>

            {/* Card 3: Escrow Security */}
            <div className="bg-white border border-[#E8EBEE] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(8,45,77,0.04),0_8px_24px_-14px_rgba(8,45,77,0.14)] flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#E8F8EA] flex items-center justify-center text-[#2A7A37] font-bold text-sm mb-4">
                <ShieldCheck size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-semibold text-[#082D4D] mb-2" style={{ fontFamily: CD }}>
                Milestone Escrow
              </h4>
              <p className="text-sm text-[#6B7681] leading-relaxed">
                Pledges are safeguarded in escrow and disbursed sequentially as creators fulfill verifiable production stages.
              </p>
            </div>

            {/* Card 4: The Guild */}
            <div className="bg-white border border-[#E8EBEE] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(8,45,77,0.04),0_8px_24px_-14px_rgba(8,45,77,0.14)] flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#E8F8EA] flex items-center justify-center text-[#2A7A37] font-bold text-sm mb-4">
                <Wrench size={20} weight="fill" />
              </div>
              <h4 className="text-lg font-semibold text-[#082D4D] mb-2" style={{ fontFamily: CD }}>
                The Guild Network
              </h4>
              <p className="text-sm text-[#6B7681] leading-relaxed">
                Immediate matchmaking with pre-vetted rapid prototypers, tooling fabricators, and fulfillment partners.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── Brand Foundations Editorial Banner ──────────────────────────── */}
      <section className="py-20 md:py-24 bg-white border-b border-[#E8EBEE]">
        <div className="max-w-[1120px] mx-auto px-6">
          
          <div className="bg-[#082D4D] text-white rounded-[24px] p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Ambient subtle glow */}
            <div 
              className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#6FD179]/15 blur-3xl"
              aria-hidden="true" 
            />

            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#6FD179] mb-3 block">
                MOTION STARTS HERE
              </span>
              <h3 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight mb-4"
                style={{ fontFamily: CD }}
              >
                Where ideas stop sitting <em className="italic text-[#6FD179] font-normal">still.</em>
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-[56ch]">
                Ideakicks creates infrastructure that allows any entrepreneur to bring their ideas to the market, 
                from India to the world. We execute ideas for budding founders and young startups to help them 
                achieve product-market fit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto relative z-10 shrink-0">
              <a 
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full font-bold text-sm text-[#082D4D] bg-[#6FD179] hover:bg-[#62c76c] transition-all duration-200 cursor-pointer shadow-md"
              >
                Reserve my spot
              </a>
              <Link 
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 rounded-full font-bold text-sm text-white/90 border border-white/20 hover:bg-white/10 transition-all duration-200"
              >
                About Ideakicks
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Pre-Launch FAQ Accordion (Unified Accordion UI) ─────────────── */}
      <section className="section-padding bg-white border-b border-[#E8EBEE]">
        <div className="container-base max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-[#2A7A37] mb-2 block">
              Common Questions
            </span>
            <h2 
              className="heading-section text-[#082D4D]"
              style={{ fontFamily: CD }}
            >
              Frequently asked <em className="italic text-[#6FD179] font-normal">questions</em>
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ_ITEMS.map((item, i) => (
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

          {/* Bottom quick reassurance */}
          <div className="mt-12 text-center">
            <p className="text-xs text-[#6B7681]">
              Have a specific question or partnership inquiry? Reach out directly to{" "}
              <a href="mailto:hello@ideakicks.com" className="text-[#0F4C82] font-semibold hover:underline">
                hello@ideakicks.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Waitlist;
