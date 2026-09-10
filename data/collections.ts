export interface CollectionItem {
  id: string;
  number: string;
  name: string;
  tag: string;
  category: string;
  origin: string;
  weaveTime: string;
  zariPurity: string;
  description: string;
  image: string;
  aspect: string;
  accent: string;
}

export interface SignaturePiece {
  id: string;
  title: string;
  edition: string;
  craft: string;
  timeframe: string;
  quote: string;
  image: string;
  tag: string;
}

export interface HeritageChapter {
  number: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  text: string;
  detail: string;
  image: string;
}

export interface CraftPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: "silk",
    number: "01",
    name: "THE ROYAL KADWA",
    tag: "SILK",
    category: "Banarasi Pure Katan Silk",
    origin: "Varanasi, Uttar Pradesh",
    weaveTime: "110 Working Days",
    zariPurity: "Certified 24K Tested Zari",
    description:
      "A transcendent celebration of the ancient Kadwa technique, where each floral motif is individually engraved and woven into pure mulberry silk without loose floats on the reverse.",
    image: "/images/hero_model.jpg",
    aspect: "portrait",
    accent: "#8F1D2C",
  },
  {
    id: "banarasi",
    number: "02",
    name: "SHIKARGAH HERITAGE",
    tag: "BANARASI",
    category: "Jangla Floral Brocade",
    origin: "Madannpura Loom Cluster",
    weaveTime: "140 Working Days",
    zariPurity: "Pure Muted Antique Zari",
    description:
      "Echoing royal hunting tapestries of the 16th century Mughal courts, this masterpiece features an unbroken jaal of hand-twisted golden floral creepers across deep vermillion warp.",
    image: "/images/banarasi.jpg",
    aspect: "close-up",
    accent: "#B89A5A",
  },
  {
    id: "organza",
    number: "03",
    name: "WHISPER KORA",
    tag: "ORGANZA",
    category: "Sheer Organza Silk",
    origin: "Chanderi & Varanasi",
    weaveTime: "75 Working Days",
    zariPurity: "Featherweight Silver-Gilt",
    description:
      "An architectural play on weightlessness. Ultra-fine gossamer silk organza embellished with painstaking French wire zardozi embroidery that appears to levitate with the body's movement.",
    image: "/images/organza.jpg",
    aspect: "sculptural",
    accent: "#D8CBB8",
  },
  {
    id: "handwoven",
    number: "04",
    name: "TEMPLE KANJEEVARAM",
    tag: "HANDWOVEN",
    category: "Korvai Triple-Shuttle",
    origin: "Kanchipuram, Tamil Nadu",
    weaveTime: "95 Working Days",
    zariPurity: "Traditional Red-Gold Zari",
    description:
      "Engineered with interlocking Korvai seams connecting emerald green field to deep carmine borders. Woven on double-pedal pit looms with sacred gopuram temple spires.",
    image: "/images/kanjeevaram.jpg",
    aspect: "editorial",
    accent: "#11100F",
  },
];

export const SIGNATURE_COLLECTIONS: SignaturePiece[] = [
  {
    id: "sig-1",
    title: "THE IMPERIAL SHIKARGAH",
    edition: "Private Archive • Edition 01 of 03",
    craft: "Pure Gold Kadwa Brocade",
    timeframe: "6 Months Handcrafting",
    quote: "A symphony of nine thousand individually guided warp threads.",
    image: "/images/macro_pleats.jpg",
    tag: "ARCHIVE PIECE",
  },
  {
    id: "sig-2",
    title: "THE MIDNIGHT GOBELIN",
    edition: "Couture Commission",
    craft: "Reversible Katan Silk Weave",
    timeframe: "4 Months Handcrafting",
    quote: "Deep obsidian tones kissed by antique bullion thread.",
    image: "/images/zari_macro.jpg",
    tag: "BESPOKE ONLY",
  },
  {
    id: "sig-3",
    title: "THE SHIVAM GUDI",
    edition: "Temple Series 2026",
    craft: "Interlocking Korvai Handloom",
    timeframe: "5 Months Handcrafting",
    quote: "Temple geometry preserved across four generations of master hands.",
    image: "/images/tussar.jpg",
    tag: "LIMITED EDITION",
  },
];

export const HERITAGE_CHAPTERS: HeritageChapter[] = [
  {
    number: "01",
    title: "THE SACRED WEAVES OF VARANASI",
    subtitle: "The Timeless River & The First Loom",
    location: "Kashi Ghats, India",
    year: "Est. 1928",
    text: "For centuries, the spiritual mist of the Ganges has mingled with the rhythmic clatter of pit looms in the labyrinthine alleys of Varanasi. Here, textile weaving is not an occupation—it is a spiritual devotion passed down through sacred lineages.",
    detail: "Over 80 conserved pit looms operating in centuries-old stone ateliers.",
    image: "/images/varanasi_ghats.jpg",
  },
  {
    number: "02",
    title: "THE ANCIENT LOOMS",
    subtitle: "The Hand of the Master Artisan",
    location: "Madannpura Guild",
    year: "Generation IV",
    text: "Every shuttle thrown carries decades of instinctive tactile knowledge. A master weaver feels tension down to a fraction of a gram, ensuring the drape falls like liquid gold rather than stiff cloth.",
    detail: "Each masterpiece requires between 80 to 140 days of continuous single-weaver focus.",
    image: "/images/artisan_loom.jpg",
  },
  {
    number: "03",
    title: "PURE 24K ZARI ALCHEMY",
    subtitle: "The Lost Metallurgical Art",
    location: "Surat & Varanasi Zari Guilds",
    year: "Certified Pure",
    text: "True luxury accepts no synthetic substitutes. Our zari begins with certified pure silver flattened into delicate ribbons, wrapped microscopically around natural silk filaments, and electro-gilded with 24-karat molten gold.",
    detail: "Tested for lifetime heirlooms that gain patina, never tarnish.",
    image: "/images/zari_macro.jpg",
  },
  {
    number: "04",
    title: "THE LIVING REIMAGINING",
    subtitle: "Textile As Modern Architecture",
    location: "Global Ateliers",
    year: "Present Day",
    text: "We do not replicate the past; we liberate it. By pairing royal heritage weaves with contemporary silhouettes, minimalist draping, and architectural balance, we create timeless heirlooms for the world's most discerning patrons.",
    detail: "Worn by connoisseurs across New York, London, Milan, Mumbai, and Paris.",
    image: "/images/film_still.jpg",
  },
];

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    number: "01",
    title: "HANDWOVEN EXCLUSIVITY",
    subtitle: "Zero automated machine interference",
    description:
      "Every millimeter of our silk is created through human touch on wooden handlooms. The slight organic variance in tension gives the saree its irreplaceable soulful character.",
    metric: "100%",
    metricLabel: "Pure Manual Loom Work",
  },
  {
    number: "02",
    title: "ARTISAN PATRONAGE",
    subtitle: "Preserving multi-generational families",
    description:
      "We champion our master weavers as esteemed couturiers, providing lifetime medical coverage, heritage preservation pensions, and full attribution for every commissioned heirloom.",
    metric: "120+",
    metricLabel: "Generational Weaving Families",
  },
  {
    number: "03",
    title: "CERTIFIED MATERIALS",
    subtitle: "Mulberry Silk & Tested 24K Bullion",
    description:
      "We source only Grade 6A non-toxic mulberry silk yarns alongside pure certified silver-gold bullion zari that will never peel, shed, or lose its majestic weight.",
    metric: "Grade 6A",
    metricLabel: "Mulberry Silk Filament",
  },
  {
    number: "04",
    title: "DETAIL OBSESSED",
    subtitle: "Flawless selvedge and hidden finish",
    description:
      "From hand-knotted silk tassels to invisible rolled hems and signature serial numbering woven into the pallu reverse, no detail is ever compromised.",
    metric: "140",
    metricLabel: "Days Average Loom Time",
  },
];
