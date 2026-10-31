import { useState } from "react";
import { Link } from "react-router";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Image as ImageIcon, 
  Gift, 
  FileText, 
  Shield, 
  Check, 
  Copy, 
  Lock, 
  Warning, 
  Question,
  Video,
  Globe,
  CalendarBlank,
  CaretLeft,
  CaretRight
} from "@phosphor-icons/react";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const INPUT = "w-full h-12 px-4 rounded-xl border border-[#082D4D]/15 bg-white text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] focus:ring-1 focus:ring-[#0F4C82] transition-all text-sm shadow-sm";
const LABEL = "block text-xs font-normal text-[#082D4D] mb-2 uppercase tracking-wide";
const STEP_BUTTON = "h-12 px-8 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MONTH_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatMonthYear(val: string) {
  if (!val) return "";
  const [yearStr, monthStr] = val.split("-");
  const monthIdx = parseInt(monthStr, 10) - 1;
  if (isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) return val;
  return `${MONTH_FULL[monthIdx]} ${yearStr}`;
}

function EstimatedDeliveryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const initialYear = value ? parseInt(value.split("-")[0], 10) : new Date().getFullYear();
  const [viewYear, setViewYear] = useState(isNaN(initialYear) ? new Date().getFullYear() : initialYear);

  const displayLabel = formatMonthYear(value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${INPUT} flex items-center justify-between text-left cursor-pointer select-none transition-all hover:border-[#0F4C82]/40`}
      >
        <span className={displayLabel ? "text-[#082D4D] font-medium" : "text-[#082D4D]/35"}>
          {displayLabel || "Select delivery month..."}
        </span>
        <CalendarBlank size={18} className="text-[#082D4D]/60 flex-shrink-0" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 sm:right-auto sm:w-80 z-50 bg-white rounded-2xl border border-[#082D4D]/15 shadow-[0_12px_36px_rgba(8,45,77,0.12)] p-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 px-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewYear((y) => y - 1);
                }}
                className="w-8 h-8 rounded-lg hover:bg-[#082D4D]/05 flex items-center justify-center text-[#082D4D] transition-colors cursor-pointer"
                title="Previous Year"
              >
                <CaretLeft size={16} weight="bold" />
              </button>

              <span className="font-normal text-[#082D4D] text-base" style={{ fontFamily: CD }}>
                {viewYear}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewYear((y) => y + 1);
                }}
                className="w-8 h-8 rounded-lg hover:bg-[#082D4D]/05 flex items-center justify-center text-[#082D4D] transition-colors cursor-pointer"
                title="Next Year"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {MONTH_NAMES.map((mName, idx) => {
                const monthNum = String(idx + 1).padStart(2, "0");
                const valStr = `${viewYear}-${monthNum}`;
                const isSelected = value === valStr;

                return (
                  <button
                    key={mName}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(valStr);
                      setIsOpen(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? "bg-[#6FD179] text-[#082D4D] font-bold shadow-sm"
                        : "text-[#082D4D] hover:bg-[#082D4D]/05 active:scale-95"
                    }`}
                  >
                    {mName}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type Step = 1 | 2 | 3 | 4;

export function ProjectWizard() {
  const [step, setStep] = useState<Step>(1);
  const [isVerifyingId, setIsVerifyingId] = useState(false);
  const [isLinkingBank, setIsLinkingBank] = useState(false);
  const [isLinkingStripe, setIsLinkingStripe] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  const [form, setForm] = useState({
    // Step 1: Plan & Setup
    is18Plus: false,
    resideSupportedCountry: false,
    idUploaded: false,
    bankLinked: false,
    category: "",
    subcategory: "",
    legalName: "",
    email: "",

    // Step 2: Build Campaign Page
    projectTitle: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    goal: "",
    rewardDelivery: "2026-12",
    rewards: [
      { id: Date.now(), title: "", price: "", desc: "", delivery: "2026-12", shipping: "Worldwide", shippingCost: "0" }
    ],

    // Step 3: Review & Submit
    stripeLinked: false,
  });

  const set = (k: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const addReward = () => {
    setForm((f) => ({
      ...f,
      rewards: [...f.rewards, { id: Date.now(), title: "", price: "", desc: "", delivery: "2026-12", shipping: "Worldwide", shippingCost: "0" }]
    }));
  };

  const updateReward = (id: number, key: string, value: string) => {
    setForm((f) => ({
      ...f,
      rewards: f.rewards.map(r => r.id === id ? { ...r, [key]: value } : r)
    }));
  };

  const removeReward = (id: number) => {
    if (form.rewards.length === 1) return;
    setForm((f) => ({ ...f, rewards: f.rewards.filter(r => r.id !== id) }));
  };

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const handleSimulateIdUpload = () => {
    if (form.idUploaded) return;
    setIsVerifyingId(true);
    setTimeout(() => {
      setIsVerifyingId(false);
      setForm((f) => ({ ...f, idUploaded: true }));
    }, 1200);
  };

  const handleSimulateBankLink = () => {
    if (form.bankLinked) return;
    setIsLinkingBank(true);
    setTimeout(() => {
      setIsLinkingBank(false);
      setForm((f) => ({ ...f, bankLinked: true }));
    }, 1200);
  };

  const handleSimulateStripe = () => {
    if (form.stripeLinked) return;
    setIsLinkingStripe(true);
    setTimeout(() => {
      setIsLinkingStripe(false);
      setForm((f) => ({ ...f, stripeLinked: true }));
    }, 1500);
  };

  const handleCopyLink = () => {
    const previewUrl = `https://ideakicks.com/projects/${form.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "preview"}?token=draft_preview`;
    navigator.clipboard.writeText(previewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Steps indicator names
  const STEPS_NAV = [
    { id: 1, label: "Plan & Set Up", icon: Globe },
    { id: 2, label: "Build Page", icon: ImageIcon },
    { id: 3, label: "Review & Submit", icon: FileText },
    { id: 4, label: "Launch & Promote", icon: Gift },
  ];

  return (
    <main className="bg-[#FFFFFF] min-h-screen pt-24 pb-20" style={{ fontFamily: SAT }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-[#082D4D] mb-3" style={{ fontFamily: CD, fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 400 }}>
            Start your campaign
          </h1>
          <p className="text-[#082D4D]/60 text-lg">
            Let's get the details down. You can always edit this later.
          </p>
        </div>

        {/* Progress Navigation */}
        <div className="flex items-center justify-between mb-12 relative max-w-2xl mx-auto">
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-[#082D4D]/10 -z-10" />
          <div
            className="absolute left-0 top-5 h-0.5 bg-[#6FD179] -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          {STEPS_NAV.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === s.id
                    ? "bg-[#082D4D] text-white ring-4 ring-[#FFFFFF]"
                    : step > s.id
                    ? "bg-[#6FD179] text-white ring-4 ring-[#FFFFFF]"
                    : "bg-white border-2 border-[#082D4D]/15 text-[#082D4D]/40"
                }`}
              >
                {step > s.id ? <CheckCircle size={18} /> : <s.icon size={16} />}
              </div>
              <span
                className={`text-[0.625rem] font-bold uppercase tracking-widest ${
                  step === s.id ? "text-[#082D4D]" : step > s.id ? "text-[#6FD179]" : "text-[#082D4D]/40"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(8,45,77,0.06)] border border-[#082D4D]/05">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 4) nextStep();
            }}
          >
            {/* ── STEP 1: PLAN & SET UP ────────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#6FD179] tracking-wider uppercase">Step 1 of 4</span>
                  <h2 className="text-[#082D4D] text-2xl mt-1 mb-2" style={{ fontFamily: CD, fontWeight: 400 }}>Plan & Set Up</h2>
                  <p className="text-[#082D4D]/50 text-sm">Verify eligibility requirements and initialize your draft profile.</p>
                </div>

                {/* Eligibility checks */}
                <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#082D4D]/05 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#082D4D]/60">1. Eligibility Criteria</h3>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={form.is18Plus} 
                      onChange={set("is18Plus")} 
                      required 
                      className="mt-1 w-4 h-4 rounded text-[#082D4D] border-[#082D4D]/20 focus:ring-[#0F4C82]" 
                    />
                    <span className="text-sm text-[#082D4D]/80 leading-relaxed">
                      I confirm I am <strong>18 years of age or older</strong>.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={form.resideSupportedCountry} 
                      onChange={set("resideSupportedCountry")} 
                      required 
                      className="mt-1 w-4 h-4 rounded text-[#082D4D] border-[#082D4D]/20 focus:ring-[#0F4C82]" 
                    />
                    <span className="text-sm text-[#082D4D]/80 leading-relaxed">
                      I confirm I reside in a <strong>country supported by ideakicks</strong>.
                    </span>
                  </label>
                </div>

                {/* Category & subcategory */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={LABEL}>Primary Category</label>
                    <select value={form.category} onChange={set("category")} required className={INPUT + " appearance-none"}>
                      <option value="">Select a category...</option>
                      {["Technology", "Creative Arts", "Community", "Food", "Fashion", "Film & Media"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>Subcategory</label>
                    <input 
                      type="text" 
                      value={form.subcategory} 
                      onChange={set("subcategory")} 
                      required 
                      placeholder="e.g. Consumer Hardware, Board Games" 
                      className={INPUT} 
                    />
                  </div>
                </div>

                {/* Verification Items */}
                <div className="border-t border-[#082D4D]/08 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#082D4D]/60 mb-4">2. Account Verification Requirements</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* ID */}
                    <div className="border border-[#082D4D]/08 rounded-xl p-5 flex items-center justify-between bg-[#FFFFFF]/30">
                      <div className="space-y-1">
                        <p className="text-sm font-normal text-[#082D4D]">Government-issued ID</p>
                        <p className="text-xs text-[#082D4D]/50">Required to verify age and residence.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSimulateIdUpload}
                        disabled={isVerifyingId || form.idUploaded}
                        className={`h-9 px-4 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                          form.idUploaded 
                            ? "bg-[#6FD179]/15 text-[#6FD179]" 
                            : "bg-[#082D4D] text-white hover:bg-[#0F4C82]"
                        }`}
                      >
                        {isVerifyingId ? (
                          "Verifying..."
                        ) : form.idUploaded ? (
                          <>Verified <Check size={12} /></>
                        ) : (
                          "Upload ID"
                        )}
                      </button>
                    </div>

                    {/* Bank */}
                    <div className="border border-[#082D4D]/08 rounded-xl p-5 flex items-center justify-between bg-[#FFFFFF]/30">
                      <div className="space-y-1">
                        <p className="text-sm font-normal text-[#082D4D]">Payout Bank Account</p>
                        <p className="text-xs text-[#082D4D]/50">Supported bank account for funding.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleSimulateBankLink}
                        disabled={isLinkingBank || form.bankLinked}
                        className={`h-9 px-4 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                          form.bankLinked 
                            ? "bg-[#6FD179]/15 text-[#6FD179]" 
                            : "bg-[#082D4D] text-white hover:bg-[#0F4C82]"
                        }`}
                      >
                        {isLinkingBank ? (
                          "Linking..."
                        ) : form.bankLinked ? (
                          <>Linked <Check size={12} /></>
                        ) : (
                          "Link Bank"
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Alert if verification not completed */}
                  {(!form.idUploaded || !form.bankLinked) && (
                    <div className="mt-4 flex gap-2.5 items-start bg-amber-50 text-amber-800 border border-amber-200/50 rounded-xl p-4 text-xs leading-relaxed">
                      <Warning size={15} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Draft Notice:</strong> You can continue to the next step, but verified documents and a bank account are mandatory before your campaign can go live.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 2: BUILD CAMPAIGN PAGE ──────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#6FD179] tracking-wider uppercase">Step 2 of 4</span>
                  <h2 className="text-[#082D4D] text-2xl mt-1 mb-2" style={{ fontFamily: CD, fontWeight: 400 }}>Build Campaign Page</h2>
                  <p className="text-[#082D4D]/50 text-sm">Tell your story, upload images/videos, set goals, and create reward tiers.</p>
                </div>

                {/* Title & Desc */}
                <div className="space-y-4">
                  <div>
                    <label className={LABEL}>Project Title</label>
                    <input 
                      type="text" 
                      value={form.projectTitle} 
                      onChange={set("projectTitle")} 
                      required 
                      placeholder="e.g. EcoLife Solar Water Purifier" 
                      className={INPUT} 
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Project Story</label>
                    <textarea 
                      value={form.description} 
                      onChange={set("description")} 
                      required 
                      rows={5} 
                      placeholder="Clearly explain what you are making, why it matters, and how you will use the funds. Keep it engaging, using short paragraphs." 
                      className={`${INPUT} h-auto py-3 resize-none`} 
                    />
                  </div>
                </div>

                {/* Media (Image & Video) */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={LABEL}>Cover Image URL</label>
                    <input 
                      type="url" 
                      value={form.imageUrl} 
                      onChange={set("imageUrl")} 
                      required 
                      placeholder="https://example.com/cover.jpg" 
                      className={INPUT} 
                    />
                    <p className="text-[#082D4D]/40 text-xs mt-1.5">Provide a high-quality cover photo URL.</p>
                  </div>
                  <div>
                    <label className={LABEL}>Pitch Video URL <span className="text-[#082D4D]/30">(Optional)</span></label>
                    <input 
                      type="url" 
                      value={form.videoUrl} 
                      onChange={set("videoUrl")} 
                      placeholder="e.g. https://youtube.com/watch?v=..." 
                      className={INPUT} 
                    />
                    <p className="text-[#082D4D]/40 text-xs mt-1.5 flex items-center gap-1">
                      <Video size={12} /> Compelling 1–3 minute video recommended.
                    </p>
                  </div>
                </div>

                {/* Note about working prototype */}
                <div className="flex gap-3 items-center bg-slate-50/80 text-slate-700 border border-slate-200 rounded-xl p-3 px-4 text-[0.8125rem]">
                  <Question size={20} weight="fill" className="text-slate-400 flex-shrink-0" />
                  <div>
                    <strong className="font-bold text-slate-900">Prototype Rule:</strong> For physical hardware or retail products, you are required to show a working prototype or proof-of-concept (not just photorealistic renderings).
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="border-t border-[#082D4D]/08 pt-6">
                  <label className={LABEL}>Estimated Delivery</label>
                  <EstimatedDeliveryPicker
                    value={form.rewardDelivery}
                    onChange={(val) => setForm((f) => ({ ...f, rewardDelivery: val }))}
                  />
                </div>

                {/* Reward tiers */}
                <div className="space-y-6 pt-6 border-t border-[#082D4D]/08">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-normal text-[#082D4D]">Tiered Rewards</h3>
                    <button 
                      type="button" 
                      onClick={addReward} 
                      className="text-[#082D4D] text-xs font-bold bg-[#0F4C82]/10 px-4 py-2 rounded-full hover:bg-[#0F4C82]/20 transition-colors"
                    >
                      + Add Another Reward
                    </button>
                  </div>
                  
                  {form.rewards.map((reward, index) => (
                    <div key={reward.id} className="bg-[#FFFFFF]/50 rounded-2xl p-6 border border-[#082D4D]/05 space-y-4 relative">
                      {form.rewards.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeReward(reward.id)} 
                          className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full text-xs font-bold transition-colors"
                        >
                          Remove
                        </button>
                      )}
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#082D4D]/60 flex items-center gap-1.5">
                        <Gift size={14} /> Reward Level {String(index + 1).padStart(2, '0')}
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[0.6875rem] font-normal text-[#082D4D]/75 mb-1.5">Reward Title</label>
                          <input 
                            type="text" 
                            value={reward.title} 
                            onChange={(e) => updateReward(reward.id, "title", e.target.value)} 
                            required 
                            placeholder="e.g. Early Bird Special" 
                            className={INPUT} 
                          />
                        </div>
                        <div>
                          <label className="block text-[0.6875rem] font-normal text-[#082D4D]/75 mb-1.5">Pledge Price (USD)</label>
                          <input 
                            type="number" 
                            value={reward.price} 
                            onChange={(e) => updateReward(reward.id, "price", e.target.value)} 
                            required 
                            placeholder="e.g. 99" 
                            className={INPUT} 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[0.6875rem] font-normal text-[#082D4D]/75 mb-1.5">Reward Description</label>
                        <textarea 
                          value={reward.desc} 
                          onChange={(e) => updateReward(reward.id, "desc", e.target.value)} 
                          required 
                          rows={2} 
                          placeholder="What exactly will the backers get? Outline specifications clearly." 
                          className={`${INPUT} h-auto py-2.5 resize-none`} 
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[0.6875rem] font-normal text-[#082D4D]/75 mb-1.5">Shipping Zone</label>
                          <select 
                            value={reward.shipping} 
                            onChange={(e) => updateReward(reward.id, "shipping", e.target.value)} 
                            className={INPUT + " appearance-none bg-white"}
                          >
                            <option>Worldwide</option>
                            <option>US Only</option>
                            <option>EU Only</option>
                            <option>No Shipping (Digital)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[0.6875rem] font-normal text-[#082D4D]/75 mb-1.5">Shipping Cost (USD)</label>
                          <input 
                            type="number" 
                            value={reward.shippingCost} 
                            onChange={(e) => updateReward(reward.id, "shippingCost", e.target.value)} 
                            placeholder="0" 
                            className={INPUT} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Funding Goal */}
                <div className="border-t border-[#082D4D]/08 pt-6 mt-6">
                  <label className={LABEL}>Funding Goal (USD)</label>
                  <input 
                    type="number" 
                    value={form.goal} 
                    onChange={set("goal")} 
                    required 
                    placeholder="e.g. 25000" 
                    className={INPUT} 
                  />
                  <div className="flex gap-3 items-center bg-amber-50/80 text-amber-900 border border-amber-200 rounded-xl p-3 px-4 mt-4 text-[0.8125rem]">
                    <Warning size={20} weight="fill" className="text-amber-500 flex-shrink-0" />
                    <div>
                      <strong className="font-bold text-amber-950">Caution:</strong> Goal cannot be edited once the campaign goes live. Please ensure this amount is accurate.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: REVIEW & SUBMIT ─────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#6FD179] tracking-wider uppercase">Step 3 of 4</span>
                  <h2 className="text-[#082D4D] text-2xl mt-1 mb-2" style={{ fontFamily: CD, fontWeight: 400 }}>Review & Submit</h2>
                  <p className="text-[#082D4D]/50 text-sm">Verify your details, set up payment processing, and submit for review.</p>
                </div>

                {/* Campaign Draft Summary */}
                <div className="border border-[#082D4D]/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#082D4D]/60 pb-3 border-b border-[#082D4D]/08">
                    Draft Details Review
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    <div>
                      <span className="block text-xs text-[#082D4D]/40 uppercase tracking-wide font-medium">Project Title</span>
                      <strong className="text-[#082D4D]">{form.projectTitle || "(No title entered)"}</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-[#082D4D]/40 uppercase tracking-wide font-medium">Category</span>
                      <strong className="text-[#082D4D]">{form.category || "(No category)"} - {form.subcategory}</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-[#082D4D]/40 uppercase tracking-wide font-medium">Funding Goal</span>
                      <strong className="text-[#082D4D]">${Number(form.goal).toLocaleString() || "0"} USD</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-[#082D4D]/40 uppercase tracking-wide font-medium">Rewards Count</span>
                      <strong className="text-[#082D4D]">{form.rewards.length} {form.rewards.length === 1 ? "Tier" : "Tiers"}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#082D4D]/08">
                    <span className="block text-xs text-[#082D4D]/40 uppercase tracking-wide font-medium mb-1">Story Preview</span>
                    <p className="text-xs text-[#082D4D]/70 leading-relaxed italic">
                      {form.description ? `"${form.description.slice(0, 180)}..."` : "(No story written)"}
                    </p>
                  </div>
                </div>

                {/* Payment Setup & Identity */}
                <div className="bg-[#082D4D]/04 border border-[#082D4D]/08 rounded-2xl p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#082D4D]/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Lock size={16} className="text-[#0F4C82]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-normal text-[#082D4D]">Verify Payout Identity & Stripe Connect</h4>
                      <p className="text-xs text-[#082D4D]/60 leading-relaxed mt-0.5">
                        We partner with Stripe to verify identity and securely process backer pledges. Link your banking setup to receive automated payouts when funded.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#082D4D]/05">
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${form.stripeLinked ? "bg-[#6FD179]" : "bg-slate-300"}`}>
                        {form.stripeLinked && <Check size={10} className="text-white" />}
                      </div>
                      <span className="text-xs font-normal text-[#082D4D]/70">
                        {form.stripeLinked ? "Stripe Merchant Verification Active" : "Stripe Connection Required"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSimulateStripe}
                      disabled={isLinkingStripe || form.stripeLinked}
                      className={`h-11 px-6 rounded-full text-xs font-bold transition-all ${
                        form.stripeLinked 
                          ? "bg-slate-100 text-slate-500 border border-slate-200" 
                          : "bg-[#082D4D] text-white hover:bg-[#0F4C82]"
                      }`}
                    >
                      {isLinkingStripe ? "Opening Stripe Portal..." : form.stripeLinked ? "Account Linked" : "Connect Stripe Payouts"}
                    </button>
                  </div>
                </div>

                {/* Submission review note */}
                <div className="bg-[#6FD179]/08 border border-[#6FD179]/20 rounded-xl p-4 text-xs text-[#082D4D]/80 leading-relaxed">
                  <strong>Submit to ideakicks:</strong> Standard human reviews take <strong>1 to 3 business days</strong>. While waiting, your payout profile (Stripe verification) must be active before live launching.
                </div>
              </div>
            )}

            {/* ── STEP 4: LAUNCH & PROMOTE ────────────────────────────────── */}
            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center pb-6 border-b border-[#082D4D]/08">
                  <div className="w-16 h-16 bg-[#6FD179]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#6FD179]" />
                  </div>
                  <span className="text-xs font-bold text-[#6FD179] tracking-wider uppercase">Status: APPROVED</span>
                  <h2 className="text-[#082D4D] text-2xl mt-1 mb-2" style={{ fontFamily: CD, fontWeight: 400 }}>Your Campaign is Ready!</h2>
                  <p className="text-[#082D4D]/60 text-sm max-w-md mx-auto">
                    ideakicks review has approved your draft page. Link Stripe and banking to verify, click go live below!
                  </p>
                </div>

                {/* Launch state toggler */}
                {!isLaunched ? (
                  <div className="bg-[#FFFFFF] border border-[#082D4D]/10 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-6">
                    <h3 className="text-lg font-normal text-[#082D4D]" style={{ fontFamily: CD }}>Ready to go live?</h3>
                    <p className="text-sm text-[#082D4D]/60 leading-relaxed">
                      Click the activation button below to switch your project from private draft status directly onto the ideakicks campaign directory!
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsLaunched(true)}
                      className="h-14 w-full sm:w-auto px-12 bg-[#6FD179] text-white font-bold rounded-full hover:bg-[#5bc468] transition-all hover:shadow-lg text-base shadow-[0_4px_16px_rgba(111,209,121,0.3)] flex items-center justify-center gap-2 mx-auto"
                    >
                      I'm ready to launch <ArrowRight size={18} />
                    </button>
                    <p className="text-xs text-[#082D4D]/40">Once live, your goal cannot be modified.</p>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-[#6FD179] rounded-3xl p-8 text-center max-w-xl mx-auto space-y-5 animate-bounce">
                    <h3 className="text-2xl font-normal text-emerald-950" style={{ fontFamily: CD }}>🎉 Your Project is LIVE!</h3>
                    <p className="text-sm text-emerald-900 leading-relaxed">
                      Congratulations! <strong>{form.projectTitle || "EcoLife Solar Purifier"}</strong> is now accepting pledges from backers worldwide!
                    </p>
                    <div className="flex gap-4 justify-center pt-2">
                      <div className="bg-white border border-[#6FD179]/30 rounded-xl px-5 py-3 text-center min-w-[120px]">
                        <span className="block text-[0.625rem] text-[#082D4D]/50 uppercase tracking-widest font-bold">Raised</span>
                        <strong className="text-lg text-[#082D4D]">₹0</strong>
                      </div>
                      <div className="bg-white border border-[#6FD179]/30 rounded-xl px-5 py-3 text-center min-w-[120px]">
                        <span className="block text-[0.625rem] text-[#082D4D]/50 uppercase tracking-widest font-bold">Goal</span>
                        <strong className="text-lg text-[#082D4D]">${Number(form.goal).toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Anticipation & Share Link */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#082D4D]/60">1. Share Preview Link</h3>
                  <p className="text-xs text-[#082D4D]/60 leading-relaxed">
                    Use your preview draft link to share the project on social channels, gather early feedback, and build a massive email list of potential backers before going public.
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={`https://ideakicks.com/projects/${form.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "preview"}?token=draft_preview`} 
                      className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#082D4D]/15 rounded-xl text-xs text-[#082D4D]/75 outline-none select-all" 
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="h-11 px-5 bg-[#082D4D] hover:bg-[#0F4C82] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      {copiedLink ? (
                        <>Copied! <Check size={14} /></>
                      ) : (
                        <>Copy <Copy size={14} /></>
                      )}
                    </button>
                  </div>
                </div>

                {/* Continual promotion guides */}
                <div className="border-t border-[#082D4D]/08 pt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#082D4D]/60 mb-3 flex items-center gap-1">
                    <Globe size={14} /> 2. Promote Continually Checklist
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#FFFFFF]/40 border border-[#082D4D]/05 rounded-xl space-y-1.5">
                      <strong className="text-xs text-[#082D4D] block">📧 Build Anticipation</strong>
                      <p className="text-[0.6875rem] text-[#082D4D]/60 leading-relaxed">
                        Gather email signups prior to launch, then email them within minutes of the launch event.
                      </p>
                    </div>

                    <div className="p-4 bg-[#FFFFFF]/40 border border-[#082D4D]/05 rounded-xl space-y-1.5">
                      <strong className="text-xs text-[#082D4D] block">📢 Share Updates</strong>
                      <p className="text-[0.6875rem] text-[#082D4D]/60 leading-relaxed">
                        Publish weekly progress reports about manufacture, packaging, and milestones to show credibility.
                      </p>
                    </div>

                    <div className="p-4 bg-[#FFFFFF]/40 border border-[#082D4D]/05 rounded-xl space-y-1.5">
                      <strong className="text-xs text-[#082D4D] block">💬 Active Community</strong>
                      <p className="text-[0.6875rem] text-[#082D4D]/60 leading-relaxed">
                        Respond quickly to comments. Engagement triggers algorithm features and reaches funding goal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-12 pt-6 border-t border-[#082D4D]/10 flex items-center justify-between">
              {step > 1 && step < 4 ? (
                <button 
                  type="button" 
                  onClick={prevStep} 
                  className={`${STEP_BUTTON} bg-[#FFFFFF] text-[#082D4D] border border-[#082D4D]/20 hover:bg-[#082D4D]/05`}
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <button 
                  type="submit" 
                  className={`${STEP_BUTTON} bg-[#082D4D] text-white hover:bg-[#0F4C82] shadow-[0_4px_16px_rgba(8,45,77,0.2)]`}
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <Link
                  to="/explore"
                  className={`${STEP_BUTTON} bg-[#082D4D] text-white hover:bg-[#0F4C82] shadow-[0_4px_16px_rgba(8,45,77,0.2)]`}
                >
                  Explore Campaigns
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
