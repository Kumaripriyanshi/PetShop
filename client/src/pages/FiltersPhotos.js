import React from "react";
import FiltersSection from "./FiltersSection";
import PetPhotos from "./PetPhotos";
import { Divider } from "antd";

const FiltersPhotos = () => {
  return (
    <div className="row row-height mt-3">
      <div
        className="col-md-3 col-lg-3 text-center left"
        // style={{ borderRight: "2px solid red", minHeight: "300px" }}
      >
        <FiltersSection />
      </div>
      {/* vertical line */}
      <div className="col-md-9 col-lg-9" >
      <h1 className="text-center mb-5" >All Pets</h1>
      <Divider/>
        <PetPhotos />
      </div>

    </div>

    // <div className="row-height mt-3 rowclas d-flex">
    //   <div className="text-center left filtersSection">
    //     <FiltersSection />
    //   </div>
    //   <div className="photosSection">
    //     <PetPhotos />
    //   </div>
    // </div>
  );
};

export default FiltersPhotos;
