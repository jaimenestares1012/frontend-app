import { createSlice } from "@reduxjs/toolkit";
export const catalogueSlice = createSlice({
  name: "catalogue",
  initialState: {
    isLoading: false,
    catalogues: {},
  },
  reducers: {
    setCatalogues: (state, { payload }) => {
      const newsArray = { ...state.catalogues, ...payload };
      state.catalogues = newsArray;
    },
  },
});

export const { setCatalogues } = catalogueSlice.actions;
