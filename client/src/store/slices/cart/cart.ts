import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  key?: string; // unique productId_size_color
  productId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, size, color, name, price, image, quantity } =
        action.payload;

      const key = `${productId}_${size}_${color}`; // unique key

      const existingKey = state.items.find((item) => item.key === key);
      if (existingKey) {
        existingKey.quantity += quantity;
      } else {
        state.items.push({
          key,
          productId,
          name,
          size,
          color,
          price,
          image,
          quantity,
        });
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingKey = state.items.find(
        (item) => item.key === action.payload
      );
      if (existingKey) {
        existingKey.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existing = state.items.find((item) => item.key === action.payload);

      if (existing && existing.quantity > 0) {
        existing.quantity -= 1;
      }

      if (existing?.quantity === 0) {
        state.items = state.items.filter((item) => item.key !== action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
