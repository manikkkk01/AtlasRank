import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const suggestions = [
    "Nike Air Force 1",
    "iPhone 17",
    "Sony WH-1000XM5",
    "MacBook Air M4",
  ];

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#f4f4f1] text-[#111111]"
    >
      {/* Subtle editorial background details */}
      <div className="pointer-events-none absolute right-[-180px] top-[120px] h-[420px] w-[420px] rounded-full border border-black/[0.035]" />

      <div className="pointer-events-none absolute right-[-110px] top-[190px] h-[280px] w-[280px] rounded-full border border-black/[0.035]" />

      <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[360px] w-[360px] rounded-full border border-black/[0.035]" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8 lg:px-12">

        {/* Eyebrow */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45 shadow-sm backdrop-blur-sm">
          Product intelligence, simplified
        </div>

        {/* Main Heading */}
        <h1 className="max-w-6xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
          Shop smarter.
          <br />

          <span className="text-black/30">
            Choose better.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-base leading-7 text-black/45 sm:text-lg">
          Search once. Compare prices, ratings, reviews and product
          information across the web. AtlasRank turns scattered data
          into one clear buying decision.
        </p>

        {/* Search */}
        <div
          id="search"
          className="mt-10 w-full max-w-3xl scroll-mt-32"
        >
          <div className="group flex items-center rounded-2xl border border-black/10 bg-white/80 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 focus-within:border-black/20 focus-within:bg-white focus-within:shadow-[0_25px_90px_rgba(0,0,0,0.12)]">

            {/* Search Icon */}
            <Search
              className="ml-4 h-5 w-5 shrink-0 text-black/25 transition-colors duration-300 group-focus-within:text-black/60"
            />

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(searchQuery);
                }
              }}
              placeholder="Search for a product, brand or model..."
              className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-[#111111] outline-none placeholder:text-black/25 sm:text-base"
            />

            {/* Search Button */}
            <button
              type="button"
              onClick={() => handleSearch(searchQuery)}
              className="group/button flex shrink-0 items-center gap-2 rounded-xl bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg hover:shadow-black/15"
            >
              Compare

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1"
              />
            </button>
          </div>

          {/* Suggested Searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="px-2 text-xs text-black/30">
              Try:
            </span>

            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSearch(suggestion)}
                className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-xs text-black/45 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/25">
          <span>Price comparison</span>

          <span className="h-1 w-1 rounded-full bg-black/15" />

          <span>AI insights</span>

          <span className="h-1 w-1 rounded-full bg-black/15" />

          <span>Product intelligence</span>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f4f1] to-transparent" />
    </section>
  );
};

export default Hero;