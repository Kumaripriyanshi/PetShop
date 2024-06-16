import React from "react";
import Layout from "../components/Layouts/Layout";
import Carousel from "./Carousel";
import FiltersPhotos from "./FiltersPhotos";

const HomePage = () => {
  return (
    <Layout>
      <Carousel />
      <FiltersPhotos />
    </Layout>
  );
};

export default HomePage;
