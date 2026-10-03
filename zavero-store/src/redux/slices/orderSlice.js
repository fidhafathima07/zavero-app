import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  getOrders,
} from "../../services/orderService";

// PLACE ORDER
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (order) => {
    return await createOrder(order);
  }
);

// GET USER ORDERS
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId) => {
    return await getOrders(userId);
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // PLACE ORDER
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders.push(action.payload);
      })

      .addCase(placeOrder.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to place order";
      })

      // FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load orders";
      });
  },
});

export const { clearOrders } = orderSlice.actions;

export default orderSlice.reducer;