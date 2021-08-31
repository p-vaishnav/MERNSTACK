const User = require("../models/user");
const Order = require("../models/order");
exports.getUserById = (req, res, next, id) => {
  //TODO:why exec here?
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User is not present in DB",
      });
    } //if

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //TODO: action on password needs to be taken!
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Unable to modify db",
        });
      } //if

      user.salt = undefined;
      user.encry_password = undefined;
      return res.json(user);
      // return res.json({
      //   msg:"holla"
      // })
    }
  );
};

exports.getUserPurchaseList = (req, res) => {
  //introduced populate to get familiarized with it && not a compulsion
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, user) => {
      if (err) {
        return res.status(401).json({
          message: "No Order in this account",
        });
      }

      return res.status(200).json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res,next) => {
  let pruchase = [];
  req.body.order.products.forEach((product) => {
    pruchase.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  // save it to db
  User.findOneAndUpdate(
    {_id:req.profile._id},
    {$push:{purchases:purchases}},
    {new:true},
    (err,purchases)=>{
      if(err){
        return res.status(400).json({
          message : "Unbale to update purchase list"
        })
      }
    }
  );
  next();
}; 
