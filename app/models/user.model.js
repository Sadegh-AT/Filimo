const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    isSubscription: { type: Boolean, required: true, default: false },
    registerDate: {
      type: String,
      required: true,
      default: "",
    },
    roles: { type: Array, default: ["USER"] },
    password: { type: String, required: true },
    watched_movie: { type: Array, default: [] },
    liked_movie: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
