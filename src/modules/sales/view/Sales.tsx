import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TableProduct } from "../components/TableSale";
import { ClipLoader } from "react-spinners";
import FormProduct from "../components/FormSale";
import { getCatalogs } from "../../../store/catalogue/thunk";
import {
  createSale,
  getSales,
  updateSale,
  deleteSale,
} from "../../../store/sale/thunk";
import { Sale } from "../../../interface/sale";
import { getProducts } from "../../../store/product/thunk";
import { getCustomers } from "../../../store/customer/thunk";

export const SalesView = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.customer);
  const [isNewSale, setIsNewSale] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getSales());
    dispatch(getCatalogs("cataloguesCode=unitsMeasurementList"));
    dispatch(getProducts());
    dispatch(getCustomers());
  }, [dispatch]);

  const submitSale = (sale: Sale) => {
    console.log("sale", sale);
    console.log("isEditing", isEditing);
    console.log("isNewSale", isNewSale);

    if (isEditing) {
      dispatch(updateSale(sale));
    }
    if (isNewSale) {
      dispatch(createSale(sale));
    }
    setIsEditing(false);
    setIsNewSale(false);
    setInitialValues({
      idProduct: "",
      idCustomer: "",
      numberProducts: 0,
    });
  };

  const submitDelete = (id: string) => {
    console.log("id", id);

    setIsEditing(false);
    setIsNewSale(false);
    dispatch(deleteSale(id));
  };
  const back = () => {
    setIsEditing(false);
    setIsNewSale(false);
    setInitialValues({
      idProduct: "",
      idCustomer: "",
      numberProducts: 0,
    });
  };
  const open = isNewSale || isEditing;
  const [initialValues, setInitialValues] = useState<Sale>({
    id: "",
    idProduct: "",
    idCustomer: "",
    numberProducts: 0,
  });
  const submitEdit = (sale: Sale) => {
    setIsNewSale(false);
    setIsEditing(true);
    setInitialValues(sale);
    console.log("initialValues", initialValues);
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Gestión de ventas</h1>

      <button
        onClick={() => {
          setIsNewSale(true);
          setIsEditing(false);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        Nueva Venta
      </button>

      {open && (
        <FormProduct
          submitSale={submitSale}
          isNewSale={isNewSale}
          isEditing={isEditing}
          initialValues={initialValues}
          back={back}
        />
      )}
      <div className="bg-slate-900 rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#fff" loading={isLoading} />
          </div>
        ) : (
          <TableProduct submitDelete={submitDelete} submitEdit={submitEdit} />
        )}
      </div>
    </div>
  );
};

export default SalesView;
