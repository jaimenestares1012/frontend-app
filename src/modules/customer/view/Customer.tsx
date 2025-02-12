import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomers,
  deleteCustomer,
  updateCustomer,
} from "../../../store/customer/thunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TableCustomer from "../components/TableCustomer";
import { ClipLoader } from "react-spinners";
import { FormCustomer } from "../components/FormCustomer";
import { getCatalogs } from "../../../store/catalogue/thunk";
import type { Customer } from "../../../interface/customer";

export const CustomerView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getCatalogs("cataloguesCode=cityList&cataloguesCode=comunaList"));
  }, [dispatch]);

  const submitCustomer = (customer: Customer) => {
    if (isEditing) {
      dispatch(updateCustomer(customer));
    }
    if (isNewCustomer) {
      dispatch(createCustomers(customer));
    }
    setIsEditing(false);
    setIsNewCustomer(false);
    setInitialValues({
      id: "",
      firstName: "",
      lastName: "",
      document: "",
      idComuna: "",
      idCity: "",
      email: "",
      phone: "",
    });
  };
  const { isLoading } = useSelector((state) => state.customer);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const submitDelete = (id: string) => {
    console.log("id", id);

    setIsEditing(false);
    setIsNewCustomer(false);
    dispatch(deleteCustomer(id));
  };
  const back = () => {
    setIsEditing(false);
    setIsNewCustomer(false);
    setInitialValues({
      id: "",
      firstName: "",
      lastName: "",
      document: "",
      idComuna: "",
      idCity: "",
      email: "",
      phone: "",
    });
  };
  const open = isNewCustomer || isEditing;
  const [initialValues, setInitialValues] = useState<Customer>({
    id: "",
    firstName: "",
    lastName: "",
    document: "",
    idComuna: "",
    idCity: "",
    email: "",
    phone: "",
  });
  const submitEdit = (customer: Customer) => {
    console.log("customer", customer);
    setIsNewCustomer(false);
    setIsEditing(true);
    setInitialValues(customer);
    console.log("initialValues", initialValues);
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Gestión de Clientes
      </h1>

      <button
        onClick={() => {
          setIsNewCustomer(true);
          setIsEditing(false);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        + Nuevo Cliente
      </button>

      {open && (
        <FormCustomer
          submitCustomer={submitCustomer}
          isNewCustomer={isNewCustomer}
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
          <TableCustomer submitDelete={submitDelete} submitEdit={submitEdit} />
        )}
      </div>
    </div>
  );
};

export default CustomerView;
