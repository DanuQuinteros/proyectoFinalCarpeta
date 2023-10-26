// // const { log } = require("console");

// const discosFavoritos = ["detox"];

// function addFavorites(favoritos) {
//   const imgs = document.querySelectorAll(".albums img");

//   imgs.forEach((img) => {
//     if (favoritos.includes(img.alt)) {
//       const icon = document.createElement("i");
//       icon.classList.add("fa-solid");
//       icon.classList.add("fa-star");
//       icon.classList.add("estrellita");
//             icon.classList.add("favoritos");
//       img.parentNode.appendChild(icon);
//       img.parentElement.classList.add("favorita");
//       // console.log("Agregado a favoritos");
//     }
//   });
// }

// addFavorites(discosFavoritos);

const redirect = (id) => {
  window.location.href = `../album/album.html?album=${id}`;
};

const divAlbums = document.querySelector(".albums");

const renderAlbums = (album) => {
  const div = document.createElement("div");
  const imgAlbum = document.createElement("img");
  const iconTrash = document.createElement("i");

  div.classList.add("albumsAgregados");
  let urlPortada = album.portada
    ? album.portada
    : "https://imgur.com/0uSALUr.png";

  imgAlbum.setAttribute("src", urlPortada);
  iconTrash.classList.add("fas");
  iconTrash.classList.add("fa-trash-alt");
  iconTrash.classList.add("trash");

  imgAlbum.addEventListener("click", () => {
    // console.log(album._id);
    redirect(album._id);
  });
  div.appendChild(imgAlbum);
  div.appendChild(iconTrash);
  divAlbums.appendChild(div);
};

const getAlbums = async () => {
  try {
    const respuesta = await axios.get("http://localhost:3000/album/todos");
    console.log(respuesta);
    respuesta.data.map((album) => {
      renderAlbums(album);
    });
    const trash = document.querySelectorAll("i");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteAlbum(respuesta.data[i]._id);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

getAlbums();

const deleteAlbum = async (album) => {
  try {
    await axios.delete(`../../album/${album}`);
    await swal("album eliminado correctamente");
    const albums = document.querySelectorAll(".albumsAgregados");
    albums.forEach((album) => album.remove());
    const respuesta = await axios.get("../../album/todos");
    respuesta.data.map((album) => {
      renderAlbums(album);
    });
    // el Window.location.reload() Lo utilizo porque luego de eliminar un álbum, no me permitía eliminar otro consecutivo sin refrescar la página antes de forma "manual" asique lo que hice fue agregar éste código para que se recargue de manera automàtica luego de eliminar cualquier álbum.. 
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
