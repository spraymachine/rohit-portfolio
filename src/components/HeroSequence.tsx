"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLHeadingElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const contextRef    = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const profileRef    = useRef<HTMLDivElement>(null);

  const nameText = "ROHIT NARAYAN";

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── TIME-BASED: name + tagline entrance (fast, on load) ─────────────
      const entryTl = gsap.timeline({ delay: 0.35 });
      const chars = nameContainerRef.current?.querySelectorAll(".hero-char");
      if (chars) {
        entryTl.to(chars, {
          opacity: 1, y: 0,
          duration: 0.055, stagger: 0.046, ease: "power2.out",
        });
      }
      entryTl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.2");
      entryTl.fromTo(profileRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.0, ease: "power3.out" },
        "-=0.5"
      );

      // ── SCROLL-DRIVEN: everything else ──────────────────────────────────
      // Section is 200svh. Sticky inner div = 100svh stays locked while
      // the user burns through the extra 100svh of scroll travel.
      // ScrollTrigger spans that 100svh → scrub maps it 0→1.
      // No pin:true → works perfectly on iOS Safari.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",   // = 100svh of scroll travel (200svh − 100svh)
          scrub: 1.6,
        },
      });

      // 0 – 0.35 → overlay fades, image rises in
      scrollTl
        .to(overlayRef.current,
          { opacity: 0, duration: 0.35, ease: "none" }, 0)
        .fromTo(imageRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1,  duration: 0.35, ease: "none" }, 0.08);

      // 0.28 – 0.52 → name + tagline + profile drift upward and out
      scrollTl.to(
        [nameContainerRef.current, taglineRef.current, profileRef.current],
        { y: -88, opacity: 0, duration: 0.26, ease: "none" }, 0.28);

      // 0.46 – 0.68 → "HIGHLIGHT FRAME" caption slides up
      scrollTl.fromTo(contextRef.current,
        { y: 24, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.22, ease: "none" }, 0.46);

      // 0.72 – 1.00 → image + caption exit as we leave the section
      scrollTl
        .to(contextRef.current,
          { y: -32, opacity: 0, duration: 0.22, ease: "none" }, 0.72)
        .to(imageRef.current,
          { y: -64, scale: 1.06, opacity: 0, duration: 0.26, ease: "none" }, 0.74);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    /* 200svh outer section — extra height = scroll travel for the animation */
    <section ref={sectionRef} style={{ height: "200svh" }}>
      {/* CSS sticky = visually "pinned" without GSAP pin:true */}
      <div
        ref={stickyRef}
        className="relative bg-black overflow-hidden"
        style={{ position: "sticky", top: 0, height: "100svh" }}
      >
        {/* Black overlay */}
        <div ref={overlayRef} className="absolute inset-0 z-10 bg-black" />

        {/* Signature photo */}
        <div ref={imageRef} className="absolute inset-0 z-[5] opacity-0">
          <img
            src={getAssetPath("/portfolio/sw/main.webp")}
            alt="Signature photograph by Rohit Narayan"
            className="w-full h-full object-contain sm:object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          {/* Vignette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 38%, rgba(0,0,0,0.68) 100%)",
            }}
          />
        </div>

        {/* HIGHLIGHT FRAME caption */}
        <div
          ref={contextRef}
          className="absolute left-5 right-5 bottom-8 sm:left-8 sm:right-auto sm:max-w-[560px] z-[15] opacity-0"
        >
          <p className="font-[family-name:var(--font-space-grotesk)] text-[10px] sm:text-xs tracking-[0.22em] text-[#d6d6d6] mb-2">
            HIGHLIGHT FRAME
          </p>
          <p className="font-[family-name:var(--font-space-grotesk)] font-medium text-sm sm:text-base text-white/95 leading-relaxed">
            A low-light chase sequence captured in a split second, where motion
            blur and hard contrast turn speed into story.
          </p>
        </div>

        {/* Hero split: name left col + portrait right col */}
        <div className="absolute inset-0 z-20 flex flex-col md:flex-row">

          {/* Name + tagline — fills left on desktop, bottom on mobile */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 md:pl-[8vw] md:pr-6 lg:pl-[10vw]">
            <h1
              ref={nameContainerRef}
              aria-label={nameText}
              className="hero-name font-[family-name:var(--font-syne)] font-extrabold text-[clamp(1.9rem,7vw,4.8rem)] tracking-[-0.02em] text-white flex flex-wrap justify-center md:justify-start md:flex-nowrap md:whitespace-nowrap"
            >
              {nameText.split("").map((char, i) =>
                char === " " ? (
                  <span
                    key={i}
                    className="hero-char basis-full h-0 w-full opacity-0 translate-y-5 md:basis-auto md:h-auto md:w-[0.3em]"
                  />
                ) : (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="hero-char hero-char-art inline-block leading-[0.88] opacity-0 translate-y-5"
                  >
                    {char}
                  </span>
                )
              )}
            </h1>
            <p
              ref={taglineRef}
              className="font-[family-name:var(--font-syne)] font-medium text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] mt-4 sm:mt-6 opacity-0 translate-y-[10px] text-center md:text-left"
              style={{ color: "var(--text-secondary)" }}
            >
              <span style={{ color: "#255f38" }}>PHOTOGRAPHER</span>
              {" · "}
              <span style={{ color: "#ce2626" }}>VISUAL STORYTELLER</span>
            </p>
          </div>

          {/* Portrait — top strip on mobile, right column on desktop */}
          <div
            ref={profileRef}
            className="order-first md:order-last opacity-0 relative overflow-hidden h-[42vh] w-full md:h-auto md:w-[36%] lg:w-[32%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAssetPath("/portfolio/profile.jpeg")}
              alt="Rohit Narayan"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 15%" }}
            />

            {/* Desktop: fade left edge into black */}
            <div
              aria-hidden
              className="hidden md:block absolute inset-y-0 left-0 w-2/3 pointer-events-none"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)" }}
            />
            {/* Mobile: fade bottom edge into black */}
            <div
              aria-hidden
              className="md:hidden absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.95) 100%)" }}
            />

            {/* Crop marks */}
            <span className="hp-crop hp-tl" aria-hidden />
            <span className="hp-crop hp-tr" aria-hidden />
            <span className="hp-crop hp-bl" aria-hidden />
            <span className="hp-crop hp-br" aria-hidden />

            {/* Label — bottom left */}
            <p
              className="absolute bottom-3 left-4 font-[family-name:var(--font-space-grotesk)] text-[9px] tracking-[0.32em] uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              R. Narayan
            </p>
          </div>

        </div>
      </div>
      <style jsx>{`
        :global(.hp-crop) {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 1.5px solid rgba(255,255,255,0.75);
          pointer-events: none;
          mix-blend-mode: difference;
        }
        :global(.hp-tl) { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        :global(.hp-tr) { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        :global(.hp-bl) { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        :global(.hp-br) { bottom: 0; right: 0; border-left: 0; border-top: 0; }
      `}</style>
    </section>
  );
}
