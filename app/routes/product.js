const express = require("express");

const router = express.Router();
const productCtrl = require("../controllers/product");

router.get("/products", productCtrl.getProducts);
router.post("/products", productCtrl.postProduct);

module.exports = router;
