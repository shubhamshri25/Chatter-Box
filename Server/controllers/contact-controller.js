const User = require("../models/user-model");

const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === null || searchTerm === undefined) {
      return res.status(400).json({ message: "Searchterm is required  " });
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[!.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regEx = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        {
          _id: { $ne: req.userId },
        },
      ],
      $or: [{ firstName: regEx }, { lastName: regEx }, { email: regEx }],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Search contact : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { searchContacts };
