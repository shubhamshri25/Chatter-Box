const User = require("../models/user-model");
const fs = require("fs");
const maxAge = 7 * 24 * 60 * 60 * 1000;

// register user
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ALL fields are required" });
    }

    // checking if the email already exist
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "email already exist" });
    }

    // checking the password length
    if (typeof password !== "string" || password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 5 " });
    }

    const createdUser = await User.create({
      email,
      password,
    });

    // generating the jwt token
    const token = await createdUser.generateToken();

    res.cookie("jwt", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    // console.log(createdUser);
    res.status(201).json({
      message: "SignUp successfull",
      user: {
        id: createdUser._id.toString(),
        email: createdUser.email,
        profileSetup: createdUser.profileSetup,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// logging the user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with given email not found " });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password is incorrect  " });
    }

    // generating the jwt token
    const token = await user.generateToken();

    res.cookie("jwt", token, {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    if (isPasswordMatch) {
      res.status(200).json({
        message: "Login successfull",
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
          color: user.color,
          profileSetup: user.profileSetup,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid credtials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get user info
const getUserInfo = async (req, res) => {
  try {
    // console.log(req.userId);

    const userData = await User.findById(req.userId);
    if (!userData) {
      res.status(400).json({ message: "User with given id not found " });
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// save changes to data base
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ message: "User with given id not found " });
    }

    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
      res.status(400).json({ message: "firstName and lastName is required" });
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      id: userData.userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// add or update the profile image
const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const currDate = Date.now();
    let fileName = "uploads/profiles/" + currDate + req.file.originalname;
    fs.renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log("profile image error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete the profile image
const deleteImage = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with the given id not found " });
    }

    if (user.image) {
      fs.unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "Profile image removed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signUp,
  loginUser,
  getUserInfo,
  updateProfile,
  addProfileImage,
  deleteImage,
};
