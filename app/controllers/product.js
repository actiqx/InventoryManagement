const Product = require("../models/product");
//GET
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//GET BY ID
exports.getProduct = (req, res, next) => {
  const pid = req.params.pid;

  Product.findById(pid)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find Product");
        error.statusCode = 404;
        error.data = pid;
        throw error;
      }
      res.status(200).json({
        message: "Product Fetched",
        product: {
          id: product._id,
          title: product.title,
          price: product.price,
          tags: product.tags,
          quantity: product.quantity,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//POST
exports.postProduct = (req, res, next) => {
  const { title, price, tags, quantity } = req.body;
  const product = new Product({
    title: title,
    price: price,
    tags: tags,
    quantity: quantity,
  });
  product
    .save()
    .then((result) => {
      res.status(201).send({ message: "Products been Created" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//PUT
exports.updateProduct = (req, res, next) => {
  const pid = req.params.pid;
  const { title, quantity } = req.body;

  Product.findById(pid)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find Product");
        error.statusCode = 404;
        error.data = pid;
        throw error;
      }
      product.title = title;
      product.quantity = quantity;
      return product.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Product Updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//DELETE
exports.deleteProduct = (req, res, next) => {
  const pid = req.params.pid;
  Product.findById(pid)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find Product");
        error.statusCode = 404;
        error.data = pid;
        throw error;
      }
      return Product.findByIdAndDelete(pid);
    })
    .then((result) => {
      res.status(200).json({ message: "Product Deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
