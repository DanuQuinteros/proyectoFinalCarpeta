const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

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

app.use(express.json());
app.use(cookieParser());

app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// esta linea la pide render para chequear la app 
app.use("/health", (req, res) => res.sendStatus(200));

// Permitir solicitudes desde el dominio 'https://proyecto-musica.onrender.com'
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://proyecto-musica.onrender.com');
  next();
});


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
