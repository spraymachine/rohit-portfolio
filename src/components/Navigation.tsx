"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/about", label: "ABOUT" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname !== "/");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(true);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="font-[family-name:var(--font-syne)] font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            RK
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.2em] transition-opacity hover:opacity-100 group"
                style={{ opacity: pathname === link.href ? 1 : 0.5 }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{
                    width: pathname === link.href ? "100%" : "0%",
                    background: "linear-gradient(90deg, #255f38, #ce2626)",
                  }}
                />
              </Link>
            ))}
            <Link
              href="/#contact"
              className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] w-7 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              className="block h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1, width: mobileOpen ? 0 : "70%" }}
              className="block h-[2px] bg-white rounded-full ml-auto"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              className="block h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {[...navLinks, { href: "/#contact", label: "CONTACT" }].map(
                (link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-[family-name:var(--font-syne)] font-extrabold text-4xl tracking-tight hover:opacity-70 transition-opacity"
                      style={{
                        color:
                          pathname === link.href
                            ? "#255f38"
                            : "#ffffff",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
