"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles, Zap, ShieldCheck, Gauge } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  { value: 58, suffix: "%", label: "Increase in pick up point use", icon: Zap },
  { value: 23, suffix: "%", label: "Decrease in customer phone calls", icon: ArrowDown },
  { value: 27, suffix: "%", label: "Increase in pick up point use", icon: Sparkles },
  { value: 40, suffix: "%", label: "Decrease in customer phone calls", icon: ShieldCheck },
];

const HEADLINE_WORD1 = "WELCOME".split("");
const HEADLINE_WORD2 = "ITZFIZZ".split("");

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);
  const statsRef = useRef([]);
  const statNumbersRef = useRef([]);
  const carWrapperRef = useRef(null);
  const carImageRef = useRef(null);
  const roadLinesRef = useRef(null);
  const bgGlowRef = useRef(null);
  const speedLinesRef = useRef(null);

  lettersRef.current = [];
  statsRef.current = [];
  statNumbersRef.current = [];

  const addToLetters = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  const addToStats = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const addToStatNumbers = (el) => {
    if (el && !statNumbersRef.current.includes(el)) {
      statNumbersRef.current.push(el);
    }
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Create GSAP Context for strict-mode safety and easy cleanup
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simplified static state for accessibility
        gsap.set(lettersRef.current, { opacity: 1, y: 0 });
        gsap.set(statsRef.current, { opacity: 1, y: 0 });
        gsap.set(carWrapperRef.current, { opacity: 1, x: 0 });
        STATS_DATA.forEach((stat, i) => {
          if (statNumbersRef.current[i]) {
            statNumbersRef.current[i].innerText = `${stat.value}${stat.suffix}`;
          }
        });
        return;
      }

      // Initial state prior to intro timeline
      gsap.set(lettersRef.current, { y: 40, opacity: 0, force3D: true });
      gsap.set(statsRef.current, { y: 30, opacity: 0, force3D: true });
      gsap.set(carWrapperRef.current, { xPercent: -50, opacity: 0, scale: 0.9, force3D: true });
      gsap.set(roadLinesRef.current, { opacity: 0.3 });

      // Proxy objects for counting up numbers
      const proxies = STATS_DATA.map(() => ({ val: 0 }));

      // Master Intro Animation Timeline
      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl
        // 1. Headline letters stagger fade & rise
        .to(lettersRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.05,
        })
        // 2. Stats cards slide up with stagger
        .to(
          statsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.4"
        )
        // 3. Count up stat numbers simultaneously with card entry
        .to(
          proxies,
          {
            val: (i) => STATS_DATA[i].value,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: function () {
              STATS_DATA.forEach((stat, i) => {
                if (statNumbersRef.current[i]) {
                  const currentVal = Math.round(proxies[i].val);
                  statNumbersRef.current[i].innerText = `${currentVal}${stat.suffix}`;
                }
              });
            },
          },
          "<"
        )
        // 4. Car gently enters the viewport frame
        .to(
          carWrapperRef.current,
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=1.2"
        );

      // Responsive ScrollTrigger matchMedia
      const mm = gsap.matchMedia();

      // Desktop Animations (> 768px)
      mm.add("(min-width: 769px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTl
          // Car drives across screen with dynamic pitch rotation and scaling
          .to(carWrapperRef.current, {
            x: "65vw",
            rotate: -2,
            scale: 1.15,
            ease: "none",
            force3D: true,
          }, 0)
          // Headline letters expand apart and float upwards (parallax depth)
          .to(lettersRef.current, {
            y: -120,
            opacity: 0.1,
            stagger: {
              amount: 0.3,
              from: "center",
            },
            ease: "power1.inOut",
          }, 0)
          // Impact stats cards fade down slightly behind car
          .to(statsRef.current, {
            y: 80,
            opacity: 0.15,
            stagger: 0.04,
            ease: "power1.inOut",
          }, 0.05)
          // Parallax movement of road grid & speed lines
          .to(roadLinesRef.current, {
            backgroundPositionX: "-600px",
            ease: "none",
          }, 0)
          .to(bgGlowRef.current, {
            scale: 1.4,
            opacity: 0.8,
            ease: "power1.inOut",
          }, 0)
          .to(speedLinesRef.current, {
            x: "-300px",
            opacity: 0.6,
            ease: "none",
          }, 0);
      });

      // Mobile / Tablet Animations (<= 768px)
      mm.add("(max-width: 768px)", () => {
        const mobileScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        mobileScrollTl
          .to(carWrapperRef.current, {
            x: "45vw",
            scale: 1.1,
            ease: "none",
            force3D: true,
          }, 0)
          .to(lettersRef.current, {
            y: -60,
            opacity: 0.2,
            ease: "power1.inOut",
          }, 0)
          .to(statsRef.current, {
            y: 40,
            opacity: 0.2,
            ease: "power1.inOut",
          }, 0)
          .to(roadLinesRef.current, {
            backgroundPositionX: "-300px",
            ease: "none",
          }, 0);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] h-[100svh] overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-between select-none"
    >
      {/* BACKGROUND ATMOSPHERE & GLOW LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Ambient Radial Glow */}
        <div
          ref={bgGlowRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-tr from-sky-600/20 via-cyan-500/10 to-transparent blur-[120px] will-change-transform"
        />

        {/* Cyber Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Speed Motion Lines Layer */}
        <div
          ref={speedLinesRef}
          className="absolute top-1/2 left-0 w-[200%] h-40 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(56,189,248,0.06)_40px,rgba(56,189,248,0.06)_80px)] opacity-30 pointer-events-none will-change-transform"
        />
      </div>

      {/* TOP CONTAINER: HEADER & STATS */}
      <div className="relative z-10 pt-10 md:pt-14 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* BRAND BADGE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-sky-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-4 shadow-lg shadow-sky-950/30">
          <Gauge className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Next-Gen Performance</span>
        </div>

        {/* ACCESSIBLE HEADLINE WITH STAGGERED LETTER SPANS */}
        <h1
          ref={headlineRef}
          aria-label="WELCOME ITZFIZZ"
          className="text-[clamp(1.85rem,5.5vw,4.75rem)] font-black tracking-[0.22em] uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] my-2"
        >
          {/* Word 1: WELCOME */}
          <span className="inline-block whitespace-nowrap mr-[0.45em]">
            {HEADLINE_WORD1.map((char, i) => (
              <span
                key={`w1-${i}`}
                ref={addToLetters}
                aria-hidden="true"
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>

          {/* Word 2: ITZFIZZ */}
          <span className="inline-block whitespace-nowrap">
            {HEADLINE_WORD2.map((char, i) => (
              <span
                key={`w2-${i}`}
                ref={addToLetters}
                aria-hidden="true"
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* IMPACT STATS GRID (3-4 Stats) */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-5xl">
          {STATS_DATA.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                ref={addToStats}
                className="group relative p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 backdrop-blur-md transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left will-change-transform shadow-xl shadow-slate-950/50"
              >
                {/* Glow accent line */}
                <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span
                    ref={addToStatNumbers}
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono"
                  >
                    0{stat.suffix}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CANVAS: CAR VISUAL & ROAD SCENE */}
      <div className="relative w-full h-[38vh] min-h-[260px] max-h-[420px] z-10 mt-auto flex items-end">
        
        {/* ROAD / GRADIENT GROUND LAYER */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent z-0">
          {/* Animated Road Lines */}
          <div
            ref={roadLinesRef}
            className="absolute bottom-6 inset-x-0 h-[2px] bg-[repeating-linear-gradient(90deg,#0284c7,#0284c7_40px,transparent_40px,transparent_80px)] opacity-60 shadow-[0_0_12px_#38bdf8]"
          />
          {/* Ground reflection bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        </div>

        {/* CAR WRAPPER (GSAP SCROLL OBJECT) */}
        <div
          ref={carWrapperRef}
          className="relative z-10 left-[5%] sm:left-[8%] w-[65vw] sm:w-[48vw] max-w-[780px] min-w-[280px] aspect-[1200/450] bottom-4 sm:bottom-6 will-change-transform"
        >
          <Image
            ref={carImageRef}
            src="/car.svg"
            alt="Hypercar Scroll Animated Visual"
            priority
            width={1200}
            height={450}
            className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(2,132,199,0.35)]"
          />
        </div>

        {/* SCROLL INDICATOR PROMPT */}
        <div className="absolute bottom-3 right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 text-xs font-medium backdrop-blur-md animate-bounce">
          <span>Scroll to drive</span>
          <ArrowDown className="w-3.5 h-3.5 text-sky-400" />
        </div>
      </div>
    </section>
  );
}
