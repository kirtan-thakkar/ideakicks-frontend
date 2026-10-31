import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface StepItem {
  num: string;
  stepNum: string;
  title: string;
  description: string;
  highlight: string;
}

const STEPS: StepItem[] = [
  {
    num: "01",
    stepNum: "1",
    title: "Apply & Review",
    description:
      "Submit your idea in 5 minutes with zero red tape. Every project receives real human review and actionable feedback within 48 hours — no upfront fees.",
    highlight: "48h human review",
  },
  {
    num: "02",
    stepNum: "2",
    title: "Build with a Coach",
    description:
      "Work 1-on-1 with a dedicated campaign coach to refine your pitch, craft your story, and set high-converting reward tiers before going live.",
    highlight: "1-on-1 dedicated coach",
  },
  {
    num: "03",
    stepNum: "3",
    title: "Launch with Flexible Funding",
    description:
      "Go live to our community of early believers. With flexible funding, you keep what you raise — with zero penalties if you miss your initial goal.",
    highlight: "Keep what you raise",
  },
  {
    num: "04",
    stepNum: "4",
    title: "Deliver & Scale",
    description:
      "Fulfill backer rewards and expand your brand with direct access to our verified network of accredited backers and trusted production partners.",
    highlight: "Verified backer network",
  },
];

export function CreatorJourneyMerged() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);

  const [lineBounds, setLineBounds] = useState({ top: 42, height: 600 });

  // Dynamically calculate exact center-to-center line bounds
  useEffect(() => {
    const updateLine = () => {
      if (
        !firstNodeRef.current ||
        !lastNodeRef.current ||
        !stepsListRef.current
      )
        return;

      const containerRect = stepsListRef.current.getBoundingClientRect();
      const firstRect = firstNodeRef.current.getBoundingClientRect();
      const lastRect = lastNodeRef.current.getBoundingClientRect();

      // Since the first/last nodes are static wrapper divs, the circle center is exactly 
      // 20px (pt-5) + 22px (half of h-11) = 42px from the top of the wrapper.
      const top = firstRect.top + 42 - containerRect.top;
      const bottom = lastRect.top + 42 - containerRect.top;
      const height = Math.max(0, bottom - top);

      setLineBounds({ top, height });
    };

    updateLine();
    const timer = setTimeout(updateLine, 150);

    const observer = new ResizeObserver(() => {
      updateLine();
    });

    if (stepsListRef.current) {
      observer.observe(stepsListRef.current);
    }
    window.addEventListener("resize", updateLine);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", updateLine);
    };
  }, []);

  // Scroll tracking for the vertical animated line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-20 lg:py-24 bg-white relative">
      <div className="container-base max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-[#082D4D]">
            The journey to launch
          </h2>
          <p className="body-large text-[#082D4D]/60 max-w-xl mx-auto mt-4">
            Four simple steps to bring your vision to life, backed by our team at
            every stage.
          </p>
        </div>

        {/* Steps List with Perfectly Aligned Line */}
        <div ref={stepsListRef} className="relative">
          {/* Static Background Track Line - Exactly through node centers */}
          <div
            className="absolute left-6 w-[2px] bg-[#082D4D]/10 -translate-x-1/2 pointer-events-none"
            style={{
              top: `${lineBounds.top}px`,
              height: `${lineBounds.height}px`,
            }}
          />

          {/* Animated Line Container with Overflow Hidden to prevent spring overshoot */}
          <div
            className="absolute left-6 w-[20px] -translate-x-1/2 pointer-events-none overflow-hidden"
            style={{
              top: `${lineBounds.top}px`,
              height: `${lineBounds.height}px`,
            }}
          >
            <motion.div
              className="absolute left-1/2 w-[2.5px] h-full bg-[#6FD179] -translate-x-1/2 pointer-events-none shadow-[0_0_8px_rgba(111,209,121,0.6)]"
              style={{
                scaleY,
                originY: 0,
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-10">
            {STEPS.map((step, index) => {
              const isFirst = index === 0;
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.num} ref={isFirst ? firstNodeRef : isLast ? lastNodeRef : undefined}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4 sm:gap-6 md:gap-8 group"
                  >
                    {/* Fixed-width Spine Column: Centers node precisely at 24px (left-6) */}
                    <div className="w-12 shrink-0 flex items-center justify-center pt-5">
                      <div
                        className="w-11 h-11 rounded-full bg-white border-2 border-[#6FD179] text-[#082D4D] flex items-center justify-center font-heading font-bold text-sm md:text-base shadow-sm relative z-10 group-hover:bg-[#6FD179] group-hover:text-white transition-colors duration-300"
                      >
                        {step.stepNum}
                      </div>
                    </div>

                  {/* Clean, Easy-to-Read Step Card */}
                  <div className="flex-1 min-w-0 bg-white rounded-2xl p-6 sm:p-8 border border-[#082D4D]/08 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <h3 className="font-heading text-xl md:text-2xl font-medium text-[#082D4D]">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-[#082D4D]/70 text-base md:text-[1.0625rem] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
