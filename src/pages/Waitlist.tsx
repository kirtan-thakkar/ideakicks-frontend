import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Sparkle, 
  UsersThree, 
  Wrench, 
  Copy, 
  Check, 
  Clock, 
  EnvelopeSimple, 
  Phone, 
  User 
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

interface WaitlistEntry {
  name: string;
  email: string;
  phone: string;
  role: PersonaRole;
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
  const [role, setRole] = useState<PersonaRole>("creator");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<WaitlistEntry | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load existing submission if user already signed up on this device
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: WaitlistEntry[] = JSON.parse(stored);
        if (parsed.length > 0) {
          // Keep in state if user returns, but allow them to register another
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

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
      const baseQueue = 142; // Starting cohort index for early access
      const queueNumber = baseQueue + existing.length + 1;

      const newEntry: WaitlistEntry = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        role,
        note: note.trim() || undefined,
        timestamp: new Date().toISOString(),
        queueNumber,
      };

      // Simulate a quick network validation for smooth UX
      await new Promise((r) => setTimeout(r, 600));

      existing.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      setSubmittedData(newEntry);
      toast.success("Welcome aboard! You've joined the Ideakicks waitlist.");

      // Confetti burst on success
      try {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#6FD179", "#082D4D", "#0F4C82", "#9DE8CC", "#6CC3EA"],
        });
      } catch {
        // Fallback gracefully if canvas-confetti is not loaded
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
          
          {/* Header pill chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center h-7 px-3.5 rounded-full bg-white/80 backdrop-blur-sm text-[#082D4D] text-xs font-bold border border-[#082D4D]/10 shadow-sm">
              Early Access v1.0
            </span>
            <span className="inline-flex items-center h-7 px-3.5 rounded-full bg-[#E8F8EA] text-[#2A7A37] text-xs font-bold border border-[#6FD179]/30">
              ● Pre-Launch Phase
            </span>
            <span className="inline-flex items-center h-7 px-3.5 rounded-full bg-white/70 backdrop-blur-sm text-[#0F4C82] text-xs font-semibold border border-[#082D4D]/08">
              Founding Creator Privileges
            </span>
          </div>

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

          {/* ── Form Card (Ideakicks Form Shell) ─────────────────────────── */}
          <div className="w-full max-w-[620px] mx-auto text-left">
            <div className="bg-white border border-[#E8EBEE] rounded-[24px] shadow-[0_1px_2px_rgba(8,45,77,0.04),0_8px_24px_-14px_rgba(8,45,77,0.14)] p-6 sm:p-9 transition-all">
              
              {!submittedData ? (
                /* ── Waitlist Input Form ─────────────────────────────── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1 pb-1 border-b border-[#E8EBEE]">
                    <span className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#2A7A37]">
                      Priority Reservation
                    </span>
                    <h2 
                      className="text-xl sm:text-2xl font-semibold text-[#082D4D] tracking-tight"
                      style={{ fontFamily: CD }}
                    >
                      Request early access
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B7681]">
                      Fill out your details to join the priority rollout queue.
                    </p>
                  </div>

                  {/* Segmented Persona Role Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D]">
                      I am joining as
                    </label>
                    <div className="inline-flex p-1 rounded-full bg-[#EEF1F3] gap-1 w-full" role="tablist">
                      {(
                        [
                          { id: "creator", label: "Creator", desc: "Launching an idea" },
                          { id: "backer", label: "Backer", desc: "Discovering projects" },
                          { id: "partner", label: "Partner", desc: "Vendor & supply chain" },
                        ] as const
                      ).map((item) => {
                        const active = role === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setRole(item.id)}
                            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                              active
                                ? "bg-white text-[#082D4D] shadow-[0_1px_3px_rgba(8,45,77,0.12)]"
                                : "text-[#6B7681] hover:text-[#082D4D]"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
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
                      We will SMS / WhatsApp your private beta access token prior to launch.
                    </span>
                  </div>

                  {/* Contextual role note */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="wl-note" className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[#082D4D]">
                      {role === "creator"
                        ? "What are you looking to launch? (Optional)"
                        : role === "backer"
                        ? "What categories interest you most? (Optional)"
                        : "What services or capabilities do you provide? (Optional)"}
                    </label>
                    <input
                      id="wl-note"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={
                        role === "creator"
                          ? "e.g. Consumer Hardware, Clean Mobility, Spatial Audio..."
                          : role === "backer"
                          ? "e.g. Smart Hardware, Everyday Carry, Design, Audio..."
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
                      I want to receive private milestone notifications, early cohort invites, and founding perks.
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
                        <span>Reserving your spot...</span>
                      </>
                    ) : (
                      <>
                        <span>Join the early access waitlist</span>
                        <ArrowRight size={17} weight="bold" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[0.72rem] text-[#6B7681] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-[#2A7A37]" /> No spam, guaranteed
                    </span>
                    <span>•</span>
                    <span>100% Free founding tier</span>
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
                    An invitation token will be sent to{" "}
                    <span className="text-[#0F4C82] font-semibold">{submittedData.email}</span>.
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
