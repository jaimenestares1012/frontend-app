import { useSelector } from "react-redux";
import PlotPie from "./PlotPie";
import PlotBar from "./PlotBar";
import { useState } from "react";
export const Sumary = ({ period, setPeriodo }) => {
  const {
    metricSumary,
    metricCustomerSales,
    metricProductSales,
    metricSallesAll,
  } = useSelector((state) => state.dashboard);
  const { catalogues } = useSelector((state) => state.catalogue);
  const labels = metricSallesAll.map((item) => item.nameProduct);
  const values = metricSallesAll.map((item) => item.allSales);
  const [princi, setPrinci] = useState(period);
  const dataPie = [
    {
      labels: labels,
      values: values,
      type: "pie",
      line: { color: "#32cd32" }, // Color verde para la meta
    },
  ];
  const configPie = {
    title: {
      text: "Ventas de Productos",
    },
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectedPeriod(event.target.value);
    console.log("event.target.value", event.target.value);
    console.log("catalogues", catalogues.periodList);
    const news = catalogues.periodList.find(
      (period) => period.id === event.target.value
    );
    setPeriodo({
      id: news.id,
      month: news.month,
    });
    setPrinci(event.target.value);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white">REPORTE POR PERIODO</h1>
      <div className="mt-4 mb-4">
        <select
          value={princi}
          onChange={handleChange}
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          <option value="" disabled>
            Selecciona un periodo
          </option>
          {catalogues?.periodList?.map((period) => (
            <option key={period.id} value={period.id}>
              {period.month}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Mejor Producto del Período
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {metricSumary?.bestProduct?.nameProduct || "N/A"}
          </p>
          <div className="mt-2">
            <h4 className="text-gray-700 font-semibold">
              Monto: ${metricSumary?.bestProduct?.allSalesAmount || 0}
            </h4>
          </div>
          <div className="mt-2">
            <h4 className="text-gray-700 font-semibold">
              Nro productos: {metricSumary?.bestProduct?.allSalesProduct || 0}
            </h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Ventas del Período
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${metricSumary?.amountSalePeriod?.amountSalePeriod || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Avance de Ventas del Período
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {(
              parseFloat(metricSumary?.salesAdvance?.salesAdvance) || 0
            ).toFixed(2) + "%"}
          </p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          {" "}
          {/* Pie chart ocupa 2 columnas en desktop */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <PlotPie data={dataPie} config={configPie} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <PlotBar
            data={[
              {
                x: metricProductSales.map((item) => item.nameProduct),
                y: metricProductSales.map((item) => item.allSales),
                type: "bar",
                name: "Ventas",
                marker: { color: "#612C35" },
              },
            ]}
            config={{ title: { text: "Ventas por Producto" } }}
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <PlotBar
            data={[
              {
                x: metricCustomerSales.map((item) => item.nameCustomer),
                y: metricCustomerSales.map((item) => item.allSales),
                type: "bar",
                name: "Ventas",
                marker: { color: "#2C4561" },
              },
            ]}
            config={{ title: { text: "Ventas por Cliente" } }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sumary;
