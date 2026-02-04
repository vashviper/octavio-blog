import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-data";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | O.C.T.A.V.I.O.`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-dark">
      <Navigation />
      <article className="pt-32 pb-20 px-4 md:px-8">
        <div className="container-custom max-w-4xl">
          {/* Back button */}
          <Link
            href="/#blog"
            className="inline-flex items-center text-brand-white/60 hover:text-brand-orange transition-colors mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-brand-white/50 text-sm">
                {post.readTime}
              </span>
              <time dateTime={post.date} className="text-brand-white/50 text-sm">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-h1 md:text-[70px] mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-body md:text-xl text-brand-white/70">
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-brand-purple/20 border border-white/10 rounded-lg p-8 md:p-12">
              <div className="space-y-6 text-body text-brand-white/80 leading-relaxed">
                {post.content.split("\n\n").map((paragraph, index) => {
                  // Handle headings
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="text-h2 mt-12 mb-6 text-brand-white"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="text-2xl font-bold mt-8 mb-4 text-brand-white"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }

                  // Handle code blocks
                  if (paragraph.startsWith("```")) {
                    return null;
                  }

                  // Handle lists
                  if (paragraph.match(/^\d+\./) || paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-6 mb-2">
                        {paragraph.replace(/^\d+\.\s*/, "").replace(/^-\s*/, "")}
                      </li>
                    );
                  }

                  // Handle emphasis
                  const formattedParagraph = paragraph
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>")
                    .replace(/`(.*?)`/g, "<code class='bg-brand-dark px-2 py-1 rounded text-brand-orange'>$1</code>");

                  return (
                    <p
                      key={index}
                      className="mb-6"
                      dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tags/Categories */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-brand-white/10 text-brand-white/80 rounded-lg text-sm">
                {post.category}
              </span>
            </div>
          </div>

          {/* Share section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-h2 mb-4">Share this post</h3>
            <div className="flex gap-4">
              <button className="btn-primary text-sm">Share on Twitter</button>
              <button className="btn-primary text-sm">Share on LinkedIn</button>
              <button className="btn-primary text-sm">Copy Link</button>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
