import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, Clock, Star, ArrowRight } from "lucide-react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 md:py-16">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="w-8 h-8 text-primary" />
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
            Our Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Professional photography services tailored to capture your most precious moments with artistic excellence and timeless elegance.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-background border border-foreground/10 rounded-2xl p-8 hover:border-foreground/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{service.name}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary">
                    {service.price ? `$${Number(service.price).toFixed(2)}` : "Contact for pricing"}
                  </div>
                </div>
                
                <Link
                  to="/contact"
                  className="group/btn w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-all duration-300"
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/40">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Ready to Capture Your Story?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and create something beautiful together. Every moment deserves to be captured with care and artistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-8 py-3 font-semibold hover:bg-foreground/5 transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}