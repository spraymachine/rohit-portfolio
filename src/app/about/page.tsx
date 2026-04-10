"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "PROJECTS" },
  { value: 8, suffix: "+", label: "YEARS" },
  { value: 50, suffix: "+", label: "CLIENTS" },
];

const equipment = [
  {
    title: "Camera Bodies",
    items: "Sony A7R V, Sony A1, Canon R5",
  },
  {
    title: "Lenses",
    items: "70-200mm f/2.8, 24-70mm f/2.8, 100-400mm f/4.5-5.6",
  },
  {
    title: "Lighting",
    items: "Profoto B10, Godox AD600 Pro, LED Panels",
  },
  {
    title: "Post-Processing",
    items: "Adobe Lightroom, Capture One, Photoshop",
  },
];

export default function AboutPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const equipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      const chars = headingRef.current?.querySelectorAll(".about-char");
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

      // Portrait parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Bio paragraphs staggered reveal
      const paragraphs = bioRef.current?.querySelectorAll(".bio-p");
      if (paragraphs) {
        paragraphs.forEach((p, i) => {
          gsap.fromTo(
            p,
            { opacity: 0, y: 30 },
            {
              opacity: 0.8,
              y: 0,
              duration: 0.6,
              delay: i * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: p,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Stats counter animation
      const statEls = statsRef.current?.querySelectorAll(".stat-value");
      if (statEls) {
        statEls.forEach((el) => {
          const target = parseInt(el.getAttribute("data-value") || "0");
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              el.textContent =
                Math.round(obj.val) +
                (el.getAttribute("data-suffix") || "");
            },
          });
        });
      }

      // Equipment cards
      const cards = equipRef.current?.querySelectorAll(".equip-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: i * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: equipRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const headingText = "THE STORY";

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-black pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Hero section - split layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-24">
            {/* Portrait */}
            <div ref={imageRef} className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&q=80"
                  alt="Rohit Kumar - Photographer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative gradient border */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full rounded-lg -z-10"
                style={{
                  border: "1px solid transparent",
                  background: "linear-gradient(135deg, rgba(37,95,56,0.3), rgba(206,38,38,0.3)) border-box",
                }}
              />
            </div>

            {/* Bio */}
            <div className="pt-4 md:pt-12">
              <h1
                ref={headingRef}
                className="font-[family-name:var(--font-syne)] font-extrabold text-4xl md:text-5xl tracking-[-0.02em] mb-2 flex"
              >
                {headingText.split("").map((char, i) => (
                  <span
                    key={i}
                    className="about-char inline-block opacity-0"
                    style={{
                      width: char === " " ? "0.3em" : undefined,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
              <div
                className="h-[3px] w-[80px] mb-8 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #255f38, #ce2626)",
                }}
              />

              <div ref={bioRef} className="space-y-5">
                <p className="bio-p font-[family-name:var(--font-space-grotesk)] font-light text-base leading-relaxed opacity-0">
                  I&apos;m Rohit Kumar, a photographer driven by the intersection of
                  speed and stillness. My lens captures the raw energy of
                  automotive engineering and the untamed beauty of wildlife —
                  two worlds that share a common thread of power, precision, and
                  fleeting moments.
                </p>
                <p className="bio-p font-[family-name:var(--font-space-grotesk)] font-light text-base leading-relaxed opacity-0">
                  With over eight years behind the camera, I&apos;ve developed a
                  cinematic approach to photography. Every frame is composed
                  with intention — whether I&apos;m tracking a cheetah across the
                  Serengeti or capturing the curves of a supercar under studio
                  lights.
                </p>
                <p className="bio-p font-[family-name:var(--font-space-grotesk)] font-light text-base leading-relaxed opacity-0">
                  My work spans automotive editorials, wildlife conservation
                  projects, portraits, and events. I believe the best
                  photographs don&apos;t just document — they make you feel
                  something.
                </p>
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="flex gap-10 mt-10 pt-8 border-t border-white/10"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="stat-value font-[family-name:var(--font-syne)] font-extrabold text-3xl gradient-text"
                      data-value={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </div>
                    <div className="font-[family-name:var(--font-space-grotesk)] text-[10px] tracking-[0.15em] text-[#5a5a5a] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment / Process section */}
          <div>
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-2xl md:text-3xl tracking-[-0.02em] mb-8">
              EQUIPMENT & PROCESS
            </h2>

            <div
              ref={equipRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {equipment.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, borderColor: "rgba(37,95,56,0.4)" }}
                  className="equip-card bg-[#0a0a0a] border border-white/5 rounded-lg p-6 opacity-0 transition-colors"
                >
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-sm tracking-[0.1em] mb-3 gradient-text">
                    {item.title}
                  </h3>
                  <p className="font-[family-name:var(--font-space-grotesk)] text-sm text-[#a0a0a0] leading-relaxed">
                    {item.items}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#5a5a5a]">
            &copy; {new Date().getFullYear()} Rohit Kumar Photography. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#5a5a5a]">
            Designed & Developed with precision
          </p>
        </div>
      </footer>
    </>
  );
}
