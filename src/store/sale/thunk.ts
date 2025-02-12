import { backendApi } from "../../api/backend";
import { Sale } from "../../interface/sale";
import { setLoading, setError, setSales } from "./saleSlice";

export const getSales = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { data } = await backendApi.get(`/sale/list?`);
    dispatch(setSales(data.data));
    dispatch(setLoading(false));
  };
};

export const createSale = (input: Sale) => {
  return async (dispatch) => {
    try {
      console.log("createCustomers", input);
      await backendApi.post(`/sale/create?`, input);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getSales());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};

export const updateSale = (input: Sale) => {
  return async (dispatch) => {
    try {
      console.log("updateCustomer", input);
      await backendApi.patch(`/sale/update?`, input);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getSales());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};

export const deleteSale = (id: string) => {
  return async (dispatch) => {
    try {
      console.log("deleteCustomer", id);

      await backendApi.delete(`/sale/delete/${id}`);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getSales());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};
