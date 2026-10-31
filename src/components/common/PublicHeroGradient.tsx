import { GradientCanvas } from "./GradientCanvas";

export function PublicHeroGradient() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.82]" aria-hidden="true">
        <GradientCanvas />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.48)_44%,rgba(255,255,255,0.20)_72%,rgba(15,76,130,0.12)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-b from-transparent via-white/80 to-white"
        aria-hidden="true"
      />
    </>
  );
}
