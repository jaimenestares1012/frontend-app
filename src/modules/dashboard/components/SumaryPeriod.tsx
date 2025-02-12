import { useSelector } from "react-redux";
import PlotPie from "./PlotPie";
import PlotBar from "./PlotBar";
import PlotLines from "./PlotLines";
import { useState } from "react";
export const SumaryPeriod = ({
  periodStart,
  periodEnd,
  setPeriodoStart,
  setPeriodoEnd,
}) => {
  const { metricTrend } = useSelector((state) => state.dashboard);
  const { catalogues } = useSelector((state) => state.catalogue);
  const [period1, setPeriod1] = useState(periodStart);
  const [period2, setPeriod2] = useState(periodEnd);
  const dataTrend = [
    {
      x: metricTrend.map((item) => item.period),
      y: metricTrend.map((item) => item.meta),
      type: "scatter",
      mode: "lines+markers",
      name: "Meta",
      line: { color: "#32cd32" },
    },
    {
      x: metricTrend.map((item) => item.period),
      y: metricTrend.map((item) => item.allSales),
      type: "scatter",
      mode: "lines+markers",
      name: "Demanda",
      line: { color: "#00bfff" },
    },
  ];
  const configLinesTrend = {
    title: {
      text: "Tendencia de Demanda y Meta",
    },
  };
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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white">REPORTE POR PERIODOS</h1>
      <div style={{ display: "flex" }}>
        <div className="mt-4 mb-4 mr-4">
          <label htmlFor="period1">Periodo inicio</label>
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
          <label htmlFor="period1">Periodo fin</label>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          {/* Pie chart ocupa 2 columnas en desktop */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <PlotLines data={dataTrend} config={configLinesTrend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SumaryPeriod;
