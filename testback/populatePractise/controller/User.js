const User = require("../models/User");

exports.saveUser = function (req, res) {
  const user = new User(req.body);
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "no data saved",
      });
    }

    return res.status(200).json(data);
  });
};
