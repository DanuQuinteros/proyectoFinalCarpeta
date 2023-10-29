const express = require("express");
const router = express.Router();
const user = require("../models/users");
const Album = require("../models/albums");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const saltRounds = 10;
const secret = "brunodursi";


const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

// Crear un usuario
router.post("/createuser", async (req, res) => {
  const { password, email, nombre, apellido } = req.body;
  const hashed = await hashPassword(password);
  const user = {
    password: hashed,
    email,
    nombre,
    apellido,
  };
  try {
    await User.create(user);
    res.status(201).send("Usuario creado correctamente");
  } catch (error) {
    res.status(500).send({ "error al crear el usuario": error });
  }
});

// Ruta para el logIn
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await user.findOne({ email: email });
    console.log(user);
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    const payload = { email, nombre: user.nombre, apellido: user.apellido };
    if (match) {
      const token = jwt.sign(payload, secret);
      res.cookie("token", token);
      res.status(200).send(payload);
    } else {
      res.status(401).send({ message: "La contraseña no coincide" });
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});


// Recibir un Id por params ,retornando data del usuario y excluír password.
// router.get("/usuario/:id", async (req, res) => {
//   try {
//     let respuesta = await User.findById(req.params.id);
//     res.status(200).send({
//       usuario: {
//         nombre: respuesta.nombre,
//         apellido: respuesta.apellido,
//         email: respuesta.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).send({ "error al crear el usuario": error });
//   }
// });

// Editar datos del usuario.
router.put("/usuario/edit/:id", async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send({ "error al editar el usuario": error });
  }
});

// Agregar album.
router.post("/album/agregar", async (req, res) => {
  try {
    let album = await Album.create(req.body);
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al agregar un album": error });
  }
});

// Editar album.
router.put("/album/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al agregar un album": error });
  }
});

// Agregar canción del album.
router.put("/song/:idAlbum", async (req, res) => {
  try {
    let album = await Album.findById(req.params.idAlbum);
    album.canciones.push(req.body);
    await Album.findByIdAndUpdate(req.params.idAlbum, album, {
      new: true,
    });
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error solicitar todos los albums": error });
  }
});

// Eliminar canción del album.
router.put("/song/delete/:idAlbum", async (req, res) => {
  let idSong = req.query.idSong;
  try {
    let album = await Album.findById(req.params.idAlbum);
    let albumActualizado = album.canciones.filter(
      (cancion) => cancion._id != idSong
    );
    album.canciones = albumActualizado;
    await Album.findByIdAndUpdate(req.params.idAlbum, album, {
      new: true,
    });
    res.status(200).send({ mensaje: "Cancion eliminada correctamente" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Devolver todos los albums.
router.get("/album/todos", async (req, res) => {
  try {
    let albums = await Album.find();
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send({ "error solicitar todos los albums": error });
  }
});

// Devolver info de un álbum especifíco.
router.get("/album/:id", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error solicitar todos los albums": error });
  }
});

// Eliminar un album.
router.delete("/album/:idAlbum", async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.idAlbum);
    res.status(200).send("Album eliminado correctamente");
  } catch (error) {
    res.status(500).send({ "error al eliminar el album": error });
  }
});

module.exports = router;

