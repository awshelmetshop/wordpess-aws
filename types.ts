export interface ProductAttributes {
  weight?: string;
  material?: string;
  certification?: string;
  ventilation?: string;
  visor?: string;
  [key: string]: string | undefined;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: "helmet" | "decoration" | "spare-parts" | "riding-gear";
  subcategory: string; // e.g., "full-face", "half-face", "modular", "baby", "stickers", "lights", "engine", "brakes", "jackets", "gloves"
  price: number;
  originalPrice?: number;
  stock: number; // units available
  description: string;
  shortDescription: string;
  image: string;
  additionalImages: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  brand: string;
  sizeOptions?: string[]; // e.g. ["S", "M", "L", "XL", "XXL"]
  colorOptions?: { name: string; hex: string; image?: string }[];
  videoUrl?: string; // YouTube or MP4 url
  isFlashSale?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  hasFreeDelivery?: boolean;
  attributes: ProductAttributes;
}

export interface CartItem {
  id: string; // compounded id: productId-size-color
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  paymentMethod: "cod" | "bkash" | "nagad" | "sslcommerz";
  transactionId?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: "placed" | "confirmed" | "packed" | "shipped" | "delivered";
  trackingCode: string;
}
