// console.log("Hola mundo");


let nombreSw;

async function solicitarNombre() {
  try {
    nombreSw = await swal("¿Como te llamas?", {
      content: "input",
    });
    while (nombreSw.length <= 3) {
      nombreSw = await swal("Por favor, ingresa tu nombre completo!", {
        content: "input",
      });
    }
    const bienvenido=document.getElementById("bienvenido");
  bienvenido.textContent = `Hola ${nombreSw.toUpperCase()}!`;
  const i = document.querySelector("i");
  i.setAttribute("class" , "fa fa-ticket");
  } catch (error) {
    console.log(error);
  }
}

solicitarNombre();

let edad;
let botones =document.querySelectorAll("button");
let i;
async function solicitarEdad() {
  try {
    edad = await swal("¿Cuántos años tenés?", {
      content: "input",
    });
    if (edad < 18) {
      swal("Ups!", "Tenés que ser mayor de edad para comprar tickets", "warning"); 
      for (let i = 0; i < botones.length; i++) {

        botones[i].setAttribute("disabled", "disabled");
        botones[i].style.backgroundColor = "gray";
        botones[i].textContent= "X" ;
        botones[i].style.color = "black";
        botones[i].style.cursor = "default";
    }      
    }
  } catch (error) {
    console.error(error);
  }

}
solicitarEdad();


let tickets = {
  Cordoba: 3,
  BuenosAires: 0,
  Mendoza: 0,
  Tucuman: 4
};

function getTickets(lugar) {
  soldOutButton(tickets);
  if (tickets[lugar] > 0) {
    swal("Vendida!", `Tenés tu entrada para ${lugar} `, "success");
    tickets[lugar]--;
    if (tickets[lugar] == 0) {
      soldOutButton(lugar);
    }
  } else {
    swal(
      "Agotadas!", `No quedaron más tickets para ${lugar}`, "error"
    );
  }
}

function soldOutButton(lugar) {
  let boton = document.querySelector(`#${lugar}`);
  boton.textContent = "Agotadas";
}

function soldOutButton(tickets) {
  for (const ciudad in tickets) {
    if (tickets[ciudad] == 0) {
       let boton = document.querySelector(`#${ciudad}`);
       boton.textContent = "Agotadas";
    }
  }
}

