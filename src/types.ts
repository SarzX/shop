export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  available: boolean;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  collection: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  materials: string;
  category: 'tops' | 'bottoms' | 'accessories';
  images: string[];
  overlayImage?: string; // used for interactive model showcase
  colors: {
    name: string;
    value: string;
    swatchHex?: string;
    imageIndex: number;
  }[];
  sizes: {
    name: string;
    available: boolean;
  }[];
  variants: ProductVariant[];
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  collection: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}
