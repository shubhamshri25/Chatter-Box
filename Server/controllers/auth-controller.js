const User = require("../models/user-model");

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

    res.cookie("token", token, {
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
      return res.status(400).json({ message: "All field are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User with given email not found " });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password is incorrect  " });
    }

    // generating the jwt token
    const token = await user.generateToken();

    res.cookie("token", token, {
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

module.exports = { signUp, loginUser };
