import React, { useState } from "react";

import { useAuth } from "../../context/auth";
import axios from "axios";

const ProfileUtil = () => {
  const [auth, setAuth] = useAuth();
  const [credentials, setCredentials] = useState({
    name: auth.user.name,
    email: auth.user.email,
    phone: auth.user.phone,
    address: auth.user.address,
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `/api/v1/auth/updateCredentials/${auth.user._id}`,
      credentials
    );

    setAuth({ user: res.data.user, token: res.data.token });
    localStorage.setItem("auth-token", JSON.stringify(res.data));
    // console.log("res = ",res)
  };
  return (
    <>
      <div className="container profile-form mt-3">
        <form>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Name"
                name="name"
                value={credentials.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Phone No
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Phone Number"
                name="phone"
                value={credentials.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Address"
                name="address"
                value={credentials.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Role
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Role"
                value={auth.user.role === "Seller" ? "Seller" : "User"}
                disabled
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10 mx-auto">
              <button
                type="submit"
                className="btn btn-primary "
                onClick={handleProfileUpdate}
              >
                Update Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileUtil;
