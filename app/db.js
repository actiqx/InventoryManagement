const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.2pwwv.mongodb.net/inventory?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));
