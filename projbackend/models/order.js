const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  products: [productCartSchema],
  transcation_id: {},
  amount: Number,
  address: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  updated: Date,
  status: {
    type: String,
    default: "Recieved",
    enum: ["Cancelled", "Delievered", "Shipped", "Processing", "Recieved"],
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports = { Order, ProductCart };
