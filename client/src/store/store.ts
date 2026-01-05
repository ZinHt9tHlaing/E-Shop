import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth";
import cartReducer from "./slices/cart/cart";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
