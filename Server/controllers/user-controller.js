const User = require("../models/user-model");

// register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, avatarImage } = req.body;

    // if any field is empty throw error
    if (!username || !email || !password) {
      return res.status(400).json({ message: "ALL fields are required" });
    }

    // checking username length
    if (typeof username !== "string" || username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length must be greater than 3 " });
    }

    // checking if the username already exist
    const userNameExist = await User.findOne({ username });
    if (userNameExist) {
      return res.status(400).json({ message: "username already exist" });
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
      username,
      email,
      password,
      isAvatarImageSet: !!avatarImage, // set to true if avatarImage is provided
      avatarImage: avatarImage || "", // save the avatar image if available
    });

    // console.log(createdUser);

    res.status(201).json({
      message: "SignUp successfull",
      id: createdUser._id.toString(),
      token: await createdUser.generateToken(),
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

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credtials" });
    }

    const isPasswordMatch = await existingUser.comparePassword(password);

    if (isPasswordMatch) {
      res.status(200).json({
        message: "Login successfull",
        id: existingUser._id.toString(),
        token: await existingUser.generateToken(),
      });
    } else {
      return res.status(400).json({ message: "Invalid credtials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
