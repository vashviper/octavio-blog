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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

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
          <div className="prose prose-lg prose-invert max-w-none prose-pre:bg-brand-dark prose-pre:border prose-pre:border-white/10">
            <div className="bg-brand-purple/20 border border-white/10 rounded-lg p-8 md:p-12">
              <div className="space-y-6 text-body text-brand-white/80 leading-relaxed">
                {(() => {
                  const lines = post.content.split('\n');
                  const elements = [];
                  let inCodeBlock = false;
                  let codeContent = [];
                  let codeLanguage = '';
                  let inList = false;
                  let listItems = [];

                  const flushList = () => {
                    if (listItems.length > 0) {
                      elements.push(
                        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 ml-4 mb-6 text-brand-white/80">
                          {listItems.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      );
                      listItems = [];
                      inList = false;
                    }
                  };

                  const flushCode = () => {
                    if (inCodeBlock) {
                      elements.push(
                        <pre key={`code-${elements.length}`} className="bg-brand-dark border border-white/20 rounded-lg p-4 mb-6 overflow-x-auto">
                          <code className={`language-${codeLanguage} text-sm text-brand-orange`}>
                            {codeContent.join('\n')}
                          </code>
                        </pre>
                      );
                      codeContent = [];
                      codeLanguage = '';
                      inCodeBlock = false;
                    }
                  };

                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    const trimmedLine = line.trim();

                    // Handle code blocks
                    if (trimmedLine.startsWith('```')) {
                      flushList();
                      if (!inCodeBlock) {
                        // Start code block
                        inCodeBlock = true;
                        codeLanguage = trimmedLine.slice(3).trim() || 'text';
                      } else {
                        // End code block
                        flushCode();
                      }
                      continue;
                    }

                    if (inCodeBlock) {
                      codeContent.push(line);
                      continue;
                    }

                    // Handle headings
                    if (trimmedLine.startsWith('## ')) {
                      flushList();
                      elements.push(
                        <h2 key={i} className="text-h2 mt-12 mb-6 text-brand-white">
                          {trimmedLine.slice(3)}
                        </h2>
                      );
                      continue;
                    }

                    if (trimmedLine.startsWith('### ')) {
                      flushList();
                      elements.push(
                        <h3 key={i} className="text-2xl font-bold mt-8 mb-4 text-brand-white">
                          {trimmedLine.slice(4)}
                        </h3>
                      );
                      continue;
                    }

                    // Handle list items
                    if (trimmedLine.startsWith('- ') || trimmedLine.match(/^\d+\./)) {
                      if (!inList) {
                        inList = true;
                      }
                      const itemContent = trimmedLine
                        .replace(/^-\s*/, '')
                        .replace(/^\d+\.\s*/, '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/`(.*?)`/g, '<code class="bg-brand-dark px-1 rounded text-brand-orange">$1</code>');
                      listItems.push(itemContent);
                      continue;
                    }

                    // Handle regular paragraphs
                    if (trimmedLine) {
                      flushList();
                      const formattedContent = trimmedLine
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-brand-dark px-2 py-1 rounded text-brand-orange">$1</code>');

                      elements.push(
                        <p key={i} className="mb-6" dangerouslySetInnerHTML={{ __html: formattedContent }} />
                      );
                    }
                  }

                  // Flush any remaining content
                  flushList();
                  flushCode();

                  return elements;
                })()}
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
