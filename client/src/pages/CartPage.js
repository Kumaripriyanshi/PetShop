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
    const res = await axios.get(
      `/api/v1/pets/getpetsById/${id}`
    );
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
      <div className="row cartpage-lay">
        <div className="col-md-8 col-lg-8 d-flex flex-wrap">
          {cart.length>0?cart.map((c, idx) => {
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
                    <span>Price</span>
                    <span className="card-text">₹{c.price}</span>
                  </div>
                  <div className="quantity d-flex justify-content-between">
                    <span>Quantity</span>
                    <span className="card-text">
                      <InputNumber
                        min={1}
                        max={6}
                        defaultValue={value}
                        onChange={(val) => {
                          let localPrice = localStorage.getItem("price");
                          let price = 1;
                          if (localPrice) {
                            price = JSON.parse(localPrice);
                          }
                          setValue(parseInt(val));
                          if (parseInt(val) < value) price = price - c.price;
                          else price = price + c.price;
                          localStorage.setItem("price", JSON.stringify(price));
                        }}
                        id={c._id}
                        ref={ref}
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          }):<h1 className="mx-auto">No Items in the Cart!!!</h1>}
        </div>
        <div className="col-md-4 col-lg-4 mt-5">
          <h1 className="text-center mb-5">Billing Summary</h1>
          <Divider />
          <div className="d-flex justify-content-between">
            <span>Items</span>
            <span className="card-text"> {cart.length} </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Price</span>
            <span className="card-text">
              ₹
              {localStorage.getItem("price")
                ? JSON.parse(localStorage.getItem("price"))
                : 0}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Delivery Address</span>
            <span className="card-text"> {auth?.user?.address} </span>
          </div>
          <button
            className="billingBtn"
            onClick={() => {
              console.log("renderred");
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
