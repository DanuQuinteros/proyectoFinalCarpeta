const query = window.location.search.split("=");
const idAlbum = query[1];
let album;
const agregarSong = document.querySelector("#agregar");
const cancelar = document.querySelector("#cancelar");
const editAlbum = document.querySelector("#editAlbum");
const otherAlbums = document.querySelector("#otherAlbums");
const logOut = document.querySelector("#logOut");

const redirect = (id) => {
  window.location.href = `../Album/album.html?album=${id}`;
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
    const { data } = await axios.get(`http://localhost:3000/album/${idAlbum}`);
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
    await axios.put(`http://localhost:3000/song/${idAlbum}`, objectToSend);
    await swal("Canción agregada correctamente");
    window.location.href = `../album/album.html?album=${idAlbum}`;
  } catch (error) {
    console.log(error);
    swal("Error al agregar la canción");
  }
};

// const addSong = async (e) => {
//   e.preventDefault();
//   const objectToSend = getInputValues();
//   try {
//     await axios.put(`http://localhost:3000/song/${idAlbum}`, objectToSend);
//     await swal("cancion agregada correctamente");
//     window.location.href = `../album/album.html?album=${idAlbum}`;
//   } catch (error) {
//     console.error("Error al agregar la canción:", error);
//     swal("Error al agregar la cancion");
//   }
// };

agregarSong.addEventListener("click", (e) => {
  addSong(e);
});

cancelar.addEventListener("click", () => {
  window.location.href = `../album/album.html?album=${idAlbum}`;
});

otherAlbums.addEventListener("click", () => {
  console.log("=====> YA HICE CLICK!!!!!!");
  redirect(album._id, "../index.html");
});

editAlbum.addEventListener("click", () => {
  console.log("=====> YA HICE CLICK!!!!!!");
  redirect(album._id, "../editAlbum/editAlbum.html");
});

logOut.addEventListener("click", () => {
  console.log("=====> YA HICE CLICK!!!!!!");
  redirect(album._id, `../logIn/login.html`);
});
