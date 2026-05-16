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
      <main className="min-h-screen bg-black pt-24 pb-8">
        <div className="text-center mb-8">
          <h1
            ref={headingRef}
            className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-5xl md:text-7xl tracking-[-0.02em] flex justify-center"
          >
            {headingText.split("").map((char, i) => (
              <span key={i} className="port-char inline-block opacity-0">
                {char}
              </span>
            ))}
          </h1>
          <div
            className="h-[3px] w-[100px] mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #255f38, #ce2626)" }}
          />
        </div>

        <div className="flex justify-center gap-3 mb-8 px-4 flex-wrap">
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
                className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-[family-name:var(--font-syne)] text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 cursor-pointer"
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
          style={{
            width: "100vw",
            height: isMobile ? "75vh" : "100vh",
          }}
        >
          <DomeGallery
            images={images}
            fit={isMobile ? 0.45 : 0.5}
            minRadius={isMobile ? 260 : 550}
            maxRadius={isMobile ? 420 : Infinity}
            maxVerticalRotationDeg={isMobile ? 3 : 6}
            segments={isMobile ? 14 : 30}
            dragSensitivity={isMobile ? 14 : 20}
            dragDampening={2}
            grayscale={false}
          />
        </motion.div>

        <div className="text-center mt-4">
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.2em] text-[#5a5a5a]">
            DRAG TO NAVIGATE &middot; CLICK TO ENLARGE
          </p>
        </div>
      </main>
    </>
  );
}
