const { UserModel } = require("../models/user.model");
async function getAllUser(req, res, next) {
  try {
    await UserModel.find({})
      .limit(10)
      .sort({ createdAt: -1 })
      .exec((error, results) => {
        if (!error) {
          const newRes = results.map((doc) => ({
            id: doc._id,
            first_name: doc.first_name,
            last_name: doc.last_name,
            email: doc.email,
            username: doc.username,
            registerDate: doc.registerDate,
            phone: doc.phone,
            isSubscription: doc.isSubscription,
          }));
          res.json(newRes);
        }
      });
  } catch (error) {
    next(error);
  }
}
async function getUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    const newUser = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      isSubscription: user.isSubscription,
      registerDate: user.registerDate,
      roles: user.roles,
      watched_movie: user.watched_movie,
      liked_movie: user.liked_movie,
      comments: user.comments,
    };
    res.send(newUser);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUser,
  getUser,
};
