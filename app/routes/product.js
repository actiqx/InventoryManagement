const express = require("express");

const router = express.Router();
const productCtrl = require("../controllers/product");

router.get("/products", productCtrl.getProducts);
router.get("/products/:pid", productCtrl.getProduct);
router.post("/products", productCtrl.postProduct);
router.put("/products/:pid", productCtrl.updateProduct);
router.delete("/products/:pid", productCtrl.deleteProduct);

module.exports = router;
