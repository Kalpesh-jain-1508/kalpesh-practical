import { User } from "../../Models/User/userModel.js";
import ErrorHandler from "../../Utils/errorHandler.js";
import sendToken from "../../Utils/sendToken.js";
import catchAsyncError from '../../Middlewares/catchAsyncError.js';

export const userRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
        return next(new ErrorHandler('All Field is Required', 400));

    const existingUser = await User.findOne({
        email,
        isDeleted: false,
    });
    
    if (existingUser)
        return next(new ErrorHandler("Email already exist", 400));

    const user = new User({
        firstName, 
        lastName, 
        email, 
        password
    });
    
    user.save();

    sendToken(res, user, `Welcome ${user.firstName + user.lastName}`, 200);

    // res.status(201).json({
    //     success: true,
    //     message: "User registered successfully",
    // });
});

export const userLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new ErrorHandler('All Field is Required', 400));

    const user = await User.find({ email }).select("+password");

    if (!user)
        return next(new ErrorHandler('Invalid Email', 401));

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) 
        return next(new ErrorHandler('Incorrect Password', 401));

    user.password = undefined;

    sendToken(res, user, `Welcome Back ${user.firstName + user.lastName}`, 200);

    // res.status(200).json({
    //     success: true,
    //     message: "User login successfully",
    // });
});