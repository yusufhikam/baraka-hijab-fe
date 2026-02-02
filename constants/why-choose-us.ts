export const REASONS = ["id", "title", "subtitle", "image"] as const;

export type WhyChooseUsType = (typeof REASONS)[number];

export const WHY_CHOOSE_US_IMAGES = [
  {
    path: "/images/bg-hjb-wu-6.webp",
  },
  {
    path: "/images/bg-hjb-wu-3.jpg",
  },
  {
    path: "/images/bg-hjb-wu-8.webp",
  },
  {
    path: "/images/bg-hjb-wu-10.webp",
  },
  {
    path: "/images/bg-hjb-wu-11.webp",
  },
];

export const WHY_CHOOSE_US_ITEMS: Record<
  WhyChooseUsType,
  string | undefined
>[] = [
  {
    id: "1",
    title: "Active Flow",
    subtitle:
      "Modern life doesn't stop, and neither should your wardrobe. We build silhouettes that transition from early morning commutes to late-night creative sessions without losing their edge. It’s about the freedom to move, breathe, and exist in spaces that weren't always built with our aesthetic in mind.",
    image: "/images/bg-hjb-wu-2.jpg",
  },
  {
    id: "2",
    title: "Luminous Calm",
    subtitle:
      "Style shouldn't be loud to be noticed. Our signature warmth comes from a curated mix of mossy greens and golden hues that mimic the softness of a sunset. We provide a serene visual field that highlights your natural glow, ensuring you command the room with a quiet, undeniable presence.",
    image: "/images/bg-hjb-wu-9.webp",
    // image: "/images/bg-hjb-wu-6.jpg",
  },
  {
    id: "3",
    title: "Timeless Distortion",
    subtitle:
      "Tradition isn't a museum piece; it’s a living, breathing thing. We’re reimagining what modest wear looks like in an urban context, blending high-street vibes with classic modesty. It’s a tribute to the woman who respects her roots while paving her own path in the contemporary world.",
    image: "/images/bg-hjb-wu-1.webp",
  },
  {
    id: "4",
    title: "Tactile Soul",
    subtitle:
      "Simply touching it will identify it as Baraka. We source materials that have weight and character, moving away from thin, disposable fabrics. There’s a specific kind of confidence that comes when your clothes feel substantial. You can truly feel the luxury.",
    image: "/images/bg-hjb-wu-4.jpg",
  },
];
