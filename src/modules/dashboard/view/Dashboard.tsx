import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMetricTrend,
  getMetricProductSales,
  getMetricProductTrend,
  getMetricSalesAll,
  getMetricSumary,
  getMetricCustomerSales,
  getMetricCostumerTrend,
} from "../../../store/dashboard/thunk";
import { useSelector } from "react-redux";
import { getCatalogs } from "../../../store/catalogue/thunk";
import SumaryPeriod from "../components/SumaryPeriod";
import Sumary from "../components/sumary";
export const DashbardView = () => {
  const dispatch = useDispatch();
  const { catalogues } = useSelector((state) => state.catalogue);
  const [periodo, setPeriodo] = useState({
    id: "",
    month: "",
  });
  const [periodoStart, setPeriodoStart] = useState({
    id: "",
    month: "",
  });

  const [periodoEnd, setPeriodoEnd] = useState({
    id: "",
    month: "",
  });
  useEffect(() => {
    if (catalogues?.periodList?.length > 0) {
      setPeriodo(catalogues.periodList[0]);
      setPeriodoStart(catalogues.periodList[0]);
      setPeriodoEnd(catalogues.periodList[2]); // Actualiza el estado solo cuando haya periodos disponibles
    }
  }, [catalogues]);

  useEffect(() => {
    if (periodo) {
      dispatch(
        getMetricTrend({
          startPeriod: periodoStart.month,
          endPeriod: periodoStart.end,
        })
      );
      dispatch(getMetricProductSales({ period: periodo?.month }));
      dispatch(getMetricCustomerSales({ period: periodo?.month }));
      dispatch(getMetricSumary({ period: periodo?.month }));
      dispatch(
        getMetricProductTrend({
          startPeriod: "2024-12",
          endPeriod: "2025-02",
          idProduct: "c6ac31cc-582d-44fd-8cac-6cdc74909e32",
        })
      );
      dispatch(
        getMetricCostumerTrend({
          startPeriod: "2024-12",
          endPeriod: "2025-02",
          idProduct: "c6ac31cc-582d-44fd-8cac-6cdc74909e32",
        })
      );
      dispatch(getMetricSalesAll());
    }
  }, [periodo]);
  useEffect(() => {
    if (periodo) {
      dispatch(
        getMetricTrend({
          startPeriod: periodoStart.month,
          endPeriod: periodoEnd.month,
        })
      );
    }
  }, [periodoStart, periodoEnd]);
  useEffect(() => {
    dispatch(getCatalogs("cataloguesCode=periodList"));
  }, [dispatch]);

  return (
    <>
      <div>
        <h1 className="text-2xl text-white text-center mt-9">
          Reporte de Metas y Demanda  
        </h1>
        {/*  */}
        <SumaryPeriod
          periodStart={periodoStart?.month}
          periodEnd={periodoEnd?.month}
          setPeriodoStart={setPeriodoStart}
          setPeriodoEnd={setPeriodoEnd}
        />
        <hr />
        <br />
        <Sumary period={periodo?.month} setPeriodo={setPeriodo} />
      </div>
    </>
  );
};

export default DashbardView;
