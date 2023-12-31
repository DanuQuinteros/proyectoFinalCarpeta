const tituloAlbum = document.querySelector("#titulo1");
const descripcionAlbum = document.querySelector(".texto");
const ul = document.querySelector(".playlist");
const editAlbum = document.querySelector("#editAlbum");
const addSong = document.querySelector("#addSongs");
const otherAlbums = document.querySelector("#otherAlbums");
const logOut = document.querySelector("#logOut");

const query = window.location.search.split("=");
const idAlbum = query[1];

const redirect = (id, url) => {
  window.location.href = `${url}?album=${id}`;
};

const divTituloDescripcion = document.querySelector(".texto");
let numCancion = 1;

function renderAlbum(album) {
  // creamos los elementos HTML
  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");

  // agregamos los estilos
  h1.classList.add("titulo1");
  h2.classList.add("texto");

  // agregamos la info del album
  h1.textContent = album.titulo;
  h2.textContent = album.descripcion;

  // los agregamos al HTML
  divTituloDescripcion.appendChild(h1);
  divTituloDescripcion.appendChild(h2);

  // agregamos los addEventListener a los botones de la sidebar
  otherAlbums.addEventListener("click", () => {
    console.log("=====> YA HICE CLICK!!!!!!");
    redirect(album._id, "../index.html");
  });

  editAlbum.addEventListener("click", () => {
    console.log("=====> YA HICE CLICK!!!!!!");
    redirect(album._id, "../editAlbum/editAlbum.html");
  });
  addSong.addEventListener("click", () => {
    console.log("=====> YA HICE CLICK!!!!!!");
    redirect(album._id, `../addSong/addSong.html`);
  });
  logOut.addEventListener("click", () => {
    console.log("=====> YA HICE CLICK!!!!!!");
    redirect(album._id, `../logIn/login.html`);
  });
}

function renderSongs(album) {
  // creamos los elementos HTML
  const li = document.createElement("li");
  const spanSongTitle = document.createElement("span");
  const spanSongDuration = document.createElement("span");
  const spanSongIcon = document.createElement("span");
  const iconTrash = document.createElement("i");
  const iconMusic = document.createElement("i");

  // agregamos los estilos
  spanSongTitle.classList.add("tituloCancion");
  spanSongDuration.classList.add("duracionCancion");
  spanSongIcon.classList.add("iconosCancion");
  iconTrash.classList.add("fas");
  iconTrash.classList.add("fa-trash-alt");
  iconTrash.setAttribute("id", "delete");
  iconMusic.classList.add("fas");
  iconMusic.classList.add("fa-music");

  // agregamos la info de las canciones
  spanSongTitle.textContent = album.titulo;
  spanSongDuration.textContent = album.duracion;
  numCancion++;

  // agregamos los elementos al HTML
  li.appendChild(spanSongTitle);
  li.appendChild(spanSongDuration);
  spanSongIcon.appendChild(iconTrash);
  spanSongIcon.appendChild(iconMusic);
  li.appendChild(spanSongIcon);
  ul.appendChild(li);

  // agregamos el addEventListener
  iconMusic.addEventListener("click", () => {
    window.open(album.link, "_blank");
  });
}

const getAlbum = async () => {
  try {
    const respuesta = await axios.get(`../../../album/${idAlbum}`);
    // console.log(respuesta);
    renderAlbum(respuesta.data);
    const canciones = respuesta.data.canciones;
    canciones.map((cancion, index) => {
      renderSongs(cancion, index);
    });
    const trash = document.querySelectorAll("#delete");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteSong(idAlbum, canciones[i]._id);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

getAlbum();

const deleteSong = async (album, cancion) => {
  try {
    await axios.put(
      `../../../song/delete/${album}?idSong=${cancion}`
    );
    await swal("cancion eliminada correctamente");
    ul.innerHTML = ""; // limpia la lista actual
    const respuesta = await axios.get(`../../../album/${idAlbum}`);
    const canciones = respuesta.data.canciones;
    canciones.map((cancion, index) => {
      renderSongs(cancion, index);
    });
    const trash = document.querySelectorAll("#delete");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteSong(idAlbum, canciones[i]._id);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const username = document.querySelector("p");

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