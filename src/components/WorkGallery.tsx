"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
  { image: getAssetPath("/portfolio/sw/eagle.webp"),       title: "Eagle",      style: "Wildlife",   medium: "Telephoto",      year: "2023" },
  { image: getAssetPath("/portfolio/sw/moto-race.webp"),   title: "Moto Race",  style: "Motorsport", medium: "Track Side",      year: "2024" },
  { image: getAssetPath("/portfolio/sw/portrait.webp"),    title: "Portrait",   style: "Editorial",  medium: "Studio Light",    year: "2025" },
  { image: getAssetPath("/portfolio/sw/cinematic.webp"),   title: "Cinematic",  style: "Editorial",  medium: "Natural Light",   year: "2025" },
  { image: getAssetPath("/portfolio/sw/field-3617.webp"),  title: "Field 3617", style: "Wildlife",   medium: "Telephoto",      year: "2024" },
  { image: getAssetPath("/portfolio/sw/field-4068.webp"),  title: "Field 4068", style: "Wildlife",   medium: "Telephoto",      year: "2024" },
  { image: getAssetPath("/portfolio/sw/field-4086.webp"),  title: "Field 4086", style: "Wildlife",   medium: "Telephoto",      year: "2024" },
  { image: getAssetPath("/portfolio/sw/field-4175.webp"),  title: "Field 4175", style: "Wildlife",   medium: "Telephoto",      year: "2024" },
  { image: getAssetPath("/portfolio/sw/contrast.webp"),    title: "Contrast",   style: "Editorial",  medium: "Light & Shadow", year: "2025" },
  { image: getAssetPath("/portfolio/sw/vista-1.webp"),     title: "Vista I",    style: "Landscape",  medium: "Wide",           year: "2026" },
  { image: getAssetPath("/portfolio/sw/vista-2.webp"),     title: "Vista II",   style: "Landscape",  medium: "Wide",           year: "2026" },
  { image: getAssetPath("/portfolio/sw/object.webp"),      title: "Object",     style: "Product",    medium: "Detail",         year: "2026" },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef({ nx: 0, ny: 0 });
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile swipe refs
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const mobileMetaRef = useRef<HTMLDivElement>(null);
  const mobileImgRef = useRef<HTMLImageElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goToMobile = useCallback(
    (nextIdx: number, dir: 1 | -1) => {
      if (isAnimatingRef.current) return;
      const card = mobileCardRef.current;
      const meta = mobileMetaRef.current;
      const img = mobileImgRef.current;
      if (!card || !meta) return;

      isAnimatingRef.current = true;
      const exitX = dir * -56;

      gsap.killTweensOf([card, meta]);

      const tl = gsap.timeline({
        onComplete: () => { isAnimatingRef.current = false; },
      });

      tl.to(card, { x: exitX, opacity: 0, scale: 0.96, duration: 0.16, ease: "power2.in" }, 0)
        .to(meta, { x: exitX * 0.6, opacity: 0, duration: 0.14, ease: "power2.in" }, 0)
        .call(() => {
          setActive(nextIdx);
          if (img) img.src = FRAMES[nextIdx].image;
        })
        .set(card, { x: -exitX * 0.7, opacity: 0, scale: 0.96 })
        .set(meta, { x: -exitX * 0.4, opacity: 0 })
        .to(card, { x: 0, opacity: 1, scale: 1, duration: 0.24, ease: "power3.out" })
        .to(meta, { x: 0, opacity: 1, duration: 0.2, ease: "power3.out" }, "<+0.04");
    },
    []
  );

  const navigateMobile = useCallback(
    (dir: 1 | -1) => {
      goToMobile((active + dir + FRAMES.length) % FRAMES.length, dir);
    },
    [active, goToMobile]
  );

  // Auto-scroll thumbstrip to keep active thumb visible
  useEffect(() => {
    if (!isMobile || !thumbsRef.current) return;
    const strip = thumbsRef.current;
    const thumb = strip.children[active] as HTMLElement | undefined;
    if (!thumb) return;
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const offset = thumbRect.left - stripRect.left - stripRect.width / 2 + thumbRect.width / 2;
    strip.scrollBy({ left: offset, behavior: "smooth" });
  }, [active, isMobile]);

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

  // Touch swipe for mobile card
  useEffect(() => {
    if (!isMobile) return;
    const card = mobileCardRef.current;
    if (!card) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;
      if (!isSwiping.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
        isSwiping.current = true;
      }
      if (isSwiping.current) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      const isHoriz = Math.abs(dx) > Math.abs(dy);
      if (isHoriz && Math.abs(dx) > 44) {
        navigateMobile(dx < 0 ? 1 : -1);
      }
      isSwiping.current = false;
    };

    card.addEventListener("touchstart", onTouchStart, { passive: true });
    card.addEventListener("touchmove", onTouchMove, { passive: false });
    card.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      card.removeEventListener("touchstart", onTouchStart);
      card.removeEventListener("touchmove", onTouchMove);
      card.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile, navigateMobile]);

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

  const sharedHeading = (
    <div className="relative max-w-[1400px] mx-auto px-6 mb-8 md:mb-14 text-center">
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
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 md:py-28"
      style={{ background: "#050509", perspective: "2000px" }}
    >
      {ambient}

      {sharedHeading}

      {/* ── MOBILE LAYOUT ── */}
      {isMobile && (
        <div className="relative px-3">
          {/* Main swipeable card — outer div is GSAP target (no overflow clip so image never crops) */}
          <div
            ref={mobileCardRef}
            className="relative w-full"
            style={{
              boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
              borderRadius: 20,
            }}
          >
            {/* Inner wrapper clips overlays to rounded corners */}
            <div className="relative overflow-hidden" style={{ borderRadius: 20 }}>
              {/* Full image — block flow sets container height, no cropping */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={mobileImgRef}
                src={frame.image}
                alt={frame.title}
                className="sw-mob-img block w-full h-auto"
                style={{ maxHeight: "80vh" }}
              />

              {/* Dark gradient bottom */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 40%, transparent 65%)",
                }}
              />

              {/* Top row: category tag + counter */}
              <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3 pointer-events-none">
                <span
                  className="font-[family-name:var(--font-space-grotesk)] text-[9px] tracking-[0.3em] uppercase px-2.5 py-1"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    borderRadius: 999,
                    color: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {frame.style}
                </span>
                <span
                  className="font-[family-name:var(--font-space-grotesk)] text-[10px] tracking-[0.18em]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {String(active + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(FRAMES.length).padStart(2, "0")}
                </span>
              </div>

              {/* Crop marks */}
              <span className="sw-mob-crop sw-tl" aria-hidden />
              <span className="sw-mob-crop sw-tr" aria-hidden />
              <span className="sw-mob-crop sw-bl" aria-hidden />
              <span className="sw-mob-crop sw-br" aria-hidden />

              {/* Swipe zone */}
              <div className="absolute inset-0" aria-hidden />
            </div>
          </div>

          {/* Metadata row */}
          <div
            ref={mobileMetaRef}
            className="mt-3 flex items-end justify-between px-1"
          >
            <div>
              <p
                className="font-[family-name:var(--font-syne)] font-bold text-white leading-tight"
                style={{ fontSize: "clamp(18px, 5vw, 24px)", letterSpacing: "-0.02em" }}
              >
                {frame.title}
              </p>
              <p
                className="font-[family-name:var(--font-space-grotesk)] mt-0.5"
                style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}
              >
                {frame.medium}&nbsp;·&nbsp;{frame.year}
              </p>
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={() => navigateMobile(-1)}
                aria-label="Previous"
                className="sw-mob-nav"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigateMobile(1)}
                aria-label="Next"
                className="sw-mob-nav"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="mt-3 mx-1 h-[2px] rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${((active + 1) / FRAMES.length) * 100}%`,
                background: "linear-gradient(90deg, #0022ff, rgba(255,90,40,0.9))",
                transition: "width 380ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </div>

          {/* Filmstrip thumbnail row */}
          <div
            ref={thumbsRef}
            className="sw-mob-thumbstrip mt-3 flex items-center gap-2 overflow-x-auto px-1 pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {FRAMES.map((f, i) => {
              const isActive = i === active;
              return (
                <button
                  key={f.image}
                  onClick={() => {
                    if (i !== active) goToMobile(i, i > active ? 1 : -1);
                  }}
                  className="sw-mob-thumb relative shrink-0 overflow-hidden"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    border: isActive ? "2px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.12)",
                    opacity: isActive ? 1 : 0.55,
                    transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
                    boxShadow: isActive ? "0 0 0 3px rgba(0,34,255,0.35)" : "none",
                  }}
                >
                  <Image src={f.image} alt={f.title} fill sizes="52px" className="object-cover" />
                </button>
              );
            })}
          </div>

          {/* Swipe hint */}
          <p
            className="font-[family-name:var(--font-space-grotesk)] text-center mt-3"
            style={{ fontSize: 9, letterSpacing: "0.28em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}
          >
            ← swipe image to navigate →
          </p>

          {/* CTA */}
          <div className="mt-5 flex justify-center">
            <Link href="/portfolio" className="sw-cta group relative inline-flex items-center gap-3">
              <span className="sw-cta-line" aria-hidden />
              <span className="sw-cta-label font-[family-name:var(--font-space-grotesk)]">Enter the full archive</span>
              <span className="sw-cta-arrow" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9H15M15 9L9.5 3.5M15 9L9.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* ── DESKTOP LAYOUT ── */}
      {!isMobile && (
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
              className="sw-panel relative flex flex-col items-center gap-6 md:gap-10 p-5 md:p-10"
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

              {/* Vertical caption — left */}
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

              {/* Vertical caption — right */}
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
                    <span className="sw-crop sw-tl" aria-hidden />
                    <span className="sw-crop sw-tr" aria-hidden />
                    <span className="sw-crop sw-bl" aria-hidden />
                    <span className="sw-crop sw-br" aria-hidden />
                  </div>
                </div>

                {/* Thumbnail strip */}
                <div
                  className="mt-6 flex justify-center w-full max-w-full"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div
                    className="sw-thumbs flex items-center gap-2 p-2 max-w-full overflow-x-auto"
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
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="mt-8 flex justify-center"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <Link href="/portfolio" className="sw-cta group relative inline-flex items-center gap-4">
                    <span className="sw-cta-line" aria-hidden />
                    <span className="sw-cta-label font-[family-name:var(--font-space-grotesk)]">
                      Enter the full archive
                    </span>
                    <span className="sw-cta-arrow" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9H15M15 9L9.5 3.5M15 9L9.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes swFade {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (min-width: 768px) {
          :global(.sw-tilt) { transform: rotateY(-6deg) rotateX(1deg); }
        }
        @media (min-width: 1024px) {
          :global(.sw-tilt) { transform: rotateY(-12deg) rotateX(2deg); }
        }
        @keyframes kenburns {
          0%   { transform: scale(1.06) translate(-1.5%, 1%); }
          100% { transform: scale(1.14) translate(1.5%, -1%); }
        }
        @keyframes kenburnsMobile {
          0%   { transform: scale(1.04) translate(-0.8%, 0.5%); }
          100% { transform: scale(1.11) translate(0.8%, -0.5%); }
        }
        :global(.sw-kenburns) { will-change: transform; transform-origin: center center; }
        :global(.sw-imgwrap) { max-height: 60vh; }
        :global(.sw-imgwrap img) { max-height: 60vh; }
        @media (min-width: 1024px) {
          :global(.sw-imgwrap), :global(.sw-imgwrap img) { max-height: 80vh; }
        }
        :global(.sw-mob-img) { will-change: transform; transform-origin: center center; }
        :global(.sw-thumbs)::-webkit-scrollbar { display: none; }
        :global(.sw-mob-thumbstrip)::-webkit-scrollbar { display: none; }
        :global(.sw-thumb) { width: 52px; height: 52px; }
        :global(.sw-next) { width: 60px; height: 52px; }
        :global(.sw-crop) {
          position: absolute;
          width: 18px; height: 18px;
          border: 1.5px solid rgba(255,255,255,0.92);
          pointer-events: none;
          mix-blend-mode: difference;
        }
        :global(.sw-mob-crop) {
          position: absolute;
          width: 14px; height: 14px;
          border: 1.5px solid rgba(255,255,255,0.85);
          pointer-events: none;
          mix-blend-mode: difference;
          z-index: 10;
        }
        :global(.sw-mob-nav) {
          display: grid; place-items: center;
          width: 38px; height: 38px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.8);
          transition: all 200ms;
          -webkit-tap-highlight-color: transparent;
        }
        :global(.sw-mob-nav:active) {
          background: rgba(255,255,255,0.14);
          transform: scale(0.92);
        }
        :global(.sw-cta) {
          position: relative;
          padding: 12px 20px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 12px 28px rgba(0,0,0,0.4);
          color: rgba(255,255,255,0.95);
          text-decoration: none;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          transition: transform 360ms cubic-bezier(0.22,1,0.36,1), border-color 360ms, background 360ms, box-shadow 360ms;
          -webkit-tap-highlight-color: transparent;
        }
        :global(.sw-cta:hover) {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.32);
          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 18px 38px rgba(0,0,0,0.5);
        }
        :global(.sw-cta:active) { transform: scale(0.97); }
        :global(.sw-cta-line) {
          width: 22px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6));
          display: inline-block;
        }
        :global(.sw-cta-label) {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
        }
        :global(.sw-cta-arrow) {
          display: inline-grid; place-items: center;
          width: 26px; height: 26px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          color: white;
          transition: transform 360ms cubic-bezier(0.22,1,0.36,1), background 360ms;
        }
        :global(.sw-cta:hover .sw-cta-arrow) {
          transform: translateX(4px);
          background: rgba(255,90,40,0.95);
          border-color: rgba(255,90,40,0.95);
          color: #0b0b0d;
        }
        :global(.sw-tl) { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        :global(.sw-tr) { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        :global(.sw-bl) { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        :global(.sw-br) { bottom: 0; right: 0; border-left: 0; border-top: 0; }
        @media (prefers-reduced-motion: reduce) {
          :global(.sw-kenburns), :global(.sw-mob-img) { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
