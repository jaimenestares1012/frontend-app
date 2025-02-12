import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../styles/styles.css";
import { useSelector } from "react-redux";
import { Catalogue } from "../../../interface/catalogue";
import { Customer } from "../../../interface/customer";
import { Product } from "../../../interface/product";

export const FormProduct = ({
  submitSale,
  isNewSale,
  isEditing,
  initialValues,
  back,
}) => {
  const { customers } = useSelector((state) => state.customer);
  const { products } = useSelector((state) => state.product);
  const { catalogues } = useSelector((state) => state.catalogue);
  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-md mb-6">
      {isNewSale && (
        <h1 className="text-3xl font-bold text-white mb-6">Nuevo Producto</h1>
      )}
      {isEditing && (
        <h1 className="text-3xl font-bold text-white mb-6">Editar Producto</h1>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          submitSale(values);
          resetForm();
        }}
        validationSchema={Yup.object({
          idProduct: Yup.string().required("Campo es requerido"),
          idCustomer: Yup.string().required("Campo es requerido"),
          numberProducts: Yup.number()
            .test("is-integer", "El stock debe ser un número entero", (value) =>
              Number.isInteger(value)
            )
            .required("Campo es requerido"),
        })}
      >
        {(formik) => (
          <Form>
            <label htmlFor="idProduct">Producto</label>
            <Field
              name="idProduct"
              as="select"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            >
              <option value="">Select</option>
              {products?.map((unit: Product) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idProduct" component="span" />

            <label htmlFor="idCustomer">Customer</label>
            <Field
              name="idCustomer"
              as="select"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            >
              <option value="">Select</option>
              {customers?.map((unit: Customer) => (
                <option key={unit.id} value={unit.id}>
                  {unit.firstName}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idCustomer" component="span" />

            <label htmlFor="numberProducts"> Nro de productos</label>
            <Field
              name="numberProducts"
              type="number"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="numberProducts" component="span" />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Submit
            </button>
            <button
              onClick={() => back()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg W-full"
            >
              Back
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormProduct;
