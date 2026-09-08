import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="bg-[#080808] px-6 py-24 text-white lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] px-6 py-16 text-center sm:px-12 lg:py-20">
          {/* Subtle highlight */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
              <Sparkles className="h-5 w-5 text-white/70" />
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Make your next purchase a smarter one.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
              Search a product, compare the options, and let AtlasRank help
              you make a better-informed decision.
            </p>

            <a
              href="#search"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white/90"
            >
              Start Comparing

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;