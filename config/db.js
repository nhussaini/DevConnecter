const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log("mongoDB connected ...");
  } catch (err) {
    console.error(err.message);

    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
