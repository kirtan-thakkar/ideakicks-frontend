import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";
import { motion } from "motion/react";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const campaignCards = [
  {
    id: "evo-air",
    name: "Evo-AIR Makeup System",
    raised: "₹307,500",
    funded: 410,
    backers: 4205,
    image: "/campaigns/evo-air/box.png",
  },
  {
    id: "1",
    name: "EcoLife Solar Water Purifier",
    raised: "₹63,500",
    funded: 127,
    backers: 2847,
    image: "https://images.unsplash.com/photo-1684326203813-3986af3ecc04?w=800&q=80",
  },
  {
    id: "scrubbitt",
    name: "Scrubbitt: Done Before It Used To Start",
    raised: "₹28,000",
    funded: 56,
    backers: 42,
    image: "/campaigns/scrubbitt/banner.jpg",
  },
];

export function BackerLanding() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", fontFamily: SAT }}>

      {/* Hero */}
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
              Back ideas that matter.<br />
              <span className="text-[#6FD179] italic">Before anyone else.</span>
            </h1>
            <p className="body-large max-w-2xl mx-auto text-lg md:text-xl text-[#082D4D]/75 leading-relaxed text-balance mb-10">
              Every campaign on ideakicks has been personally reviewed before going live. No noise. No filler. Just ideas worth believing in.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/explore"
                className="btn-primary btn-lg bg-[#6FD179] text-white hover:bg-[#5bc468] rounded-full px-8 shadow-lg shadow-[#6FD179]/20 font-bold transition-all flex items-center gap-2"
              >
                Explore campaigns <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                to="/signup"
                className="btn-secondary btn-lg bg-white border-2 border-[#0F4C82]/10 text-[#0F4C82] hover:border-[#0F4C82] hover:bg-[#0F4C82]/05 rounded-full px-8 font-bold transition-all flex items-center gap-2"
              >
                Create account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How backing works */}
      <section style={{ backgroundColor: "#FFFFFF" }} className="py-24">
        <div className="container-base">
          <div className="text-center mb-14">
            <h2 className="heading-section text-[#082D4D]">How backing works</h2>
            <p className="body-large text-[#082D4D]/60 max-w-xl mx-auto mt-3">
              Four transparent steps from discovering an ambitious idea to receiving your reward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Discover",
                desc: "Browse hand-curated campaigns, each reviewed before going live.",
              },
              {
                num: "02",
                title: "Pledge",
                desc: "Choose a reward tier. You're charged only when the campaign funds.",
              },
              {
                num: "03",
                title: "Follow",
                desc: "Get direct updates from the creator as they build.",
              },
              {
                num: "04",
                title: "Receive",
                desc: "Rewards fulfilled by creators you helped make possible.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="py-8 px-0"
              >
                <p
                  className="mb-6"
                  style={{
                    fontFamily: CD,
                    fontWeight: 400,
                    fontSize: "3.5rem",
                    color: "rgba(8,45,77,0.08)",
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </p>
                <h3
                  className="mb-3"
                  style={{ fontFamily: CD, fontWeight: 400, fontSize: "1.125rem", color: "#082D4D" }}
                >
                  {item.title}
                </h3>
                <p style={{ fontFamily: SAT, color: "rgba(8,45,77,0.65)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured campaigns */}
      <section style={{ backgroundColor: "#FFFFFF" }} className="pb-24">
        <div className="container-base">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="heading-section text-[#082D4D]">Featured campaigns</h2>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F4C82] hover:text-[#082D4D] transition-colors"
              style={{ fontFamily: SAT }}
            >
              View all campaigns <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaignCards.map((card) => (
              <Link key={card.id} to={`/campaign/${card.id}`} className="group flex flex-col transition-transform duration-300 hover:-translate-y-1">
                <div className="w-full overflow-hidden mb-5 relative rounded-2xl bg-[#082D4D]/05" style={{ aspectRatio: "4/3" }}>
                  <ImageWithFallback
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{ background: "linear-gradient(to top, rgba(8,45,77,0.7) 0%, transparent 100%)" }}
                  >
                    <p style={{ fontFamily: SAT, color: "rgba(255,250,240,0.75)", fontSize: "0.75rem" }}>
                      {card.backers.toLocaleString()} backers
                    </p>
                  </div>
                </div>
                <h4
                  className="mb-1 group-hover:text-[#0F4C82] transition-colors"
                  style={{ fontFamily: CD, fontWeight: 400, fontSize: "1.05rem", color: "#082D4D" }}
                >
                  {card.name}
                </h4>
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontFamily: SAT, color: "#082D4D", fontSize: "0.9rem" }}>
                    {card.raised} raised
                  </span>
                  <span style={{ color: "rgba(8,45,77,0.35)", fontSize: "0.8rem" }}>·</span>
                  <span style={{ fontFamily: SAT, color: "rgba(8,45,77,0.60)", fontSize: "0.9rem" }}>
                    {card.funded}% funded
                  </span>
                </div>
                <div className="w-full h-[2px] bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-[2px] bg-[#6FD179]"
                    style={{ width: `${Math.min(card.funded, 100)}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        </section>




    </div>
  );
}
