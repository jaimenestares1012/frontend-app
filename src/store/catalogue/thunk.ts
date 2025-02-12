import { backendApi } from "../../api/backend";
import { setCatalogues } from "./catalogueSlice";

export const getCatalogs = (params: any) => {
  return async (dispatch) => {
    const { data } = await backendApi.get(`/catalogue?${params}`);
    console.log("catalogues", data.data);

    dispatch(setCatalogues(data.data));
  };
};
