import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

/**
 * Register a new patient
 */
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const body = req.body || {};

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    dob,
    aadhaarNo,
    gender,
    role,
  } = body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !dob ||
    !aadhaarNo ||
    !gender ||
    !role
  ) {
    return next(new ErrorHandler("Please fill the full form!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    dob,
    aadhaarNo,
    gender,
    role,
  });

  generateToken(user, "User registered!", 200, res);
});

/**
 * Login user (Admin, Patient, Doctor, etc.)
 */
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body || {};

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide All Details!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler(`User with role ${role} not found!`, 400));
  }

  generateToken(user, "User Login Successfully!", 200, res);
});

/**
 * Register new admin
 */
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhaarNo,
  } = req.body || {};

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !aadhaarNo
  ) {
    return next(new ErrorHandler("Please fill the full form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} already exists with this email!`)
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhaarNo,
    role: "Admin",
  });

  generateToken(admin, "New Admin Registered!", 200, res);
});

/**
 * Get all doctors
 */
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});
 
/**
 * Get logged-in user details
 */
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * Logout Admin
 */
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully!",
    });
});

/**
 * Logout Patient
 */
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully!",
    });
});

/**
 * Register a new doctor
 */
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const body = req.body || {};
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhaarNo,
    doctorDepartment,
  } = body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !aadhaarNo ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Provide Full Details!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error!"
    );
    // return next(new ErrorHandler("Image upload failed!", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    aadhaarNo,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered!",
    doctor,
  });
});
