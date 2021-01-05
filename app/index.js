const express = require("express");
const ErrorHandler = require("./middlewares/errorHandler");
// import express from "express";
require("dotenv").config();
require("./db");
const productRoutes = require("./routes/product");
const app = express();

app.use(express.json());
app.use(productRoutes);

app.use(ErrorHandler);
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
