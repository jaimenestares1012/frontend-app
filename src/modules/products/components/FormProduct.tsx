import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../styles/styles.css";
import { useSelector } from "react-redux";
import { Catalogue } from "../../../interface/catalogue";

export const FormProduct = ({
  submitProduct,
  isNewProduct,
  isEditing,
  initialValues,
  back,
}) => {
  const { catalogues } = useSelector((state) => state.catalogue);
  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-md mb-6">
      {isNewProduct && (
        <h1 className="text-3xl font-bold text-white mb-6">Nuevo Producto</h1>
      )}
      {isEditing && (
        <h1 className="text-3xl font-bold text-white mb-6">Editar Producto</h1>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          submitProduct(values);
          resetForm();
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Campo es requerido"),
          stock: Yup.number()
            .test("is-integer", "El stock debe ser un número entero", (value) =>
              Number.isInteger(value)
            )
            .required("Campo es requerido"),
          price: Yup.number().required("Campo es requerido"),
          idUnitsMeasurement: Yup.string().required("Campo es requerido"),
        })}
      >
        {(formik) => (
          <Form>
            <label htmlFor="name"> Name</label>
            <Field
              name="name"
              type="text"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="name" component="span" />

            <label htmlFor="price">Price</label>
            <Field
              name="price"
              type="number"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="price" component="span" />

            <label htmlFor="stock">Stock</label>
            <Field
              name="stock"
              type="number"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="stock" component="span" />

            <label htmlFor="idUnitsMeasurement">Medida</label>
            <Field
              name="idUnitsMeasurement"
              as="select"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            >
              <option value="">Select</option>
              {catalogues.unitsMeasurementList.map((unit: Catalogue) => (
                <option key={unit.id} value={unit.id}>
                  {unit.value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idUnitsMeasurement" component="span" />

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
