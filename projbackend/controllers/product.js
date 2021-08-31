const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category") //TODO: yeh dekhna padega
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          message: "unable to fetch product from db",
        });
      }

      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with the image provided",
      });
    } //if

    //destructure the fields
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please provide all the fields related to db",
      });
    } //if

    //crate Product
    //TODO:create restrictions
    const product = new Product(fields);

    //storing file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      //saving product to db
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "unable to save product in db",
          });
        } //if
        return res.json(product);
      });
    }
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "unable to delete product from db",
      });
    } //if

    return res.json({
      message: "deleted successfully",
      deletedProduct: product,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with the image provided",
      });
    } //if

    //updating the product
    const product = req.product;
    product = _.extend(product, fields);

    //storing file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      //saving product to db
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "unable to save product in db",
          });
        } //if
        return res.json(product);
      });
    }
  });
};

exports.getAllProducts = (req, res) => {
  const limit = req.query.limit ? req.query.limit : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : _id;
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to fetch products from db",
        });
      }

      return res.json(products);
    });
};

//TODO:it needs to be done
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, bulkwrite) => {
    if (err) {
      return res.status(400).json({
        error: "unable to perform bulkwrite",
      });
    }
  });

  next();
};

exports.getAllCategories = (rqe, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to get all categories",
      });
    }

    return res.json(category);
  });
};
