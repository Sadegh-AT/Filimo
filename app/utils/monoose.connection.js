const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
function connectToMongo(DB_URL) {
  const uri = DB_URL;
  mongoose
    .connect(uri)
    .then(() => {
      console.log(`Connect to MongoDB: ${uri}`);
    })
    .catch((error) => {
      throw error;
    });
}

module.exports = {
  connectToMongo,
};
