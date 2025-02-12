export const Modal = ({ message, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
