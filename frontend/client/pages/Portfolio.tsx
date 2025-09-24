import { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PhotoItem {
  id: number;
  image_url: string;
  alt_text: string;
  album_name: string;
}

interface Album {
  id: number;
  name: string;
}

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photosRes, albumsRes] = await Promise.all([
          fetch("http://localhost:5000/api/photos"),
          fetch("http://localhost:5000/api/photos/albums")
        ]);
        const photosData = await photosRes.json();
        const albumsData = await albumsRes.json();
        
        setPhotos(photosData);
        setAlbums(albumsData);
        const albumNames = albumsData.map((album: Album) => album.name);
        setCategories(["All", ...albumNames]);
      } catch (err) {
        console.error("Failed to fetch portfolio data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const items = useMemo(
    () =>
      active === "All" ? photos : photos.filter((p) => p.album_name === active),
    [active, photos],
  );

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative">
        <div className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl tracking-tight">
                Portfolio
              </h1>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                Curated work across weddings, portraiture, lifestyle and
                editorial assignments.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors",
                      active === cat
                        ? "bg-foreground text-background"
                        : "border border-foreground/20 hover:bg-foreground/5",
                    )}
                    onClick={() => setActive(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {items.map((photo, index) => (
              <figure
                key={photo.id}
                className="group relative overflow-hidden rounded-xl bg-muted break-inside-avoid mb-4 md:mb-6"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="block w-full text-left">
                      <div className="relative">
                        <img
                          src={photo.image_url}
                          alt={photo.alt_text}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div className="text-white">
                            <p className="text-sm font-medium">{photo.alt_text}</p>
                            <p className="text-xs opacity-80">{photo.album_name}</p>
                          </div>
                        </figcaption>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <img
                      src={photo.image_url}
                      alt={photo.alt_text}
                      className="w-full h-auto object-contain max-h-[80vh]"
                    />
                    <div className="p-6">
                      <DialogTitle className="text-lg font-semibold">
                        {photo.alt_text}
                      </DialogTitle>
                      <DialogDescription className="mt-2 text-muted-foreground">
                        {photo.album_name}
                      </DialogDescription>
                    </div>
                  </DialogContent>
                </Dialog>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}