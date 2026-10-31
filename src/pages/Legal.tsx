import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Shield, Scales, Info, Wheelchair, CaretRight, Check } from "@phosphor-icons/react";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

type LegalTab = "terms" | "privacy" | "cookies" | "accessibility";

export function Legal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as LegalTab) || "terms";
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [cookieConsent, setCookieConsent] = useState({
    essential: true,
    analytical: true,
    marketing: false,
  });
  const [consentSaved, setConsentSaved] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as LegalTab;
    if (tabParam && ["terms", "privacy", "cookies", "accessibility"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleSaveConsent = () => {
    setConsentSaved(true);
    setTimeout(() => setConsentSaved(false), 3000);
  };

  const tabs = [
    { id: "terms", label: "Terms of Use", icon: Scales, desc: "Rules & conditions for using ideakicks" },
    { id: "privacy", label: "Privacy Policy", icon: Shield, desc: "How we collect & protect your data" },
    { id: "cookies", label: "Cookie Policy", icon: Info, desc: "How we use cookies & preferences" },
    { id: "accessibility", label: "Accessibility", icon: Wheelchair, desc: "Digital accessibility statement" },
  ];

  return (
    <main className="bg-[#FFFFFF] min-h-screen" style={{ fontFamily: SAT }}>
      {/* Page Header */}
      <section className="relative overflow-hidden pb-14 pt-36 text-center">
        <PublicHeroGradient />
        <div className="container-base relative z-10 mx-auto max-w-2xl">
          <h1 className="heading-hero text-[#082D4D] mb-4">
            Platform Regulations
          </h1>
          <p className="body-large text-[#082D4D]/68 max-w-xl mx-auto">
            Welcome to the ideakicks regulatory center. Here you will find our governing policies, terms of service, and privacy procedures, designed to protect our creators, backers, and community members.
          </p>
        </div>
      </section>

      <div className="container-base pb-24">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          
          {/* Left: Desktop Sidebar Navigation */}
          <aside className="h-fit lg:sticky lg:top-[120px] flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as LegalTab)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 group hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-[#082D4D] border-[#082D4D] text-white shadow-[0_8px_24px_rgba(8,45,77,0.12)]"
                      : "bg-white border-[#0F4C82]/08 text-[#082D4D] hover:border-[#0F4C82]/30 hover:shadow-sm"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? "bg-white/10 text-white" : "bg-[#0F4C82]/06 text-[#0F4C82]"
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight mb-1">{tab.label}</p>
                    <p className={`text-[0.7rem] leading-snug truncate ${isSelected ? "text-white/60" : "text-[#082D4D]/45"}`}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Right: Active Document Viewer */}
          <section className="bg-white rounded-3xl border border-[#0F4C82]/08 shadow-[0_4px_32px_rgba(8,45,77,0.04)] p-8 md:p-10">
            {activeTab === "terms" && (
              <div className="prose-like">
                <h2 className="text-[#082D4D] text-xl font-normal mb-6 flex items-center gap-2 pb-4 border-b border-[#082D4D]/08" style={{ fontFamily: CD, fontWeight: 400 }}>
                  <Scales size={20} className="text-[#6FD179]" /> Terms of Use
                </h2>
                <p className="text-xs text-[#082D4D]/45 mb-6">Last updated: May 25, 2026</p>
                
                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>1. Agreement to Terms</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  By accessing or using ideakicks (the "Platform"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>2. Campaign & Backing Integrity</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-4">
                  ideakicks operates as a curated crowdfunding platform. Backing a campaign is an expression of support for a creative endeavor, not a commercial retail purchase.
                </p>
                <ul className="list-disc pl-5 mb-5 text-[#082D4D]/75 text-sm leading-relaxed">
                  <li className="mb-2"><strong>Makers Obligations:</strong> Creators must make every effort to fulfill rewards in a timely manner and communicate transparently with backers regarding milestones, challenges, or delays.</li>
                  <li className="mb-2"><strong>Backers Understanding:</strong> Backers acknowledge that creative development has inherent risks and variables. Rewards are estimates, not guarantees.</li>
                </ul>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>3. Financial Transactions & Refunds</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  All campaign funding pledges are authorized upon backing. Pledges are charged only when a campaign reaches its funding deadline, provided its goal is met. Refunds are at the sole discretion of the individual creator once funds have been disbursed.
                </p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>4. intellectual Property</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  Creators retain full ownership of the intellectual property, media, designs, and content posted in their campaigns. By posting, creators grant ideakicks a global, non-exclusive license to display the campaign materials for promotional purposes.
                </p>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="prose-like">
                <h2 className="text-[#082D4D] text-xl font-normal mb-6 flex items-center gap-2 pb-4 border-b border-[#082D4D]/08" style={{ fontFamily: CD, fontWeight: 400 }}>
                  <Shield size={20} className="text-[#6FD179]" /> Privacy Policy
                </h2>
                <p className="text-xs text-[#082D4D]/45 mb-6">Last updated: May 25, 2026</p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>1. Information We Collect</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-4">
                  We collect information necessary to process transaction requests, authenticate accounts, match profiles with mentors or vendors, and ensure safe communication.
                </p>
                <ul className="list-disc pl-5 mb-5 text-[#082D4D]/75 text-sm leading-relaxed">
                  <li className="mb-2"><strong>Profile Data:</strong> Name, email address, bio, avatar, and billing details provided during registrations.</li>
                  <li className="mb-2"><strong>Project Materials:</strong> Campaign images, videos, updates, FAQ entries, and community comments.</li>
                  <li className="mb-2"><strong>Platform Usage:</strong> IP address, device types, operating systems, and page navigation logs.</li>
                </ul>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>2. How Your Data is Used</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  Your data helps us process payments securely, verify creator credentials, recommend relevant campaigns, facilitate mentor pairings, and defend the Platform against fraudulent behavior. We never sell your personal information to third parties.
                </p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>3. Data Protection Rights</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  Under the GDPR and CCPA, you have the right to request access to, rectification of, or complete deletion of your personal data stored on ideakicks. To exercise these rights, please contact our support team directly.
                </p>
              </div>
            )}

            {activeTab === "cookies" && (
              <div className="prose-like">
                <h2 className="text-[#082D4D] text-xl font-normal mb-6 flex items-center gap-2 pb-4 border-b border-[#082D4D]/08" style={{ fontFamily: CD, fontWeight: 400 }}>
                  <Info size={20} className="text-[#6FD179]" /> Cookie Policy
                </h2>
                <p className="text-xs text-[#082D4D]/45 mb-6">Last updated: May 25, 2026</p>

                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-6">
                  We use cookies, web beacons, and microscopic tracking pixels to keep you authenticated, understand site performance, and customize your experience.
                </p>

                <div className="border border-[#0F4C82]/10 rounded-2xl p-6 bg-[#0F4C82]/02 mb-8">
                  <h3 className="text-[#082D4D] text-sm font-bold mb-4" style={{ fontFamily: SAT }}>Manage Cookie Settings</h3>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center justify-between cursor-pointer select-none">
                      <div>
                        <span className="text-xs font-bold text-[#082D4D] block">Essential Cookies</span>
                        <span className="text-[0.7rem] text-[#082D4D]/50 block">Needed for authentication, checkout, and platform stability.</span>
                      </div>
                      <input type="checkbox" checked disabled className="w-4 h-4 text-[#6FD179] rounded border-[#0F4C82]/20" />
                    </label>
                    
                    <label className="flex items-center justify-between cursor-pointer select-none">
                      <div>
                        <span className="text-xs font-bold text-[#082D4D] block">Analytical Cookies</span>
                        <span className="text-[0.7rem] text-[#082D4D]/50 block">Helps us track campaign visit metrics and slow pages.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={cookieConsent.analytical} 
                        onChange={(e) => setCookieConsent({ ...cookieConsent, analytical: e.target.checked })} 
                        className="w-4 h-4 text-[#6FD179] rounded border-[#0F4C82]/20 accent-[#6FD179]" 
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer select-none">
                      <div>
                        <span className="text-xs font-bold text-[#082D4D] block">Marketing Cookies</span>
                        <span className="text-[0.7rem] text-[#082D4D]/50 block">Permits us to display campaign ads on other network networks.</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={cookieConsent.marketing} 
                        onChange={(e) => setCookieConsent({ ...cookieConsent, marketing: e.target.checked })} 
                        className="w-4 h-4 text-[#6FD179] rounded border-[#0F4C82]/20 accent-[#6FD179]" 
                      />
                    </label>
                  </div>

                  <button
                    onClick={handleSaveConsent}
                    className="mt-6 flex items-center justify-center gap-1.5 h-10 px-6 bg-[#082D4D] text-white text-xs font-bold rounded-full hover:bg-[#0F4C82] transition-colors"
                  >
                    {consentSaved ? <><Check size={14} className="text-[#6FD179]" /> Preferences Saved</> : "Save Preferences"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "accessibility" && (
              <div className="prose-like">
                <h2 className="text-[#082D4D] text-xl font-normal mb-6 flex items-center gap-2 pb-4 border-b border-[#082D4D]/08" style={{ fontFamily: CD, fontWeight: 400 }}>
                  <Wheelchair size={20} className="text-[#6FD179]" /> Accessibility Statement
                </h2>
                <p className="text-xs text-[#082D4D]/45 mb-6">Last updated: May 25, 2026</p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>1. Our Commitment</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  ideakicks is committed to ensuring that our digital resources are universally accessible to all people, regardless of technical ability or physical constraints. We strive to offer an inclusive, friction-free environment for backing, launching, and managing creative ideas.
                </p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>2. Standards & Guidelines</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  We constantly test and audit our user interfaces using the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA conformance criteria. This influences our font size selections, color contrasts, keyboard nav pathways, interactive element tag structures, and screen-reader optimizations.
                </p>

                <h3 className="text-[#082D4D] text-[1.0625rem] font-normal mt-8 mb-3" style={{ fontFamily: CD, fontWeight: 400 }}>3. Feedback & Contact</h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed mb-5">
                  If you encounter any accessibility issues, color contrast barriers, or screen-reader difficulties on our Platform, please do not hesitate to contact our compliance team. We treat accessibility complaints with the highest priority.
                </p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
