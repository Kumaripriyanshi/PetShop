import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useSearch } from "../context/searchContext";
import { useCategorySearch } from "../context/categoryFilterContext";
import { BsCart4 } from "react-icons/bs";
import { usePrice } from "../context/priceContext";
import { FaHeart } from "react-icons/fa";
const PetPhotos = () => {
  const [pet, setPets] = useState([]);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [keywords, setKeyword] = useSearch();
  // const [price,setPrice]  = usePrice()
  const [categoryKeywords, setCategoryKeywords] = useCategorySearch();
  const [elem, setElem] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("keywords here", keywords);
      if (keywords) {
        // http://localhost:8080/api/v1/pets/searchByFilter/german
        const res = await axios.get(`/api/v1/pets/searchByFilter/${keywords}`);
        setPets(res.data.pet);
        // console.log("pets length",pet.length,pet)
      } else {
        if (!categoryKeywords) {
          const res = await axios.get("/api/v1/pets/getallpets");
          setPets(res.data.allpets);
        }
      }
    };
    console.log("keyword useeffect");
    fetchProduct();
    console.log("filter section ", auth);
    // eslint-disable-next-line
  }, [keywords]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (categoryKeywords) {
        const res = await axios.get(
          `/api/v1/pets/searchByFilterCategory/${categoryKeywords}`
        );

        if (categoryKeywords !== "1" || categoryKeywords !== "-1") {
          // setPets([])
          setPets(res.data.pet);
          console.log("categ if ", pet);
        } else {
          setPets([res.data.pet]);
        }
      } else {
        if (!keywords) {
          const res = await axios.get("/api/v1/pets/getallpets");
          setPets(res.data.allpets);
        }
      }
    };

    fetchProduct();
  }, [categoryKeywords]);

  useEffect(() => {
    setElem("sdosi");
    console.log("price = ", elem);
  }, [elem]);

  const handle = () => {
    setElem("44");
  };

  const checkExistence = (id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id == id) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="petsPhotos d-flex flex-wrap justify-content-center">
      {pet.length > 0 ? (
        pet.map((c, idx) => {
          return (
            <div
              className="card pet-photo-style mb-5"
              style={{ width: "18rem" }}
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
                  <NavLink
                    to={auth?.token ? "/cart" : ""}
                    id={c._id}
                    onClick={() => {
                      console.log(checkExistence(c._id));
                      if (checkExistence(c._id) === false) {
                        setCart([...cart, c]);

                        // let price = localStorage.getItem("price");
                        // let intPrice = 0;
                        // if (price) {
                        //   intPrice = JSON.parse(price);
                        //   intPrice += parseInt(c.price);
                        // } else intPrice = parseInt(c.price);
                        // localStorage.setItem("price", JSON.stringify(intPrice));

                        localStorage.setItem(
                          "user-cart",
                          JSON.stringify([...cart, c])
                        );
                      }

                      console.log(cart);
                    }}
                  >
                    <FaHeart
                      fill="red"
                      size={20}
                      color="red"
                      title="Add to cart"
                    />
                  </NavLink>
                </div>
                <div className="price d-flex justify-content-between">
                  <span>Breed</span>
                  <span className="card-text">{c.breed}</span>
                </div>
                <div className="quantity d-flex justify-content-between">
                  <span>Age</span>
                  <span className="card-text">{c.age}</span>
                </div>
                {/* <NavLink
                  to={auth?.token ? "/cart" : ""}
                  className="btn btn-primary"
                  id={c._id}
                  onClick={() => {
                    console.log(checkExistence(c._id));
                    if (checkExistence(c._id) === false) {
                      setCart([...cart, c]);
                      localStorage.setItem(
                        "user-cart",
                        JSON.stringify([...cart, c])
                      );
                    }

                    console.log(cart);
                  }}
                >
                  ADD TO CART
                </NavLink> */}
              </div>
            </div>
          );
        })
      ) : (
        <h1>No Pets found !!</h1>
      )}
    </div>
  );
};

export default PetPhotos;
