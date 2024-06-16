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
  const [pet, setPets] = useState([]);
  const [filterpet, setFilterPets] = useState([]);

  const [filterKeyword, setFilterKeyword] = useState({
    category: [],
    prices: 1,
  });
  // const [pets, setPets] = useP
  const [categoryKeywords, setCategoryKeywords] = useCategorySearch();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/api/v1/category/getAllCategories");

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
  useEffect(() => {
    const fetchPets = async () => {
      const res = await axios.get("/api/v1/pets/getallpets");
      setPets(res.data.allpets);
      setFilterPets(res.data.allpets);
    };

    filterpet.filter((e) => e.breed != "unknown");
    fetchPets();
  }, [pet]);
  return (
    <>
      <h3>Filters</h3>
      <Divider />
      <div className="d-flex flex-column ">
        <h3 className="mb-3">Breeds</h3>
        {pet
          .filter((e) => e.breed != "unknown")
          .map((elem) => {
            return (
              <Checkbox
                onChange={onChange}
                value={`${elem.breed}`}
                name="breed"
                key={elem._id}
              >
                {elem.breed}
              </Checkbox>
            );
          })}
      </div>
      <div className="d-flex flex-column mx-auto">
        <h3 className="mb-3">Animal</h3>
        {pet.map((elem) => {
          return (
            <Checkbox
              onChange={onChange}
              value={`${elem.name}`}
              name="animal"
              key={elem._id}
            >
              {elem.name}
            </Checkbox>
          );
        })}
      </div>
      <div className="d-flex flex-column mt-5">
        <button
          className="btn btn-danger"
          onClick={() => window.location.reload()}
        >
          RESET FILTERS
        </button>
      </div>
    </>
  );
};

export default FiltersSection;
