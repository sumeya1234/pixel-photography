import { FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";
import { Camera, Clock, Calendar as CalendarIcon, User, Mail, Sparkles } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services");
      }
    };
    fetchServices();
  }, []);
  
  const today = new Date().toISOString().split('T')[0];
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const validateForm = (data: FormData) => {
    const newErrors: {[key: string]: string} = {};
    
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const service = data.get('service') as string;
    const date = data.get('date') as string;
    const startTime = data.get('startTime') as string;
    const endTime = data.get('endTime') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!service) {
      newErrors.service = 'Please select a service';
    }

    if (!date) {
      newErrors.date = 'Please select a date';
    } else if (new Date(date) < new Date(today)) {
      newErrors.date = 'Please select a future date';
    }

    if (!startTime) {
      newErrors.startTime = 'Please select a start time';
    }

    if (!endTime) {
      newErrors.endTime = 'Please select an end time';
    } else if (startTime && endTime <= startTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (!validateForm(formData)) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const data = Object.fromEntries(formData.entries());
    const bookingData = {
      name: data.name as string,
      email: data.email as string,
      sessionDate: data.date as string,
      startTime: data.startTime as string,
      endTime: data.endTime as string,
      serviceId: data.service as string,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send booking");
      }

      const result = await res.json();
      toast.success(result.message || "Booking created successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Fun Header */}
      <section className="py-12 md:py-16">
        <div className="container grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Camera className="w-8 h-8 text-primary" />
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Let's Create Magic Together
            </h1>
            <p className="mt-4 text-muted-foreground max-w-prose text-lg">
              Ready to capture your special moments? I'm excited to hear about your vision—whether it's dreamy portraits, 
              magical weddings, or stunning editorial work. Let's make something beautiful!
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>I usually reply within 24 hours</span>
            </div>
          </div>

          <div className="rounded-2xl border border-foreground/10 p-6 bg-gradient-to-br from-background to-muted/30 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Book Your Session</h3>
            </div>
            <form onSubmit={onSubmit} className="grid gap-6">
              <div className="grid gap-3">
                <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" /> What should I call you?
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className={`h-12 rounded-xl border bg-background px-4 outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.name ? 'border-destructive' : 'border-foreground/15'
                  }`}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="grid gap-3">
                <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" /> How can I reach you?
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className={`h-12 rounded-xl border bg-background px-4 outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.email ? 'border-destructive' : 'border-foreground/15'
                  }`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="grid gap-3">
                <label htmlFor="service" className="text-sm font-medium flex items-center gap-2">
                  <Camera className="w-4 h-4" /> What magic are we creating?
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className={`h-12 rounded-xl border bg-background px-4 outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.service ? 'border-destructive' : 'border-foreground/15'
                  }`}
                >
                  <option value="">Choose your service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
              </div>

              <div className="grid gap-3">
                <label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" /> When should we meet?
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`h-12 rounded-xl border bg-background px-4 outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.date ? 'border-destructive' : 'border-foreground/15'
                  }`}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <label htmlFor="startTime" className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Start Time
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    required
                    className={`h-12 rounded-xl border bg-background px-4 outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.startTime ? 'border-destructive' : 'border-foreground/15'
                    }`}
                  />
                  {errors.startTime && <p className="text-sm text-destructive">{errors.startTime}</p>}
                </div>
                <div className="grid gap-3">
                  <label htmlFor="endTime" className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" /> End Time
                  </label>
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    required
                    className={`h-12 rounded-xl border bg-background px-4 outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.endTime ? 'border-destructive' : 'border-foreground/15'
                    }`}
                  />
                  {errors.endTime && <p className="text-sm text-destructive">{errors.endTime}</p>}
                </div>
              </div>

              <button
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-6 h-12 text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60 disabled:scale-100"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending your request...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Book My Session
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
