import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../styles/styles.css";
import { useSelector } from "react-redux";
import { Catalogue } from "../../../interface/catalogue";

export const FormCustomer = ({
  submitCustomer,
  isNewCustomer,
  isEditing,
  initialValues,
  back,
}) => {
  const { catalogues } = useSelector((state) => state.catalogue);
  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-md mb-6">
      {isNewCustomer && (
        <h1 className="text-3xl font-bold text-white mb-6">Nuevo Cliente</h1>
      )}
      {isEditing && (
        <h1 className="text-3xl font-bold text-white mb-6">Editar Cliente</h1>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          submitCustomer(values);
          resetForm();
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Campo es requerido"),
          lastName: Yup.string().required("Campo es requerido"),
          email: Yup.string()
            .email("El correo no tiene un formato válido")
            .required("Campo es requerido"),
          phone: Yup.string().required("Campo es requerido"),
          document: Yup.string().required("Campo es requerido"),
          idCity: Yup.string().required("Campo es requerido"),
          idComuna: Yup.string().required("Campo es requerido"),
        })}
      >
        {(formik) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field
              name="firstName"
              type="text"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="firstName" component="span" />

            <label htmlFor="lastName">Last Name</label>
            <Field
              name="lastName"
              type="text"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="lastName" component="span" />

            <label htmlFor="email">Email Address</label>
            <Field
              name="email"
              type="text"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="email" component="span" />

            <label htmlFor="firstName">Phone</label>
            <Field
              name="phone"
              type="text"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="phone" component="span" />

            <label htmlFor="document">Document</label>
            <Field
              name="document"
              type="text"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            />
            <ErrorMessage name="document" component="span" />

            <label htmlFor="idCity">City</label>
            <Field
              name="idCity"
              as="select"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            >
              <option value="">Select</option>
              {catalogues.cityList.map((city: Catalogue) => (
                <option key={city.id} value={city.id}>
                  {city.value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idCity" component="span" />

            <label htmlFor="idComuna">Comuna</label>
            <Field
              name="idComuna"
              as="select"
              className="bg-slate-600 p-2 rounded-lg shadow-md"
            >
              <option value="">Select</option>
              {catalogues.comunaList.map((comuna: Catalogue) => (
                <option key={comuna.id} value={comuna.id}>
                  {comuna.value}
                </option>
              ))}
            </Field>
            <ErrorMessage name="idComuna" component="span" />

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
