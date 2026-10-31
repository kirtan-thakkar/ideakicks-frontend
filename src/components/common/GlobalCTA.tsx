import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";

const CD = "'Clash Display', sans-serif";

export function GlobalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28 text-center bg-white">
      <div className="container-base relative z-10 max-w-2xl mx-auto">
        <h2 className="heading-section text-[#082D4D] mb-4 text-3xl md:text-4xl lg:text-5xl">
          Ready to bring your idea to life?
        </h2>
        <p className="body-large text-[#082D4D]/70 mb-8 max-w-xl mx-auto">
          Join a curated ecosystem built for quality, not volume.
        </p>
        <Link
          to="/start"
          className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-[#6FD179] text-white font-bold rounded-full hover:bg-[#5bc468] transition-colors shadow-[0_4px_16px_rgba(111,209,121,0.3)] text-[1.0625rem]"
        >
          Start a Project <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
