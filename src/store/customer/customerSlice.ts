import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../interface/customer";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [] as Customer[],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setCustomers: (state, { payload }) => {
      state.customers = payload;
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

export const { setCustomers, setLoading, setError } = customerSlice.actions;
