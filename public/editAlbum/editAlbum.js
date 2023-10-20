// Creamos una funcion para tomar los valores del form (los input que haga el usuario)
function getInputValues() {
  // Obtener los input del form
  const titleInput = document.getElementById("titulo");
  const descriptionInput = document.getElementById("descripcion");
  const imageInput = document.getElementById("img");

  // Obtener los valores de los campos de entrada
  const titleValue = titleInput.value;
  const descriptionValue = descriptionInput.value;
  const imageValue = imageInput.value;

  // Devolver los valores en un objeto
  return {
    titulo: titleValue,
    descripcion: descriptionValue,
    portada: imageValue,
  };
}

const query = window.location.search.split("=");
const idAlbum = query[1];

// const form = document.querySelector("form")
const buttonEdit = document.querySelector(".boton");

buttonEdit.addEventListener("click", (e) => {
  changeAlbum(e);
});

const changeAlbum = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  try {
    let album = await axios.put(
      `http://localhost:3000/album/${idAlbum}`,
      objectToSend
    );
    await swal({
      title: "Album editado correctamente!",
      text: `Album: ${album.data.titulo}`,
      icon: "success",
      button: "Continuar",
    });
    window.location.href = `../../public/index.html`;
  } catch (error) {
    console.log(error);
  }
};
