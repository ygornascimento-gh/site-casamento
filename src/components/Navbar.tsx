import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "#home" },
  { label: "Nossa Historia", href: "#historia" },
  { label: "Evento", href: "#evento" },
  { label: "Presenca", href: "#rsvp" },
  { label: "Presentes", href: "#presentes" },
  { label: "Mural", href: "#mural" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-wedding-cream/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={() => handleClick("#home")}
          className="font-script text-2xl text-wedding-rose"
        >
          P & Y
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-sm font-medium text-wedding-text-muted hover:text-wedding-rose transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-wedding-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-wedding-cream/98 backdrop-blur-sm border-t border-wedding-gold/20">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="text-left text-sm font-medium text-wedding-text-muted hover:text-wedding-rose transition-colors py-2"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
