import React from "react";
import { Dropdown, message, Space, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAuth } from "../context/auth";
import { NavLink, useNavigate } from "react-router-dom";

const DropdownLogin = (props) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout Function");
    setAuth({ user: null, token: "" });
    localStorage.clear();
    navigate("/");
  };

  const onClick = ({ key }) => {
    if (key === "2") handleLogout();
  };

  const items = [
    {
      label: (
        <NavLink
          to={`/dashboard/${auth?.user.role === "Seller" ? "Seller" : "user"}`}
        >
          DASHBOARD
        </NavLink>
      ),
      key: "1",
    },
    { label: "LOGOUT", key: "2" },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <Space>
          {props.name}
          <DownOutlined />
        </Space>
      </Dropdown>
    </>
  );
};

export default DropdownLogin;
