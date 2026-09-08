import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

const FilterBar = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  const handleStoreChange = (store) => {
    onFilterChange("store", store);
    setOpenMenu(null);
  };

  const handlePriceChange = (price) => {
    onFilterChange("price", price);
    setOpenMenu(null);
  };

  const handleRatingChange = (rating) => {
    onFilterChange("rating", rating);
    setOpenMenu(null);
  };

  const handleSortChange = (sort) => {
    onSortChange(sort);
    setOpenMenu(null);
  };

  return (
    <div
      ref={filterRef}
      className="flex flex-col gap-4 border-b border-black/10 pb-5 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">

        {/* Filters Button */}
        <button
          type="button"
          onClick={() => toggleMenu("filters")}
          className={`flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm text-black/55 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black ${
            openMenu === "filters"
              ? "border-black/20 bg-white text-black"
              : ""
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>

        {/* Store */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("store")}
            className={`flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm text-black/55 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black ${
              filters.store
                ? "border-black/20 bg-white text-black"
                : ""
            }`}
          >
            Store

            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {openMenu === "store" && (
            <div className="absolute left-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
              {["All Stores", "Amazon", "Flipkart", "Myntra", "Croma"].map(
                (store) => {
                  const value =
                    store === "All Stores" ? "" : store;

                  const selected = filters.store === value;

                  return (
                    <button
                      key={store}
                      type="button"
                      onClick={() => handleStoreChange(value)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                    >
                      {store}

                      {selected && (
                        <Check className="h-4 w-4 text-black" />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("price")}
            className={`flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm text-black/55 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black ${
              filters.price
                ? "border-black/20 bg-white text-black"
                : ""
            }`}
          >
            Price

            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {openMenu === "price" && (
            <div className="absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
              {[
                { label: "All Prices", value: "" },
                { label: "Under ₹10,000", value: "under-10000" },
                {
                  label: "₹10,000 – ₹50,000",
                  value: "10000-50000",
                },
                {
                  label: "₹50,000 – ₹1,00,000",
                  value: "50000-100000",
                },
                {
                  label: "Above ₹1,00,000",
                  value: "above-100000",
                },
              ].map((option) => {
                const selected = filters.price === option.value;

                return (
                  <button
                    key={option.value || "all"}
                    type="button"
                    onClick={() => handlePriceChange(option.value)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                  >
                    {option.label}

                    {selected && (
                      <Check className="h-4 w-4 text-black" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu("rating")}
            className={`flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm text-black/55 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black ${
              filters.rating
                ? "border-black/20 bg-white text-black"
                : ""
            }`}
          >
            Rating

            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {openMenu === "rating" && (
            <div className="absolute left-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
              {[
                { label: "All Ratings", value: "" },
                { label: "4★ & above", value: "4" },
                { label: "3★ & above", value: "3" },
              ].map((option) => {
                const selected = filters.rating === option.value;

                return (
                  <button
                    key={option.value || "all"}
                    type="button"
                    onClick={() =>
                      handleRatingChange(option.value)
                    }
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                  >
                    {option.label}

                    {selected && (
                      <Check className="h-4 w-4 text-black" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sort */}
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleMenu("sort")}
          className="flex items-center gap-2 self-start rounded-full border border-black/10 bg-white/60 px-4 py-2.5 text-sm text-black/55 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black lg:self-auto"
        >
          <span className="text-black/35">
            Sort by
          </span>

          <span className="text-black">
            {sortBy === "price-low"
              ? "Lowest Price"
              : sortBy === "rating"
                ? "Highest Rated"
                : sortBy === "score"
                  ? "AtlasRank"
                  : "Best Match"}
          </span>

          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        {openMenu === "sort" && (
          <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl">
            {[
              { label: "Best Match", value: "match" },
              { label: "Lowest Price", value: "price-low" },
              { label: "Highest Rated", value: "rating" },
              { label: "AtlasRank", value: "score" },
            ].map((option) => {
              const selected = sortBy === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSortChange(option.value)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                >
                  {option.label}

                  {selected && (
                    <Check className="h-4 w-4 text-black" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;