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

module.exports = {
  getAllUser,
};
