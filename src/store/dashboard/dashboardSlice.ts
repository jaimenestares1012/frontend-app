import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../interface/customer";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    metricTrend: [],
    metricProductSales: [],
    metricTrendProduct: [],
    metricTrendCustomer: [],
    metricSallesAll: [],
    metricCustomerSales: [],
    metricSumary: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setMetricTrend: (state, { payload }) => {
      state.metricTrend = payload;
    },
    setMetricProductSales: (state, { payload }) => {
      state.metricProductSales = payload;
    },

    setMetricProductTrend: (state, { payload }) => {
      state.metricTrendProduct = payload;
    },

    setMetricCustomerTrend: (state, { payload }) => {
      state.metricTrendCustomer = payload;
    },
    setMetricCustomerSales: (state, { payload }) => {
      state.metricCustomerSales = payload;
    },
    setMetricSumary: (state, { payload }) => {
      state.metricSumary = payload;
    },

    setMetricSalesAll: (state, { payload }) => {
      state.metricSallesAll = payload;
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

export const {
  setMetricTrend,
  setMetricProductSales,
  setMetricProductTrend,
  setMetricSalesAll,
  setMetricCustomerSales,
  setMetricSumary,
  setMetricCustomerTrend,
  setLoading,
  setError,
} = dashboardSlice.actions;
