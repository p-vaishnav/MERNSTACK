const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 32,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 2000,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },

  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
  },

  soldUnit: {
    type: Number,
    default: 0,
  },

  photo: {
    //photo ke liye
    data: Buffer,
    contentType: String,
  },
});


module.exports = mongoose.model("Product",productSchema);