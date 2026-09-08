import {
  ArrowUpRight,
  ExternalLink,
  Star,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    id,
    identity,
    image,
    rating,
    score,
    pricing,
    store,
    badge,
  } = product;

  const handleViewComparison = () => {
    navigate(`/product/${id}`);
  };

  const discount =
    pricing.original && pricing.original > pricing.current
      ? Math.round(
          ((pricing.original - pricing.current) / pricing.original) * 100
        )
      : null;

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-[#dededb] transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-[#d9d9d6] hover:shadow-xl hover:shadow-black/10">

      {/* Product Image */}
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#e7e7e4] p-10">

        {/* Badge */}
        {badge && (
          <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-[#111111] px-3.5 py-2 text-xs font-semibold text-white shadow-lg">
            <Trophy className="h-3.5 w-3.5" />
            {badge}
          </div>
        )}

        {/* Discount */}
        {discount && (
          <div className="absolute right-5 top-5 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] shadow-sm">
            {discount}% OFF
          </div>
        )}

        {/* Product Image */}
        <img
          src={image}
          alt={identity.name}
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="p-6">

        {/* Store + Rank */}
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
              {store}
            </p>

            <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-6 tracking-tight text-[#111111]">
              {identity.name}
            </h3>

          </div>

          {/* AtlasRank Score */}
          <div className="flex shrink-0 flex-col items-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/50">
              <span className="text-base font-bold text-[#111111]">
                {score}
              </span>
            </div>

            <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-wider text-black/35">
              Rank
            </span>

          </div>

        </div>

        {/* Rating */}
        <div className="mt-5 flex items-center gap-3">

          <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/50 px-3 py-1.5">

            <Star className="h-3.5 w-3.5 fill-[#111111] text-[#111111]" />

            <span className="text-xs font-semibold text-[#111111]">
              {rating.value || "N/A"}
            </span>

          </div>

          <span className="text-xs text-black/45">
            {rating.reviews
              ? `${rating.reviews.toLocaleString()} reviews`
              : "No reviews"}
          </span>

        </div>

        {/* Price */}
        <div className="mt-6">

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Current price
          </p>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-2">

            <span className="text-2xl font-bold tracking-tight text-[#111111]">
              ₹{pricing.current.toLocaleString()}
            </span>

            {pricing.original && (
              <span className="text-sm text-black/35 line-through">
                ₹{pricing.original.toLocaleString()}
              </span>
            )}

          </div>

          {discount && (
            <p className="mt-1 text-xs font-medium text-black/45">
              Save ₹
              {(pricing.original - pricing.current).toLocaleString()}
            </p>
          )}

        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">

          {/* External Link */}
          <a
            href="#"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/40 text-black/50 transition-all duration-300 hover:border-black/20 hover:bg-white hover:text-black"
            aria-label={`View ${identity.name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* View Comparison */}
          <button
            type="button"
            onClick={handleViewComparison}
            className="group/button flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg hover:shadow-black/20"
          >
            View Comparison

            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
            />
          </button>

        </div>

      </div>
    </article>
  );
};

export default ProductCard;