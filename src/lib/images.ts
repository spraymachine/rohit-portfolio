export type ImageCategory = "all" | "wildlife" | "automotive" | "portrait" | "events";

export interface PortfolioImage {
  src: string;
  alt: string;
  category: ImageCategory;
}

export interface GalleryItem {
  image: string;
  text: string;
}

// Curated landing page items for the Circular Gallery (from /img folder)
export const curatedItems: GalleryItem[] = [
  { image: "/portfolio/EAGLE.jpg", text: "Eagle" },
  { image: "/portfolio/MOTO-RACE-22.jpg", text: "Moto Race" },
  { image: "/portfolio/BIRD-NEW.png", text: "Bird" },
  { image: "/portfolio/IMG_3308-EDIT.jpg", text: "Portrait" },
  { image: "/portfolio/MIG-29K.jpg", text: "MIG 29K" },
  { image: "/portfolio/MONKEY.jpg", text: "Monkey" },
  { image: "/portfolio/MOTO-RACE-3-_2_.jpg", text: "Race Day" },
  { image: "/portfolio/IMG_5799-edit-1.jpg", text: "Cinematic" },
  { image: "/portfolio/gshock.jpg", text: "G-Shock" },
  { image: "/portfolio/IMG_0746-new.jpg", text: "The Shot" },
  { image: "/portfolio/IMG_2755-edit-2.jpg", text: "Golden Hour" },
  { image: "/portfolio/IMG_3311-EDIT.jpg", text: "Mood" },
  { image: "/portfolio/IMG_6502-EDIT.jpg-_1_.jpeg", text: "Contrast" },
  { image: "/portfolio/IMG_20240116_125019_899.jpg", text: "Moment" },
];

// Full portfolio items for the Dome Gallery (from /img folder)
export const portfolioImages: PortfolioImage[] = [
  // Wildlife
  { src: "/portfolio/EAGLE.jpg", alt: "Eagle", category: "wildlife" },
  { src: "/portfolio/BIRD-NEW.png", alt: "Bird", category: "wildlife" },
  { src: "/portfolio/MONKEY.jpg", alt: "Monkey", category: "wildlife" },

  // Automotive / Motorsport
  { src: "/portfolio/MOTO-RACE-22.jpg", alt: "Moto Race", category: "automotive" },
  { src: "/portfolio/MOTO-RACE-3-_2_.jpg", alt: "Race Day", category: "automotive" },
  { src: "/portfolio/MIG-29K.jpg", alt: "MIG 29K", category: "automotive" },

  // Portrait / Editorial
  { src: "/portfolio/IMG_3308-EDIT.jpg", alt: "Portrait", category: "portrait" },
  { src: "/portfolio/IMG_3311-EDIT.jpg", alt: "Mood", category: "portrait" },
  { src: "/portfolio/IMG_0746-new.jpg", alt: "The Shot", category: "portrait" },
  { src: "/portfolio/IMG_20240116_125019_899.jpg", alt: "Moment", category: "portrait" },

  // Product / Other
  { src: "/portfolio/gshock.jpg", alt: "G-Shock", category: "events" },
  { src: "/portfolio/IMG_5799-edit-1.jpg", alt: "Cinematic", category: "events" },
  { src: "/portfolio/IMG_2755-edit-2.jpg", alt: "Golden Hour", category: "events" },
  { src: "/portfolio/IMG_6502-EDIT.jpg-_1_.jpeg", alt: "Contrast", category: "events" },
  { src: "/portfolio/main.jpg", alt: "Main", category: "portrait" },
];

export function getFilteredImages(category: ImageCategory): PortfolioImage[] {
  if (category === "all") return portfolioImages;
  return portfolioImages.filter((img) => img.category === category);
}
