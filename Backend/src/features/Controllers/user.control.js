const userModel = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cloudinary = require("../Config/cloudinary");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let imageUrl = "";
    let publicId = "";

    // console.log("Uploaded File:", req.file);

    // ✅ Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ✅ Hash the password
    const hashPassword = await argon2.hash(password);

    // ✅ Upload image only if file is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
      });
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    // ✅ Create user with default avatar if no image is uploaded
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      avatar: {
        imageUrl: imageUrl,
        publicId: publicId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.avatar.imageUrl,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Find user in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // ✅ Verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // ✅ Generate JWT token (DO NOT include password)
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    // ✅ Set secure HTTP-only cookie (Secure only in Production)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      sameSite: "Strict", // Helps prevent CSRF attacks
    });

    // ✅ Send response with user data (without password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ Extract user ID from req.user (set by isLoggedIn middleware)
    const user = await userModel.findById(userId).select("-password"); // ✅ Exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  register,
  login,
  getProfile,
};
