import React, { useState } from "react";
import AdminDashBoardLayout from "./AdminDashBoardLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import ProfileUtil from "../utils/ProfileUtil";

const DashBoardAdminProfileUpd = () => {

  return (
    <AdminDashBoardLayout>
      <ProfileUtil/>
    </AdminDashBoardLayout>
  );
};

export default DashBoardAdminProfileUpd;
