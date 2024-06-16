import React from "react";
import { useAuth } from "../context/auth";

const FormPage = () => {
  const [auth] = useAuth();
  return (
    <div className="container text-center profile-div ">
      <h4 className="profile-heading">{auth.user.name}</h4>
      <h4 className="profile-heading">{auth.user.email}</h4>
      <h4 className="profile-heading">{auth.user.phone}</h4>
      <h4 className="profile-heading">{auth.user.address}</h4>
      <h4 className="profile-heading">
        {auth.user.role === "Seller" ? "Seller" : "User"}
      </h4>
    </div>
  );
};

export default FormPage;
