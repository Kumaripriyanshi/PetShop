import React from "react";
import Layout from "../../components/Layouts/Layout";
import { NavLink } from "react-router-dom";
import FormPage from "../FormPage";

const DashBoardLayout = ({ children }) => {
  return (
    <Layout>
      <div className="dashboard-users row ">
        <div className="col-md-3 col-lg-3 dashboard-choice">
          <ul>
            <li>
              <NavLink to="/dashboard/user/user-details" id="userDetails">
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/update-profile"
                id="updateuserProfile"
              >
                PROFILE
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/user/orders" id="userOrder">
                ORDERS
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-md-9 col-lg-9">{children?children:<FormPage />}</div>
      </div>
    </Layout>
  );
};

export default DashBoardLayout;
