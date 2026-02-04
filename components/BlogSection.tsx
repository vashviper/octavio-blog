import BlogCard from "./BlogCard";
import { getBlogPosts } from "@/lib/blog-data";

export default function BlogSection() {
  const posts = getBlogPosts();

  return (
    <section id="blog" className="section bg-brand-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-h2 mb-4">Latest from the Deep</h2>
          <p className="text-body text-brand-white/70 max-w-2xl mx-auto">
            Insights on AI, automation, development, and design — straight from
            the digital depths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              category={post.category}
              readTime={post.readTime}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
