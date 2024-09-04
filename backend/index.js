const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/user"));
app.use("/api/invoice", require("./routes/invoice"));

app.listen(port, () => {
  console.log(`React Project backend listening on port ${port}`);
});