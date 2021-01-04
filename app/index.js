const express = require("express");
// import express from "express";
require("dotenv").config();
require("./db");
const productRoutes = require("./routes/product");
const app = express();

app.use(express.json());
app.use(productRoutes);
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
