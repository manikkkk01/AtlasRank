import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ value = "", onChange, onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="group flex items-center rounded-2xl border border-black/10 bg-white/70 p-2 shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 focus-within:border-black/20 focus-within:bg-white">

        {/* Search Icon */}
        <Search
          className="ml-4 h-5 w-5 shrink-0 text-black/30 transition-colors duration-300 group-focus-within:text-black/70"
        />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder="Search for another product..."
          className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-[#111111] outline-none placeholder:text-black/30 sm:text-base"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg hover:shadow-black/15"
        >
          Search
        </button>

        {/* Filter Button */}
        <button
          type="button"
          aria-label="Open filters"
          className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#e5e5e2] text-black/45 transition-all duration-300 hover:border-black/20 hover:bg-[#dcdcd9] hover:text-black"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

      </div>
    </form>
  );
};

export default SearchBar;