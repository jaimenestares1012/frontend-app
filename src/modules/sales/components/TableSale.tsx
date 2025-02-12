import { useSelector } from "react-redux";
import { Sale } from "../../../interface/sale";
import { Modal } from "../../shared/Modal";
import { useEffect, useState } from "react";
export const TableProduct = ({ submitDelete, submitEdit }) => {
  const { sales: data } = useSelector((state) => state.sale);
  const handleDelete = (id: string) => {
    submitDelete(id);
    setModalMessage("El producto ha sido editado correctamente.");
    setIsModalOpen(true);
  };
  const { errorMessage } = useSelector((state) => state.sale);
  const handleEdit = (sale: Sale) => {
    submitEdit({
      id: sale.id,
      idProduct: sale.idProduct,
      idCustomer: sale.idCustomer,
      numberProducts: sale.numberProducts,
    });
  };
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (errorMessage) {
      setModalMessage("Hubo un error al generar su venta, revise las existencias del producto que desea vender.");  
      setIsModalOpen(true);
    }
  }, [errorMessage]);
  return (
    <>
      <table className="w-full">
        <thead className="bg-white p-6 rounded-lg shadow-md mb-6">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nombre Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nombre Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Nro Productos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Monto total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((sale: Sale) => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {sale.nameProduct}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {sale.firstNameCustomer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {sale.numberProducts}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(sale)}
                  className="text-blue-500 hover:text-blue-600 mr-4"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(sale.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <Modal message={modalMessage} closeModal={closeModal} />}
    </>
  );
};

export default TableProduct;
