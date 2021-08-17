import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export type TransactionsType = {
  id: string;
  title: string;
  price: number;
  due_date: firebase.firestore.Timestamp;
  payment_date: firebase.firestore.Timestamp;
  created_at: firebase.firestore.Timestamp;
};

const initialState: TransactionsType[] = [];

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transactionsLoaded: (state, action: PayloadAction<TransactionsType[]>) => {
      return [...action.payload];
    },
  },
});

export const { transactionsLoaded } = transactionsSlice.actions;
