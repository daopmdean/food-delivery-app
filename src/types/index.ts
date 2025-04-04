export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurantId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'onTheWay' | 'delivered';
  restaurantId: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
} 