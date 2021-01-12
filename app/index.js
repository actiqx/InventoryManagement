const express = require("express");
const ErrorHandler = require("./middlewares/errorHandler");
// import express from "express";
require("dotenv").config();
require("./db");
const cors = require("cors");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());
// For Reference
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS,GET,POST,PUT,PATCH,DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });
app.use(cors());
app.use(productRoutes);
app.use(authRoutes);

app.use(ErrorHandler);
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
