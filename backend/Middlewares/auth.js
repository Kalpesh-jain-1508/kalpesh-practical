import { User } from "../Models/User/userModel.js";
import ErrorHandler from "../Utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { userCookie } = req.cookies;
    if (!userCookie)
      return next(new ErrorHandler("Please Login to Access this Resource", 401));
  
    const decodedData = jwt.verify(userCookie, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData._id);
  
    next();
});