"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

type Frame = {
  image: string;
  title: string;
  style: string;
  medium: string;
  year: string;
};

const FRAMES: Frame[] = [
  { image: getAssetPath("/portfolio/EAGLE-1.03.23-PM.jpg"), title: "Eagle", style: "Wildlife", medium: "Telephoto", year: "2023" },
  { image: getAssetPath("/portfolio/MOTO-RACE-3-_2_.jpg"), title: "Moto Race", style: "Motorsport", medium: "Track Side", year: "2024" },
  { image: getAssetPath("/portfolio/IMG_3308-EDIT.jpg"), title: "Portrait", style: "Editorial", medium: "Studio Light", year: "2025" },
  { image: getAssetPath("/portfolio/IMG_5799%20edit%201.jpg"), title: "Cinematic", style: "Editorial", medium: "Natural Light", year: "2025" },
  { image: getAssetPath("/portfolio/IMG_3617%20edit.jpg"), title: "Field 3617", style: "Wildlife", medium: "Telephoto", year: "2024" },
  { image: getAssetPath("/portfolio/IMG_4068%20edit.jpg"), title: "Field 4068", style: "Wildlife", medium: "Telephoto", year: "2024" },
  { image: getAssetPath("/portfolio/IMG_4086%20edit1.jpg"), title: "Field 4086", style: "Wildlife", medium: "Telephoto", year: "2024" },
  { image: getAssetPath("/portfolio/IMG_4175%20EDIT%201.jpg"), title: "Field 4175", style: "Wildlife", medium: "Telephoto", year: "2024" },
  { image: getAssetPath("/portfolio/IMG_6502%20EDIT.jpg%20(1).jpeg"), title: "Contrast", style: "Editorial", medium: "Light & Shadow", year: "2025" },
  { image: getAssetPath("/portfolio/WhatsApp%20Image%202026-04-27%20at%2011.54.11.jpeg"), title: "Vista I", style: "Landscape", medium: "Wide", year: "2026" },
  { image: getAssetPath("/portfolio/WhatsApp%20Image%202026-04-27%20at%2011.54.13.jpeg"), title: "Vista II", style: "Landscape", medium: "Wide", year: "2026" },
  { image: getAssetPath("/portfolio/WhatsApp%20Image%202026-04-27%20at%2011.54.17.jpeg"), title: "Object", style: "Product", medium: "Detail", year: "2026" },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef({ nx: 0, ny: 0 });
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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(panelRef.current, { rotateY: 0, rotateX: 0, z: 0 });
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          const wrap = panelWrapRef.current;
          const panel = panelRef.current;
          const inner = innerRef.current;
          if (!wrap || !panel || !inner) return;

          const rotY = gsap.quickTo(panel, "rotationY", {
            duration: 0.6,
            ease: "power3.out",
          });
          const rotX = gsap.quickTo(panel, "rotationX", {
            duration: 0.6,
            ease: "power3.out",
          });
          const tz = gsap.quickTo(panel, "z", {
            duration: 0.6,
            ease: "power3.out",
          });

          let settleTween: gsap.core.Tween | null = null;

          const onMove = (e: MouseEvent) => {
            const rect = wrap.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;

            if (
              Math.abs(nx - lastRef.current.nx) < 0.005 &&
              Math.abs(ny - lastRef.current.ny) < 0.005
            ) {
              return;
            }
            lastRef.current = { nx, ny };

            const edgeBoost = Math.pow(
              Math.max(Math.abs(nx), Math.abs(ny)) * 2,
              1.6
            );
            const mult = 0.6 + edgeBoost * 0.8;

            const dRotY = nx * 14 * mult;
            const dRotX = -ny * 10 * mult;
            const dZRaw = (1 - Math.hypot(nx, ny) * 2) * 18;
            const dZ = Math.max(-10, Math.min(20, dZRaw));

            rotY(-12 + dRotY);
            rotX(2 + dRotX);
            tz(dZ);

            inner.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
            inner.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
            inner.style.setProperty(
              "--shadow-x",
              `${nx * -20}px`
            );
            inner.style.setProperty(
              "--shadow-y",
              `${30 + ny * 10}px`
            );
          };

          const onEnter = () => {
            if (settleTween) settleTween.kill();
          };

          const onLeave = () => {
            lastRef.current = { nx: 0, ny: 0 };
            settleTween = gsap.to(panel, {
              rotationY: -12,
              rotationX: 2,
              z: 0,
              duration: 1.2,
              ease: "elastic.out(1, 0.6)",
            });
            inner.style.setProperty("--mx", `50%`);
            inner.style.setProperty("--my", `50%`);
            inner.style.setProperty("--shadow-x", `0px`);
            inner.style.setProperty("--shadow-y", `32px`);
          };

          wrap.addEventListener("mousemove", onMove);
          wrap.addEventListener("mouseenter", onEnter);
          wrap.addEventListener("mouseleave", onLeave);

          return () => {
            wrap.removeEventListener("mousemove", onMove);
            wrap.removeEventListener("mouseenter", onEnter);
            wrap.removeEventListener("mouseleave", onLeave);
            if (settleTween) settleTween.kill();
          };
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
          className="font-[family-name:var(--font-syne)] font-bold text-white tracking-[-0.02em] leading-[1] flex flex-wrap justify-center"
          style={{
            fontSize: "clamp(28px, 7vw, 68px)",
            fontStretch: "115%",
            letterSpacing: "-0.02em",
            rowGap: "0.1em",
          }}
        >
          {headingText.split(" ").map((word, wi, arr) => (
            <span key={wi} className="inline-flex whitespace-nowrap">
              {word.split("").map((c, i) => (
                <span key={i} className="sw-char inline-block opacity-0">
                  {c}
                </span>
              ))}
              {wi < arr.length - 1 && (
                <span className="sw-char inline-block opacity-0" style={{ width: "0.28em" }}>
                  &nbsp;
                </span>
              )}
            </span>
          ))}
        </h2>
      </div>

      {/* Tilted gallery panel */}
      <div
        ref={panelWrapRef}
        className="relative max-w-[1400px] mx-auto px-4 md:px-8"
        style={{ perspective: "2000px" }}
      >
        <div
          ref={panelRef}
          className="sw-tilt relative mx-auto"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
        >
          <div
            ref={innerRef}
            className="sw-panel relative flex flex-col items-center gap-4 sm:gap-6 md:gap-10 p-3 sm:p-5 md:p-10"
            style={{
              borderRadius: 32,
              background:
                "linear-gradient(145deg, rgba(30,25,50,0.55) 0%, rgba(15,12,28,0.65) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "var(--shadow-x, 0px) var(--shadow-y, 32px) 64px -16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              transformStyle: "preserve-3d",
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

            {/* Cursor-tracked bezel glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 32,
                background:
                  "radial-gradient(circle 240px at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 60%)",
                mixBlendMode: "screen",
                transition: "background 120ms linear",
              }}
            />

            {/* Vertical caption — left edge of showcase */}
            <div
              aria-hidden
              className="hidden lg:block absolute pointer-events-none select-none font-[family-name:var(--font-space-grotesk)]"
              style={{
                left: 22,
                top: "50%",
                transform: "translateY(-50%) rotate(-90deg)",
                transformOrigin: "left center",
                fontSize: 10,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                whiteSpace: "nowrap",
              }}
            >
              RN Studio &nbsp;·&nbsp; Selected Work &nbsp;·&nbsp; MMXXVI
            </div>

            {/* Vertical caption — right edge mirror */}
            <div
              aria-hidden
              className="hidden lg:block absolute pointer-events-none select-none font-[family-name:var(--font-space-grotesk)]"
              style={{
                right: 22,
                top: "50%",
                transform: "translateY(-50%) rotate(90deg)",
                transformOrigin: "right center",
                fontSize: 10,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                whiteSpace: "nowrap",
              }}
            >
              {frame.style} &nbsp;·&nbsp; {frame.medium} &nbsp;·&nbsp; {frame.year}
            </div>

            {/* Preview */}
            <div
              className="relative flex flex-col items-center w-full max-w-[1100px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Big preview image */}
              <div
                className="relative w-full flex items-center justify-center"
                style={{ transform: "translateZ(40px)" }}
              >
                <div
                  className="sw-imgwrap relative inline-block overflow-hidden"
                  style={{
                    borderRadius: 4,
                    boxShadow: "0 16px 32px rgba(0,0,0,0.5)",
                    maxWidth: "100%",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={frame.image}
                    src={frame.image}
                    alt={frame.title}
                    className="sw-kenburns block w-auto h-auto max-w-full"
                    style={{ animation: "swFade 600ms cubic-bezier(0.22,1,0.36,1), kenburns 18s ease-in-out infinite alternate" }}
                  />

                  {/* Crop marks — exactly on image corners */}
                  <span className="sw-crop sw-tl" aria-hidden />
                  <span className="sw-crop sw-tr" aria-hidden />
                  <span className="sw-crop sw-bl" aria-hidden />
                  <span className="sw-crop sw-br" aria-hidden />
                </div>
              </div>

              {/* Thumbnail pill strip */}
              <div
                className="mt-4 sm:mt-6 flex justify-center w-full max-w-full"
                style={{ transform: "translateZ(60px)" }}
              >
                <div
                  className="sw-thumbs flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 max-w-full overflow-x-auto"
                  style={{
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    scrollbarWidth: "none",
                  }}
                >
                  {FRAMES.map((f, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={f.image}
                        onClick={() => setActive(i)}
                        className="sw-thumb relative shrink-0 overflow-hidden"
                        style={{
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
                    className="sw-next grid place-items-center ml-1 shrink-0"
                    style={{
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
        @media (min-width: 768px) {
          :global(.sw-tilt) {
            transform: rotateY(-6deg) rotateX(1deg);
          }
        }
        @media (min-width: 1024px) {
          :global(.sw-tilt) {
            transform: rotateY(-12deg) rotateX(2deg);
          }
        }
        @keyframes kenburns {
          0%   { transform: scale(1.06) translate(-1.5%, 1%); }
          100% { transform: scale(1.14) translate(1.5%, -1%); }
        }
        @keyframes kenburnsMobile {
          0%   { transform: scale(1.04); }
          100% { transform: scale(1.10); }
        }
        :global(.sw-kenburns) { will-change: transform; transform-origin: center center; }
        :global(.sw-imgwrap) { max-height: 60vh; }
        :global(.sw-imgwrap img) { max-height: 60vh; }
        @media (min-width: 640px) {
          :global(.sw-imgwrap), :global(.sw-imgwrap img) { max-height: 70vh; }
        }
        @media (min-width: 1024px) {
          :global(.sw-imgwrap), :global(.sw-imgwrap img) { max-height: 80vh; }
        }
        :global(.sw-thumbs)::-webkit-scrollbar { display: none; }
        :global(.sw-thumb) { width: 40px; height: 40px; }
        :global(.sw-next) { width: 48px; height: 40px; }
        @media (min-width: 640px) {
          :global(.sw-thumb) { width: 52px; height: 52px; }
          :global(.sw-next) { width: 60px; height: 52px; }
        }
        :global(.sw-crop) {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 1.5px solid rgba(255,255,255,0.92);
          pointer-events: none;
          mix-blend-mode: difference;
        }
        @media (min-width: 640px) {
          :global(.sw-crop) { width: 18px; height: 18px; }
        }
        @media (max-width: 639px) {
          :global(.sw-kenburns) {
            animation: swFade 600ms cubic-bezier(0.22,1,0.36,1), kenburnsMobile 22s ease-in-out infinite alternate !important;
          }
        }
        :global(.sw-tl) { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        :global(.sw-tr) { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        :global(.sw-bl) { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        :global(.sw-br) { bottom: 0; right: 0; border-left: 0; border-top: 0; }
        @media (prefers-reduced-motion: reduce) {
          :global(.sw-kenburns) { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
