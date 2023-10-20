const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    imdb: { type: Number, required: true },
    video: { type: String, default: "" },
    age_suffering: { type: Number },
    director: { type: String, required: true },
    time: { type: String, required: true },
    realese_year: { type: String, required: true },
    genre: { type: [mongoose.Types.ObjectId], required: true },
    cast: { type: [String] },
    poster: { type: [String] },
    trailer: { type: String },
    country: { type: String },
    plot_summery: { type: String },
    writer: { type: String },
    producer: { type: String },
    composter: { type: String },
    suggested_movie: { type: [mongoose.Types.ObjectId], default: [] },
    comments: { type: [mongoose.Types.ObjectId], default: [] },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const MovieModel = mongoose.model("moives", movieSchema);

module.exports = {
  MovieModel,
};
