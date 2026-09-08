import {
  ArrowLeft,
  ExternalLink,
  Star,
  Trophy,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Product API error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] px-6 pb-20 pt-32 text-[#111111]">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 w-32 rounded bg-black/10" />

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="h-[500px] rounded-[28px] bg-[#dededb]" />

              <div className="flex flex-col justify-center">
                <div className="h-4 w-24 rounded bg-black/10" />
                <div className="mt-5 h-16 w-3/4 rounded bg-black/10" />
                <div className="mt-8 h-10 w-32 rounded bg-black/10" />
                <div className="mt-8 h-36 rounded-2xl bg-black/10" />
                <div className="mt-8 h-12 w-48 rounded bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main className="min-h-screen bg-[#f4f4f1] px-6 pb-20 pt-32 text-[#111111]">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
            AtlasRank
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Product Not Found
          </h1>

          <p className="mt-4 text-sm text-black/45">
            We couldn't find the product you're looking for.
          </p>

          <Link
            to="/search"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </div>
      </main>
    );
  }

  const discount =
    product.pricing.original &&
    product.pricing.original > product.pricing.current
      ? Math.round(
          ((product.pricing.original -
            product.pricing.current) /
            product.pricing.original) *
            100
        )
      : null;

  return (
    <main className="min-h-screen bg-[#f4f4f1] px-5 pb-24 pt-28 text-[#111111] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Back */}
        <Link
          to="/search"
          className="group inline-flex items-center gap-2 text-sm font-medium text-black/40 transition hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Search
        </Link>

        {/* Main Product Section */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

          {/* Product Image */}
          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[32px] border border-black/10 bg-[#dededb] p-10">

            {/* Discount */}
            {discount && (
              <div className="absolute right-6 top-6 z-10 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#111111] shadow-sm">
                {discount}% OFF
              </div>
            )}

            <img
              src={product.image}
              alt={product.identity.name}
              className="max-h-[450px] w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            {/* Badge */}
            {product.badge && (
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-white shadow-lg">
                <Trophy className="h-3.5 w-3.5" />
                {product.badge}
              </div>
            )}

            {/* Store */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
              {product.store}
            </p>

            {/* Product Name */}
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {product.identity.name}
            </h1>

            {/* Rating */}
            <div className="mt-7 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/60 px-3.5 py-2">
                <Star className="h-3.5 w-3.5 fill-[#111111] text-[#111111]" />

                <span className="text-sm font-semibold">
                  {product.rating.value || "N/A"}
                </span>
              </div>

              <span className="text-sm text-black/40">
                {product.rating.reviews
                  ? `${product.rating.reviews.toLocaleString()} reviews`
                  : "No reviews"}
              </span>
            </div>

            {/* AtlasRank Score */}
            <div className="mt-9 border-y border-black/10 py-7">

              <div className="flex items-end justify-between gap-6">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    AtlasRank Score
                  </p>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-6xl font-semibold tracking-[-0.05em]">
                      {product.score}
                    </span>

                    <span className="text-sm text-black/30">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                    Overall ranking
                  </p>

                  <p className="mt-1 text-sm font-medium text-black/55">
                    Based on value &amp; quality
                  </p>
                </div>

              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-black/45">
                Overall product score based on price, ratings,
                reviews and value.
              </p>

            </div>

            {/* Price */}
            <div className="mt-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
                Current price
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-3">

                <span className="text-4xl font-bold tracking-tight">
                  ₹{product.pricing.current.toLocaleString()}
                </span>

                {product.pricing.original && (
                  <span className="text-lg text-black/30 line-through">
                    ₹{product.pricing.original.toLocaleString()}
                  </span>
                )}

              </div>

              {discount && (
                <p className="mt-1.5 text-xs font-medium text-black/45">
                  Save ₹
                  {(
                    product.pricing.original -
                    product.pricing.current
                  ).toLocaleString()}
                </p>
              )}

            </div>

            {/* Store Button */}
            <a
              href="#"
              className="group mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:bg-black hover:shadow-xl hover:shadow-black/15"
            >
              View on {product.store}

              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

          </div>
        </section>

        {/* Bottom Information */}
        <section className="mt-16 border-t border-black/10 pt-8">

          <div className="grid gap-8 sm:grid-cols-3">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Rating
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {product.rating.value || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Reviews
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {product.rating.reviews
                  ? product.rating.reviews.toLocaleString()
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Store
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {product.store}
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default ProductDetails;