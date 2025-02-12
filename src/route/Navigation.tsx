import { BrowserRouter, Navigate, NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import logo from "../../public/logo-123.png";
import CustomerView from "../modules/customer/view/Customer";
import ProductsView from "../modules/products/view/Products";
import SalesView from "../modules/sales/view/Sales";
import DashbardView from "../modules/dashboard/view/Dashboard";
export const Navigation = () => {
  return (
    <>
      <BrowserRouter>
        <div className="main-layout">
          <nav>
            <img src={logo} className="logo" alt="logo" />
            <ul>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  Customer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sales"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  dashboard
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/products" element={<ProductsView />} />
            <Route path="/customer" element={<CustomerView />} />
            <Route path="/sales" element={<SalesView />} />
            <Route path="/dashboard" element={<DashbardView />} />
            <Route path="/*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};
