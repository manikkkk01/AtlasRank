const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#080808] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold">AtlasRank</p>
          <p className="mt-1 text-xs text-white/30">
            Compare smarter. Choose better.
          </p>
        </div>

        <p className="text-xs text-white/25">
          © 2026 AtlasRank. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;