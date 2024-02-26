import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import axios from "axios";
const AdminPrivateRoute = () => {
  const [auth] = useAuth();
  const [showOutlet, setShowOutlet] = useState(false);
  useEffect(() => {
    const outletCheck = async () => {
      const res = await axios.get(
        "/api/v1/auth/admin-auth-check"
      );
      if (res.data.success) setShowOutlet(true);
    };

    if (auth?.token) {
      outletCheck()
    }
  }, [auth?.token]);

  return <>{showOutlet ? <Outlet /> : console.log("Admin outlet")}</>;
};

export default AdminPrivateRoute;
