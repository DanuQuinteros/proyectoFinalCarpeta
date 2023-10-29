const buttonRegister = document.querySelector(".boton");

// Generamos una funcion para guardar los valores que ingresa el usuario
function getInputValues() {
    // Obtener los input del form
    const nombreInput = document.querySelector("#nombre"); // document.querySelector("#nombre")
    const apellidoInput = document.querySelector("#apellido");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password")

    // Obtener los valores de los campos de entrada
    const nombreValue = nombreInput.value;
    const apellidoValue = apellidoInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value

    // Devolver los valores en un objeto
    return {
      nombre: nombreValue,
      apellido: apellidoValue,
      email: emailValue,
      password: passwordValue
    };
  }


// esta funcion hace lo mismo que la de arriba
// const objectToSend = {};
// function getInputValues() {
//   const inputs = document.querySelectorAll("input");
//   inputs.forEach((input) => (objectToSend[input.id] = input.value));
// }

const userRegister = async (e) => {
  e.preventDefault();
  const objectToSend = getInputValues();
  // console.log(objectToSend, "OBJECT");
  try {
    await axios.post("http://localhost:3000/createuser", objectToSend);
    window.location.href = `../Login/Login.html`;
  } catch (error) {
    console.log(error);
  }
};

buttonRegister.addEventListener("click", (e) => {
  userRegister(e);
});