import { Link } from "react-router";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PublicHeroGradient } from "../components/common/PublicHeroGradient";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const stats = [
  { value: "₹45M+", label: "Raised" },
  { value: "1,200+", label: "Projects funded" },
  { value: "500K+", label: "Backers" },
  { value: "40+", label: "Countries" },
];

const storyCards = [
  {
    title: "Evo-AIR Makeup System",
    raised: "₹307,500",
    fundedPct: 410,
    fundedLabel: "410% funded",
    image: "/campaigns/evo-air/box.png",
    href: "/campaign/evo-air",
    description: "A revolutionary airbrush makeup system that raised ₹307,500 from over 4,200 backers, hitting 410% of its initial goal."
  },
  {
    title: "EcoLife Solar Water Purifier",
    raised: "₹63,500",
    fundedPct: 127,
    fundedLabel: "127% funded",
    image: "https://images.unsplash.com/photo-1684326203813-3986af3ecc04?w=800&q=80",
    href: "/campaign/1",
    description: "A sustainable, portable water purifier that raised ₹63,500, empowering off-grid communities and eco-conscious travelers."
  },
  {
    title: "Chronicles of Arcadia",
    raised: "₹96,000",
    fundedPct: 320,
    fundedLabel: "320% funded",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    href: "/campaign/arcadia-tabletop",
    description: "An immersive tabletop RPG with modular terrain that raised ₹96,000, bringing over 320% of its funding goal to life."
  },
];

export function SuccessStories() {
  return (
    <div style={{ fontFamily: SAT }}>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-20">
        <PublicHeroGradient />
        <div className="container-base relative z-10 mx-auto max-w-6xl w-full">
          
          <div className="text-center mb-16 md:mb-24 mt-12">
            <h1 className="mb-5 font-heading text-[#082D4D] text-balance"
                style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.05, fontWeight: 500, letterSpacing: '-0.03em' }}>
              Ideas that went the distance.
            </h1>
            <p className="body-large text-[#082D4D]/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Every project here started with an application and ended with a funded idea. These are their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {storyCards.map((card, i) => (
              <Link key={i} to={card.href} className="group block">
                <div className="text-7xl md:text-[5rem] font-light text-[#082D4D]/[0.05] mb-3 leading-none" style={{ fontFamily: CD, fontWeight: 300, letterSpacing: '-0.05em' }}>
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-medium text-[#082D4D] mb-4 leading-snug group-hover:text-[#6FD179] transition-colors" style={{ fontFamily: CD }}>
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#082D4D]/60 leading-relaxed mb-8 min-h-[5rem]">
                  {card.description}
                </p>
                <div className="aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#082D4D]/05 shadow-sm">
                  <ImageWithFallback src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white">
        <div className="py-12 container-base max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#FAFBFD] border border-[#082D4D]/06 rounded-2xl p-6 md:p-8 text-center shadow-sm">
                <div className="text-[#082D4D] text-3xl md:text-4xl mb-1.5" style={{ fontFamily: CD, fontWeight: 500 }}>
                  {stat.value}
                </div>
                <p className="text-sm text-[#082D4D]/60 font-medium" style={{ fontFamily: SAT }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section style={{ backgroundColor: "#FFFFFF" }}>
        <div className="py-20 container-base">
          <div className="text-center mb-10">
            <h2 className="heading-section text-[#082D4D]">Featured story</h2>
          </div>

          <div className="grid md:grid-cols-[1fr_400px] gap-0 overflow-hidden bg-white rounded-3xl border border-[#082D4D]/08 shadow-sm hover:shadow-md transition-shadow">
            <div style={{ position: "relative", minHeight: "260px" }}>
              <ImageWithFallback
                src="/campaigns/evo-air/box.png"
                alt="Evo-AIR Makeup System"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  minHeight: "260px",
                }}
              />
            </div>
            <div
              style={{
                padding: "2.5rem",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>

                <h2
                  style={{
                    fontFamily: CD,
                    fontWeight: 500,
                    fontSize: "1.625rem",
                    color: "#082D4D",
                    marginBottom: "0.375rem",
                    lineHeight: 1.25,
                  }}
                >
                  Evo-AIR Makeup System
                </h2>
                <p
                  style={{
                    fontFamily: SAT,
                    color: "rgba(8,45,77,0.5)",
                    fontSize: "0.875rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  by Evoluir Beauty
                </p>
                <div
                  className="grid grid-cols-3 gap-2 sm:gap-4"
                  style={{
                    borderTop: "1px solid rgba(8,45,77,0.08)",
                    borderBottom: "1px solid rgba(8,45,77,0.08)",
                    padding: "1rem 0",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: SAT,
                        fontWeight: 500,
                        fontSize: "1.125rem",
                        color: "#082D4D",
                      }}
                    >
                      ₹307,500
                    </p>
                    <p style={{ fontFamily: SAT, fontSize: "0.75rem", color: "rgba(8,45,77,0.45)" }}>
                      raised
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: CD,
                        fontWeight: 500,
                        fontSize: "1.125rem",
                        color: "#082D4D",
                      }}
                    >
                      4,205
                    </p>
                    <p style={{ fontFamily: SAT, fontSize: "0.75rem", color: "rgba(8,45,77,0.45)" }}>
                      backers
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: CD,
                        fontWeight: 500,
                        fontSize: "1.125rem",
                        color: "#6FD179",
                      }}
                    >
                      410%
                    </p>
                    <p style={{ fontFamily: SAT, fontSize: "0.75rem", color: "rgba(8,45,77,0.45)" }}>
                      of goal
                    </p>
                  </div>
                </div>
                <blockquote
                  style={{
                    fontFamily: SAT,
                    color: "rgba(8,45,77,0.65)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    borderLeft: "2px solid #6FD179",
                    paddingLeft: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  "ideakicks didn't just give us a platform — they gave us a coach, a community, and the confidence to launch something we believed in."
                </blockquote>
                <p style={{ fontFamily: SAT, fontSize: "0.75rem", color: "rgba(8,45,77,0.4)", marginBottom: "1.5rem" }}>
                  Funded in 18 days
                </p>
              </div>
              <Link
                to="/campaign/evo-air"
                style={{
                  fontFamily: SAT,
                  color: "#0F4C82",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                View campaign →
              </Link>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
