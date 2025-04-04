import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.foodItem.id === action.payload.foodItem.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce(
        (total, item) => total + item.foodItem.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.foodItem.id !== action.payload
      );
      state.total = state.items.reduce(
        (total, item) => total + item.foodItem.price * item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(
        item => item.foodItem.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (total, item) => total + item.foodItem.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer; 