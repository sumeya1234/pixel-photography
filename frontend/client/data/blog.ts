export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string; // ISO
  tags: string[];
  content: string[]; // paragraphs/blocks
};

export const posts: Post[] = [
  {
    slug: "behind-the-lens-natural-light",
    title: "Behind the Lens: Working with Natural Light",
    excerpt:
      "How I craft soft, flattering images using windows, shade, and golden hour.",
    cover:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1600&auto=format&fit=crop",
    date: "2024-08-21",
    tags: ["Tips", "Portraits"],
    content: [
      "Natural light offers a timeless, organic look that flatters skin and keeps colors true.",
      "I plan sessions around soft light: early mornings, late afternoons, or open shade.",
      "Reflectors help shape light gently—no harsh flashes, just luminous skin and depth.",
    ],
  },
  {
    slug: "elegant-wedding-photography-guide",
    title: "An Elegant Wedding Photography Guide",
    excerpt:
      "My approach to capturing your day: storytelling, gentle direction, and editorial polish.",
    cover:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1600&auto=format&fit=crop",
    date: "2024-06-11",
    tags: ["Weddings", "Guide"],
    content: [
      "I blend documentary candids with artful portraits for an elevated but honest narrative.",
      "Preparation is key—timelines, locations, and a shared mood board keep us aligned.",
      "We’ll create space for intimate moments while keeping the day flowing smoothly.",
    ],
  },
  {
    slug: "editorial-portraits-at-home",
    title: "Editorial Portraits at Home",
    excerpt:
      "Turn your space into a minimal set—textures, negative space, and simple styling.",
    cover:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    date: "2024-03-02",
    tags: ["Editorial", "Lifestyle"],
    content: [
      "Home environments add personality. We declutter, style simply, and find strong light.",
      "I direct gently to create confident lines and elegant shapes for a magazine feel.",
      "Neutrals, texture, and negative space keep the focus on you.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
