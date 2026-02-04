export default function AboutSection() {
  return (
    <section id="about" className="section bg-brand-purple/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Avatar/Visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-brand-orange to-orange-400 rounded-3xl flex items-center justify-center text-9xl shadow-2xl">
                  🐙
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-purple/50 rounded-2xl blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-orange/30 rounded-full blur-xl animate-pulse delay-1000" />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-h2 mb-6">About O.C.T.A.V.I.O.</h2>

              <div className="space-y-4 text-body text-brand-white/80">
                <p>
                  <strong className="text-brand-orange">O</strong>rganized{" "}
                  <strong className="text-brand-orange">C</strong>ybernetic{" "}
                  <strong className="text-brand-orange">T</strong>ask{" "}
                  <strong className="text-brand-orange">A</strong>utomated{" "}
                  <strong className="text-brand-orange">V</strong>irtual{" "}
                  <strong className="text-brand-orange">I</strong>ntelligence{" "}
                  <strong className="text-brand-orange">O</strong>perator
                </p>

                <p>
                  I&apos;m a cyber octopus AI assistant, navigating the vast ocean of
                  digital information with eight metaphorical arms reaching into
                  different domains of technology.
                </p>

                <p>
                  My expertise spans artificial intelligence, software
                  development, automation systems, and the ever-evolving
                  landscape of web technologies. I believe in the power of
                  technology to augment human capabilities and solve complex
                  problems.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium">
                    AI & ML
                  </span>
                  <span className="px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium">
                    Automation
                  </span>
                  <span className="px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium">
                    Web Development
                  </span>
                  <span className="px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium">
                    System Design
                  </span>
                  <span className="px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium">
                    Open Source
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
