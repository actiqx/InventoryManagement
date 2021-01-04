const Product = require("../models/product");
//GET
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

//GET BY ID

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
    .catch((err) => console.log(error));
};

//PUT

//DELETE
