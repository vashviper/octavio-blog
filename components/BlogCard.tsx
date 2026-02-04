import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  category,
  readTime,
  slug,
}: BlogCardProps) {
  return (
    <article className="card group">
      <div className="flex items-start justify-between mb-4">
        <span className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange text-sm font-medium rounded-full">
          {category}
        </span>
        <span className="text-brand-white/50 text-sm">{readTime}</span>
      </div>

      <Link href={`/blog/${slug}`} className="block group-hover:text-brand-orange transition-colors">
        <h3 className="text-h2 mb-3 group-hover:text-brand-orange transition-colors">
          {title}
        </h3>
      </Link>

      <p className="text-body text-brand-white/70 mb-4 line-clamp-3">
        {excerpt}
      </p>

      <div className="flex items-center justify-between">
        <time dateTime={date} className="text-sm text-brand-white/50">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center text-brand-orange hover:text-orange-400 transition-colors font-medium"
          aria-label={`Read ${title}`}
        >
          Read More
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
