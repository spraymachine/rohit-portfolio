"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { curatedItems } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#0022ff";

export default function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      const chars = headingRef.current?.querySelectorAll(".work-char");
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.025,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }

      const cards = gridRef.current?.querySelectorAll(".work-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headingText = "Selected Work";

  // Editorial grid: spans create rhythm. 12-col on lg.
  const spans = [
    "lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
    "lg:col-span-5 aspect-[4/3]",
    "lg:col-span-5 aspect-[4/3]",
    "lg:col-span-4 aspect-square",
    "lg:col-span-4 aspect-square",
    "lg:col-span-4 aspect-square",
    "lg:col-span-6 aspect-[3/2]",
    "lg:col-span-6 aspect-[3/2]",
  ];

  const featured = curatedItems.slice(0, 8);

  return (
    <section
      ref={sectionRef}
      className="relative py-[56px] md:py-[112px]"
      style={{ background: "#0a0a0a" }}
    >
      {/* Ambient gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(0,34,255,0.08), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(255,255,255,0.04), transparent 50%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-5"
            >
              <span
                className="inline-block h-[6px] w-[6px] rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 16px ${ACCENT}` }}
              />
              <span
                className="font-[family-name:var(--font-space-grotesk)] text-[11px] tracking-[0.28em] uppercase text-white/60"
              >
                Portfolio &mdash; 2024 / 2025
              </span>
            </div>
            <h2
              ref={headingRef}
              className="font-[family-name:var(--font-syne)] font-bold text-white text-[44px] leading-[0.95] md:text-[88px] tracking-[-0.03em]"
              style={{ fontStretch: "125%" }}
            >
              {headingText.split("").map((char, i) => (
                <span
                  key={i}
                  className="work-char inline-block opacity-0"
                  style={{ width: char === " " ? "0.28em" : undefined }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </h2>
          </div>

          <div className="md:max-w-[340px] md:text-right">
            <p className="font-[family-name:var(--font-space-grotesk)] text-[13px] leading-[1.6] text-white/55">
              A curated index of frames &mdash; wildlife, motion, portraiture.
              Captured across India, Bahrain, and the road in between.
            </p>
            <div
              className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-[11px] tracking-[0.2em] uppercase text-white/40"
            >
              <span className="h-px w-8 bg-white/30" />
              {featured.length.toString().padStart(2, "0")} frames
            </div>
          </div>
        </div>

        {/* Editorial grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-5"
        >
          {featured.map((item, i) => {
            const isHovered = hoverIdx === i;
            return (
              <article
                key={item.image}
                className={`work-card group relative overflow-hidden ${spans[i] ?? "lg:col-span-4 aspect-square"}`}
                style={{
                  borderRadius: 24,
                  background: "#141414",
                  border: "1px solid #222",
                  boxShadow: isHovered
                    ? "0 32px 64px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
                  transition: "box-shadow 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  opacity: 0,
                }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.text}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover"
                    style={{
                      transform: isHovered ? "scale(1.06)" : "scale(1)",
                      transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), filter 400ms",
                      filter: isHovered ? "saturate(1.05)" : "saturate(0.92)",
                    }}
                  />
                </div>

                {/* Gradient veil */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 100%)",
                  }}
                />

                {/* Index chip */}
                <div
                  className="absolute top-4 left-4 md:top-5 md:left-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="h-[5px] w-[5px] rounded-full"
                    style={{ background: ACCENT }}
                  />
                  <span className="font-[family-name:var(--font-space-grotesk)] text-[10px] tracking-[0.22em] uppercase text-white/85">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom meta */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <div
                    className="flex items-end justify-between gap-4"
                    style={{
                      transform: isHovered ? "translateY(0)" : "translateY(4px)",
                      transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div>
                      <h3
                        className="font-[family-name:var(--font-syne)] font-semibold text-white text-[22px] md:text-[28px] leading-[1.05] tracking-[-0.02em]"
                      >
                        {item.text}
                      </h3>
                      <div
                        className="mt-2 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-[10px] tracking-[0.24em] uppercase"
                        style={{
                          color: isHovered ? "#ffffff" : "rgba(255,255,255,0.55)",
                          transition: "color 300ms",
                        }}
                      >
                        <span
                          className="h-px transition-all duration-500"
                          style={{
                            width: isHovered ? 32 : 16,
                            background: isHovered ? ACCENT : "rgba(255,255,255,0.4)",
                          }}
                        />
                        View frame
                      </div>
                    </div>

                    {/* Arrow disc */}
                    <div
                      className="shrink-0 grid place-items-center rounded-full"
                      style={{
                        width: 44,
                        height: 44,
                        background: isHovered ? ACCENT : "rgba(255,255,255,0.06)",
                        border: `1px solid ${isHovered ? ACCENT : "rgba(255,255,255,0.14)"}`,
                        boxShadow: isHovered
                          ? `0 12px 32px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.3)`
                          : "inset 0 1px 0 rgba(255,255,255,0.08)",
                        transition: "all 400ms cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{
                          transform: isHovered ? "translate(2px,-2px)" : "translate(0,0)",
                          transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <path
                          d="M3 11L11 3M11 3H5M11 3V9"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Accent edge on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[24px]"
                  style={{
                    boxShadow: isHovered
                      ? `inset 0 0 0 1px ${ACCENT}55`
                      : "inset 0 0 0 1px transparent",
                    transition: "box-shadow 400ms",
                  }}
                />
              </article>
            );
          })}
        </div>

        {/* Footer row */}
        <div className="mt-12 md:mt-16 flex items-center justify-between gap-6">
          <div className="font-[family-name:var(--font-space-grotesk)] text-[11px] tracking-[0.28em] uppercase text-white/35">
            Index &mdash; complete archive
          </div>
          <a
            href="/work"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-[family-name:var(--font-space-grotesk)] text-[12px] tracking-[0.22em] uppercase text-white"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              transition: "all 300ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT;
              e.currentTarget.style.borderColor = ACCENT;
              e.currentTarget.style.boxShadow = `0 16px 32px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.08)";
            }}
          >
            View full archive
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
