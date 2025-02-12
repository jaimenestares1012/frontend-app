import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TableProduct } from "../components/TableProduct";
import { ClipLoader } from "react-spinners";
import FormProduct from "../components/FormProduct";
import { getCatalogs } from "../../../store/catalogue/thunk";
import type { Customer } from "../../../interface/customer";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../../store/product/thunk";
import { Product } from "../../../interface/product";

export const ProductsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCatalogs("cataloguesCode=unitsMeasurementList"));
  }, [dispatch]);

  const submitProduct = (customer: Product) => {
    if (isEditing) {
      dispatch(updateProduct(customer));
    }
    if (isNewProduct) {
      dispatch(createProduct(customer));
    }
    setIsEditing(false);
    setIsNewCustomer(false);
    setInitialValues({
      id: "",
      idUnitsMeasurement: "",
      name: "",
      price: "",
      stock: 0,
      valueUnitsMeasurement: "",
    });
  };
  const { isLoading } = useSelector((state) => state.customer);
  const [isNewProduct, setIsNewCustomer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const submitDelete = (id: string) => {
    console.log("id", id);

    setIsEditing(false);
    setIsNewCustomer(false);
    dispatch(deleteProduct(id));
  };
  const back = () => {
    setIsEditing(false);
    setIsNewCustomer(false);
    setInitialValues({
      id: "",
      idUnitsMeasurement: "",
      name: "",
      price: "",
      stock: 0,
      valueUnitsMeasurement: "",
    });
  };
  const open = isNewProduct || isEditing;
  const [initialValues, setInitialValues] = useState<Product>({
    id: "",
    name: "",
    price: "",
    stock: 0,
    valueUnitsMeasurement: "",
    idUnitsMeasurement: "",
  });
  const submitEdit = (product: Product) => {
    setIsNewCustomer(false);
    setIsEditing(true);
    setInitialValues(product);
    console.log("initialValues", initialValues);
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Gestión de Productos
      </h1>

      <button
        onClick={() => {
          setIsNewCustomer(true);
          setIsEditing(false);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        Nuevo Producto
      </button>

      {open && (
        <FormProduct
          submitProduct={submitProduct}
          isNewProduct={isNewProduct}
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

export default ProductsView;
