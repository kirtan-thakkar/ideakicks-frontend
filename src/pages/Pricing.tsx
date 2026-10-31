import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const comparisonRows = [
  { feature: "Upfront listing fee", ideakicks: "None (₹0)", typical: "₹50–500" },
  { feature: "Monthly platform fee", ideakicks: "None (₹0)", typical: "₹20–100/mo" },
  { feature: "Platform cut on funding", ideakicks: "5%", typical: "5–8%" },
  { feature: "Human campaign review", ideakicks: "Every project", typical: "Algorithmic" },
  { feature: "Campaign coach", ideakicks: "Included free", typical: "Paid add-on" },
  { feature: "Mentor matching", ideakicks: "Included free", typical: "Not offered" },
];

const faqItems = [
  {
    q: "When is the fee charged?",
    a: "Only when your campaign closes successfully. If you raise nothing, you pay nothing.",
  },
  {
    q: "Are there payment processing fees?",
    a: "Standard payment processing fees (typically 3%) apply separately to all pledges.",
  },
  {
    q: "What about international campaigns?",
    a: "The 5% fee applies to all campaigns regardless of location. Currency conversion is handled at checkout.",
  },
  {
    q: "What if I refund a backer?",
    a: "Platform fees are refunded proportionally for any backer refunds processed within 30 days of campaign close.",
  },
];

const included = [
  { 
    title: "1-on-1 Coach", 
    desc: "Strategy guidance and narrative polish before you launch.",
    image: "/coach_image.jpg"
  },
  { 
    title: "Human Review", 
    desc: "Actionable review from experienced makers within 48 hours.",
    image: "/review_image.jpg"
  },
  { 
    title: "Backer Network", 
    desc: "Direct exposure to dedicated backers looking for real craft.",
    image: "/backer_image.jpg"
  },
];

export function Pricing() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: SAT }}>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 text-center">
        <PublicHeroGradient />
        <div className="container-base relative z-10 mx-auto max-w-3xl flex flex-col items-center">
          <h1 className="heading-hero text-[#082D4D] mb-5">
            No success, no fee.
          </h1>
          <p className="body-large text-[#082D4D]/68 max-w-xl mx-auto">
            We only make money when you do. There are no listing fees, no monthly plans, no surprises.
          </p>
        </div>
      </section>

      {/* Fee structure (Revamped) */}
      <section className="bg-white">
        <div className="container-base py-16 max-w-4xl text-center">
          <div className="bg-[#082D4D]/[0.02] rounded-3xl p-10 sm:p-14 border border-[#082D4D]/08 shadow-sm mb-12">
            <div
              style={{
                fontFamily: CD,
                fontWeight: 500,
                fontSize: "clamp(4.5rem, 8vw, 6.5rem)",
                color: "#0F4C82",
                lineHeight: 1,
                marginBottom: "0.75rem",
              }}
            >
              5%
            </div>
            <p
              className="text-[#082D4D] text-lg sm:text-2xl font-medium mb-4"
              style={{
                fontFamily: CD,
                fontWeight: 500,
              }}
            >
              Platform fee on successfully raised funds
            </p>
            <p className="text-[#082D4D]/55 text-sm max-w-lg mx-auto">
              No upfront charges &bull; ₹0 if you don't fund &bull; Backers pay zero fees
            </p>
          </div>

          <h3 className="text-lg text-[#082D4D]/60 mb-6 text-left sm:text-center">What's included for free:</h3>

          {/* Included Pillars Image Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {included.map((item, i) => (
              <div 
                key={i} 
                className="relative group rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[4/5] flex flex-col justify-end p-6 shadow-sm text-left"
              >
                <div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#030213]/95 via-[#030213]/40 to-transparent" />
                <div className="relative z-10">
                  <h4 className="font-heading text-xl font-medium text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed drop-shadow-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs (Dropdown Accordion) */}
      <section className="bg-white">
        <div className="container-base py-16 max-w-3xl border-t border-[#082D4D]/08">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#082D4D]">
              Pricing questions
            </h2>
          </div>
          <Accordion type="single" collapsible>
            {faqItems.map((item, i) => (
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
        </div>
      </section>


    </div>
  );
}
