export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Cultural' | 'Unique' | 'Archive';
  origin: string;
  description: string;
  image: string;
  images?: string[];
  materials: string;
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}