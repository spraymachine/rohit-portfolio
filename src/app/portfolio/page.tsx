"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import { getFilteredImages, type ImageCategory } from "@/lib/images";

const DomeGallery = dynamic(() => import("@/components/ui/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#255f38] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const categories: { key: ImageCategory; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "automotive", label: "AUTOMOTIVE" },
  { key: "wildlife", label: "WILDLIFE" },
  { key: "product", label: "PRODUCT" },
  { key: "portrait", label: "PORTRAITS" },
  { key: "landscape", label: "LANDSCAPE" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<ImageCategory>("all");
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const images = useMemo(
    () =>
      getFilteredImages(activeCategory).map((img) => ({
        src: img.src,
        alt: img.alt,
      })),
    [activeCategory]
  );

  useEffect(() => {
    const chars = headingRef.current?.querySelectorAll(".port-char");
    if (chars) {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  const headingText = "PORTFOLIO";

  return (
    <>
      <Navigation />
      <main className="h-[100dvh] flex flex-col bg-black pt-16 sm:pt-24 overflow-hidden">
        <div className="text-center mb-1 sm:mb-2 shrink-0">
          <h1
            ref={headingRef}
            className="font-[family-name:var(--font-syne)] font-extrabold text-xl sm:text-4xl md:text-5xl tracking-[-0.02em] flex justify-center"
          >
            {headingText.split("").map((char, i) => (
              <span key={i} className="port-char inline-block opacity-0">
                {char}
              </span>
            ))}
          </h1>
          <div
            className="h-[2px] w-16 sm:w-[100px] mx-auto mt-2 sm:mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #255f38, #ce2626)" }}
          />
        </div>

        <div className="flex justify-center gap-2 mb-1 sm:mb-2 px-4 shrink-0 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.key;
            const accent =
              cat.key === "wildlife"
                ? "#255f38"
                : cat.key === "automotive"
                ? "#ce2626"
                : "#ffffff";
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 px-3 sm:px-5 py-1 sm:py-2 rounded-full font-[family-name:var(--font-syne)] text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 cursor-pointer"
                style={{
                  border: active
                    ? `1px solid ${accent}`
                    : "1px solid rgba(255,255,255,0.15)",
                  background: active
                    ? cat.key === "wildlife"
                      ? "rgba(37,95,56,0.15)"
                      : cat.key === "automotive"
                      ? "rgba(206,38,38,0.15)"
                      : "rgba(255,255,255,0.08)"
                    : "transparent",
                  color: active ? accent : "rgba(255,255,255,0.5)",
                }}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex-1 min-h-0 w-full"
        >
          <DomeGallery
            images={images}
            fit={isMobile ? 0.66 : 0.5}
            minRadius={isMobile ? 216 : 600}
            maxVerticalRotationDeg={isMobile ? 14 : 18}
            segments={isMobile ? 14 : 34}
            dragSensitivity={isMobile ? 10 : 20}
            dragDampening={0.4}
            grayscale={false}
          />
          <p className="absolute bottom-3 left-0 right-0 text-center font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.2em] text-[#5a5a5a] pointer-events-none">
            DRAG TO NAVIGATE &middot; CLICK TO ENLARGE
          </p>
        </motion.div>
      </main>
    </>
  );
}
