export type ImageCategory =
  | "all"
  | "automotive"
  | "wildlife"
  | "product"
  | "portrait"
  | "landscape";

export interface PortfolioImage {
  src: string;
  alt: string;
  category: Exclude<ImageCategory, "all">;
}

export interface GalleryItem {
  image: string;
  text: string;
}

const basePath = process.env.NODE_ENV === "production" ? "/rohit-portfolio" : "";

export function getAssetPath(path: string): string {
  return `${basePath}${path}`;
}

// Curated landing page items for the Circular Gallery (Selected Works — original full-res)
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

// Full portfolio items for the Dome Gallery — categorised thumbs
export const portfolioImages: PortfolioImage[] = [
  // Automotive
  { src: getAssetPath("/portfolio/thumb/automotive/IMG_2755_edit_2.webp"), alt: "Auto 2755", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/IMG_3308_EDIT.webp"), alt: "Auto 3308", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/MIG_29K.webp"), alt: "MIG 29K", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/MOTO_RACE_22.webp"), alt: "Moto Race 22", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/MOTO_RACE_3_2.webp"), alt: "Moto Race 3", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/WhatsApp_Image_2026_04_27_at_11_54_25.webp"), alt: "Auto 25", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/WhatsApp_Image_2026_04_27_at_11_54_27_3.webp"), alt: "Auto 27-3", category: "automotive" },
  { src: getAssetPath("/portfolio/thumb/automotive/main.webp"), alt: "Main", category: "automotive" },

  // Landscape
  { src: getAssetPath("/portfolio/thumb/landscape/IMG_0746_new.webp"), alt: "Landscape 0746", category: "landscape" },
  { src: getAssetPath("/portfolio/thumb/landscape/WhatsApp_Image_2026_04_27_at_11_54_11.webp"), alt: "Landscape 11", category: "landscape" },
  { src: getAssetPath("/portfolio/thumb/landscape/WhatsApp_Image_2026_04_27_at_11_54_13.webp"), alt: "Landscape 13", category: "landscape" },
  { src: getAssetPath("/portfolio/thumb/landscape/WhatsApp_Image_2026_04_27_at_11_54_14.webp"), alt: "Landscape 14", category: "landscape" },
  { src: getAssetPath("/portfolio/thumb/landscape/WhatsApp_Image_2026_04_27_at_11_54_19.webp"), alt: "Landscape 19", category: "landscape" },
  { src: getAssetPath("/portfolio/thumb/landscape/WhatsApp_Image_2026_04_27_at_11_54_20.webp"), alt: "Landscape 20", category: "landscape" },

  // Portrait
  { src: getAssetPath("/portfolio/thumb/portrait/IMG_20240116_125019_899.webp"), alt: "Portrait 20240116", category: "portrait" },
  { src: getAssetPath("/portfolio/thumb/portrait/IMG_5799_edit_1.webp"), alt: "Cinematic", category: "portrait" },

  // Product
  { src: getAssetPath("/portfolio/thumb/product/WhatsApp_Image_2026_04_27_at_11_54_16.webp"), alt: "Product 16", category: "product" },
  { src: getAssetPath("/portfolio/thumb/product/WhatsApp_Image_2026_04_27_at_11_54_17.webp"), alt: "Product 17", category: "product" },
  { src: getAssetPath("/portfolio/thumb/product/gshock.webp"), alt: "G-Shock", category: "product" },

  // Wildlife
  { src: getAssetPath("/portfolio/thumb/wildlife/BIRD_NEW.webp"), alt: "Bird", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/EAGLE.webp"), alt: "Eagle", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_2436_edit_new.webp"), alt: "Wildlife 2436", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3287_edit_new.webp"), alt: "Wildlife 3287", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3287_edit_new1.webp"), alt: "Wildlife 3287 alt", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3617_edit.webp"), alt: "Wildlife 3617", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3633_edit.webp"), alt: "Wildlife 3633", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3640_edit.webp"), alt: "Wildlife 3640", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3679_edit.webp"), alt: "Wildlife 3679", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3680_edit.webp"), alt: "Wildlife 3680", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3721_edit1.webp"), alt: "Wildlife 3721", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3738_edit.webp"), alt: "Wildlife 3738", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3766_edit_1.webp"), alt: "Wildlife 3766", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3795_EDIT.webp"), alt: "Wildlife 3795", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3804_edit_Copy.webp"), alt: "Wildlife 3804", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3807_edit_Copy.webp"), alt: "Wildlife 3807", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3813_edit2.webp"), alt: "Wildlife 3813", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3825_edit.webp"), alt: "Wildlife 3825", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3835_edit.webp"), alt: "Wildlife 3835", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3853_edit.webp"), alt: "Wildlife 3853", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3930_edit_2.webp"), alt: "Wildlife 3930", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3936_edit.webp"), alt: "Wildlife 3936", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3965_edit.webp"), alt: "Wildlife 3965", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_3996_editnew.webp"), alt: "Wildlife 3996", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4047_EDIT_1.webp"), alt: "Wildlife 4047", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4050_edit.webp"), alt: "Wildlife 4050", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4068_edit.webp"), alt: "Wildlife 4068", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4068_edit_1.webp"), alt: "Wildlife 4068 alt", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4073_edit.webp"), alt: "Wildlife 4073", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4086_edit1.webp"), alt: "Wildlife 4086", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4129_EDIT.webp"), alt: "Wildlife 4129", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4142_edit.webp"), alt: "Wildlife 4142", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4151_edit_1.webp"), alt: "Wildlife 4151", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4175_EDIT_1.webp"), alt: "Wildlife 4175", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_4237_Edit_1.webp"), alt: "Wildlife 4237", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_5595_edit.webp"), alt: "Wildlife 5595", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_5646_edit.webp"), alt: "Wildlife 5646", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_5737_edit_new.webp"), alt: "Wildlife 5737", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/IMG_6502_EDIT_jpg_1.webp"), alt: "Wildlife 6502", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/MONKEY.webp"), alt: "Monkey", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/WhatsApp_Image_2026_04_27_at_11_54_26.webp"), alt: "Wildlife 26", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/WhatsApp_Image_2026_04_27_at_11_54_26_1.webp"), alt: "Wildlife 26-1", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/WhatsApp_Image_2026_04_27_at_11_54_27.webp"), alt: "Wildlife 27", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/WhatsApp_Image_2026_04_27_at_11_54_27_1.webp"), alt: "Wildlife 27-1", category: "wildlife" },
  { src: getAssetPath("/portfolio/thumb/wildlife/WhatsApp_Image_2026_04_27_at_11_54_27_2.webp"), alt: "Wildlife 27-2", category: "wildlife" },
];

export function getFilteredImages(category: ImageCategory): PortfolioImage[] {
  if (category === "all") return portfolioImages;
  return portfolioImages.filter((img) => img.category === category);
}
