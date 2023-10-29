const buttonAdd = document.querySelector(".add-button");
const buttonCancel = document.querySelector(".cancel-button");

// Generamos una funcion para guardar los valores que ingresa el usuario
function getInputValues() {
  // Obtener los input del form
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const imageInput = document.getElementById("image");
  const anioLanzamientoInput = document.getElementById("anioLanzamiento");

  // Obtener los valores de los campos de entrada
  const titleValue = titleInput.value;
  const descriptionValue = descriptionInput.value;
  const imageValue = imageInput.value;
  const anioLanzamientoValue = anioLanzamientoInput.value;

  // Devolver los valores en un objeto
  return {
    titulo: titleValue,
    descripcion: descriptionValue,
    portada: imageValue,
    anioLanzamiento: anioLanzamientoValue,
  };
}

const addAlbum = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  try {
    let album = await axios.post(
      `http://localhost:3000/album/agregar`,
      objectToSend
    );
    await swal({
      title: "Album agregado correctamente!",
      text: `Album: ${album.data.titulo}`,
      icon: "success",
      button: "Continuar",
    });
    window.location.href = "../index.html";
  } catch (error) {
    console.log(error);
    swal("No se pudo agregar el álbum! Vuelve a intentarlo");
  }
};

buttonAdd.addEventListener("click", (e) => {
  addAlbum(e);
});

buttonCancel.addEventListener("click", () => {
  window.location.href = `../index.html`;
});
