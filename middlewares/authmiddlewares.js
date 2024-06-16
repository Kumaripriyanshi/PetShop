import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isSignedin = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.auth, process.env.JWT_SECRET_KEY);

    req.user = decode;

    next();
  } catch (error) {
    console.log("error in signed user !!", error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "Seller") {
      console.log("No Seller here ");
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      console.log("Yes Seller here ");
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Seller middelware",
    });
  }
};
