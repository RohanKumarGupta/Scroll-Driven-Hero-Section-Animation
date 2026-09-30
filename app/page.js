import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import ContentSection from "@/components/ContentSection";

export const metadata = {
  title: "WELCOME ITZFIZZ | Scroll-Driven Hero Animation",
  description: "A premium, smooth, and performant scroll-driven hero section animation built with Next.js, GSAP ScrollTrigger, and Lenis.",
};

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 overflow-x-hidden">
        {/* HERO ANIMATION SECTION */}
        <Hero />

        {/* DEMO FILLER CONTENT SECTION BELOW HERO */}
        <ContentSection />
      </main>
    </SmoothScroll>
  );
}
