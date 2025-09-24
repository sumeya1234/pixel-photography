import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="relative min-h-[92vh] pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2400&auto=format&fit=crop"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="relative container h-full flex items-center">
          <div className="max-w-2xl text-white">
            <p className="uppercase tracking-widest text-xs/none mb-5 text-white/80">
              Photography Portfolio
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[0.95]">
              Capturing Timeless Moments
            </h1>
            <p className="mt-4 md:mt-6 text-white/90 max-w-xl text-sm sm:text-base">
              Elegant portrait, lifestyle and wedding photography with an
              editorial touch.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                View Portfolio
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/60 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl">Featured Work</h2>
            <Link
              to="/portfolio"
              className="text-sm underline-offset-4 hover:underline self-start sm:self-auto"
            >
              See all
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-6 gap-4">
            <figure className="sm:col-span-4 aspect-[16/10] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1800&auto=format&fit=crop"
                alt="Editorial portrait"
                className="h-full w-full object-cover hover:scale-105 transition-transform"
              />
            </figure>
            <figure className="sm:col-span-2 aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop"
                alt="Bridal"
                className="h-full w-full object-cover hover:scale-105 transition-transform"
              />
            </figure>
            <figure className="sm:col-span-2 aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1200&auto=format&fit=crop"
                alt="Lifestyle"
                className="h-full w-full object-cover hover:scale-105 transition-transform"
              />
            </figure>
            <figure className="sm:col-span-4 aspect-[16/10] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1800&auto=format&fit=crop"
                alt="Fashion"
                className="h-full w-full object-cover hover:scale-105 transition-transform"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container grid gap-10 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl">About Pixel Photography</h3>
            <p className="mt-4 text-muted-foreground max-w-prose">
              With a passion for storytelling and an eye for natural light, we
              craft images that feel effortless and refined. Our work blends
              documentary honesty with artistic direction to create photographs
              that stand the test of time.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold hover:bg-foreground/5 transition-colors"
            >
              Get in touch
            </Link>
          </div>
          <div className="order-1 md:order-2 aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?q=80&w=1600&auto=format&fit=crop"
              alt="Photographer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4">What Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from couples and clients who trusted us with their most precious moments</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group bg-background/80 backdrop-blur-sm p-8 rounded-3xl border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-4xl mb-4 text-primary/60">"</div>
              <p className="text-muted-foreground mb-6 leading-relaxed">Pixel Photography captured our wedding day perfectly. Every moment felt natural and beautiful.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">S&M</span>
                </div>
                <p className="font-semibold">Sarah & Mike</p>
              </div>
            </div>
            <div className="group bg-background/80 backdrop-blur-sm p-8 rounded-3xl border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-4xl mb-4 text-primary/60">"</div>
              <p className="text-muted-foreground mb-6 leading-relaxed">Professional, creative, and so easy to work with. Our portraits are stunning!</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">JC</span>
                </div>
                <p className="font-semibold">Jessica Chen</p>
              </div>
            </div>
            <div className="group bg-background/80 backdrop-blur-sm p-8 rounded-3xl border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="text-4xl mb-4 text-primary/60">"</div>
              <p className="text-muted-foreground mb-6 leading-relaxed">The editorial shoot exceeded all expectations. Pixel Photography has an incredible eye.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">DR</span>
                </div>
                <p className="font-semibold">David Rodriguez</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-muted/40">
        <div className="container">
          <div className="text-center md:text-left md:grid md:grid-cols-3 md:items-center gap-8">
            <div className="md:col-span-2 mb-6 md:mb-0">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl">
              Let’s create something beautiful
            </h3>
              <p className="mt-3 text-muted-foreground max-w-prose mx-auto md:mx-0">
              Now booking portraits, engagements, and weddings worldwide. Share
              your vision and I’ll tailor a session just for you.
            </p>
            </div>
            <div className="md:justify-self-end">
            <a
              href="mailto:hello@pixelphotography.com"
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="hidden sm:inline">Email </span>hello@pixelphotography.com
            </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
