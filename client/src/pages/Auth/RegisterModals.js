import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterModals = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setrole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // console.log("jkjkjkjkj");
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        role,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/");
        props.handleRegisterCancel();
      }

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Phone No
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3 d-flex justify-content-around">
          <div>
            <input
              type="radio"
              id="buyer"
              name="role"
              value="Buyer"
              onChange={(e) => setrole(e.target.value)}
            />
            <label for="buyer">Buyer</label>
          </div>

          <div>
            <input
              type="radio"
              id="seller"
              name="role"
              value="Seller"
              onChange={(e) => setrole(e.target.value)}
            />
            <label for="seller">Seller</label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary "
          onClick={handleSubmit}
        >
          REGISTER
        </button>
        <p
          className="text-center"
          onClick={(e) => {
            props.Func((prev) => (prev = false));
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          <u>Already have an account | LOGIN</u>
        </p>
      </form>
    </>
  );
};

export default RegisterModals;
