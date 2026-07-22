import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../features/wallets/walletSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
reducer: {
  wallets: walletReducer,
  theme: themeReducer,
},
});