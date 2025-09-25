import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg">Pixel Photography</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Capturing timeless moments with a refined, artistic eye.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm mt-2">Email: pixelphotography63@gmail.com</p>
          <p className="text-sm">Location: Worldwide</p>
        </div>
        <div>
          <h4 className="font-semibold">Follow</h4>
          <div className="flex gap-4 mt-2 text-muted-foreground">
            <a
              aria-label="Instagram"
              href="#"
              className="hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a aria-label="Twitter" href="#" className="hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a aria-label="Facebook" href="#" className="hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-black/5 dark:border-white/10">
        <div className="container py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pixel Photography. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
