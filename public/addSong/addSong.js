import { logOut } from "../utils/utils.js";
const logOutButton = document.querySelector("#logOut");

const query = window.location.search.split("=");
const idAlbum = query[1];
let album;
const agregarSong = document.querySelector("#agregar");
const cancelar = document.querySelector("#cancelar");
const editAlbum = document.querySelector("#editAlbum");
const otherAlbums = document.querySelector("#otherAlbums");


const redirect = (id) => {
  window.location.href = `../Album/Album.html?album=${id}`;
};

// Generamos una funcion para guardar los valores que ingresa el usuario
function getInputValues() {
  // Obtener los input del form
  const titleInput = document.getElementById("titulo");
  const duracionInput = document.getElementById("duracion");
  const linkInput = document.getElementById("link");

  // Obtener los valores de los campos de entrada
  const titleValue = titleInput.value;
  const duracionValue = duracionInput.value;
  const linkValue = linkInput.value;

  // Devolver los valores en un objeto
  return {
    titulo: titleValue,
    duracion: duracionValue,
    link: linkValue,
  };
}

const getAlbum = async () => {
  try {
    const { data } = await axios.get(`../../../album/${idAlbum}`);
    album = data;
  } catch (error) {
    console.log(error);
  }
};

getAlbum();

const addSong = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  try {
    await axios.put(`../../../song/${idAlbum}`, objectToSend);
    await swal({
      title: "Canción agregada correctamente!",
      text: `Canción: ${objectToSend.titulo}`,
      icon: "success",
    });
    window.location.href = `../Album/Album.html?album=${idAlbum}`;
  } catch (error) {
    console.log(error);
    swal("Error al agregar la canción");
  }
};


agregarSong.addEventListener("click", (e) => {
  addSong(e);
});

logOutButton.addEventListener("click", () => {
  logOut();
  window.location.href = "../logIn/login.html";
});


cancelar.addEventListener("click", () => {
  window.location.href = `../Album/Album.html?album=${idAlbum}`;
});

otherAlbums.addEventListener("click", () => {
  console.log("=====> YA HICE CLICK!!!!!!");
  redirect(album._id, "../index.html");
});

editAlbum.addEventListener("click", () => {
  console.log("=====> YA HICE CLICK!!!!!!");
  redirect(album._id, "../editAlbum/editAlbum.html");
});


const username = document.querySelector("#name");

const onLoad = async () => {
  try {
    const response = await axios.get("../../../../me");
    username.textContent = `${response.data.nombre} ${response.data.apellido}`;
  } catch (error) {
    console.log(error);
    window.location.href = "../logIn/login.html";
  }
};

onLoad();