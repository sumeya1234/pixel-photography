import { Link } from "react-router-dom";
import { Camera, Heart, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-6xl tracking-tight mb-6">
              About Pixel Photography
            </h1>
            <p className="text-lg text-muted-foreground max-w-prose mb-6">
              Every photograph tells a story. At Pixel Photography, we believe in capturing not just moments, but the emotions, connections, and authentic beauty that make each story unique.
            </p>
            <p className="text-muted-foreground max-w-prose mb-8">
              Founded with a passion for storytelling through imagery, we specialize in creating timeless photographs that preserve your most precious memories with artistic elegance and emotional depth.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Start Your Story
            </Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?q=80&w=1600&auto=format&fit=crop"
              alt="Pixel Photography team"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What started as a love for capturing candid moments has evolved into a dedicated craft of preserving life's most meaningful experiences. We understand that behind every photograph is a human story waiting to be told with authenticity and grace.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl mb-4">The Journey Begins</h3>
              <p className="text-muted-foreground mb-6">
                Our journey began with a simple belief: photography is more than just capturing images—it's about preserving emotions, celebrating connections, and creating visual narratives that stand the test of time.
              </p>
              <p className="text-muted-foreground mb-6">
                From intimate portraits that reveal personality to grand celebrations that capture joy, we approach each project with fresh eyes and genuine enthusiasm for the unique story unfolding before our lens.
              </p>
              <p className="text-muted-foreground">
                Today, we're honored to be trusted with documenting life's most precious moments for families, couples, and individuals who value authentic, artistic photography.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
                  alt="Behind the scenes"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop"
                  alt="Photography equipment"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-6">Our Approach</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe great photography comes from understanding people, not just mastering technique. Our approach combines technical excellence with genuine human connection.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <article className="group bg-card rounded-2xl border border-foreground/10 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">Authentic Moments</h3>
              <p className="text-muted-foreground leading-relaxed">
                We capture genuine emotions and natural interactions, creating images that feel true to who you are rather than posed perfection.
              </p>
            </article>
            <article className="group bg-card rounded-2xl border border-foreground/10 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">Emotional Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every session begins with understanding your story, ensuring we capture not just how you look, but how you feel in these precious moments.
              </p>
            </article>
            <article className="group bg-card rounded-2xl border border-foreground/10 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">Artistic Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We blend technical mastery with creative vision, using natural light and thoughtful composition to create images with lasting impact.
              </p>
            </article>
            <article className="group bg-card rounded-2xl border border-foreground/10 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">Personal Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                From initial consultation to final delivery, we provide a personalized, stress-free experience tailored to your unique vision and needs.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-6">Why Choose Pixel Photography</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence and passion for storytelling has earned the trust of hundreds of clients worldwide.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Years of Experience", value: "8+", description: "Perfecting our craft" },
              { label: "Happy Clients", value: "500+", description: "Stories beautifully told" },
              { label: "Global Reach", value: "15+", description: "Countries served" },
              { label: "Recognition", value: "Award", description: "Winning photography" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card rounded-2xl border border-foreground/10 p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-display text-primary mb-2">{s.value}</div>
                <div className="font-semibold mb-2">{s.label}</div>
                <div className="text-sm text-muted-foreground">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container text-center">
          <h3 className="font-display text-3xl md:text-4xl mb-6">
            Ready to Tell Your Story?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether it's an intimate portrait session, a milestone celebration, or your dream wedding, we're here to capture your unique story with artistry and heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Book Your Session
            </Link>
            <a
              href="mailto:hello@pixelphotography.com"
              className="inline-flex items-center justify-center rounded-full border border-primary text-primary px-8 py-4 font-semibold hover:bg-primary/10 transition-colors"
            >
              hello@pixelphotography.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}