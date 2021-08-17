import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { transactionsSlice } from "./features/transactions.slice";

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
