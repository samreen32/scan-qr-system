const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://iamsamreenk:WEMza8nk9Uo0h38k@cluster0.i22qn.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected To Mongoose Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;