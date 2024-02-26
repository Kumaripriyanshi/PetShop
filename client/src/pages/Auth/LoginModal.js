import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

    if (res.data.success) {
      toast.success("Successfully logined");
      props.handleCancel();
      console.log("res server", res.data);
      setAuth({user: res.data.user, token: res.data.token });
      // setAuth((prev)=>(prev.token= res.data.token,prev.user=res.data.user));
    
      localStorage.setItem("auth-token", JSON.stringify(res.data));
      console.log("aurh sett", auth);
    } else toast.error("failed in login");
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
        <p
          className="text-center"
          onClick={(e) => {
            props.Func((prev) => (prev = true));
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          <u>don't have an account | REGISTER</u>
        </p>
      </form>
    </>
  );
};

export default LoginModal;
