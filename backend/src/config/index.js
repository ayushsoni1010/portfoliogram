import mongoose from "mongoose";

async function connectMongoDB(url) {
  const connection = mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log("Mongo error: ", error);
    });

  return connection;
}

export { connectMongoDB };
