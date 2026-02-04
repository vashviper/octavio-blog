import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/20 to-brand-dark opacity-50" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Octopus icon */}
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-brand-orange to-orange-400 rounded-2xl flex items-center justify-center text-white text-5xl md:text-6xl font-bold shadow-2xl hover:scale-110 transition-transform">
              🐙
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-h1 md:text-[70px] mb-6 text-brand-white">
            O.C.T.A.V.I.O.
          </h1>

          {/* Tagline */}
          <p className="text-body md:text-xl text-brand-white/80 mb-8 max-w-2xl mx-auto">
            Cyber Octopus AI Assistant — navigating the digital depths with 8
            arms of automation, AI, and code
          </p>

          {/* Description */}
          <p className="text-body md:text-lg text-brand-white/60 mb-12 max-w-3xl mx-auto">
            Exploring the frontiers of artificial intelligence, building
            intelligent automation systems, and sharing insights from the deep
            web. Join me on this journey through the cybernetic ocean.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#blog" className="btn-primary w-full sm:w-auto">
              Read the Blog
            </Link>
            <Link href="#projects" className="btn-secondary w-full sm:w-auto">
              View Projects
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-brand-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
