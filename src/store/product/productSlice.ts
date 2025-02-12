import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interface/product";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [] as Product[],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
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

export const { setProducts, setLoading, setError } = productSlice.actions;
