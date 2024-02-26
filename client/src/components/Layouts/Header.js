import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input } from "antd";
import { Modal } from "antd";
import LoginModal from "../../pages/Auth/LoginModal";
import RegisterModals from "../../pages/Auth/RegisterModals";
import { useAuth } from "../../context/auth";
import DropdownLogin from "../../pages/DropdownLogin";
import DropdownCategories from "../../pages/DropdownCategories";
import { useSearch } from "../../context/searchContext";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { useCart } from "../../context/cartContext";
const { Search } = Input;

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [keywords, setKeyword] = useSearch();
  const [signupClicked, setsignupClicked] = useState(false);
  const [cart,setCart] = useCart()

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (signupClicked) {
      handleCancel();
      setIsRegisterModalOpen(true);
    }
  }, [signupClicked]);

  const showModal = () => {
    setIsLoginModalOpen(true);
  };
  const handleOk = () => {
    setIsLoginModalOpen(false);
  };
  const handleCancel = () => {
    setIsLoginModalOpen(false);
  };

  const showRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleRegisterOk = () => {
    setIsRegisterModalOpen(false);
  };
  const handleRegisterCancel = () => {
    setIsRegisterModalOpen(false);
    setsignupClicked(false);
  };

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setKeyword((prev) => (prev = value));
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      {/* ctr+i for emoji sense  along with typing the colon before */}
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary" >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <div className="text-center">PET</div>
            <span>WORLD</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Space direction="vertical" className="mx-auto">
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                enterButton
                onChange={handleChange}
                value={keywords}
              />
            </Space>
            <ul className="navbar-nav mb-2 mb-lg-0" style={{"width":"25%"}}>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown-links">
                <DropdownCategories />
              </li>

              {auth.user ? (
                <li className="nav-item dropdown-links" >
                  <DropdownLogin name={auth.user.name} />
                </li>
              ) : (
                <li className="nav-item dropdown-links"  onClick={showModal}>
                  LOGIN
                </li>
              )}

              <li className="nav-item" style={{"marginLeft":"3px !important" ,"paddingTop":"2%"}}>
                  <Badge count={cart.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    cart
                </NavLink>
                  </Badge>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal
        title="LOGIN"
        open={isLoginModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LoginModal Func={setsignupClicked} handleCancel={handleCancel} />
      </Modal>

      <Modal
        title="REGISTER"
        open={isRegisterModalOpen}
        onOk={handleRegisterOk}
        onCancel={handleRegisterCancel}
      >
        <RegisterModals
          Func={setsignupClicked}
          handleRegisterCancel={handleRegisterCancel}
        />
      </Modal>
    </>
  );
};

export default Header;
