import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "how-it-works",
    label: "How It Works",
  },
  {
    id: "features",
    label: "Features",
  },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.id !== "home")
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      let currentSection = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleSectionClick = (sectionId) => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setActiveSection(sectionId);

      return;
    }

    navigate("/");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setActiveSection(sectionId);
    }, 100);
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    setActiveSection("home");

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="fixed left-1/2 top-5 z-50 w-[94%] max-w-7xl -translate-x-1/2 rounded-full border border-white/10 bg-black/30 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">

      <div className="flex h-16 items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleHomeClick();
          }}
          className="group flex items-center"
        >
          <img
            src="/logo.png"
            alt="AtlasRank"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-xl md:flex">

          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={
                  item.id === "home"
                    ? "#home"
                    : `#${item.id}`
                }
                onClick={(event) => {
                  event.preventDefault();

                  if (item.id === "home") {
                    handleHomeClick();
                  } else {
                    handleSectionClick(item.id);
                  }
                }}
                className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-[#e5e5e2] text-[#111111] shadow-lg"
                    : "text-white/65 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}

        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Start Comparing */}
          <a
            href="#search"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              navigate("/search");
            }}
            className="group hidden items-center gap-2 rounded-full bg-[#e5e5e2] px-6 py-3 text-sm font-semibold text-[#111111] shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl md:flex"
          >
            Start Comparing

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mx-3 mb-3 rounded-3xl border border-white/10 bg-[#111111]/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden">

          <ul className="space-y-1">

            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={
                    item.id === "home"
                      ? "#home"
                      : `#${item.id}`
                  }
                  onClick={(event) => {
                    event.preventDefault();

                    if (item.id === "home") {
                      handleHomeClick();
                    } else {
                      handleSectionClick(item.id);
                    }
                  }}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-[#e5e5e2] text-[#111111]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}

          </ul>

          {/* Mobile CTA */}
          <a
            href="#search"
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              navigate("/search");
            }}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#e5e5e2] px-4 py-3 text-sm font-semibold text-[#111111] transition hover:bg-white"
          >
            Start Comparing

            <ArrowUpRight size={16} />
          </a>

        </div>
      )}

    </nav>
  );
};

export default Navbar;