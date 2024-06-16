import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { Divider, InputNumber, Space } from "antd";
import { usePrice } from "../context/priceContext";
import { useAuth } from "../context/auth";

const CartPage = () => {
  const [pets, setPets] = useState([]);
  let petsar = [];
  const [cart, setCart] = useCart();
  const ref = useRef();
  const [value, setValue] = useState(1);
  const [auth, setAuth] = useAuth();

  // const [price, setPrice] = usePrice();

  const onChange = (value) => {
    console.log("changed", ref.current.id);
    handleClick();
  };

  const fetchPets = async (id) => {
    console.log("id = ", id);
    const res = await axios.get(`/api/v1/pets/getpetsById/${id}`);
    // setPets((prev)=>prev=res.data.allpets)
    // setPets([...pets,res.data.allpets])
    petsar.push(res.data.allpets);
  };

  const handleClick = (e) => {
    console.log(e.target.id);
  };

  useEffect(() => {
    const item = cart.find((e) => e._id === "6524e48c7075c3a2da6c1095");
    if (cart.length == 0) {
      localStorage.setItem("price", JSON.stringify(0));
    }
    // // console.log(item)
    // // console.log(cart)
    // let val =0
    // cart.forEach((element) => {
    //   val= val+ parseInt(element.price);
    // });
    // console.log("eleme==w", val);
    // localStorage.setItem("price",JSON.stringify(val))

    // eslint-disable-next-line
  }, [cart.length]);

  const handleRemove = (id) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setCart(myCart);
    const item = cart.find((e) => e._id === id);
    let localPrice = localStorage.getItem("price");
    let price = 1;
    if (localPrice) {
      price = JSON.parse(localPrice);
    }
    price = price - item.price;
    localStorage.setItem("price", JSON.stringify(price));
    localStorage.setItem("user-cart", JSON.stringify(myCart));
  };

  return (
    <Layout>
      {/* <div className="cartpage-lay">
        <h2 style={{ margin: "auto" }}>
          Hello {auth ? auth.user.name : "Guest"}
        </h2>
        <div className="d-flex" style={{ margin: "auto" }}>
          {cart.length > 0 ? (
            cart.map((c, idx) => {
              return (
                <div
                  className="card pet-photo-style "
                  style={{ width: "18rem", height: "100%" }}
                  key={idx}
                >
                  <img
                    src={`/api/v1/pets/getpetphoto/${c._id}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="cart-category d-flex justify-content-between">
                      <h5 className="card-title">{c.name}</h5>
                      <RiDeleteBinLine
                        title="Remove from cart"
                        onClick={() => {
                          handleRemove(c._id);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="price d-flex justify-content-between">
                      <span>Breed</span>
                      <span className="card-text">{c.breed}</span>
                    </div>
                    <div className="quantity d-flex justify-content-between">
                      <span>Age</span>
                      <span className="card-text">{c.age}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="mx-auto" style={{ margin: "auto" }}>
              No Items in the Cart!!!
            </h1>
          )}
        </div>
      </div> */}

      <div className=" cart-page " style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You liked ${cart.length} properties ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Haven't liked "}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  {/* {console.log("seller = ", p.seller)} */}
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/pets/getpetphoto/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100%"
                          height={"130px"}
                        />
                      </div>
                      <div className="col-md-4">
                        <p>Name : {p.name}</p>
                        <p>Breed : {p.breed}</p>
                        <p>Age : {p.age}</p>
                      </div>
                      <div className="col-md-4 cart-remove-btn mt-5">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemove(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  {console.log(p.seller)}
                  <div className="col-md-3 card">
                    {auth?.token ? (
                      <div>
                        <h5>Seller Details</h5>
                        Name : {p.seller.name}
                        <br />
                        Email : {p.seller.email}
                        <br />
                        Phone : {p.seller.phone}
                        <br />
                      </div>
                    ) : (
                      <h4>Login to View Sellers Details</h4>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
