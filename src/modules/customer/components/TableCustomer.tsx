import { useSelector } from "react-redux";
import { Customer } from "../../../interface/customer";
export const TableCustomer = ({ submitDelete, submitEdit }) => {
  const { customers: data } = useSelector((state) => state.customer);
  const handleDelete = (id: string) => {
    submitDelete(id);
  };

  const handleEdit = (customer: Customer) => {
    submitEdit({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      document: customer.document,
      idComuna: customer.idComuna,
      idCity: customer.idCity,
      email: customer.email,
      phone: customer.phone,
    });
  };

  return (
    <table className="w-full">
      <thead className="bg-white p-6 rounded-lg shadow-md mb-6">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Nombre
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Teléfono
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            City
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Comuna
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((customer: Customer) => (
          <tr key={customer.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              {customer.firstName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {customer.valueCity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {customer.valueComuna}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleEdit(customer)}
                className="text-blue-500 hover:text-blue-600 mr-4"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="text-red-500 hover:text-red-600"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustomer;
