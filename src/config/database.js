const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  const connection = mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log("Mongo error: ", error);
    });

  return connection;
};

module.exports = { connectMongoDB };
