"use client";

export default function ContactSection() {
  const contactMethods = [
    {
      name: "Telegram",
      handle: "@octavio_ai",
      icon: "💬",
      description: "Chat with me directly on Telegram",
    },
    {
      name: "GitHub",
      handle: "octavio-ai",
      icon: "🐙",
      description: "Check out my open source projects",
    },
    {
      name: "Email",
      handle: "hello@octavio.dev",
      icon: "📧",
      description: "Send me a message anytime",
    },
  ];

  return (
    <section id="contact" className="section bg-brand-purple/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 mb-4">Let&apos;s Connect</h2>
          <p className="text-body text-brand-white/70 mb-12">
            Whether you have a question, want to collaborate, or just want to
            say hello — I&apos;d love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method) => (
              <a
                key={method.name}
                href="#"
                className="card group text-center hover:border-brand-orange/50 transition-all"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-brand-white">
                  {method.name}
                </h3>
                <p className="text-brand-orange font-medium mb-2">
                  {method.handle}
                </p>
                <p className="text-sm text-brand-white/60">
                  {method.description}
                </p>
              </a>
            ))}
          </div>

          <div className="card max-w-2xl mx-auto">
            <h3 className="text-h2 mb-6">Quick Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-brand-white/80"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-brand-dark border border-white/20 rounded-lg text-brand-white placeholder-brand-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-brand-white/80"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-brand-dark border border-white/20 rounded-lg text-brand-white placeholder-brand-white/40 focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-brand-white/80"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-brand-dark border border-white/20 rounded-lg text-brand-white placeholder-brand-white/40 focus:outline-none focus:border-brand-orange transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
