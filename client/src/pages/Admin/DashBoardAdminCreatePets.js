import React, { useEffect, useState } from "react";
import AdminDashBoardLayout from "./AdminDashBoardLayout";


import { useAuth } from "../../context/auth";

import axios from "axios";
import { Select } from "antd";
import { useUpdate } from "../../context/updatePetsContext";
const { Option } = Select;

const DashBoardAdminCreatePets = () => {
  const [auth] = useAuth();
  const [updValue] = useUpdate();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState(updValue.name ? updValue.name : "");
  const [prices, setPrices] = useState(updValue.price ? updValue.price : 0);
  const [quantity, setQuantity] = useState(
    updValue.quantity ? updValue.quantity : 0
  );
  const [category, setCategory] = useState(
    updValue.category ? updValue.quantity : ""
  );

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const res = await axios.get(
      "/api/v1/category/getAllCategories"
    );
    setCategories(res.data.categoriesList);

    // console.log("category items ",items ,categoryArray);
  };

  useEffect(() => {
    fetchCategories();
  }, [categories.length]);

  const addnewPet = async () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseInt(prices));
    formData.append("quantity", parseInt(quantity));
    formData.append("category", category);
    formData.append("photo", photo);

    const { data } = axios.post(
      "/api/v1/pets/addpets",
      formData
    );
    if (data?.success) {
      console.log(data);
    }
    // http://localhost:8080/api/v1/pets/addpets
  };

  const updatePet = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseInt(prices));
    formData.append("quantity", parseInt(quantity));
    // formData.append("category", category);
    formData.append("photo", photo);

    const { data } = axios.put(
      `/api/v1/pets/updatepets/${updValue._id}`,
      formData
    );
    console.log("update", data);
    if (data?.success) {
      console.log("Sucecevcehrehhhhhhhhhhhhiuuuuu");
    }
  };

  return (
    <AdminDashBoardLayout>
      {console.log("update value is equal to ", prices)}

      {updValue._id ? (
        <form
          style={{
            width: "50%",
            margin: "auto",
            padding: "20px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <div className="form-group  row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Pet Photo
            </label>
            <div className="col-sm-10">
              {/* {photo ? photo.name : "Upload Photo"} */}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <div className="mb-3">
                {
                  <div className="text-center">
                    <img
                      src={
                        photo
                          ? URL.createObjectURL(photo)
                          : `/api/v1/pets/getpetphoto/${updValue._id}`
                      }
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Price"
                value={prices}
                onChange={(e) => {
                  setPrices(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Quantity
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Category
            </label>
            <div className="col-sm-10">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
               
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={updatePet}
              >
                UPDATE
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form
          style={{
            width: "50%",
            margin: "auto",
            padding: "20px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <div className="form-group  row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Pet Photo
            </label>
            <div className="col-sm-10">
              {/* {photo ? photo.name : "Upload Photo"} */}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Price"
                value={prices}
                onChange={(e) => {
                  setPrices(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Quantity
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Category
            </label>
            <div className="col-sm-10">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button
              
                className="btn btn-primary"
                onClick={addnewPet}
              >
                Create
              </button>
            </div>
          </div>
        </form>
      )}
    </AdminDashBoardLayout>
  );
};

export default DashBoardAdminCreatePets;
