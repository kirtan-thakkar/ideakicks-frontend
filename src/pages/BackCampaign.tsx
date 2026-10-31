import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, CheckCircle, CreditCard, Lock, ShieldCheck, CaretRight, Package, Truck, Plus, Minus } from "@phosphor-icons/react";
import { CAMPAIGNS } from "../data/campaigns";
import { toast } from "sonner";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

export function BackCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rewardParam = searchParams.get("reward") || "";

  const campaign = (id && CAMPAIGNS[id]) ? CAMPAIGNS[id] : CAMPAIGNS["1"];

  const [selectedReward, setSelectedReward] = useState(rewardParam);
  const [customAmount, setCustomAmount] = useState("");
  
  // Steps: 1 (Select Reward), 2 (Add-ons), 3 (Payment), 4 (Success)
  const [step, setStep] = useState(1);
  const [addons, setAddons] = useState<Record<string, number>>({});
  
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "", country: "IN", street: "", city: "", state: "", zip: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [pledgeOverTime, setPledgeOverTime] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!campaign) navigate("/");
  }, [campaign, navigate]);

  if (!campaign) return null;

  const rewards = campaign.rewards || [];
  const chosen = rewards.find((r: any) => r.id === selectedReward);
  
  const tierAmount = chosen?.amount ? Number(chosen.amount.replace(/[^0-9.]/g, '')) : 0;
  const bonus = customAmount ? Number(customAmount) : 0;
  const baseAmount = selectedReward === "none" ? bonus : tierAmount + bonus;
  
  // Dummy add-ons for the example
  const availableAddons = [
    { id: "a1", title: "Premium Carrying Case", price: 35, description: "Protect your gear with this hard-shell case." },
    { id: "a2", title: "Extra Battery Pack", price: 45, description: "Double your usage time." },
    { id: "a3", title: "Extended 2-Year Warranty", price: 29, description: "Peace of mind for your pledge." }
  ];

  const addonsTotal = Object.entries(addons).reduce((sum, [id, qty]) => {
    const addon = availableAddons.find(a => a.id === id);
    return sum + (addon ? addon.price * qty : 0);
  }, 0);

  const shipping = chosen ? 15 : 0;
  const totalAmount = baseAmount + addonsTotal + shipping;

  const handleAddonUpdate = (id: string, delta: number) => {
    setAddons(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  if (step === 4) {
    return (
      <main className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4" style={{ fontFamily: SAT }}>
        <div className="max-w-md w-full text-center py-20 animate-fade-in-up">
          <div className="w-24 h-24 bg-[#6FD179]/15 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <div className="absolute inset-0 border-2 border-[#6FD179]/30 rounded-full animate-ping"></div>
            <CheckCircle size={48} className="text-[#6FD179]" />
          </div>
          <h1 className="text-[#082D4D] mb-3" style={{ fontFamily: CD, fontSize: "2.5rem", fontWeight: 400 }}>
            You're a Backer!
          </h1>
          <p className="text-[#082D4D]/70 mb-8 text-lg leading-relaxed">
            Thank you for backing <strong>{campaign.title}</strong> with <strong>₹{totalAmount}</strong>. Your support makes this project possible.
          </p>
          <div className="bg-white border border-[#0F4C82]/10 rounded-2xl p-6 text-left mb-8 shadow-sm">
            <h3 className="font-bold text-[#082D4D] mb-4">Pledge Summary</h3>
            <div className="flex justify-between text-sm text-[#082D4D]/70 mb-2">
              <span>{chosen ? chosen.title : "Custom Pledge"}</span>
              <span>₹{baseAmount}</span>
            </div>
            {Object.entries(addons).map(([id, qty]) => {
              const addon = availableAddons.find(a => a.id === id);
              if (!addon) return null;
              return (
                <div key={id} className="flex justify-between text-sm text-[#082D4D]/70 mb-2">
                  <span>{addon.title} (x{qty})</span>
                  <span>₹{addon.price * qty}</span>
                </div>
              );
            })}
            <div className="flex justify-between text-sm text-[#082D4D]/70 mb-4 pb-4 border-b border-[#0F4C82]/10">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-[#082D4D] text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center bg-[#0F4C82]/5 rounded-xl p-4 mb-4">
              <span className="text-sm font-bold text-[#082D4D]">Est. Delivery</span>
              <span className="text-sm text-[#082D4D]/70">{chosen?.eta || "December 2026"}</span>
            </div>
            <Link to={`/campaign/${id}`} className="h-14 bg-[#082D4D] text-white font-bold rounded-xl hover:bg-[#0F4C82] transition-colors flex items-center justify-center text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
              Back to Campaign
            </Link>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just backed ${campaign.title} on ideakicks! Check it out:`)}&url=${encodeURIComponent(window.location.origin + `/campaign/${id}`)}`, '_blank');
                }}
                className="flex-1 h-12 border-2 border-[#0F4C82]/10 font-bold text-[#082D4D] rounded-xl hover:bg-[#0F4C82]/5 transition-colors text-sm"
              >
                Share on X
              </button>
              <button 
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + `/campaign/${id}`);
                  toast.success("Campaign link copied to clipboard!");
                }}
                className="flex-1 h-12 border-2 border-[#0F4C82]/10 font-bold text-[#082D4D] rounded-xl hover:bg-[#0F4C82]/5 transition-colors text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FDFDFD] min-h-screen pb-24" style={{ fontFamily: SAT }}>
      {/* Header */}
      <header className="bg-white border-b border-[#0F4C82]/10 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto h-20 flex items-center justify-between px-4 md:px-6 lg:px-8">
          <Link to={`/campaign/${id}`} className="inline-flex items-center gap-2 text-sm text-[#082D4D]/60 hover:text-[#082D4D] font-medium transition-colors">
            <ArrowLeft size={16} /> Cancel
          </Link>
          <div className="text-center">
            <h2 className="text-[#082D4D] font-bold truncate max-w-[200px] sm:max-w-xs">{campaign.title}</h2>
            <p className="text-xs text-[#082D4D]/50">By {campaign.creator}</p>
          </div>
          <div className="w-16"></div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#0F4C82]/5 h-1">
          <div 
            className="bg-[#6FD179] h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 md:px-6 lg:px-8">
        {/* Main Content */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-sm font-medium text-[#082D4D]/50 mb-8">
            <span className={step >= 1 ? "text-[#082D4D]" : ""}>Reward</span>
            <CaretRight size={14} />
            <span className={step >= 2 ? "text-[#082D4D]" : ""}>Add-ons</span>
            <CaretRight size={14} />
            <span className={step >= 3 ? "text-[#082D4D]" : ""}>Payment</span>
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-[#082D4D] mb-8" style={{ fontFamily: CD, fontSize: "2.25rem", fontWeight: 400 }}>
                Select your reward
              </h1>
              
              <div className="flex flex-col gap-6">
                {/* No Reward Option */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (selectedReward !== "none") {
                      setSelectedReward("none");
                      setCustomAmount("10");
                    }
                  }}
                  className={`text-left bg-white rounded-2xl border-2 p-6 transition-all duration-200 group cursor-pointer ${
                    selectedReward === "none"
                      ? "border-[#6FD179] shadow-sm"
                      : "border-[#0F4C82]/10 hover:border-[#0F4C82]/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-[#082D4D] font-bold text-xl mb-1">Pledge without a reward</h3>
                      <p className="text-[#082D4D]/70 text-sm">Back it because you believe in it.</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      selectedReward === "none" ? "border-[#6FD179] bg-[#6FD179]" : "border-[#0F4C82]/20 group-hover:border-[#0F4C82]/40"
                    }`}>
                      {selectedReward === "none" && <CheckCircle size={14} className="text-white" />}
                    </div>
                  </div>
                  
                  {selectedReward === "none" && (
                    <div 
                      className="mt-6 pt-6 border-t border-[#0F4C82]/10 animate-fade-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="block text-sm font-bold text-[#082D4D] mb-2">Pledge amount</label>
                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#082D4D]/50 font-bold">₹</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full h-12 pl-8 pr-4 rounded-xl border border-[#0F4C82]/20 bg-white text-[#082D4D] outline-none focus:border-[#0F4C82]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStep(2);
                          }}
                          disabled={!baseAmount}
                          className="h-12 px-8 bg-[#082D4D] text-white font-bold rounded-xl hover:bg-[#0F4C82] disabled:opacity-50 transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {rewards.map((r: any) => (
                  <div
                    key={r.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (selectedReward !== r.id) {
                        setSelectedReward(r.id);
                        setCustomAmount("");
                      }
                    }}
                    className={`text-left bg-white rounded-2xl border-2 p-6 transition-all duration-200 group cursor-pointer ${
                      selectedReward === r.id
                        ? "border-[#6FD179] shadow-sm"
                        : "border-[#0F4C82]/10 hover:border-[#0F4C82]/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[#0F4C82] font-bold text-2xl mb-1 block" style={{ fontFamily: SAT }}>{r.amount}</span>
                        <h3 className="text-[#082D4D] font-bold text-xl mb-2">{r.title}</h3>
                        <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-4">{r.description}</p>
                        
                        {r.includes && r.includes.length > 0 && (
                          <div className="mb-4">
                            <span className="text-xs font-bold text-[#082D4D]/50 uppercase tracking-wider mb-2 block">Includes</span>
                            <ul className="text-sm text-[#082D4D]/70 space-y-1">
                              {r.includes.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#6FD179] mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs font-medium text-[#082D4D]/50">
                          <span className="flex items-center gap-1 bg-[#0F4C82]/5 px-2 py-1 rounded-md">
                            <Truck size={12} /> {r.eta || "Est. Delivery: Dec 2026"}
                          </span>
                          <span>{r.backers} backers</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        selectedReward === r.id ? "border-[#6FD179] bg-[#6FD179]" : "border-[#0F4C82]/20 group-hover:border-[#0F4C82]/40"
                      }`}>
                        {selectedReward === r.id && <CheckCircle size={14} className="text-white" />}
                      </div>
                    </div>

                    {selectedReward === r.id && (
                      <div 
                        className="mt-6 pt-6 border-t border-[#0F4C82]/10 flex gap-4 animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-[#082D4D]/50 uppercase tracking-wider mb-2">Bonus support (Optional)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#082D4D]/50 font-bold">₹</span>
                            <input
                              type="number"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              placeholder="0"
                              className="w-full h-12 pl-8 pr-4 rounded-xl border border-[#0F4C82]/20 bg-white text-[#082D4D] outline-none focus:border-[#0F4C82]"
                            />
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setStep(2);
                            }}
                            className="h-12 px-8 bg-[#082D4D] text-white font-bold rounded-xl hover:bg-[#0F4C82] transition-colors shadow-md hover:shadow-lg"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-[#082D4D] mb-2" style={{ fontFamily: CD, fontSize: "2.25rem", fontWeight: 400 }}>
                Configure your reward
              </h1>
              <p className="text-[#082D4D]/60 mb-8">Add optional accessories and extras to your pledge.</p>

              <div className="space-y-4 mb-10">
                {availableAddons.map(addon => {
                  const qty = addons[addon.id] || 0;
                  return (
                    <div key={addon.id} className={`bg-white rounded-2xl border-2 p-6 transition-all ${qty > 0 ? 'border-[#6FD179] bg-[#6FD179]/5' : 'border-[#0F4C82]/10'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1 pr-4">
                          <h4 className="font-bold text-[#082D4D] text-lg" style={{ fontFamily: SAT }}>₹{addon.price} - {addon.title}</h4>
                          <p className="text-sm text-[#082D4D]/70 mt-1">{addon.description}</p>
                        </div>
                        
                        {qty === 0 ? (
                          <button 
                            type="button"
                            onClick={() => handleAddonUpdate(addon.id, 1)}
                            className="h-10 px-6 rounded-lg bg-white border border-[#0F4C82]/20 text-[#0F4C82] font-bold hover:bg-[#0F4C82]/5 transition-colors whitespace-nowrap"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 bg-white border border-[#6FD179]/30 rounded-lg p-1">
                            <button type="button" onClick={() => handleAddonUpdate(addon.id, -1)} className="w-8 h-8 flex items-center justify-center text-[#082D4D] hover:bg-[#6FD179]/10 rounded-md"><Minus size={16} /></button>
                            <span className="w-4 text-center font-bold text-[#082D4D]">{qty}</span>
                            <button type="button" onClick={() => handleAddonUpdate(addon.id, 1)} className="w-8 h-8 flex items-center justify-center text-[#082D4D] hover:bg-[#6FD179]/10 rounded-md"><Plus size={16} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-14 px-8 bg-white border border-[#0F4C82]/20 text-[#082D4D] font-bold rounded-xl hover:bg-[#0F4C82]/5 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 h-14 bg-[#082D4D] text-white font-bold rounded-xl hover:bg-[#0F4C82] transition-colors shadow-lg hover:shadow-xl"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h1 className="text-[#082D4D] mb-8" style={{ fontFamily: CD, fontSize: "2.25rem", fontWeight: 400 }}>
                Payment
              </h1>

              <form onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
                <div className="bg-white rounded-2xl border border-[#0F4C82]/10 p-8 mb-8 shadow-sm">
                  <h3 className="text-[#082D4D] font-bold text-lg mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#6FD179]" /> Secure Checkout
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#082D4D] mb-2">Email Address</label>
                      <input required type="email" value={form.email} onChange={set("email")} placeholder="For your receipt and updates" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#082D4D] mb-2">Shipping Country</label>
                      <select value={form.country} onChange={set("country")} className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors appearance-none">
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>

                    {chosen && (
                      <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-[#082D4D] mb-2">Street Address</label>
                          <input required type="text" value={form.street} onChange={set("street")} placeholder="123 Main St" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#082D4D] mb-2">City</label>
                          <input required type="text" value={form.city} onChange={set("city")} placeholder="City" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-[#082D4D] mb-2">State/Prov</label>
                            <input required type="text" value={form.state} onChange={set("state")} placeholder="State" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#082D4D] mb-2">Zip/Postal</label>
                            <input required type="text" value={form.zip} onChange={set("zip")} placeholder="Zip" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="sm:col-span-2 pt-4 border-t border-[#0F4C82]/10">
                      <label className="block text-sm font-bold text-[#082D4D] mb-2">Card Information</label>
                      <div className="relative">
                        <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#082D4D]/40" />
                        <input required type="text" value={form.card} onChange={set("card")} placeholder="Card Number" className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors mb-4" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                        <input required type="text" value={form.cvv} onChange={set("cvv")} placeholder="CVC" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-bold text-[#082D4D] mb-2">Name on Card</label>
                      <input required type="text" value={form.name} onChange={set("name")} placeholder="Full name" className="w-full h-12 px-4 rounded-xl border border-[#0F4C82]/20 bg-white focus:border-[#0F4C82] outline-none transition-colors" />
                    </div>
                  </div>

                  {totalAmount > 150 && (
                    <div className="mb-6 p-4 rounded-xl border border-[#0F4C82]/10 bg-[#0F4C82]/5">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={pledgeOverTime} onChange={(e) => setPledgeOverTime(e.target.checked)} className="mt-1 w-4 h-4 rounded text-[#082D4D] border-[#0F4C82]/20 focus:ring-[#0F4C82]" />
                        <div>
                          <span className="block text-sm font-bold text-[#082D4D]">Pledge Over Time</span>
                          <span className="text-xs text-[#082D4D]/70 leading-relaxed block mt-1">Split your pledge into 4 easy, interest-free payments of ₹{(totalAmount / 4).toFixed(2)}. You will be charged the first payment when the project reaches its funding deadline.</span>
                        </div>
                      </label>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input required type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded text-[#082D4D] border-[#0F4C82]/20 focus:ring-[#0F4C82]" />
                      <span className="text-xs text-[#082D4D]/70 leading-relaxed">
                        I understand that <strong>backing is not buying.</strong> You're supporting a creator's project to help bring it to life. Reward delivery is estimated and not guaranteed. <Link to="/legal?tab=terms" className="underline hover:text-[#082D4D]">Learn more about accountability</Link>.
                      </span>
                    </label>
                  </div>

                  <p className="text-xs text-[#082D4D]/50 flex items-start gap-2 bg-[#0F4C82]/5 p-4 rounded-lg">
                    <Lock size={14} className="mt-0.5 flex-shrink-0" />
                    You will only be charged if the project reaches its funding goal by the campaign deadline.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="h-14 px-8 bg-white border border-[#0F4C82]/20 text-[#082D4D] font-bold rounded-xl hover:bg-[#0F4C82]/5 transition-colors">
                    Back
                  </button>
                  <button type="submit" className="flex-1 h-14 bg-[#6FD179] text-white font-bold rounded-xl hover:bg-[#5bc468] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
                    Pledge ₹{totalAmount}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 bg-white border border-[#0F4C82]/10 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-[#082D4D] mb-4 pb-4 border-b border-[#0F4C82]/10">Pledge Summary</h3>
            
            <div className="flex justify-between items-start mb-4">
              <div className="pr-4">
                <p className="font-bold text-[#082D4D]">{chosen ? chosen.title : "Pledge without a reward"}</p>
                <p className="text-xs text-[#082D4D]/60 mt-1">Reward total</p>
              </div>
              <p className="font-bold text-[#082D4D]" style={{ fontFamily: SAT }}>₹{baseAmount}</p>
            </div>

            {Object.entries(addons).map(([id, qty]) => {
              const addon = availableAddons.find(a => a.id === id);
              if (!addon) return null;
              return (
                <div key={id} className="flex justify-between items-start mb-4">
                  <div className="pr-4">
                    <p className="font-bold text-[#082D4D]/80 text-sm">{addon.title} <span className="font-normal text-xs bg-[#0F4C82]/5 px-1.5 py-0.5 rounded">x{qty}</span></p>
                  </div>
                  <p className="font-bold text-[#082D4D]/80 text-sm" style={{ fontFamily: SAT }}>₹{addon.price * qty}</p>
                </div>
              );
            })}

            {chosen && step > 1 && (
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-[#082D4D]/80 text-sm">Shipping</p>
                  <p className="text-xs text-[#082D4D]/60 mt-0.5">To {form.country}</p>
                </div>
                <p className="font-bold text-[#082D4D]/80 text-sm" style={{ fontFamily: SAT }}>₹{shipping}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#0F4C82]/10 flex justify-between items-center">
              <p className="font-bold text-[#082D4D] text-lg">Total amount</p>
              <p className="font-bold text-[#0F4C82]" style={{ fontFamily: SAT, fontSize: "1.75rem" }}>₹{totalAmount}</p>
            </div>
            
            <div className="mt-6 bg-[#0F4C82]/5 rounded-xl p-4 flex gap-3">
              <Package size={20} className="text-[#0F4C82] flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#082D4D]">IdeaKicks Guarantee</p>
                <p className="text-xs text-[#082D4D]/70 mt-1">If the project fails to deliver, we'll help resolve issues or refund your pledge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
