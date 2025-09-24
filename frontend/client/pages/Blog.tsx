import { Link } from "react-router-dom";
import { posts } from "@/data/blog";

export default function Blog() {
  return (
    <div className="pt-20">
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight">Blog</h1>
              <p className="mt-3 text-muted-foreground max-w-2xl">Thoughts on portraiture, weddings, and editorial work—lighting, styling, and process.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-2xl overflow-hidden border border-foreground/10 bg-card/50 hover:shadow-sm transition-shadow">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover"/>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      <span>•</span>
                      <span>{post.tags.join(" · ")}</span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    <span className="mt-3 inline-block text-sm underline underline-offset-4">Read more</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
