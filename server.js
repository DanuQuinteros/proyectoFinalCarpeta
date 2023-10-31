const express = require("express");
const app = express();
const dotenv = require ("dotenv");
dotenv.config()

const mUser = process.env.USERM;
const passw = process.env.PASSWORD;
const port = process.env.PORT;

const mongoose = require("mongoose");
const url =
  `mongodb+srv://${mUser}:${passw}@cursointro.njmtmt0.mongodb.net/`;
const path = require("path");

const routes = require("./routes/index");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", routes);
const connectMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(port, () => {
      console.log(
        `Servidor escuchando en el puerto ${port} y la base de datos conectada`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

connectMongo();
