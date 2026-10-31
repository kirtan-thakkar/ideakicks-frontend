import { useState } from "react";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";
import {
  ArrowRight,
  Factory,
  Package,
  Megaphone,
  PenNib,
  ShieldCheck,
  Coins,
  Handshake,
  CheckCircle,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { motion } from "motion/react";

const VALUE_PROPS = [
  {
    image: "/vendor_pre_funded.jpg",
    title: "Pre-Funded Budgets",
    desc: "Work with creators who have validated demand and launch capital in hand, ready to spend on execution.",
  },
  {
    image: "/vendor_zero_commission.jpg",
    title: "0% Platform Commission",
    desc: "Keep 100% of your earnings. Ideakicks never takes a cut of your service contracts or client agreements.",
  },
  {
    image: "/vendor_targeted_intro.jpg",
    title: "Targeted Introductions",
    desc: "Receive warm, curated introductions matched specifically to your industry niche, capacity, and expertise.",
  },
];

const SPECIALTIES = [
  {
    image: "/vendor_manufacturing.jpg",
    title: "Manufacturing & Tooling",
    desc: "Prototyping, sourcing, injection molding, PCB assembly, and factory quality control.",
  },
  {
    image: "/vendor_fulfillment.jpg",
    title: "Fulfillment & Logistics",
    desc: "Global warehousing, pick & pack, ocean/air freight, and customs clearance.",
  },
  {
    image: "/vendor_marketing.jpg",
    title: "Marketing & Crowdfunding PR",
    desc: "Pre-launch page traffic, paid media, backer email newsletters, and press outreach.",
  },
  {
    image: "/vendor_industrial_design.jpg",
    title: "Creative & Industrial Design",
    desc: "CAD modeling, DFM engineering, photorealistic 3D renders, and campaign video production.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Quick Application",
    desc: "Submit your agency or facility profile and past client work in under 2 minutes.",
  },
  {
    step: "02",
    title: "Human Curation",
    desc: "Our curation team verifies your portfolio and adds you to our trusted directory.",
  },
  {
    step: "03",
    title: "Direct Client Introductions",
    desc: "We introduce you directly to funded creators at the exact milestone they need your help.",
  },
];

export function VendorLanding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    serviceType: "",
    contactName: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success(
        "Application received! Our partner team will reach out within 48 hours."
      );
    }, 900);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section */}
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
              Connect with <br /><span className="italic text-[#6FD179]">funded creators.</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-lg md:text-xl text-[#082D4D]/75 leading-relaxed text-balance mb-10">
              ideakicks matches verified agencies, manufacturers, and specialists with creators ready to execute. No cold outreach, zero platform commissions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary btn-lg bg-[#6FD179] text-white hover:bg-[#5bc468] rounded-full px-8 shadow-lg shadow-[#6FD179]/20 font-bold transition-all flex items-center gap-2"
              >
                Join the network <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Three Clean Value Props */}
      <section className="section-padding bg-[#082D4D]/[0.02]">
        <div className="container-base max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#082D4D]">
              Why partner with Ideakicks
            </h2>
            <p className="body-large text-[#082D4D]/60 max-w-lg mx-auto mt-3">
              A high-trust bridge between funded projects and top-tier partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PROPS.map((v, i) => (
              <div key={i} className="relative group rounded-3xl overflow-hidden aspect-[4/3] flex flex-col justify-end p-8 shadow-sm">
                <div className="absolute inset-0">
                  <img src={v.image} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030213]/90 via-[#030213]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-medium text-white mb-2">{v.title}</h3>
                  <p className="text-white/80 leading-relaxed text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Specialties in Demand */}
      <section className="section-padding bg-white">
        <div className="container-base max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#082D4D]">
              Specialties we look for
            </h2>
            <p className="body-large text-[#082D4D]/60 max-w-lg mx-auto mt-3">
              Creators on Ideakicks regularly seek trusted expertise in four core areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SPECIALTIES.map((spec, i) => (
              <div key={i} className="relative group rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] flex flex-col justify-end p-8 shadow-sm">
                <div className="absolute inset-0">
                  <img src={spec.image} alt={spec.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030213]/90 via-[#030213]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-medium text-white mb-2">{spec.title}</h3>
                  <p className="text-white/80 leading-relaxed text-sm">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Simple 3-Step Process */}
      <section className="section-padding bg-[#082D4D]/[0.02]">
        <div className="container-base max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#082D4D]">How it works</h2>
            <p className="body-large text-[#082D4D]/60 max-w-lg mx-auto mt-3">
              Simple, transparent, and completely free to join.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex flex-col items-start py-8">
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
                  {item.step}
                </p>
                <h4 className="text-xl font-heading font-normal text-[#082D4D] mb-3">
                  {item.title}
                </h4>
                <p className="body-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clean, Uncluttered Application Form */}
      <section id="partner-form" className="section-padding bg-white">
        <div className="container-base max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="heading-section text-[#082D4D]">
              Join the partner network
            </h2>
            <p className="body-large text-[#082D4D]/60 mt-3">
              Tell us about your services. We review every application within 48 hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#082D4D]/10 shadow-[0_8px_30px_rgba(8,45,77,0.06)]">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-[#6FD179]/20 text-[#6FD179] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} weight="fill" />
                </div>
                <h3 className="font-heading text-2xl font-medium text-[#082D4D] mb-2">
                  Application Received
                </h3>
                <p className="text-[#082D4D]/70 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                  Thank you for applying. Our partnerships team will review your
                  portfolio and follow up with next steps within 48 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      companyName: "",
                      website: "",
                      serviceType: "",
                      contactName: "",
                      email: "",
                    });
                  }}
                  className="text-xs font-semibold text-[#082D4D] underline hover:text-[#6FD179] transition-colors"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#082D4D]">
                    Company or Agency Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="h-11 px-4 rounded-xl border border-[#082D4D]/15 outline-none focus:border-[#6FD179] text-sm text-[#082D4D] transition-colors"
                    placeholder="e.g. Apex Product Studio"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#082D4D]">
                    Website or Portfolio URL
                  </label>
                  <input
                    required
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="h-11 px-4 rounded-xl border border-[#082D4D]/15 outline-none focus:border-[#6FD179] text-sm text-[#082D4D] transition-colors"
                    placeholder="https://youragency.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#082D4D]">
                    Primary Specialty
                  </label>
                  <select
                    required
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                    className="h-11 px-4 rounded-xl border border-[#082D4D]/15 outline-none focus:border-[#6FD179] text-sm text-[#082D4D] bg-white transition-colors"
                  >
                    <option value="">Select your core specialty</option>
                    <option value="manufacturing">Manufacturing & Prototyping</option>
                    <option value="logistics">Fulfillment & Global Logistics</option>
                    <option value="marketing">Marketing, Ads & Crowdfunding PR</option>
                    <option value="design">Industrial & Packaging Design</option>
                    <option value="video">Video & Media Production</option>
                    <option value="legal">Legal, Compliance & Certifications</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#082D4D]">
                      Contact Person
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactName: e.target.value,
                        })
                      }
                      className="h-11 px-4 rounded-xl border border-[#082D4D]/15 outline-none focus:border-[#6FD179] text-sm text-[#082D4D] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#082D4D]">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-11 px-4 rounded-xl border border-[#082D4D]/15 outline-none focus:border-[#6FD179] text-sm text-[#082D4D] transition-colors"
                      placeholder="jane@youragency.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 h-12 w-full bg-[#6FD179] text-white font-bold rounded-xl hover:bg-[#5bc468] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 text-sm shadow-md shadow-[#6FD179]/20"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Application <ArrowRight size={16} weight="bold" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#082D4D]/50 mt-1">
                  Free to join · No hidden fees · Zero spam guarantee
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
