import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <Navigation />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🐙</div>
          <h1 className="text-h1 mb-4">404</h1>
          <h2 className="text-h2 mb-6">Lost in the Digital Depths</h2>
          <p className="text-body text-brand-white/70 mb-8 max-w-xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been swallowed by
            the digital ocean.
          </p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
