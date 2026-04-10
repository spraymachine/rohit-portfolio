"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import Navigation from "@/components/Navigation";
import { portfolioImages, getFilteredImages, type ImageCategory } from "@/lib/images";

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
  { key: "wildlife", label: "WILDLIFE" },
  { key: "automotive", label: "AUTOMOTIVE" },
  { key: "portrait", label: "PORTRAIT" },
  { key: "events", label: "EVENTS" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<ImageCategory>("all");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const filteredImages = useMemo(() => {
    return getFilteredImages(activeCategory).map((img) => ({
      src: img.src,
      alt: img.alt,
    }));
  }, [activeCategory]);

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
        {/* Page heading */}
        <div className="text-center mb-8">
          <h1
            ref={headingRef}
            className="font-[family-name:var(--font-syne)] font-extrabold text-5xl md:text-7xl tracking-[-0.02em] flex justify-center"
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

        {/* Category filters */}
        <div className="flex justify-center gap-3 mb-8 px-4 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full font-[family-name:var(--font-syne)] text-xs tracking-[0.15em] transition-all duration-300 cursor-pointer"
              style={{
                border:
                  activeCategory === cat.key
                    ? cat.key === "wildlife"
                      ? "1px solid #255f38"
                      : cat.key === "automotive"
                      ? "1px solid #ce2626"
                      : "1px solid rgba(255,255,255,0.4)"
                    : "1px solid rgba(255,255,255,0.15)",
                background:
                  activeCategory === cat.key
                    ? cat.key === "wildlife"
                      ? "rgba(37,95,56,0.15)"
                      : cat.key === "automotive"
                      ? "rgba(206,38,38,0.15)"
                      : "rgba(255,255,255,0.08)"
                    : "transparent",
                color:
                  activeCategory === cat.key
                    ? cat.key === "wildlife"
                      ? "#255f38"
                      : cat.key === "automotive"
                      ? "#ce2626"
                      : "#ffffff"
                    : "rgba(255,255,255,0.5)",
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Dome Gallery */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
          style={{ height: "calc(100vh - 220px)" }}
        >
          <DomeGallery
            images={filteredImages}
            fit={0.5}
            minRadius={650}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            overlayBlurColor="#000000"
          />
        </motion.div>

        {/* Interaction hint */}
        <div className="text-center mt-4">
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.2em] text-[#5a5a5a]">
            DRAG TO NAVIGATE &middot; CLICK TO ENLARGE
          </p>
        </div>
      </main>
    </>
  );
}
