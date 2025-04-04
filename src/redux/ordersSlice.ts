import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: Order['status'] }>
    ) => {
      const order = state.orders.find(
        order => order.id === action.payload.orderId
      );
      if (order) {
        order.status = action.payload.status;
        if (state.currentOrder?.id === order.id) {
          state.currentOrder.status = action.payload.status;
        }
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { placeOrder, updateOrderStatus, clearCurrentOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer; 