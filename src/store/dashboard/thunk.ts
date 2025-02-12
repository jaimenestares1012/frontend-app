import { backendApi } from "../../api/backend";
import { MetricTrendProduct } from "../../interface/metric";
import {
  setMetricProductSales,
  setMetricProductTrend,
  setMetricCustomerSales,
  setMetricSumary,
  setMetricTrend,
  setMetricSalesAll,
  setMetricCustomerTrend,
} from "./dashboardSlice";

export const getMetricTrend = (input: MetricTrendProduct) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(
      `/metric/trend?startPeriod=${input.startPeriod}&endPeriod=${input.endPeriod}`
    );
    dispatch(setMetricTrend(data.data));
  };
};

export const getMetricProductSales = (input: MetricTrendProduct) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(
      `/metric/products/sales?period=${input.period}`
    );
    dispatch(setMetricProductSales(data.data));
  };
};

export const getMetricCustomerSales = (input: MetricTrendProduct) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(
      `/metric/customers/sales?period=${input.period}`
    );
    dispatch(setMetricCustomerSales(data.data));
  };
};

export const getMetricSumary = (input: MetricTrendProduct) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(
      `/metric/summary?period=${input.period}`
    );
    dispatch(setMetricSumary(data.data));
  };
};

export const getMetricProductTrend = (input: MetricTrendProduct) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(
      `/metric/products/trend/${input.idProduct}?startPeriod=${input.startPeriod}&endPeriod=${input.endPeriod}`
    );
    dispatch(setMetricProductTrend(data.data));
  };
};

export const getMetricCostumerTrend = (input: MetricTrendProduct) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(
      `/metric/customers/trend/${input.idCustomer}?startPeriod=${input.startPeriod}&endPeriod=${input.endPeriod}`
    );
    dispatch(setMetricCustomerTrend(data.data));
  };
};

export const getMetricSalesAll = () => {
  return async (dispatch) => {
    const { data } = await backendApi.get(`/metric/products/sales-all`);
    console.log("metricSallesAll", data.data);

    dispatch(setMetricSalesAll(data.data));
  };
};
