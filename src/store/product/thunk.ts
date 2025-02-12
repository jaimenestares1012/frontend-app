import { backendApi } from "../../api/backend";
import { Customer } from "../../interface/customer";
import { setProducts, setLoading, setError } from "./productSlice";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { data } = await backendApi.get(`/product/list?`);
    dispatch(setProducts(data.data));
    dispatch(setLoading(false));
  };
};

export const createProduct = (input: Customer) => {
  return async (dispatch) => {
    try {
      console.log("createCustomers", input);
      await backendApi.post(`/product/create?`, input);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getProducts());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};

export const updateProduct = (input: Customer) => {
  return async (dispatch) => {
    try {
      console.log("updateCustomer", input);
      await backendApi.patch(`/product/update?`, input);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getProducts());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch) => {
    try {
      console.log("deleteCustomer", id);

      await backendApi.delete(`/product/delete/${id}`);
      dispatch(setError({ isError: false, errorMessage: "" }));
      dispatch(getProducts());
    } catch (error) {
      console.log("error customers", error);
      dispatch(setError({ isError: true, errorMessage: "Hubo un error." }));
    }
  };
};
