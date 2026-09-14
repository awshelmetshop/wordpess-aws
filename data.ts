import { Product } from "./types";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "ProRide X3 Carbon Full-Face Helmet",
    sku: "HL-PRX3-CB",
    category: "helmet",
    subcategory: "full-face",
    price: 5500,
    originalPrice: 7200,
    stock: 14,
    description: "The ProRide X3 Carbon is an advanced aerodynamic professional grade helmet. Crafted with lightweight reinforced ABS shell with carbon weave print finishing. Featuring a high-definition double anti-fog visor system, five front/rear active vents for heat control, and thick hypoallergenic, fully removable washable padding. ECE 22.06 and DOT approved, making it the safest companion on speedways and standard roads.",
    shortDescription: "Original ECE certified full-face racing helmet with Double UV Visor, Multi-channel vents, and emergency strap release.",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600",
    additionalImages: [
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1627556554580-be02db7b3f94?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.8,
    reviewCount: 128,
    brand: "ProRide",
    sizeOptions: ["S", "M", "L", "XL", "XXL"],
    colorOptions: [
      { name: "Raw Carbon Black", hex: "#1A1A1A" },
      { name: "Racing Orange", hex: "#FF6B00" },
      { name: "Neon Yellow", hex: "#CCFF00" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Template placeholder video URL
    isFlashSale: true,
    isBestSeller: true,
    hasFreeDelivery: true,
    attributes: {
      weight: "1.35 kg ± 50g",
      material: "Reinforced ABS Composite Shell",
      certification: "ECE 22.06 & DOT Certified",
      ventilation: "5 Active Vents (3 Intake, 2 Exhaust)",
      visor: "Dual Visor (Outer Clear Pinlock-Ready, Inner Smoked Drop-down)"
    },
    reviews: [
      { id: "r1", name: "Md. Kausar Rahman", date: "2026-05-18", rating: 5, comment: " helmet builds premium, fits perfectly on L size. Long highway ride a speed sound check custom standard perfectly.", verified: true },
      { id: "r2", name: "Rider Anik", date: "2026-05-12", rating: 4, comment: "Excellent ventilation. Outer visor is crystal clear. Delivery inside Dhaka took only 1 day. Highly satisfied!", verified: true },
      { id: "r3", name: "Sufian Chowdhury", date: "2026-04-30", rating: 5, comment: "I crash tested this unfortunately. It saved my skull completely! Re-ordering another orange one.", verified: true }
    ]
  },
  {
    id: "2",
    name: "SpeedMax GP-1 Multi-Vent Racing Helmet",
    sku: "HL-SMGP1-RW",
    category: "helmet",
    subcategory: "full-face",
    price: 8200,
    originalPrice: 10500,
    stock: 4,
    description: "Engineered specifically for high velocity stability, the SpeedMax GP-1 features a drag-reduction rear spoiler that eliminates helmet buffet at speeds over 120km/h. Thick, emergency quick-release antibacterial cheek pads, gold-mirrored high contrast visor, and ultra-durable multi-intake ports. Ideal for sport riders and track-day enthusiasts.",
    shortDescription: "Aerodynamic track helmet with active rear spoiler, gold-iridium Pinlock shield, and hypoallergenic emergency liners.",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600",
    additionalImages: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewCount: 64,
    brand: "SpeedMax",
    sizeOptions: ["M", "L", "XL"],
    colorOptions: [
      { name: "Matt Red White", hex: "#C026D3" },
      { name: "Stealth Grey", hex: "#4B5563" }
    ],
    isFlashSale: true,
    isNew: true,
    hasFreeDelivery: true,
    attributes: {
      weight: "1.28 kg",
      material: "Fiberglass Kelvar Matrix Shell",
      certification: "ECE 22.06 / SHARP 5-Star",
      ventilation: "6 High-Flow Core Ports",
      visor: "Gold Mirrored Anti-scratch Shield"
    },
    reviews: [
      { id: "rv1", name: "Tanvir Ahmed", date: "2026-06-01", rating: 5, comment: "The best premium helmet I have ever owned. High-speed wind noise is surprisingly low. Well spent 8k!", verified: true }
    ]
  },
  {
    id: "3",
    name: "Vega Crux Half-Face Sun Visor Helmet",
    sku: "HL-VG-CRUX",
    category: "helmet",
    subcategory: "half-face",
    price: 1800,
    originalPrice: 2200,
    stock: 25,
    description: "Designed for daily city commutes, the Vega Crux provides unbeatable comfort and ventilation for hot Bangladeshi summers. Lightweight structure with a scratch-resistant wide panoramic visor that blocks 99% UV rays. Includes silent quick-lock chin buckle and high density EPS safety inner liner.",
    shortDescription: "Ultra-ventilated, lightweight half-face helmet with automatic drop-down visor. Perfect for office/city commute.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
    additionalImages: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.5,
    reviewCount: 92,
    brand: "Vega",
    sizeOptions: ["S", "M", "L", "XL"],
    colorOptions: [
      { name: "Matt Black", hex: "#222" },
      { name: "Glossy White", hex: "#FFF" }
    ],
    isBestSeller: true,
    attributes: {
      weight: "1.05 kg",
      material: "High Impact ABS Shell",
      certification: "ISI Certified",
      ventilation: "Open Air Intake Vent System",
      visor: "Scratch-resistant Clear Visor"
    },
    reviews: []
  },
  {
    id: "4",
    name: "SMK Glide Modular Flip-up Helmet",
    sku: "HL-SMK-GLIDE",
    category: "helmet",
    subcategory: "modular",
    price: 4500,
    originalPrice: 5200,
    stock: 8,
    description: "The ultimate versatility of modular mechanism: instantly convert from a secure protective full-face to a convenient breezy open-face helmet. Crafted with robust dual P/J dual-homologation lock safety systems, soft moisture-wicking premium liners, and integrated sunglasses selector. Ideal for long-distance cruising.",
    shortDescription: "Original SMK modular helmet with secure double flip-lock, internal sun-shield and Bluetooth speaker pockets.",
    image: "https://images.unsplash.com/photo-1627556554580-be02db7b3f94?auto=format&fit=crop&q=80&w=600",
    additionalImages: [
      "https://images.unsplash.com/photo-1627556554580-be02db7b3f94?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.6,
    reviewCount: 48,
    brand: "SMK",
    sizeOptions: ["M", "L", "XL"],
    colorOptions: [
      { name: "Anthracite Pearl", hex: "#374151" }
    ],
    hasFreeDelivery: true,
    attributes: {
      weight: "1.58 kg",
      material: "Dual Layer Thermoplastic Shell",
      certification: "ECE 22.05 P/J Homologated",
      ventilation: "Vortex Air Exchangers",
      visor: "Dual (Anti-scratch clear, Anti-UV drop-down)"
    },
    reviews: []
  },
  {
    id: "5",
    name: "Studds Cub Kids Motor Helmet",
    sku: "HL-ST-CUB",
    category: "helmet",
    subcategory: "baby",
    price: 1200,
    originalPrice: 1500,
    stock: 12,
    description: "Keep your child safe during rides. The Studds Cub Kids features light, kids-appropriate composite structures that prevent neck fatigue, soft velvet liners, and a quick-release micro buckle perfectly sized for secure strapping. Fully decorated with eco-friendly vibrant cartoon theme accents.",
    shortDescription: "Ultra-safe child motorcycle helmet with neck fatigue protection. Soft hypoallergenic lining.",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80&w=600",
    additionalImages: [
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.7,
    reviewCount: 37,
    brand: "Studds",
    sizeOptions: ["S", "M"],
    colorOptions: [
      { name: "Flame Red", hex: "#DC2626" },
      { name: "Sky Blue", hex: "#2563EB" }
    ],
    isNew: true,
    attributes: {
      weight: "850g ± 30g",
      material: "High Impact Grade Thermoplastic",
      certification: "ISI Certified",
      ventilation: "Integrated Top Vents",
      visor: "Clear Panoramic Eye-Shield"
    },
    reviews: []
  },
  {
    id: "6",
    name: "Universal Neon Dual LED Strips Kit",
    sku: "DC-LED-RGB",
    category: "decoration",
    subcategory: "lights",
    price: 1200,
    originalPrice: 1600,
    stock: 30,
    description: "Make your motorcycle stand out in dark environments. This set features 4 waterproof, impact-resistant flexible adhesive led tubes running wireless controller settings. Supports 16 colors, speed adjustments, sound sync rhythms, and directly wires into standard 12V motorcycle battery leads.",
    shortDescription: "12V Waterproof RGB underglow strip lights with wireless remote & sound-sensor pulse technology.",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600",
    additionalImages: [],
    rating: 4.4,
    reviewCount: 154,
    brand: "MotoGlow",
    colorOptions: [
      { name: "Full RGB Spectrum", hex: "#FF007F" }
    ],
    isFlashSale: true,
    attributes: {
      weight: "180g",
      material: "Double-sealed Polycarbonate Cover",
      certification: "IP68 Waterproof Rate",
      ventilation: "Thermal Dissipating Silicon Core"
    },
    reviews: []
  },
  {
    id: "7",
    name: "DID Gold O-Ring Drive Chain & Sprocket Kit",
    sku: "SP-DID-GOLD",
    category: "spare-parts",
    subcategory: "chain",
    price: 4800,
    originalPrice: 6000,
    stock: 6,
    description: "The gold standard of reliability. Original DID Japanese technology featuring double vacuum-lubricated active O-rings. Minimizes friction, avoids chain stretch, and delivers maximum torque efficiency to your rear wheels. Kit includes low weight high carbon rear & front sprockets optimized for Japanese/Indian sport bikes.",
    shortDescription: "Japan DID vacuum-sealed gold chain and rust-resistant high tensile steel sprocket kit. High longevity.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600",
    additionalImages: [],
    rating: 4.9,
    reviewCount: 78,
    brand: "D.I.D Japan",
    isBestSeller: true,
    hasFreeDelivery: true,
    attributes: {
      weight: "2.3 kg",
      material: "High Carbon Heat-Treated Chromoly Steel",
      certification: "JASO Standard Approved"
    },
    reviews: []
  },
  {
    id: "8",
    name: "Alpinestars T-GP Armored Riding Jacket",
    sku: "RG-AP-TGP",
    category: "riding-gear",
    subcategory: "jackets",
    price: 18500,
    originalPrice: 22000,
    stock: 3,
    description: "Superior protection for professional riders. Engineered with multi-fabric shells, highly durable 600D poly-fabric panels, and strategically placed mesh zones for breezy summer flows. Complete with certified Bio Armor shoulder and elbow defenders and adjustable strap locks. Sleek, sporty, and exceptionally rugged.",
    shortDescription: "Heavy-duty 600D cordura armor jacket with removable thermal liner and Nucleon flex armor insert pads.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
    additionalImages: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewCount: 35,
    brand: "Alpinestars",
    sizeOptions: ["M", "L", "XL", "XXL"],
    colorOptions: [
      { name: "Matt Black Red", hex: "#C026D3" },
      { name: "High-Viz White Grey", hex: "#E5E7EB" }
    ],
    isNew: true,
    hasFreeDelivery: true,
    attributes: {
      weight: "2.1 kg",
      material: "600D Polyurethane Coated Cordura",
      certification: "CE Level 1 Bio Armor Protectors"
    },
    reviews: []
  },
  {
    id: "9",
    name: "Scoyco MC29 Summer Breathable Gloves",
    sku: "RG-SC-MC29",
    category: "riding-gear",
    subcategory: "gloves",
    price: 1200,
    originalPrice: 1500,
    stock: 45,
    description: "Highly breathable, stylish protective warm-weather riding gloves. Built with injection molded rubber knuckles, double layer palm reinforcement patches, and capacitive fingertip threading for seamless touch screen usage on mobile phones mounts.",
    shortDescription: "Daily rider mesh grip gloves with touchscreen compatibility and armored knuckle shields.",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    additionalImages: [],
    rating: 4.7,
    reviewCount: 198,
    brand: "Scoyco",
    sizeOptions: ["M", "L", "XL"],
    colorOptions: [
      { name: "Triple Black", hex: "#111" },
      { name: "Cyber Orange", hex: "#FF6B00" }
    ],
    isBestSeller: true,
    attributes: {
      weight: "200g pair",
      material: "Lycra Mesh Fabric & Rubber Shields",
      certification: "CE Approved Protection"
    },
    reviews: []
  },
  {
    id: "10",
    name: "ProX Brake Pads (High Durability)",
    sku: "SP-PROX-BP",
    category: "spare-parts",
    subcategory: "brakes",
    price: 850,
    originalPrice: 1100,
    stock: 50,
    description: "Ensures precise braking and quick heat dissipation. Formulated with sintered organic-ceramic composite standard matrix that avoids brake rotor damage while giving instant responsive friction. Best for daily urban riders navigating fast traffic intersections.",
    shortDescription: "Sintered ceramic high friction front disc brake pads. Extreme braking response.",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600",
    additionalImages: [],
    rating: 4.6,
    reviewCount: 42,
    brand: "ProX",
    attributes: {
      weight: "140g",
      material: "Sintered Copper & Semi-Metallic Ceramic",
      certification: "ISO 9001 Sourcing Quality"
    },
    reviews: []
  },
  {
    id: "11",
    name: "Kawasaki Custom Reflective Sticker Pack",
    sku: "DC-KW-STICKER",
    category: "decoration",
    subcategory: "stickers",
    price: 650,
    originalPrice: 900,
    stock: 100,
    description: "Premium self-adhesive stickers with intense night reflection capability. Water-resistant, UV-proof materials that will not fade or peel away during heavy monsoon rains. Featuring pre-cut shapes custom shaped for engine tanks, helmets, and side panels panels.",
    shortDescription: "High-grade reflective monster neon vinyl graphics sticker sheet pack. Waterproof & sun-proof.",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600",
    additionalImages: [],
    rating: 4.5,
    reviewCount: 31,
    brand: "AeroStick",
    isNew: true,
    attributes: {
      weight: "50g",
      material: "3M Reflective Micro-Prismatic Adhesive Vinyl"
    },
    reviews: []
  },
  {
    id: "12",
    name: "Speedy-Biker Waterproof Touring Boots",
    sku: "RG-SB-BOOTS",
    category: "riding-gear",
    subcategory: "boots",
    price: 6800,
    originalPrice: 8500,
    stock: 5,
    description: "Conquer any terrain. Speedy-Biker high protection boots are layered with genuine water-resistant action leather and sealed double membranes. Features built-in TPU ankle shield, non-slip heavy duty rubber tread soles, and gear-shift patch layers to prevent boot scuffing.",
    shortDescription: "CE certified waterproof adventure touring boots featuring side zip and steel shank reinforcements.",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600",
    additionalImages: [],
    rating: 4.8,
    reviewCount: 22,
    brand: "Speedy-Biker",
    sizeOptions: ["41", "42", "43", "44"],
    hasFreeDelivery: true,
    attributes: {
      weight: "1.6 kg",
      material: "Waterproof Microfiber Action Leather & Nylon Fibers",
      certification: "CE EN13634 Certified Protective Footwear"
    },
    reviews: []
  }
];

export const BRANDS = ["ProRide", "SpeedMax", "Vega", "SMK", "Studds", "MotoGlow", "D.I.D Japan", "Alpinestars", "Scoyco", "ProX", "AeroStick", "Speedy-Biker"];
