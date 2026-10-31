import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const INCLUDED_BENEFITS = [
  {
    image: "/coach_image.jpg",
    title: "1-on-1 Coach",
  },
  {
    image: "/review_image.jpg",
    title: "Human Review",
  },
  {
    image: "/backer_image.jpg",
    title: "Backer Network",
  },
];

export function CreatorPricing() {
  return (
    <section className="py-24 bg-white" style={{ fontFamily: SAT }}>
      <div className="container-base max-w-4xl mx-auto text-center">
        
        <h2 className="font-heading text-4xl sm:text-5xl text-[#082D4D] leading-tight mb-4" style={{ fontFamily: CD, fontWeight: 500 }}>
          Fair, aligned pricing.
        </h2>
        
        <div className="bg-[#082D4D]/[0.02] rounded-3xl p-10 sm:p-14 border border-[#082D4D]/08 shadow-sm mb-12 mt-10">
          <div 
            className="text-[#0F4C82] mb-2"
            style={{ fontFamily: CD, fontWeight: 500, fontSize: "clamp(4rem, 8vw, 6rem)", lineHeight: 1 }}
          >
            5%
          </div>
          <p 
            className="text-[#082D4D] text-lg sm:text-2xl font-medium"
            style={{ fontFamily: CD, fontWeight: 500 }}
          >
            Platform fee on successfully raised funds
          </p>
        </div>

        <h3 className="text-lg text-[#082D4D]/60 mb-6">What's included for free:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {INCLUDED_BENEFITS.map((item, i) => (
            <div 
              key={i} 
              className="relative group rounded-3xl overflow-hidden aspect-[4/3] flex flex-col justify-end p-6 shadow-sm"
            >
              <div className="absolute inset-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030213]/90 via-[#030213]/20 to-transparent" />
              <div className="relative z-10 text-left">
                <h4 className="font-heading text-xl font-medium text-white">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/pricing"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F4C82] hover:text-[#082D4D] transition-colors"
        >
          Read detailed pricing FAQs <ArrowRight size={14} weight="bold" />
        </Link>
        
      </div>
    </section>
  );
}
