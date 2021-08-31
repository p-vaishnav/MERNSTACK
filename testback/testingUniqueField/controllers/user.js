const User = require("../models/user");
exports.saveUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "unable to store user user in db",
      });
    }

    return res.json(user);
  });
};

exports.getAllUser = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to store fetch users from db",
      });
    } //if

    return req.json(users);
  });
};
