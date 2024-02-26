import React ,{useEffect} from "react";
import AdminDashBoardLayout from "./AdminDashBoardLayout";
import { useAuth } from "../../context/auth";
import {  useNavigate } from "react-router-dom";
import FormPage from "../FormPage";
const DashBoardAdminDetails = () => {
  const [auth] = useAuth()
  const navigate = useNavigate()
  // useEffect(() => {
  //  if(!auth.user) navigate("/")
  // }, [auth.user])
  
  return (
    <AdminDashBoardLayout>
      <div className="container admin-details mx-auto ">
      {/* <Divider /> */}
        <FormPage />
      </div>
    </AdminDashBoardLayout>
  );
};

export default DashBoardAdminDetails;
