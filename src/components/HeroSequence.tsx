"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const nameText = "ROHIT KUMAR";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Beat 1: Black screen pause
      tl.to({}, { duration: 0.8 });

      // Beat 2: Name reveal (letter by letter)
      const chars = nameContainerRef.current?.querySelectorAll(".hero-char");
      if (chars) {
        tl.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.06,
          stagger: 0.05,
          ease: "power2.out",
        });
      }

      // Tagline fade in
      tl.to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

      // Beat 3: Scroll-triggered photo reveal
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Name and tagline float up and fade
      scrollTl.to([nameContainerRef.current, taglineRef.current], {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Image reveal: horizontal slit expanding
      scrollTl.fromTo(
        imageRef.current,
        { clipPath: "inset(48% 10% 48% 10%)", scale: 1.2, opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.15"
      );

      // Beat 4: Image zooms forward (transition to gallery)
      scrollTl.to(imageRef.current, {
        scale: 2.5,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Overlay fades out
      scrollTl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 z-10 bg-black" />

      {/* Signature photo */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-5 opacity-0"
        style={{ clipPath: "inset(48% 10% 48% 10%)" }}
      >
        <img
          src={getAssetPath("/portfolio/main.jpg")}
          alt="Signature photograph by Rohit Kumar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <h1
          ref={nameContainerRef}
          className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[-0.02em] text-white flex"
        >
          {nameText.split("").map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block opacity-0 translate-y-5"
              style={{ display: char === " " ? "inline-block" : undefined, width: char === " " ? "0.3em" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p
          ref={taglineRef}
          className="font-[family-name:var(--font-syne)] font-medium text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] mt-4 sm:mt-6 opacity-0 translate-y-[10px]"
          style={{ color: "var(--text-secondary)" }}
        >
          <span style={{ color: "#255f38" }}>WILDLIFE</span>
          {" \u00B7 "}
          <span style={{ color: "#ce2626" }}>AUTOMOTIVE</span>
          {" \u00B7 "}
          PORTRAIT
        </p>
      </div>
    </section>
  );
}
