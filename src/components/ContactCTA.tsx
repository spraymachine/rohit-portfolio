"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal for heading
      const chars = headingRef.current?.querySelectorAll(".contact-char");
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.05,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 0.5,
          y: 0,
          duration: 0.8,
          delay: 0.4,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2500);
  };

  const headingText = "LET'S WORK TOGETHER";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 bg-black"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading with split text */}
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-syne)] font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-6 flex flex-wrap justify-center gap-x-3"
        >
          {headingText.split(" ").map((word, wi) => (
            <span key={wi} className="inline-flex">
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="contact-char inline-block opacity-0"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p
          ref={subtitleRef}
          className="font-[family-name:var(--font-space-grotesk)] text-base md:text-lg opacity-0 mb-12"
        >
          Have a project in mind? Let&apos;s create something extraordinary.
        </p>

        {/* CTA Button / Form */}
        <div className="relative inline-block">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="cta"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className="btn-gradient px-10 py-4 rounded-md font-[family-name:var(--font-syne)] font-bold text-sm tracking-[0.2em] cursor-pointer"
              >
                <span className="relative z-10">GET IN TOUCH</span>
              </motion.button>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.8, width: 200 }}
                animate={{ opacity: 1, scale: 1, width: "100%" }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto space-y-4"
              >
                <AnimatePresence>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#255f38] flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-[#255f38]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="font-[family-name:var(--font-syne)] font-bold text-lg">
                        Message Sent!
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {[
                        { name: "name", placeholder: "Your Name", type: "text", delay: 0.1 },
                        { name: "email", placeholder: "Email Address", type: "email", delay: 0.2 },
                      ].map((field) => (
                        <motion.input
                          key={field.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: field.delay }}
                          type={field.type}
                          name={field.name}
                          required
                          placeholder={field.placeholder}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-4 py-3 font-[family-name:var(--font-space-grotesk)] text-sm text-white placeholder:text-[#5a5a5a] focus:outline-none focus:border-[#255f38]/50 transition-colors"
                        />
                      ))}
                      <motion.textarea
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        rows={4}
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-md px-4 py-3 font-[family-name:var(--font-space-grotesk)] text-sm text-white placeholder:text-[#5a5a5a] focus:outline-none focus:border-[#255f38]/50 transition-colors resize-none"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3"
                      >
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-md font-[family-name:var(--font-syne)] font-bold text-sm tracking-[0.15em] cursor-pointer transition-all hover:brightness-110"
                          style={{ background: "linear-gradient(135deg, #255f38, #ce2626)" }}
                        >
                          SEND MESSAGE
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 rounded-md border border-white/10 font-[family-name:var(--font-space-grotesk)] text-xs text-[#a0a0a0] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-16"
        >
          {["Instagram", "Behance", "LinkedIn"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.15em] text-[#5a5a5a] hover:text-white transition-colors"
            >
              {platform.toUpperCase()}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Gradient divider line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #255f38, #ce2626, transparent)" }} />
    </section>
  );
}
