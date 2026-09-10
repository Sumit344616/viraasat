export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  subtitle: string;
  founded: string;
  origin: string;
  description: string;
  editorialQuotes: {
    hero: string;
    craft: string;
    impact: string;
    cinematic: string;
  };
  contact: {
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    conciergePhone: string;
    email: string;
    pressEmail: string;
    businessEmail: string;
    instagram: string;
    instagramHandle: string;
    workingHours: string;
  };
  navigation: Array<{
    label: string;
    href: string;
    number: string;
    description: string;
  }>;
  curationHighlights: Array<{
    title: string;
    description: string;
  }>;
}

/**
 * CENTRALIZED BRAND DATA CONFIGURATION
 * 
 * To rebrand this experience for a client (e.g., Sabyasachi, Raw Mango, or an independent luxury atelier),
 * simply update the values in this file and data/collections.ts.
 * No UI components or structural layouts need to be rewritten.
 */
export const BRAND: BrandConfig = {
  name: "VIRAASAT",
  shortName: "VIRAASAT",
  tagline: "WEAVING STORIES INTO SILK.",
  subtitle: "Where heritage meets contemporary elegance.",
  founded: "1928",
  origin: "Varanasi & Kanchipuram, India",
  description:
    "An Indian couture textile house dedicated to the revival, preservation, and architectural elevation of handloom silk sarees. Every drape represents months of patient artistry by generational master weavers.",
  editorialQuotes: {
    hero: "Where heritage meets contemporary elegance.",
    craft: "Every fold carries a story. Every thread holds a lineage.",
    impact: "Elegance is not created. It is woven.",
    cinematic: "A saree is not simply worn. It is remembered.",
  },
  contact: {
    address: "74 Weaver's Enclave, Dashashwamedh Ghat Road",
    city: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    phone: "+91 542 245 8890",
    conciergePhone: "+91 98201 44520",
    email: "atelier@viraasat-couture.com",
    pressEmail: "press@viraasat-couture.com",
    businessEmail: "partnerships@viraasat-couture.com",
    instagram: "https://instagram.com/viraasat_couture",
    instagramHandle: "@viraasat_couture",
    workingHours: "Private Consultations by Appointment Only: Mon – Sat, 10:00 – 19:00 IST",
  },
  navigation: [
    {
      label: "COLLECTION",
      href: "#collection",
      number: "01",
      description: "Timeless silhouettes & handwoven silk creations",
    },
    {
      label: "CRAFT",
      href: "#craft",
      number: "02",
      description: "Generational looms and 24K pure gold zari alchemy",
    },
    {
      label: "HERITAGE",
      href: "#heritage",
      number: "03",
      description: "A storied lineage rooted in Varanasi and Kanchipuram",
    },
    {
      label: "STORY",
      href: "#story",
      number: "04",
      description: "The philosophy of mindful Indian couture",
    },
    {
      label: "CONTACT",
      href: "#contact",
      number: "05",
      description: "Private consultations & atelier commissions",
    },
  ],
  curationHighlights: [
    {
      title: "Generational Pit Looms",
      description: "Over 80 preserved antique wooden looms in historic weaving clusters.",
    },
    {
      title: "Certified 24K Pure Zari",
      description: "Electroplated pure silver core wrapped in fine tested 24-karat gold wire.",
    },
    {
      title: "Single-Artisan Provenance",
      description: "Each bespoke saree is entrusted to a single master weaver for its entire 12-week lifecycle.",
    },
  ],
};
