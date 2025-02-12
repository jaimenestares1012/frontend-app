import { configureStore } from "@reduxjs/toolkit";
import { customerSlice } from "./customer/customerSlice";
import { catalogueSlice } from "./catalogue/catalogueSlice";
import { productSlice } from "./product/productSlice";
import { saleSlice } from "./sale/saleSlice";
import { dashboardSlice } from "./dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    customer: customerSlice.reducer,
    product: productSlice.reducer,
    catalogue: catalogueSlice.reducer,
    sale: saleSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
});
