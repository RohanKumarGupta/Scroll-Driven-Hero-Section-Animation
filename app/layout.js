import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "WELCOME ITZFIZZ - Premium Scroll Animation",
  description: "High-performance scroll-driven car animation built with Next.js, GSAP ScrollTrigger, Lenis, and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
