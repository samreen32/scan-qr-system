const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017";
  // "mongodb+srv://iamsamreenk:KzhZp12JTGzWraFg@cluster0.hd30n.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected To Mongoose Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;