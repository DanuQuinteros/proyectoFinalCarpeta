const objectToSend = {};

function getInputValues() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (objectToSend[input.id] = input.value));
}

const redirect = () => {
  window.location.href = `../index.html`;
};
  const showErrorMessage = (message) => {
    swal("Ups!", message, "warning");
  };

const loginUser = async (e) => {
  e.preventDefault();
  getInputValues();
  try {
    const response = await axios.post("../../../login", objectToSend);
    // Verificar si la solicitud fue exitosa
    if (response.status === 200) {
      redirect();
    }
  } catch (error) {
    // Mostrar mensaje de error al usuario
    showErrorMessage(error.response.data.message);
  }
};

const loginButton = document.querySelector(".boton");
loginButton.addEventListener("click", (e) => loginUser(e));



// console.log("Hola!");

// const objectToSend = {};
// function getInputValues() {
//   const inputs = document.querySelectorAll("input");
//   inputs.forEach((input) => (objectToSend[input.id] = input.value));
// }

// const redirect = () => {
//   window.location.href = `../index.html`;
// };

// const loginUser = async (e) => {
//   e.preventDefault();
//   getInputValues();
//   try {
//     const response = await axios.post(
//       "../../../login",
//       objectToSend
//     );
//     // console.log(response, "respuesta");
//     redirect();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const loginButton = document.querySelector(".boton");
// loginButton.addEventListener("click", (e) => loginUser(e));






// const objectToSend = {};

// function getInputValues() {
//   const inputs = document.querySelectorAll("input");
//   inputs.forEach((input) => (objectToSend[input.id] = input.value));
// }

// const redirect = () => {
//   window.location.href = `../index.html`;
// };

// const loginUser = async () => {
//   try {
//     const response = await axios.post(
//       "../../../login",
//       objectToSend
//     );
//     redirect();
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// const loginForm = document.querySelector("form");

// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault(); // Evita que se envíe el formulario automáticamente
//   getInputValues();
//   await loginUser(); // Llama a la función loginUser() para procesar el formulario
// });