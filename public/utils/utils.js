const onLoad = async () => {
  try {
    const response = await axios.get("../../../../me");
    username.textContent = `${response.data.nombre} ${response.data.apellido}`;
  } catch (error) {
    window.location.href = "../LogIn/login.html";
  }
};

const logOut = async () => {
  try {
    const response = await axios.post("../../logout");
  } catch (error) {
    console.log(error.message);
  }
};

export { onLoad, logOut };
