"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const disciplines = [
  {
    num: "01",
    name: "Photography",
    numColor: "rgba(37,95,56,0.42)",
    dotColor: "rgba(37,95,56,0.75)",
    ruleGradient: "linear-gradient(90deg, rgba(37,95,56,0.7), transparent)",
    skills: [
      "Photography & Photo Editing",
      "Color Grading & Retouching",
      "Adobe Lightroom",
    ],
  },
  {
    num: "02",
    name: "Graphic Design",
    numColor: "rgba(110,22,22,0.50)",
    dotColor: "rgba(110,22,22,0.70)",
    ruleGradient: "linear-gradient(90deg, rgba(110,22,22,0.7), transparent)",
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Branding & Visual Identity",
      "Social Media Creative Design",
      "Print & Digital Design",
    ],
  },
  {
    num: "03",
    name: "Web & AI",
    numColor: "rgba(206,38,38,0.38)",
    dotColor: "rgba(206,38,38,0.65)",
    ruleGradient: "linear-gradient(90deg, rgba(206,38,38,0.7), transparent)",
    skills: [
      "WordPress Development",
      "AI Prompt Engineering",
      "AI-Assisted Workflows",
    ],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ab-title-line",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".ab-para",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".ab-skill-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".ab-quote-line",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#050509" }}
    >
      <div
        className="w-full h-[1px]"
        style={{ background: "rgba(255,255,255,0.10)" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-36">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16 md:mb-20">
          <span
            className="h-[5px] w-[5px] rounded-full shrink-0"
            style={{ background: "linear-gradient(135deg, #255f38, #ce2626)", boxShadow: "0 0 10px rgba(37,95,56,0.6)" }}
          />
          <span
            className="font-[family-name:var(--font-space-grotesk)] text-[11px] tracking-[0.36em] uppercase"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            The Artist &mdash; About
          </span>
        </div>

        {/* Two-col intro */}
        <div
          ref={introRef}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-12 md:gap-16 lg:gap-28 items-start mb-20 md:mb-28"
        >
          {/* Left: stacked title */}
          <div>
            <p
              className="ab-title-line font-[family-name:var(--font-space-grotesk)] text-[10px] tracking-[0.38em] uppercase mb-5 opacity-0"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Photographer&nbsp;·&nbsp;Graphic Designer
            </p>
            <div
              className="ab-title-line font-[family-name:var(--font-syne)] font-extrabold text-white leading-[1.0] opacity-0"
              style={{
                fontSize: "clamp(44px, 7.5vw, 94px)",
                letterSpacing: "-0.025em",
              }}
            >
              Driven by
            </div>
            <div
              className="ab-title-line font-[family-name:var(--font-syne)] font-extrabold leading-[1.0] opacity-0"
              style={{
                fontSize: "clamp(44px, 7.5vw, 94px)",
                letterSpacing: "-0.025em",
                color: "rgba(206,38,38,0.78)",
              }}
            >
              passion,
            </div>
            <div
              className="ab-title-line font-[family-name:var(--font-syne)] font-extrabold text-white leading-[1.0] mt-1 opacity-0"
              style={{
                fontSize: "clamp(44px, 7.5vw, 94px)",
                letterSpacing: "-0.025em",
              }}
            >
              guided by
            </div>
            <div
              className="ab-title-line font-[family-name:var(--font-syne)] font-extrabold leading-[1.0] opacity-0"
              style={{
                fontSize: "clamp(44px, 7.5vw, 94px)",
                letterSpacing: "-0.025em",
                color: "rgba(37,95,56,0.85)",
              }}
            >
              craft.
            </div>
          </div>

          {/* Right: bio paragraphs */}
          <div ref={bioRef} className="pt-0 md:pt-20 space-y-5 max-w-[560px]">
            <p
              className="ab-para font-[family-name:var(--font-space-grotesk)] leading-[1.8] opacity-0"
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Photography isn&apos;t just what I do—it&apos;s the dream I&apos;ve pursued
              since childhood. Driven by a passion for storytelling and a love
              for authentic moments, I strive to create photographs that are
              timeless, meaningful, and emotionally compelling.
            </p>
            <p
              className="ab-para font-[family-name:var(--font-space-grotesk)] leading-[1.8] opacity-0"
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              As a graphic designer, I also help transform ideas into powerful
              visual experiences through thoughtful and creative design.
            </p>
            <p
              className="ab-para font-[family-name:var(--font-space-grotesk)] leading-[1.8] opacity-0"
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              My work is built on creativity, attention to detail, and a
              commitment to delivering visuals that leave a lasting impact.
            </p>
            <p
              className="ab-para font-[family-name:var(--font-space-grotesk)] text-[13px] leading-[1.65] pt-1 opacity-0"
              style={{ color: "#255f38" }}
            >
              My goal: to create visuals that inspire, communicate, and leave
              a lasting impression—through photography, design, or digital
              experiences.
            </p>
          </div>
        </div>

        {/* Separator */}
        <div
          className="h-[1px] mb-20 md:mb-24"
          style={{ background: "linear-gradient(90deg, rgba(37,95,56,0.55) 0%, rgba(24,35,15,0.35) 45%, rgba(206,38,38,0.50) 100%)" }}
        />

        {/* Skills */}
        <div ref={skillsRef}>
          <p
            className="font-[family-name:var(--font-space-grotesk)] text-[11px] tracking-[0.36em] uppercase mb-10 md:mb-12"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            Skills &amp; Expertise
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12 lg:gap-20">
            {disciplines.map((d) => (
              <div key={d.num} className="ab-skill-col opacity-0">
                <div className="flex items-end gap-3 mb-5">
                  <span
                    className="font-[family-name:var(--font-syne)] font-extrabold leading-none select-none"
                    style={{
                      fontSize: "clamp(52px, 6vw, 72px)",
                      letterSpacing: "-0.03em",
                      color: d.numColor,
                    }}
                  >
                    {d.num}
                  </span>
                  <h3
                    className="font-[family-name:var(--font-syne)] font-bold text-white pb-1.5"
                    style={{
                      fontSize: "clamp(15px, 1.3vw, 18px)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {d.name}
                  </h3>
                </div>

                <div
                  className="h-[1px] mb-5"
                  style={{ background: d.ruleGradient }}
                />

                <ul className="space-y-3">
                  {d.skills.map((s, si) => (
                    <li
                      key={s}
                      className="font-[family-name:var(--font-space-grotesk)] flex items-start gap-3"
                      style={{
                        fontSize: "13px",
                        color:
                          si === 0
                            ? "rgba(255,255,255,0.82)"
                            : "rgba(255,255,255,0.56)",
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        className="mt-[7px] w-[3px] h-[3px] rounded-full shrink-0"
                        style={{ background: d.dotColor }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quote — the hero typographic moment */}
        <div ref={quoteRef} className="mt-24 md:mt-36">
          <div
            className="h-[1px] mb-14 md:mb-16"
            style={{ background: "linear-gradient(90deg, rgba(37,95,56,0.55) 0%, rgba(24,35,15,0.35) 45%, rgba(206,38,38,0.50) 100%)" }}
          />
          <blockquote className="max-w-[1100px]">
            <p
              className="ab-quote-line font-[family-name:var(--font-syne)] font-extrabold text-white leading-[1.05] opacity-0"
              style={{
                fontSize: "clamp(28px, 5vw, 64px)",
                letterSpacing: "-0.025em",
              }}
            >
              &ldquo;Capturing stories
            </p>
            <p
              className="ab-quote-line font-[family-name:var(--font-syne)] font-extrabold leading-[1.05] opacity-0"
              style={{
                fontSize: "clamp(28px, 5vw, 64px)",
                letterSpacing: "-0.025em",
                color: "rgba(206,38,38,0.75)",
              }}
            >
              through photography.
            </p>
            <p
              className="ab-quote-line font-[family-name:var(--font-syne)] font-extrabold text-white leading-[1.05] mt-2 opacity-0"
              style={{
                fontSize: "clamp(28px, 5vw, 64px)",
                letterSpacing: "-0.025em",
              }}
            >
              Bringing ideas to life
            </p>
            <p
              className="ab-quote-line font-[family-name:var(--font-syne)] font-extrabold leading-[1.05] opacity-0"
              style={{
                fontSize: "clamp(28px, 5vw, 64px)",
                letterSpacing: "-0.025em",
                color: "rgba(37,95,56,0.80)",
              }}
            >
              through design.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
