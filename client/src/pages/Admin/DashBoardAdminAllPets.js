import React, { useEffect, useState } from "react";
import AdminDashBoardLayout from "./AdminDashBoardLayout";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import { Avatar, Card } from "antd";
import { Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useUpdate } from "../../context/updatePetsContext";

const { Meta } = Card;

const DashBoardAdminAllPets = () => {
  const [pet, setPets] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [updValue, setUpdValue] = useUpdate();
  useEffect(() => {
    const fetchPets = async () => {
      const res = await axios.get("/api/v1/pets/getallpets");
      setPets(res.data.allpets);
    };

    fetchPets();
  }, [pet]);

  const handleDelete = async (id) => {
    // http://localhost:8080/api/v1/pets/deletepets/6524e58e22a890c4d405b4bc

    try {
      const { data } = await axios.delete(`/api/v1/pets/deletepets/${id}`);
      console.log("deleted Successfully ");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    // http://localhost:8080/api/v1/pets/updatepets/653010178ca34a9f28a63f42
    navigate("/dashboard/Seller/create-product");
    try {
      const { data } = await axios.delete(
        "/api/v1/pets/deletepets/6524e58e22a890c4d405b4bc"
      );
      console.log("deleted Successfully ");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminDashBoardLayout>
      <div className="container">
        <Divider>
          <h1>All Products</h1>
        </Divider>
        <div className="d-flex">
          {pet.length > 0 ? (
            pet.map((elem) => {
              return (
                <Card
                  style={{
                    width: 300,
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                  key={elem._id}
                  cover={
                    <img
                      alt="example"
                      src={`/api/v1/pets/getpetphoto/${elem._id}`}
                    />
                  }
                  actions={[
                    <MdDelete
                      key="setting"
                      onClick={() => {
                        handleDelete(elem._id);
                      }}
                      style={{ fontSize: "25px" }}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setUpdValue(elem);
                        navigate("/dashboard/Seller/create-product");
                      }}
                      style={{ fontSize: "25px" }}
                    />,
                  ]}
                >
                  {/* <Meta
                  title={`Breed : ${elem.breed}`}
                  description="This is the description"
                /> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    <span>Breed </span>
                    <span>{elem.breed}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Age </span>
                    <span>{elem.age}</span>
                  </div>
                </Card>
              );
            })
          ) : (
            <h5 style={{ margin: "auto" }}>No Pets in the List !!</h5>
          )}
        </div>
      </div>
    </AdminDashBoardLayout>
  );
};

export default DashBoardAdminAllPets;
