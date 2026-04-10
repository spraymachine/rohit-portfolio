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

const basePath = process.env.NODE_ENV === "production" ? "/rohit-portfolio" : "";

export function getAssetPath(path: string): string {
  return `${basePath}${path}`;
}

// Curated landing page items for the Circular Gallery (from /img folder)
export const curatedItems: GalleryItem[] = [
  { image: getAssetPath("/portfolio/EAGLE.jpg"), text: "Eagle" },
  { image: getAssetPath("/portfolio/MOTO-RACE-22.jpg"), text: "Moto Race" },
  { image: getAssetPath("/portfolio/BIRD-NEW.png"), text: "Bird" },
  { image: getAssetPath("/portfolio/IMG_3308-EDIT.jpg"), text: "Portrait" },
  { image: getAssetPath("/portfolio/MIG-29K.jpg"), text: "MIG 29K" },
  { image: getAssetPath("/portfolio/MONKEY.jpg"), text: "Monkey" },
  { image: getAssetPath("/portfolio/MOTO-RACE-3-_2_.jpg"), text: "Race Day" },
  { image: getAssetPath("/portfolio/IMG_5799-edit-1.jpg"), text: "Cinematic" },
  { image: getAssetPath("/portfolio/gshock.jpg"), text: "G-Shock" },
  { image: getAssetPath("/portfolio/IMG_0746-new.jpg"), text: "The Shot" },
  { image: getAssetPath("/portfolio/IMG_2755-edit-2.jpg"), text: "Golden Hour" },
  { image: getAssetPath("/portfolio/IMG_3311-EDIT.jpg"), text: "Mood" },
  { image: getAssetPath("/portfolio/IMG_6502-EDIT.jpg-_1_.jpeg"), text: "Contrast" },
  { image: getAssetPath("/portfolio/IMG_20240116_125019_899.jpg"), text: "Moment" },
];

// Full portfolio items for the Dome Gallery (from /img folder)
export const portfolioImages: PortfolioImage[] = [
  // Wildlife
  { src: getAssetPath("/portfolio/EAGLE.jpg"), alt: "Eagle", category: "wildlife" },
  { src: getAssetPath("/portfolio/BIRD-NEW.png"), alt: "Bird", category: "wildlife" },
  { src: getAssetPath("/portfolio/MONKEY.jpg"), alt: "Monkey", category: "wildlife" },

  // Automotive / Motorsport
  { src: getAssetPath("/portfolio/MOTO-RACE-22.jpg"), alt: "Moto Race", category: "automotive" },
  { src: getAssetPath("/portfolio/MOTO-RACE-3-_2_.jpg"), alt: "Race Day", category: "automotive" },
  { src: getAssetPath("/portfolio/MIG-29K.jpg"), alt: "MIG 29K", category: "automotive" },

  // Portrait / Editorial
  { src: getAssetPath("/portfolio/IMG_3308-EDIT.jpg"), alt: "Portrait", category: "portrait" },
  { src: getAssetPath("/portfolio/IMG_3311-EDIT.jpg"), alt: "Mood", category: "portrait" },
  { src: getAssetPath("/portfolio/IMG_0746-new.jpg"), alt: "The Shot", category: "portrait" },
  { src: getAssetPath("/portfolio/IMG_20240116_125019_899.jpg"), alt: "Moment", category: "portrait" },

  // Product / Other
  { src: getAssetPath("/portfolio/gshock.jpg"), alt: "G-Shock", category: "events" },
  { src: getAssetPath("/portfolio/IMG_5799-edit-1.jpg"), alt: "Cinematic", category: "events" },
  { src: getAssetPath("/portfolio/IMG_2755-edit-2.jpg"), alt: "Golden Hour", category: "events" },
  { src: getAssetPath("/portfolio/IMG_6502-EDIT.jpg-_1_.jpeg"), alt: "Contrast", category: "events" },
  { src: getAssetPath("/portfolio/main.jpg"), alt: "Main", category: "portrait" },
];

export function getFilteredImages(category: ImageCategory): PortfolioImage[] {
  if (category === "all") return portfolioImages;
  return portfolioImages.filter((img) => img.category === category);
}
