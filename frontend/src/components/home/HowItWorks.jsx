import { Search, Layers3, GitCompareArrows, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    description:
      "Tell AtlasRank what you're looking for. Search by product name, brand, model, or category.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Discover",
    description:
      "AtlasRank finds relevant product listings across multiple stores and brings them together.",
  },
  {
    number: "03",
    icon: GitCompareArrows,
    title: "Compare",
    description:
      "Compare prices, ratings, reviews, specifications, availability, and other important signals.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Decide",
    description:
      "Get a clear recommendation based on the information that actually matters.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            How AtlasRank works
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            From search to
            <br />
            smarter decisions.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/40 sm:text-lg">
            AtlasRank turns scattered product information into a simple,
            structured comparison so you can spend less time researching and
            more time making the right choice.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid border-l border-white/10 md:grid-cols-4 md:border-l-0">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`group relative border-white/10 py-8 pl-7 md:border-l md:px-7 md:py-4 ${
                  index === steps.length - 1 ? "md:border-r" : ""
                }`}
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.15em] text-white/25">
                    {step.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white group-hover:text-black">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-12 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-xs text-sm leading-6 text-white/35">
                  {step.description}
                </p>

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute -bottom-px left-7 h-px w-8 bg-white/10 md:bottom-auto md:left-auto md:right-[-16px] md:top-[35px] md:h-px md:w-8" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;