import React, { useEffect, useState } from "react";
import { Dropdown, message, Space, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import axios from "axios";

const DropdownCategories = () => {
  //   let items = [{
  //     label: "All",
  //     key: 0,
  // }];
  const [items, setItem] = useState([{ label: "All", key: 0 }]);
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

    categories.forEach((element, idx) => {
      const obj = {
        label: element.name,
        key: idx + 1,
      };
      const arr = items;
      arr.push(obj);
      // items.push(obj);
      setItem(arr);
    });
  }, [categories.length]);

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <NavLink onClick={(e) => e.preventDefault()}>
          <Space>
            CATEGORIES
            <DownOutlined />
          </Space>
        </NavLink>
      </Dropdown>
    </>
  );
};

export default DropdownCategories;
