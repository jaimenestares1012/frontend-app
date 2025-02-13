import { use, useEffect, useState } from "react";
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
import { getProducts } from "../../../store/product/thunk";
import { getCustomers } from "../../../store/customer/thunk";
export const DashboardView = () => {
  const dispatch = useDispatch();
  const { catalogues } = useSelector((state) => state.catalogue);
  const { products } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);
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
  const [productObj, setProductObj] = useState("");

  const [customerObj, setCustomerObj] = useState("");

  useEffect(() => {
    dispatch(getCatalogs("cataloguesCode=periodList"));
    dispatch(getProducts());
    dispatch(getCustomers());
  }, [dispatch]);
  useEffect(() => {
    if (catalogues?.periodList?.length > 0) {
      setPeriodo(catalogues.periodList[0]);
      setPeriodoStart(catalogues.periodList[0]);
      setPeriodoEnd(catalogues.periodList[2]);
    }
  }, [catalogues]);

  useEffect(() => {
    if (products?.length > 0) {
      setProductObj(products[0]?.id);
    }
    if (customers?.length > 0) {
      setCustomerObj(customers[0]?.id);
    }
  }, [products, customers]);

  useEffect(() => {
    dispatch(getMetricSalesAll());
  }, []);

  useEffect(() => {
    if (periodo) {
      dispatch(getMetricProductSales({ period: periodo?.month }));
      dispatch(getMetricCustomerSales({ period: periodo?.month }));
      dispatch(getMetricSumary({ period: periodo?.month }));
    }
  }, [periodo]);

  useEffect(() => {
    dispatch(
      getMetricTrend({
        startPeriod: periodoStart.month,
        endPeriod: periodoEnd.month,
      })
    );
    if (productObj) {
      dispatch(
        getMetricProductTrend({
          startPeriod: periodoStart.month,
          endPeriod: periodoEnd.month,
          idProduct: productObj,
        })
      );
    }
    if (customerObj) {
      dispatch(
        getMetricCostumerTrend({
          startPeriod: periodoStart.month,
          endPeriod: periodoEnd.month,
          idCustomer: customerObj,
        })
      );
    }
  }, [periodoStart, periodoEnd]);

  useEffect(() => {
    if (productObj) {
      dispatch(
        getMetricProductTrend({
          startPeriod: periodoStart.month,
          endPeriod: periodoEnd.month,
          idProduct: productObj,
        })
      );
    }
    if (customerObj) {
      dispatch(
        getMetricCostumerTrend({
          startPeriod: periodoStart.month,
          endPeriod: periodoEnd.month,
          idCustomer: customerObj,
        })
      );
    }
  }, [customerObj, productObj]);

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
          productInit={productObj}
          customerInit={customerObj}
          setCustomerObj={setCustomerObj}
          setProductObj={setProductObj}
        />
        <hr />
        <br />
        <Sumary period={periodo?.month} setPeriodo={setPeriodo} />
      </div>
    </>
  );
};

export default DashboardView;
