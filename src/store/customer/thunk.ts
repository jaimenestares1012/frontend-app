import { backendApi } from "../../api/backend";
import { Customer } from "../../interface/customer";
import { setCustomers, setLoading, setError } from "./customerSlice";

export const getCustomers = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { data } = await backendApi.get(`/customer/list?`);
    dispatch(setCustomers(data.data));
    dispatch(setLoading(false));
  };
};

export const createCustomers = (input: Customer) => {
  return async (dispatch) => {
    try {
      console.log("createCustomers", input);
      await backendApi.post(`/customer/create?`, input);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getCustomers());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};

export const updateCustomer = (input: Customer) => {
  return async (dispatch) => {
    try {
      console.log("updateCustomer", input);
      await backendApi.patch(`/customer/update?`, input);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getCustomers());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};

export const deleteCustomer = (id: string) => {
  return async (dispatch) => {
    try {
      await backendApi.delete(`/customer/delete/${id}`);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getCustomers());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};
