import React, { useState } from "react";
import DashBoardLayout from "./DashBoardLayout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import ProfileUtil from "../utils/ProfileUtil";

const DashBoardProfileUpdate = () => {

  return (
    <DashBoardLayout>
      <ProfileUtil />
    </DashBoardLayout>
  );
};

export default DashBoardProfileUpdate;
