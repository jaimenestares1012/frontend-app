import { useSelector } from "react-redux";
import PlotBar from "./PlotBar";
import PlotLines from "./PlotLines";
import { useState } from "react";
export const SumaryPeriod = ({
  periodStart,
  periodEnd,
  setPeriodoStart,
  setPeriodoEnd,
  productInit,
  customerInit,
  setCustomerObj,
  setProductObj,
}) => {
  const { metricTrend, metricTrendProduct, metricTrendCustomer } = useSelector(
    (state) => state.dashboard
  );
  const { catalogues } = useSelector((state) => state.catalogue);
  const { products } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);

  const [period1, setPeriod1] = useState(periodStart);
  const [period2, setPeriod2] = useState(periodEnd);
  const [producto, setProducto] = useState(productInit);
  const [customer, setCustomer] = useState(customerInit);
  const handleChangeStart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const news = catalogues.periodList.find(
      (period) => period.id === event.target.value
    );
    setPeriodoStart({
      id: news.id,
      month: news.month,
    });
    setPeriod1(event.target.value);
  };
  const handleChangeEnd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const news = catalogues.periodList.find(
      (period) => period.id === event.target.value
    );
    setPeriodoEnd({
      id: news.id,
      month: news.month,
    });
    setPeriod2(event.target.value);
  };
  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const news = products.find((period) => period.id === event.target.value);
    setProductObj(news.id);
    setProducto(news.id);
  };

  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const news = customers.find(
      (period) => period.id === event.target.value
    );
    setCustomerObj(news.id);
    setCustomer(news.id);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white">REPORTE POR PERIODOS</h1>
      <div style={{ display: "flex" }}>
        <div className="mt-4 mb-4 mr-4">
          <label htmlFor="period1">Inicio </label>
          <select
            value={period1}
            onChange={handleChangeStart}
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
        <div className="mt-4 mb-4 ml-4">
          <label htmlFor="period1">Fin </label>
          <select
            value={period2}
            onChange={handleChangeEnd}
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
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          {/* Pie chart ocupa 2 columnas en desktop */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <PlotLines
              data={[
                {
                  x: metricTrend.map(
                    (item: { period: string; meta: number }) => item.period
                  ),
                  y: metricTrend.map(
                    (item: { period: string; meta: number }) => item.meta
                  ),
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Meta",
                  line: { color: "#32cd32" },
                },
                {
                  x: metricTrend.map(
                    (item: { period: string; allSales: number }) => item.period
                  ),
                  y: metricTrend.map(
                    (item: { period: string; allSales: number }) =>
                      item.allSales
                  ),
                  type: "scatter",
                  mode: "lines+markers",
                  name: "Demanda",
                  line: { color: "#00bfff" },
                },
              ]}
              config={{
                title: {
                  text: "Tendencia de Demanda y Meta",
                },
              }}
            />
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="mt-4 mb-4 mr-4">
            <label htmlFor="period1" className="text-black text-2xl font-bold ">
              Productos
            </label>
            <select
              value={producto}
              onChange={handleProductChange}
              className="bg-gray-700 text-white p-2 rounded-md"
            >
              <option value="" disabled>
                Selecciona un producto
              </option>
              {products?.map((unit: Product) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <PlotLines
            data={[
              {
                x: metricTrendProduct.map((item) => item.period),
                y: metricTrendProduct.map((item) => item.allSales),
                type: "scatter",
                mode: "lines+markers",
                name: "Meta",
                line: { color: "#32cd32" },
              },
            ]}
            config={{ title: { text: "Tendenia de Ventas por Producto" } }}
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="mt-4 mb-4 mr-4">
            <label htmlFor="period1" className="text-black text-2xl font-bold ">
              Customer
            </label>
            <select
              value={customer}
              onChange={handleCustomerChange}
              className="bg-gray-700 text-white p-2 rounded-md"
            >
              <option value="" disabled>
                Selecciona un customer
              </option>
              {customers?.map((unit: Customer) => (
                <option key={unit.id} value={unit.id}>
                  {unit.firstName}
                </option>
              ))}
            </select>
          </div>
          <PlotLines
            data={[
              {
                x: metricTrendCustomer.map((item) => item.period),
                y: metricTrendCustomer.map((item) => item.allSales),
                type: "scatter",
                mode: "lines+markers",
                name: "Meta",
                line: { color: "#32cd32" },
              },
            ]}
            config={{ title: { text: "Tendenia de Ventas por cliente" } }}
          />
        </div>
      </div>
    </div>
  );
};

export default SumaryPeriod;
