import {
  BarChart3,
  Brain,
  GitCompare,
  LineChart,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: GitCompare,
    title: "Price Comparison",
    description:
      "Compare prices from multiple stores in one place and quickly identify where the same product is available for less.",
    className: "md:col-span-2",
  },
  {
    icon: Brain,
    title: "AI Product Insights",
    description:
      "Turn complex product information into simple, useful insights that help you understand what is actually worth buying.",
    className: "md:col-span-1",
  },
  {
    icon: Search,
    title: "Smart Product Matching",
    description:
      "Identify the same product across different websites even when product names and listing formats are different.",
    className: "md:col-span-1",
  },
  {
    icon: LineChart,
    title: "Price Intelligence",
    description:
      "Understand current pricing against historical data and identify whether a price is genuinely attractive.",
    className: "md:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Ratings & Reviews",
    description:
      "Compare ratings, review counts and other signals instead of relying on a single number.",
    className: "md:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Decision Confidence",
    description:
  "AtlasRank combines price, ratings, reviews, availability and product signals to identify the strongest overall option. Go beyond the cheapest price and make your decision with greater confidence.",
    className: "md:col-span-3",
  },
];

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#080808] px-6 py-28 text-white lg:px-8 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Features
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Everything you need
            <br />
            before you buy.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/40 sm:text-lg">
            AtlasRank brings product discovery, comparison and intelligent
            analysis together in one place.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.045] ${feature.className}`}
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.025] blur-3xl transition-all duration-500 group-hover:bg-white/[0.06]" />

                {/* Icon */}
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="relative mt-16">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/35">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="mt-8 h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-16 group-hover:bg-white/50" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;