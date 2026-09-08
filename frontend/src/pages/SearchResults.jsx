import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import FilterBar from "../components/search/FilterBar";
import ProductCard from "../components/search/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;
const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    store: "",
    price: "",
    rating: "",
  });

  const [sortBy, setSortBy] = useState("match");

  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      const normalizedQuery = queryFromUrl.trim();

      if (!normalizedQuery) {
        setProducts([]);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/search?q=${encodeURIComponent(
            normalizedQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error("Search API error:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [queryFromUrl]);

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setSearchParams({
      q: trimmedQuery,
    });

    setSearchQuery(trimmedQuery);

    setFilters({
      store: "",
      price: "",
      rating: "",
    });

    setSortBy("match");
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value,
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // ----------------------------------------
  // Filtering
  // ----------------------------------------

  const filteredProducts = products.filter((product) => {
    if (filters.store && product.store !== filters.store) {
      return false;
    }

    if (
      filters.price === "under-10000" &&
      product.pricing.current >= 10000
    ) {
      return false;
    }

    if (
      filters.price === "10000-50000" &&
      (product.pricing.current < 10000 ||
        product.pricing.current > 50000)
    ) {
      return false;
    }

    if (
      filters.price === "50000-100000" &&
      (product.pricing.current < 50000 ||
        product.pricing.current > 100000)
    ) {
      return false;
    }

    if (
      filters.price === "above-100000" &&
      product.pricing.current <= 100000
    ) {
      return false;
    }

    if (
      filters.rating === "4" &&
      product.rating.value < 4
    ) {
      return false;
    }

    if (
      filters.rating === "3" &&
      product.rating.value < 3
    ) {
      return false;
    }

    return true;
  });

  // ----------------------------------------
  // Sorting
  // ----------------------------------------

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricing.current - b.pricing.current;

      case "rating":
        return b.rating.value - a.rating.value;

      case "score":
        return b.score - a.score;

      case "match":
      default:
        return b.score - a.score;
    }
  });

  return (
    <main className="min-h-screen bg-[#f4f4f1] px-5 pb-24 pt-28 text-[#111111] sm:px-8 lg:px-12">

      <div className="mx-auto max-w-[1400px]">

        {/* -------------------------------- */}
        {/* Search */}
        {/* -------------------------------- */}

        <div className="mx-auto max-w-3xl">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <section className="mt-20 border-b border-black/10 pb-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Product comparison
              </p>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                "{searchQuery}"
              </h1>

              <p className="mt-5 text-sm text-black/45">
                {sortedProducts.length}{" "}
                {sortedProducts.length === 1
                  ? "product"
                  : "products"}{" "}
                found across multiple stores.
              </p>

            </div>

            {/* Result count */}
            <div className="hidden shrink-0 text-right lg:block">

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Results
              </p>

              <p className="mt-1 text-4xl font-semibold tracking-[-0.04em]">
                {sortedProducts.length}
              </p>

            </div>

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Filters */}
        {/* -------------------------------- */}

        <div className="border-b border-black/10 py-6">

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

        </div>

        {/* -------------------------------- */}
        {/* Product Grid */}
        {/* -------------------------------- */}

        {sortedProducts.length > 0 ? (

          <section className="mt-8">

            {/* Grid label */}
            <div className="mb-5 flex items-center justify-between">

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Ranked results
              </p>

              <p className="text-xs text-black/35">
                Sorted by{" "}
                <span className="font-medium text-black/60">
                  {sortBy === "match"
                    ? "Best Match"
                    : sortBy === "price-low"
                    ? "Lowest Price"
                    : sortBy === "rating"
                    ? "Highest Rated"
                    : "AtlasRank Score"}
                </span>
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {sortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-[fadeIn_0.5s_ease-out]"
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}

            </div>

          </section>

        ) : (

          /* -------------------------------- */
          /* Empty State */
          /* -------------------------------- */

          <section className="mt-8 flex min-h-[360px] items-center justify-center border border-black/10 bg-white/50">

            <div className="max-w-md px-6 text-center">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
                No results
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                Nothing matched your search.
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/45">
                Try changing your search terms or adjusting your filters.
              </p>

            </div>

          </section>

        )}

      </div>

    </main>
  );
};

export default SearchResults;