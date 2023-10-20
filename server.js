const express = require("express");
const app = express();

const mongoose = require("mongoose");
const url =
  "mongodb+srv://DanielaQuinteros:Riverplate14@cursointro.njmtmt0.mongodb.net/";
const path = require("path");

const routes = require("./routes/index");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", routes);
const connectMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(3000, () => {
      console.log(
        "Servidor escuchando en el puerto 3000 y la base de datos conectada"
      );
    });
  } catch (error) {
    console.log(error);
  }
};

connectMongo();
