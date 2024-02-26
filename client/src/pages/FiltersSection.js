import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { Checkbox } from "antd";
import axios from "axios";
import { useSearch } from "../context/searchContext";
import { useCategorySearch } from "../context/categoryFilterContext";

const FiltersSection = () => {
  const [item, setItem] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState({
    category: [],
    prices: 1,
  });
  const [categoryKeywords, setCategoryKeywords] = useCategorySearch();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "/api/v1/category/getAllCategories"
      );

      setItem(res.data.categoriesList);
    };

    fetchCategories();
    console.log("filter section item", item);
  }, [item]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.value}`);

    // setFilterKeyword({ ...filterKeyword, [e.target.name]: e.target.value });
    // if (e.target.name === "category") {
    //   const arr = categoryKeywords;
    //   arr.push(e.target.value);
    //   setCategoryKeywords(arr);
    //   console.log("categoryKeywords", categoryKeywords);
    // }

    if (e.target.checked) {
      setCategoryKeywords((prev) => (prev = e.target.value));
    } else setCategoryKeywords((prev) => (prev = ""));
  };

  return (
    <>
      <h3>Filters</h3>
      <Divider />
      <div className="d-flex flex-column ">
        <h3 className="mb-3">Category</h3>
        {item.map((elem) => {
          return (
            <Checkbox
              onChange={onChange}
              value={`${elem.name}`}
              name="category"
              key={elem._id}
            >
              {elem.name}
            </Checkbox>
          );
        })}
      </div>
      <div className="d-flex flex-column mx-auto">
        <h3 className="mb-3">Prices</h3>
        <Checkbox onChange={onChange}  name="prices" value={-1}>
          High to Low
        </Checkbox>
        <Checkbox onChange={onChange} name="prices" value={1}>
          Low to High
        </Checkbox>

      </div>
    </>
  );
};

export default FiltersSection;
