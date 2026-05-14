"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "./CircularGallery";
import { curatedItems } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading split-text reveal
      const chars = headingRef.current?.querySelectorAll(".work-char");
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Gradient divider scale in
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "SELECTED WORK";

  return (
    <section ref={sectionRef} className="relative bg-black py-12 md:py-20">
      {/* Section heading */}
      <div className="text-center mb-8 md:mb-12">
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-5xl tracking-[-0.02em] flex justify-center"
        >
          {headingText.split("").map((char, i) => (
            <span
              key={i}
              className="work-char inline-block opacity-0"
              style={{ width: char === " " ? "0.3em" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <div
          ref={dividerRef}
          className="h-[3px] w-[120px] mx-auto mt-4 rounded-full origin-center"
          style={{ background: "linear-gradient(90deg, #255f38, #ce2626)" }}
        />
      </div>

      {/* Circular Gallery */}
      <div className="relative h-[350px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <CircularGallery
          items={curatedItems}
          bend={6}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={0.9}
          scrollEase={0.05}
        />
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-6">
        <p className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.2em] text-[#5a5a5a]">
          DRAG OR SCROLL TO EXPLORE
        </p>
      </div>
    </section>
  );
}
