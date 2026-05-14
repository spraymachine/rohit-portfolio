import Navigation from "@/components/Navigation";
import HeroSequence from "@/components/HeroSequence";
import WorkGallery from "@/components/WorkGallery";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Scene 1: Film Opening Hero */}
        <HeroSequence />

        {/* Scene 2: Circular Gallery - Selected Work */}
        <WorkGallery />

        {/* Scene 3: Contact CTA */}
        <ContactCTA />
      </main>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#5a5a5a]">
            &copy; {new Date().getFullYear()} Rohit Narayan Photography. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-xs text-[#5a5a5a]">
            Designed & Developed with precision
          </p>
        </div>
      </footer>
    </>
  );
}
