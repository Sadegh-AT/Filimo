const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value) {
          const existingUser = await this.constructor.findOne({ email: value });
          return !existingUser;
        },
        message:
          'The email "{VALUE}" is already in use. Please choose a different email.',
      },
    },
    phone: { type: String, required: true, unique: true },
    isSubscription: { type: Boolean, required: true, default: false },
    registerDate: {
      type: String,
      required: true,
      default: "",
    },
    roles: { type: Array, default: ["USER"] },
    password: { type: String, required: true },
    watched_movie: { type: Array, default: [mongoose.Types.ObjectId] },
    liked_movie: { type: Array, default: [mongoose.Types.ObjectId] },
    comments: { type: Array, default: [mongoose.Types.ObjectId] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
