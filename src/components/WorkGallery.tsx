"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { curatedItems } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

type Frame = {
  image: string;
  title: string;
  style: string;
  medium: string;
  year: string;
};

// Curated showcase (subset, enriched with meta)
const FRAMES: Frame[] = [
  { image: curatedItems[0].image, title: "Eagle", style: "Wildlife", medium: "Telephoto", year: "2024" },
  { image: curatedItems[1].image, title: "Moto Race", style: "Motorsport", medium: "Track Side", year: "2024" },
  { image: curatedItems[4].image, title: "MIG 29K", style: "Aviation", medium: "Air Show", year: "2023" },
  { image: curatedItems[3].image, title: "Portrait", style: "Editorial", medium: "Studio Light", year: "2025" },
  { image: curatedItems[10].image, title: "Golden Hour", style: "Landscape", medium: "Available Light", year: "2024" },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll(".sw-char");
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 60, rotateY: -18, rotateX: 4 },
        {
          opacity: 1,
          y: 0,
          rotateY: -12,
          rotateX: 2,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const frame = FRAMES[active];

  // Background ambient blobs
  const ambient = (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 90%, rgba(255,90,40,0.45), transparent 60%), radial-gradient(ellipse 55% 45% at 10% 30%, rgba(60,90,255,0.35), transparent 60%), radial-gradient(ellipse 70% 60% at 50% 50%, rgba(120,40,180,0.25), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#070710" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 90%, rgba(255,110,50,0.55), transparent 60%), radial-gradient(ellipse 55% 45% at 8% 25%, rgba(70,110,255,0.45), transparent 60%), radial-gradient(ellipse 70% 60% at 50% 50%, rgba(140,50,200,0.3), transparent 70%)",
        }}
      />
    </>
  );

  const headingText = "Selected Work";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-28"
      style={{ background: "#050509", perspective: "2000px" }}
    >
      {ambient}

      {/* Section heading */}
      <div className="relative max-w-[1400px] mx-auto px-6 mb-10 md:mb-14 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <span
            className="h-[6px] w-[6px] rounded-full"
            style={{ background: "#0022ff", boxShadow: "0 0 18px #0022ff" }}
          />
          <span className="font-[family-name:var(--font-space-grotesk)] text-[11px] tracking-[0.32em] uppercase text-white/55">
            Showcase &mdash; The Virtual Gallery
          </span>
        </div>
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-syne)] font-bold text-white text-[40px] md:text-[68px] tracking-[-0.03em] leading-[0.95]"
          style={{ fontStretch: "125%" }}
        >
          {headingText.split("").map((c, i) => (
            <span key={i} className="sw-char inline-block opacity-0" style={{ width: c === " " ? "0.28em" : undefined }}>
              {c === " " ? " " : c}
            </span>
          ))}
        </h2>
      </div>

      {/* Tilted gallery panel */}
      <div
        className="relative max-w-[1400px] mx-auto px-4 md:px-8"
        style={{ perspective: "2000px" }}
      >
        <div
          ref={panelRef}
          className="relative mx-auto"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-12deg) rotateX(2deg)",
            transformOrigin: "60% 50%",
          }}
        >
          <div
            className="relative grid grid-cols-1 md:grid-cols-[minmax(280px,360px)_1fr] gap-6 md:gap-10 p-6 md:p-10"
            style={{
              borderRadius: 32,
              background:
                "linear-gradient(145deg, rgba(30,25,50,0.55) 0%, rgba(15,12,28,0.65) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 32px 64px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Edge highlight */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 32,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)",
              }}
            />

            {/* Left: artist/frame list */}
            <div className="relative flex flex-col">
              <div className="mb-8">
                <div className="font-[family-name:var(--font-syne)] font-bold tracking-[0.04em] text-white text-[18px]">
                  RN STUDIO
                </div>
                <div className="font-[family-name:var(--font-space-grotesk)] text-[13px] tracking-[0.32em] uppercase text-white/55 mt-1">
                  The Frame Index
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {FRAMES.map((f, i) => {
                  const isActive = i === active;
                  return (
                    <li key={f.image}>
                      <button
                        onClick={() => setActive(i)}
                        className="w-full text-left group"
                        style={{
                          borderRadius: 16,
                          padding: isActive ? 12 : 14,
                          background: isActive
                            ? "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)"
                            : "transparent",
                          border: isActive
                            ? "1px solid rgba(255,255,255,0.14)"
                            : "1px solid transparent",
                          boxShadow: isActive
                            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 24px rgba(0,0,0,0.3)"
                            : "none",
                          transition: "all 400ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {isActive ? (
                            <div
                              className="relative shrink-0 overflow-hidden"
                              style={{
                                width: 52,
                                height: 52,
                                borderRadius: 12,
                                border: "1px solid rgba(255,255,255,0.18)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                              }}
                            >
                              <Image
                                src={f.image}
                                alt={f.title}
                                fill
                                sizes="52px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              className="shrink-0 grid place-items-center"
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "rgba(255,255,255,0.02)",
                                color: "rgba(255,255,255,0.65)",
                                fontFamily: "var(--font-space-grotesk)",
                                fontSize: 12,
                                letterSpacing: "0.05em",
                                transition: "all 300ms",
                              }}
                            >
                              {i + 1}
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div
                              className="font-[family-name:var(--font-syne)] font-semibold text-white truncate"
                              style={{
                                fontSize: isActive ? 18 : 16,
                                letterSpacing: "-0.01em",
                                transition: "font-size 300ms",
                              }}
                            >
                              {f.title}
                            </div>
                            {isActive && (
                              <>
                                <div className="font-[family-name:var(--font-space-grotesk)] italic text-[12px] text-white/60 mt-0.5">
                                  {f.style}
                                </div>
                                <div className="font-[family-name:var(--font-space-grotesk)] text-[13px] text-white/85 mt-0.5">
                                  {f.medium}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: preview */}
            <div className="relative flex flex-col">
              {/* Big preview image */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "16 / 10",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:
                    "0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
              >
                <Image
                  key={frame.image}
                  src={frame.image}
                  alt={frame.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  style={{
                    animation: "swFade 600ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                  priority
                />
              </div>

              {/* Title block */}
              <div className="text-center mt-6">
                <div
                  key={`t-${active}`}
                  className="font-[family-name:var(--font-syne)] font-bold text-white text-[22px] md:text-[28px] tracking-[-0.01em]"
                  style={{ animation: "swFade 500ms cubic-bezier(0.22,1,0.36,1)" }}
                >
                  {frame.title}
                </div>
                <div
                  className="font-[family-name:var(--font-space-grotesk)] text-[13px] text-white/55 mt-1.5 flex items-center justify-center gap-3"
                >
                  <span>{frame.year}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-white/35" />
                  <span>{frame.style}</span>
                </div>
              </div>

              {/* Thumbnail pill strip */}
              <div className="mt-6 flex justify-center">
                <div
                  className="flex items-center gap-2 p-2 pr-2"
                  style={{
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {FRAMES.map((f, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={f.image}
                        onClick={() => setActive(i)}
                        className="relative shrink-0 overflow-hidden"
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 12,
                          border: isActive
                            ? "2px solid rgba(255,255,255,0.85)"
                            : "1px solid rgba(255,255,255,0.10)",
                          boxShadow: isActive
                            ? "0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                            : "inset 0 1px 0 rgba(255,255,255,0.06)",
                          opacity: isActive ? 1 : 0.7,
                          transition: "all 300ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <Image src={f.image} alt={f.title} fill sizes="52px" className="object-cover" />
                      </button>
                    );
                  })}

                  {/* Next pill */}
                  <button
                    onClick={() => setActive((a) => (a + 1) % FRAMES.length)}
                    className="grid place-items-center ml-1"
                    style={{
                      width: 60,
                      height: 52,
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
                      color: "white",
                      transition: "all 300ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }}
                    aria-label="Next frame"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes swFade {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
