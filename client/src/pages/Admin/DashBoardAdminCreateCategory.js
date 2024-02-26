import React ,{useEffect ,useState} from "react";
import AdminDashBoardLayout from "./AdminDashBoardLayout";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import {PlusOutlined} from "@ant-design/icons"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const { Meta } = Card;
const DashBoardAdminCreateCategory = () => {
 const [categories,setCategories] = useState([])
 const [auth] = useAuth()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "/api/v1/category/getAllCategories"
      );
      setCategories(res.data.categoriesList)
      console.log(categories)
  }
  fetchCategories()
  
  }, [categories])

  const navigate = useNavigate()
  useEffect(() => {
   if(!auth) navigate("/")
  }, [auth])
  

  return (
    <AdminDashBoardLayout>
      <div className="d-flex justify-content-between ">
        <div className="addCategory text-center" style={{"width":"100%","height":"50px"}}>
       <input type="text" placeholder="Enter the name of Category" style={{"height":"100%","width":"25%"}}/>
       <button style={{"height":"100%","width":"25%"}} >ADD</button>

        </div>
     
      </div>

      <div className="d-flex flex-wrap">
      {categories.map((elem)=>{
        return <Card
        style={{
          width: 300,
        }}
        
        key={elem._id}
        
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          
          title="Card title"
          description="This is the description"
        />
      </Card>
      })}
      </div>
    </AdminDashBoardLayout>
  );
};

export default DashBoardAdminCreateCategory;
