export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  favorites: string[];
  preferences: string[];
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  price: number;
  timestamp: string;
}

export const CATEGORIES = [
  "Running",
  "Cricket",
  "Football",
  "Gym",
  "Tennis",
  "Basketball"
];
