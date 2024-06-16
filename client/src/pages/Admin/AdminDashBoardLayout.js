import React from "react";
import Layout from "../../components/Layouts/Layout";
import { NavLink } from "react-router-dom";
import DashBoardAdminDetails from "./DashBoardAdminDetails";

const AdminDashBoardLayout = ({ children }) => {
  return (
    <Layout>
      <div className="dashboard-users row ">
        <div className="col-md-3 col-lg-3 dashboard-choice">
          <ul>
            <li>
              <NavLink to="/dashboard/Seller/admin-details">DASHBOARD</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/Seller/update-profile">PROFILE</NavLink>
            </li>
            {/* <li>
              <NavLink to="/dashboard/admin/orders" >
                ORDERS
              </NavLink>
            </li> */}

            <li>
              <NavLink to="/dashboard/Seller/create-product">ADD PETS</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/Seller/products">ALL PETS</NavLink>
            </li>
          </ul>
        </div>
        <div className="col-md-9 col-lg-9">
          {children ? children : <h1>Details here</h1>}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashBoardLayout;
