const mongoose = require("mongoose");
const connectionString = process.env.MONGO_DB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDb connected ");
  } catch (error) {
    console.log("MongoDb connection error :", error);
  }
};

module.exports = connectDb;
