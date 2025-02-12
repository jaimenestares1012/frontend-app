import { useSelector } from "react-redux";
import { Customer } from "../../../interface/product";
import { Product } from "../../../interface/product";
export const TableProduct = ({ submitDelete, submitEdit }) => {
  const { products: data } = useSelector((state) => state.product);
  const handleDelete = (id: string) => {
    submitDelete(id);
  };
  const handleEdit = (product: Product) => {
    submitEdit({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      idUnitsMeasurement: product.idUnitsMeasurement,
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
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Stock
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Medida
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((product: Product) => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {product.valueUnitsMeasurement}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-500 hover:text-blue-600 mr-4"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(product.id)}
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

export default TableProduct;
