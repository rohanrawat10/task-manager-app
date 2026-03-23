import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(errorHandler(401, "Token not found"));
    }

    if(!process.env.JWT_SECRET){
      return next(errorHandler(500,"JWT secret not configured"))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(errorHandler(401, "User not found"));
    }

    req.user = user; // ✅ attach full user
    next();

  } catch (err) {
    if(err.name === "TokenExpiredError"){
       return next(errorHandler(401, "Invalid token"));
    }
    if(err.name === "JsonWebTokenError"){
      return next(errorHandler(401,"Invalid Token"));
    }
    return next(errorHandler(500,"Authentication Error"))
  }
};

export default isAuth;

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(errorHandler(403, "Access Denied, Admin Only"));
  }
};
