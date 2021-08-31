const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  //
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "unable to find order",
        });
      }

      req.order = order;
      next();
    });
};

exports.createUser = (req, res) => {
  req.body.order.user = req.user;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "unable to create order",
      });
    }

    res.json(order);
  });
};

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error : "not able to find any orders"
            });
        }

        return res.json(orders)
    });
};

exports.getOrderStatus = (req,res) => {
    return res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req,res) => {
    Order.updateStatus(
        {_id : req.body.orderId},
        {$set : {status : req.body.status}},
        (err,order) => {
            if(err){
                return res.status(400).json({
                    error : "unable to update"
                });
            }

            return res.json(order);
        }
    );
}
