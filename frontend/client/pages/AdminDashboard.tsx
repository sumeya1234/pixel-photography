import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BarChart3, Settings, MessageSquare, Calendar, Image, FileText } from "lucide-react";
import React from "react";

const iconMap = {
  BarChart3,
  Settings,
  MessageSquare,
  Calendar,
  Image,
  FileText,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editingBlogPost, setEditingBlogPost] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
  }, [token, navigate]);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      toast.error("Failed to fetch services");
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  const deleteBooking = async (booking: any) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${booking.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      
      if (res.status === 404) {
        toast.error("Backend server not running or route not found");
        return;
      }
      
      let result;
      try {
        result = await res.json();
      } catch (jsonErr) {
        toast.error("Server error - invalid response format");
        return;
      }
      
      if (res.ok) {
        toast.success(result.message || "Booking cancelled and customer notified");
        setDeletingBooking(null);
        fetchBookings();
      } else {
        toast.error(result.message || "Failed to delete booking");
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: number, data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        toast.success(result.message || "Booking updated");
        setEditingBooking(null);
        fetchBookings();
      } else {
        toast.error(result.message || "Failed to update booking");
      }
    } catch (err) {
      toast.error("Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;
    
    if (searchTerm) {
      filtered = filtered.filter((booking: any) => 
        booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (dateFilter) {
      filtered = filtered.filter((booking: any) => 
        booking.sessionDate === dateFilter
      );
    }

    // Sort bookings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime();
        case "date-desc":
          return new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime();
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "created-asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "created-desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime();
      }
    });
    
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    filterBookings();
  }, [searchTerm, dateFilter, sortBy, bookings]);

  const fetchPortfolio = async () => {
    const mockData = [
      { id: 1, title: "Bridal Portrait", category: "Wedding Photography", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400" },
      { id: 2, title: "Editorial Fashion", category: "Studio Sessions", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400" },
      { id: 3, title: "Couple's Moment", category: "Wedding Photography", image: "https://images.unsplash.com/photo-1521334726092-b509a19597c6?w=400" },
      { id: 4, title: "Natural Portrait", category: "Studio Sessions", image: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?w=400" },
      { id: 5, title: "Corporate Event", category: "Event Photography", image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400" },
      { id: 6, title: "Lifestyle Beauty", category: "Studio Sessions", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400" },
      { id: 7, title: "Wedding Ceremony", category: "Wedding Photography", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400" },
      { id: 8, title: "Business Portrait", category: "Studio Sessions", image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400" },
      { id: 9, title: "Reception Dance", category: "Wedding Photography", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
      { id: 10, title: "Conference Speaker", category: "Event Photography", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400" },
      { id: 11, title: "Artistic Portrait", category: "Studio Sessions", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
      { id: 12, title: "Garden Wedding", category: "Wedding Photography", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400" }
    ];
    setPortfolio(mockData);
  };

  const fetchBlogPosts = async () => {
    const mockData = [
      { id: 1, title: "Behind the Lens: Natural Light", excerpt: "How I craft soft, flattering images", date: "2024-01-15", published: true },
      { id: 2, title: "Wedding Photography Guide", excerpt: "My approach to capturing your day", date: "2024-01-10", published: false }
    ];
    setBlogPosts(mockData);
  };

  const deleteService = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Service deleted");
        fetchServices();
      }
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  const deleteTestimonial = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Testimonial deleted");
        fetchTestimonials();
      }
    } catch (err) {
      toast.error("Failed to delete testimonial");
    }
  };

  const updateService = async (id: number, data: any) => {
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Service updated");
        setEditingService(null);
        fetchServices();
      }
    } catch (err) {
      toast.error("Failed to update service");
    }
  };

  const updateTestimonial = async (id: number, data: any) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Testimonial updated");
        setEditingTestimonial(null);
        fetchTestimonials();
      }
    } catch (err) {
      toast.error("Failed to update testimonial");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "services", label: "Services", icon: "Settings" },
    { id: "testimonials", label: "Testimonials", icon: "MessageSquare" },
    { id: "bookings", label: "Bookings", icon: "Calendar" },
    { id: "portfolio", label: "Portfolio", icon: "Image" },
    { id: "blog", label: "Blog Posts", icon: "FileText" },
  ];

  const loadData = (tab: string) => {
    if (tab === "services") fetchServices();
    if (tab === "testimonials") fetchTestimonials();
    if (tab === "bookings") fetchBookings();
    if (tab === "portfolio") fetchPortfolio();
    if (tab === "blog") fetchBlogPosts();
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="sticky top-0 z-50 bg-background border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-display">Admin Dashboard</h1>
          <button onClick={logout} className="px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-background border-r md:min-h-screen p-4 md:block hidden">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  loadData(tab.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {React.createElement(iconMap[tab.icon as keyof typeof iconMap], { className: "w-5 h-5" })}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-sm md:text-lg font-semibold mb-2">Services</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">{services.length}</p>
              </div>
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-sm md:text-lg font-semibold mb-2">Reviews</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">{testimonials.length}</p>
              </div>
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-sm md:text-lg font-semibold mb-2">Bookings</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">{bookings.length}</p>
              </div>
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-sm md:text-lg font-semibold mb-2">Photos</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">{portfolio.length}</p>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="bg-background rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Services Management</h2>
                <button
                  onClick={() => setEditingService({ id: 0, name: "", description: "", price: "" })}
                  className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                >
                  Add Service
                </button>
              </div>
              <div className="space-y-4">
                {services.map((service: any) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium">{service.name}</h3>
                        <span className="text-lg font-bold text-primary">${Number(service.price || 0).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingService(service)}
                        className="px-3 py-1 bg-muted hover:bg-muted/80 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="px-3 py-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="bg-background rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Testimonials Management</h2>
                <button
                  onClick={() => setEditingTestimonial({ id: 0, author: "", text: "" })}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Add Testimonial
                </button>
              </div>
              <div className="space-y-4">
                {testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-sm mb-2">{testimonial.text}</p>
                      <p className="text-xs text-muted-foreground">— {testimonial.author}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="px-3 py-1 bg-muted rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="bg-background rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Bookings Management</h2>
                <div className="flex gap-4">
                  <input
                    placeholder="Search by name, email, or customer #"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 h-10 rounded-md border border-input bg-background px-3"
                  />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3"
                  >
                    <option value="date-desc">Latest Sessions First</option>
                    <option value="date-asc">Earliest Sessions First</option>
                    <option value="created-desc">Recently Booked First</option>
                    <option value="created-asc">Oldest Bookings First</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                  </select>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setDateFilter("");
                    }}
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md text-sm transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {filteredBookings.map((booking: any) => (
                  <div key={booking.id} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Customer #</p>
                        <p className="text-sm text-muted-foreground font-mono">{booking.customerNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">{booking.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{booking.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">{new Date(booking.sessionDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">{booking.startTime} - {booking.endTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingBooking(booking)}
                        disabled={loading}
                        className="px-3 py-1 bg-muted hover:bg-muted/80 rounded text-sm transition-colors disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingBooking(booking)}
                        disabled={loading}
                        className="px-3 py-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded text-sm transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
                {filteredBookings.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No bookings found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="bg-background rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Portfolio Management</h2>
                <button
                  onClick={() => setEditingPortfolio({ id: 0, title: "", category: "", image: "" })}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Add Image
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item: any) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setEditingPortfolio(item)}
                          className="px-3 py-1 bg-muted rounded text-sm"
                        >
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="bg-background rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Blog Posts Management</h2>
                <button
                  onClick={() => setEditingBlogPost({ id: 0, title: "", excerpt: "", date: "", published: false })}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Add Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post: any) => (
                  <div key={post.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{post.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingBlogPost(post)}
                          className="px-3 py-1 bg-muted rounded text-sm"
                        >
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modals */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editingService.id ? "Edit" : "Add"} Service</h3>
            <div className="space-y-4">
              <input
                placeholder="Service name"
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <textarea
                placeholder="Description"
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full h-20 rounded-md border border-input bg-background px-3 py-2"
              />
              <input
                placeholder="Price (e.g., 299.99)"
                type="number"
                step="0.01"
                value={editingService.price}
                onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editingService.id) {
                      updateService(editingService.id, editingService);
                    } else {
                      fetch("http://localhost:5000/api/services", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(editingService),
                      }).then(() => {
                        toast.success("Service added");
                        setEditingService(null);
                        fetchServices();
                      });
                    }
                  }}
                  className="flex-1 h-10 bg-primary text-primary-foreground rounded-md"
                >
                  {editingService.id ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setEditingService(null)}
                  className="flex-1 h-10 bg-muted rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editingTestimonial.id ? "Edit" : "Add"} Testimonial</h3>
            <div className="space-y-4">
              <input
                placeholder="Author name"
                value={editingTestimonial.author}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <textarea
                placeholder="Testimonial text"
                value={editingTestimonial.text}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                className="w-full h-20 rounded-md border border-input bg-background px-3 py-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editingTestimonial.id) {
                      updateTestimonial(editingTestimonial.id, editingTestimonial);
                    } else {
                      fetch("http://localhost:5000/api/testimonials", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(editingTestimonial),
                      }).then(() => {
                        toast.success("Testimonial added");
                        setEditingTestimonial(null);
                        fetchTestimonials();
                      });
                    }
                  }}
                  className="flex-1 h-10 bg-primary text-primary-foreground rounded-md"
                >
                  {editingTestimonial.id ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setEditingTestimonial(null)}
                  className="flex-1 h-10 bg-muted rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingPortfolio && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editingPortfolio.id ? "Edit" : "Add"} Portfolio Item</h3>
            <div className="space-y-4">
              <input
                placeholder="Title"
                value={editingPortfolio.title}
                onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <select
                value={editingPortfolio.category}
                onChange={(e) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              >
                <option value="">Select category</option>
                <option value="Weddings">Weddings</option>
                <option value="Portraits">Portraits</option>
                <option value="Editorial">Editorial</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
              <input
                placeholder="Image URL"
                value={editingPortfolio.image}
                onChange={(e) => setEditingPortfolio({ ...editingPortfolio, image: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.success(editingPortfolio.id ? "Portfolio updated" : "Portfolio added");
                    setEditingPortfolio(null);
                    fetchPortfolio();
                  }}
                  className="flex-1 h-10 bg-primary text-primary-foreground rounded-md"
                >
                  {editingPortfolio.id ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setEditingPortfolio(null)}
                  className="flex-1 h-10 bg-muted rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Booking</h3>
            <div className="space-y-4">
              <input
                placeholder="Customer name"
                value={editingBooking.name}
                onChange={(e) => setEditingBooking({ ...editingBooking, name: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <input
                placeholder="Email"
                type="email"
                value={editingBooking.email}
                onChange={(e) => setEditingBooking({ ...editingBooking, email: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <input
                type="date"
                value={editingBooking.sessionDate}
                onChange={(e) => setEditingBooking({ ...editingBooking, sessionDate: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={editingBooking.startTime}
                  onChange={(e) => setEditingBooking({ ...editingBooking, startTime: e.target.value })}
                  className="h-10 rounded-md border border-input bg-background px-3"
                />
                <input
                  type="time"
                  value={editingBooking.endTime}
                  onChange={(e) => setEditingBooking({ ...editingBooking, endTime: e.target.value })}
                  className="h-10 rounded-md border border-input bg-background px-3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateBooking(editingBooking.id, editingBooking)}
                  disabled={loading}
                  className="flex-1 h-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setEditingBooking(null)}
                  className="flex-1 h-10 bg-muted rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingBlogPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editingBlogPost.id ? "Edit" : "Add"} Blog Post</h3>
            <div className="space-y-4">
              <input
                placeholder="Post title"
                value={editingBlogPost.title}
                onChange={(e) => setEditingBlogPost({ ...editingBlogPost, title: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <textarea
                placeholder="Excerpt"
                value={editingBlogPost.excerpt}
                onChange={(e) => setEditingBlogPost({ ...editingBlogPost, excerpt: e.target.value })}
                className="w-full h-20 rounded-md border border-input bg-background px-3 py-2"
              />
              <input
                type="date"
                value={editingBlogPost.date}
                onChange={(e) => setEditingBlogPost({ ...editingBlogPost, date: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingBlogPost.published}
                  onChange={(e) => setEditingBlogPost({ ...editingBlogPost, published: e.target.checked })}
                />
                Published
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.success(editingBlogPost.id ? "Post updated" : "Post added");
                    setEditingBlogPost(null);
                    fetchBlogPosts();
                  }}
                  className="flex-1 h-10 bg-primary text-primary-foreground rounded-md"
                >
                  {editingBlogPost.id ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => setEditingBlogPost(null)}
                  className="flex-1 h-10 bg-muted rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Booking Confirmation */}
      {deletingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-destructive">Cancel Booking</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to cancel the booking for <strong>{deletingBooking.name}</strong> on {new Date(deletingBooking.sessionDate).toLocaleDateString()}?
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              The customer will be notified via email about the cancellation.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => deleteBooking(deletingBooking)}
                disabled={loading}
                className="flex-1 h-10 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {loading ? "Cancelling..." : "Yes, Cancel Booking"}
              </button>
              <button
                onClick={() => setDeletingBooking(null)}
                className="flex-1 h-10 bg-muted rounded-md"
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}