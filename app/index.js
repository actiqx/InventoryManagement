const express = require("express");
// import express from "express";
require("dotenv").config();
const app = express();
const productList = [{ id: 1, name: "Apple" }];
app.use(express.json());
app.get("/products", (req, res, next) => {
  res.send(productList);
});
app.post("/products", (req, res, next) => {
  console.log(req.body);
  productList.push(req.body);
  res.status(201).send({ message: "Products been Created" });
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
