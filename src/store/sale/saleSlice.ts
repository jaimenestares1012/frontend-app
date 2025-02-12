import { createSlice } from "@reduxjs/toolkit";
import { Sale } from "../../interface/sale";

export const saleSlice = createSlice({
  name: "sale",
  initialState: {
    sales: [] as Sale[],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setSales: (state, { payload }) => {
      state.sales = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.isError = payload.isError;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const { setSales, setLoading, setError } = saleSlice.actions;
