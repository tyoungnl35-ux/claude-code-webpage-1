"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useShaderBackground } from "@/components/ui/animated-shader-hero";

// ─── Intersection Observer hook for scroll animations ────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Service card data ───────────────────────────────────────────────────────
const services = [
  {
    title: "SAP Recruitment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    description:
      "We place elite SAP consultants — from S/4HANA architects to functional module leads — into enterprise transformations that matter. Our network spans 20+ industries across EMEA and beyond.",
    tags: ["S/4HANA", "FICO", "MM/SD", "BTP", "Basis"],
  },
  {
    title: "AI Recruitment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    description:
      "From ML engineers and LLM specialists to AI product managers and data scientists, we identify the rare talent driving the next wave of intelligent enterprise solutions.",
    tags: ["LLM / GenAI", "MLOps", "Data Science", "AI Product", "Computer Vision"],
  },
  {
    title: "Headhunting",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    description:
      "For leadership mandates where only the best will do. We conduct discreet, targeted searches for C-suite executives, directors, and senior specialists who are rarely on the open market.",
    tags: ["CTO", "CISO", "VP Engineering", "Program Directors", "Board Advisory"],
  },
];

// ─── Stats data ──────────────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: "Placements Made" },
  { value: "12", label: "Years in Market" },
  { value: "98%", label: "Client Retention" },
  { value: "48h", label: "Avg. First Shortlist" },
];

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const servicesSection = useInView();
  const statsSection = useInView();
  const contactSection = useInView();
  const shaderCanvasRef = useShaderBackground();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HEADER — sticky, charcoal bg with coral accent
      ═══════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1F2937]/95 backdrop-blur-md shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-32 lg:h-36">
          {/* Logo */}
          <a href="#" className="flex items-center group shrink-0">
            <div className="relative w-[28rem] h-28 lg:w-[36rem] lg:h-32">
              <Image
                src="/AgentiqBridge Logo 2.png"
                alt="AgentiqBridge Logo"
                fill
                sizes="(max-width: 768px) 448px, 576px"
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-colors py-1">
              Services
            </a>
            <a href="#about" className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-colors py-1">
              Why Us
            </a>
            <a href="#contact" className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-colors py-1">
              Contact
            </a>
            <a
              href="mailto:AqentiqBridge@gmail.com"
              className="btn-coral text-xs px-5 py-2.5 rounded-sm uppercase tracking-widest"
            >
              Get in Touch
            </a>
          </nav>

          {/* Mobile hamburger placeholder */}
          <a
            href="mailto:AqentiqBridge@gmail.com"
            className="md:hidden btn-coral text-xs px-4 py-2 rounded-sm uppercase tracking-widest"
          >
            Contact
          </a>
        </div>

        {/* Coral accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF6F61]/50 to-transparent" />
      </header>

      <main>
        {/* ═══════════════════════════════════════════════
            HERO — WebGL shader bg + split content layout
        ═══════════════════════════════════════════════ */}
        <section className="relative min-h-screen overflow-hidden flex items-center bg-black">
          {/* ── Animated WebGL shader canvas (bottom layer) ── */}
          <canvas
            ref={shaderCanvasRef}
            className="absolute inset-0 w-full h-full touch-none pointer-events-none"
            aria-hidden="true"
          />

          {/* Dark vignette — keeps text legible over the bright shader */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Subtle coral radial bloom behind the image side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[75%] rounded-full bg-[radial-gradient(ellipse,rgba(255,111,97,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">
              {/* Left: text content */}
              <div className="flex flex-col justify-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block w-8 h-px bg-[#FF6F61]" />
                  <span className="text-[#FF6F61] text-xs font-semibold uppercase tracking-[0.25em] font-body">
                    Specialist Recruitment
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-[0.95] tracking-wide text-white mb-6 animate-fade-up">
                  <span className="block">BRIDGE</span>
                  <span className="block text-[#FF6F61] [text-shadow:0_0_40px_rgba(255,111,97,0.4)]">BRILLIANCE</span>
                  <span className="block">TO BUSINESS</span>
                </h1>

                {/* Subline */}
                <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-10 animate-fade-up delay-200 font-body">
                  AgentiqBridge connects forward-thinking enterprises with the SAP consultants, AI specialists, and executive leaders who define the cutting edge.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
                  <a
                    href="#contact"
                    className="btn-coral px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-bold"
                  >
                    Find Top Talent
                  </a>
                  <a
                    href="#services"
                    className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-widest font-semibold border border-white/10 hover:border-[#FF6F61]/40 px-8 py-4 rounded-sm backdrop-blur-sm"
                  >
                    Our Services
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right: cyber-woman image */}
              <div className="relative flex items-center justify-center lg:justify-end animate-fade-up delay-400">
                <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                  {/* Coral corner accents */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#FF6F61] z-10" />
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#FF6F61] z-10" />

                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                    <Image
                      src="/cyber-woman-charcoal.png"
                      alt="Intersection of technology and human talent"
                      fill
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className="object-cover object-top"
                      priority
                    />
                    {/* Fade into black to blend with the shader */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Scroll</span>
            <svg className="w-4 h-4 text-[#FF6F61]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            STATS BAR
        ═══════════════════════════════════════════════ */}
        <section
          id="about"
          ref={statsSection.ref}
          className="bg-[#2D2D2D] border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-700 ${
                    statsSection.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="font-display text-4xl lg:text-5xl text-[#FF6F61] mb-1 tracking-wide">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-[0.15em] font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SERVICES — 3-column grid
        ═══════════════════════════════════════════════ */}
        <section
          id="services"
          ref={servicesSection.ref}
          className="bg-[#1F2937] py-24 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Section header */}
            <div
              className={`mb-16 transition-all duration-700 ${
                servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="coral-rule" />
              <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-white leading-none tracking-wide mb-4">
                OUR SPECIALISMS
              </h2>
              <p className="text-gray-400 text-base max-w-xl font-body leading-relaxed">
                Three focused practice areas. Decades of combined expertise. One obsession — finding the right person for the right role.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <article
                  key={service.title}
                  className={`service-card relative bg-[#2D2D2D]/60 rounded-sm p-8 flex flex-col gap-5 transition-all duration-700 ${
                    servicesSection.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${200 + i * 120}ms` }}
                >
                  {/* Number label */}
                  <span className="absolute top-6 right-6 font-display text-5xl text-white/5 leading-none select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="text-[#FF6F61]">{service.icon}</div>

                  {/* Title */}
                  <h3 className="font-display text-2xl lg:text-3xl text-white tracking-wide leading-none">
                    {service.title}
                  </h3>

                  {/* Coral rule */}
                  <div className="w-8 h-0.5 bg-[#FF6F61] transform -skew-x-12" />

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed font-body flex-1">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-[#FF6F61]/80 border border-[#FF6F61]/20 rounded-sm px-2 py-0.5 uppercase tracking-wider font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            CONTACT — city backdrop, prominent CTA
        ═══════════════════════════════════════════════ */}
        <section
          id="contact"
          ref={contactSection.ref}
          className="relative min-h-[560px] flex items-center overflow-hidden"
        >
          {/* City background image */}
          <div className="absolute inset-0">
            <Image
              src="/city-charcoal.png"
              alt="Enterprise city skyline — the business landscape AgentiqBridge operates in"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Layered overlays */}
            <div className="absolute inset-0 bg-[#1F2937]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/90 via-[#1F2937]/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 w-full">
            <div
              className={`max-w-2xl transition-all duration-700 ${
                contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-px bg-[#FF6F61]" />
                <span className="text-[#FF6F61] text-xs font-semibold uppercase tracking-[0.25em] font-body">
                  Start the Conversation
                </span>
              </div>

              <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-none tracking-wide mb-6">
                READY TO FIND<br />
                <span className="text-[#FF6F61]">EXCEPTIONAL</span><br />
                TALENT?
              </h2>

              <p
                className={`text-gray-300 text-base leading-relaxed mb-10 max-w-lg font-body transition-all duration-700 delay-150 ${
                  contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Whether you need a single specialist or an entire project team, AgentiqBridge delivers vetted, high-impact talent — fast. Reach out today and receive your first shortlist within 48 hours.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                  contactSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <a
                  href="mailto:AqentiqBridge@gmail.com"
                  className="btn-coral inline-flex items-center justify-center gap-3 px-10 py-5 rounded-sm text-sm uppercase tracking-widest font-bold animate-[coralPulse_3s_ease-in-out_infinite]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  AqentiqBridge@gmail.com
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap gap-6">
                {[
                  "Confidential Search",
                  "GDPR Compliant",
                  "48h First Shortlist",
                  "No Placement, No Fee",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6F61]" />
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-body">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="bg-[#171717] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="relative w-32 h-8 opacity-60 hover:opacity-100 transition-opacity">
              <Image
                src="/AgentiqBridge Logo 2.png"
                alt="AgentiqBridge"
                fill
                sizes="128px"
                className="object-contain object-left"
              />
            </div>

            {/* Footer links */}
            <nav className="flex items-center gap-6">
              <a href="#services" className="text-xs text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider">
                Services
              </a>
              <span className="text-gray-700">·</span>
              <a href="#contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider">
                Contact
              </a>
              <span className="text-gray-700">·</span>
              <a href="mailto:AqentiqBridge@gmail.com" className="text-xs text-[#FF6F61]/70 hover:text-[#FF6F61] transition-colors uppercase tracking-wider">
                Email Us
              </a>
            </nav>

            {/* Copyright */}
            <p className="text-xs text-gray-600 font-body text-center md:text-right">
              © {year} AgentiqBridge. All rights reserved.
            </p>
          </div>

          {/* Bottom accent */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#FF6F61]/30 to-transparent" />
        </div>
      </footer>
    </>
  );
}
