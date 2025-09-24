import { Link, Navigate, useParams } from "react-router-dom";
import { getPostBySlug } from "@/data/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="pt-20">
      <header className="py-10 md:py-16">
        <div className="container">
          <Link to="/blog" className="text-sm underline underline-offset-4">← Back to blog</Link>
          <h1 className="mt-4 font-display text-4xl md:text-5xl tracking-tight max-w-3xl">{post.title}</h1>
          <div className="mt-3 text-sm text-muted-foreground flex flex-wrap gap-2">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>{post.tags.join(" · ")}</span>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="overflow-hidden rounded-2xl">
          <img src={post.cover} alt={post.title} className="w-full h-[320px] md:h-[520px] object-cover" />
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-3xl mt-8">
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-foreground/10 flex items-center justify-between">
          <Link to="/blog" className="text-sm underline underline-offset-4">← Back to blog</Link>
          <a href="/contact" className="text-sm underline underline-offset-4">Work together →</a>
        </div>
      </div>
    </article>
  );
}
