const Category = require("../models/category");
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Can't find a suitable category",
      });
    }

    req.category = category;
  });

  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save category in db",
      });
    } //if

    return res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to find any category",
      });
    } //if

    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to update a category",
      });
    } //if

    return res.json(category);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.delete((err, category) => {
    if (err) {
      return res.status(400).json({
        error : "unable to delete category"
      })
    }

    return res.json({
      message : `Successfully deleted Category ${category.name}`
    })
  });
};
