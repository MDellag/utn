import { Anuncio_Auto } from "./Anuncios.js";
import crearTabla from "./tabla.js";

window.addEventListener("load", InicializarManejadores);

const divTabla = document.getElementById("divTabla");
const BtnForm = document.getElementById("btnGuardar");
const BtnUpdate = document.getElementById("btnUpdate");
const BtnBorrar = document.getElementById("btnBorrar");
const BtnBorrarID = document.getElementById("btnBorrarPorID");

let listaVehiculos;
let nextID;

/* ---- Inicializador ---- */
function InicializarManejadores() {
  listaVehiculos = getVehicles();
  nextID = getId() + 1;
  sleep(updateList); //spinner y update

  btnSave();
  btnBorrar();
  btnBorrarAnuncioPorID();
  btnUpdateAnuncioPorID();
}

/* ---------- Funciones de Buttons ----------- */

//Boton que se encarga de guardar el Anuncio
function btnSave() {
  const formAnuncio = document.forms[0];

  BtnForm.addEventListener("click", (e) => {
    e.preventDefault();
    const newAnuncio = generarAnuncio(formAnuncio);
    saveAnuncio(newAnuncio);
    sleep(updateList);
  });
}

//Boton que se encarga de borrar todos los Anuncios y resetear el ID
function btnBorrar() {
  BtnBorrar.addEventListener("click", (e) => {
    e.preventDefault();
    borrarAnuncios();
  });
}

//Boton que se encarga de borrar el Anuncio por id
function btnBorrarAnuncioPorID() {
  BtnBorrarID.addEventListener("click", (e) => {
    e.preventDefault();
    borrarAnuncioPorID();
  });
}

//Boton que se encarga de Updatear el Anuncio
function btnUpdateAnuncioPorID() {
  const formAnuncio = document.forms[0];
  BtnUpdate.addEventListener("click", (e) => {
    e.preventDefault();
    updatearAnuncio(formAnuncio);
  });
}

/* ------------------ Funciones Get - Save LocalStorage --------------- */

function getVehicles() {
  return JSON.parse(localStorage.getItem("listaVehiculos")) || [];
}

function getId() {
  return JSON.parse(localStorage.getItem("nextID")) || 1;
}

function saveData(anuncio) {
  localStorage.setItem("listaVehiculos", JSON.stringify(anuncio));
  localStorage.setItem("nextID", nextID++);
}
function updateList() {
  while (divTabla.firstChild) {
    //Este codigo elimina todos los child dentro del Div para recrearlos de 0
    divTabla.removeChild(divTabla.firstChild);
  }
  divTabla.appendChild(crearTabla(listaVehiculos));
}

/* ----------------- Funciones Anuncio ------------------------ */

//Genera un anuncio a partir de los datos del Form y lo retorna
function generarAnuncio(frm) {
  const anuncio = new Anuncio_Auto(
    nextID,
    frm.txtTitulo.value,
    frm.rdo.value,
    frm.txtDescripcion.value,
    frm.txtPrecio.value,
    frm.txtPuertas.value,
    frm.txtKMS.value,
    frm.txtPotencia.value
  );

  return anuncio;
}

//Updatea un anuncio a partir de los datos del Form y el ID pasado por prompt y lo guarda
function updatearAnuncio(frm) {
  const idAnuncio = prompt('Introduzca ID del Anuncio');
  const index = listaVehiculos.findIndex((a)=> a.id == idAnuncio);
  if(index){

    const anuncio = {
      id: idAnuncio,
      titulo: frm.txtTitulo.value,
      transaccion: frm.rdo.value,
      descripcion: frm.txtDescripcion.value,
      precio: frm.txtPrecio.value,
      puertas: frm.txtPuertas.value,
      kms: frm.txtKMS.value,
      potencia: frm.txtPotencia.value
    };

    listaVehiculos[index] = anuncio;
    nextID--;
    saveData(listaVehiculos);
    sleep(updateList);
  }
  else{
    alert('No existe el Anuncio')
  }
}

//Guarda un nuevo Anuncio en el array y en el localStorage
function saveAnuncio(newAnuncio) {
  if (newAnuncio) {
    listaVehiculos.push(newAnuncio);
    saveData(listaVehiculos);
  }
}

//Borra todos los anuncios e ID
function borrarAnuncios() {
  localStorage.clear("listaVehiculos");
  localStorage.clear("nextID");
  listaVehiculos = getVehicles();
  nextID = getId();
  sleep(updateList);
}

//Borra el anuncio segun el ID pasado por prompt
function borrarAnuncioPorID() {
  let idAnuncio = prompt("Indique ID del anuncio a borrar");
  if (idAnuncio) {
    const newList = listaVehiculos.filter((anuncio) => anuncio.id != idAnuncio);
    listaVehiculos = newList;
    nextID--;
    saveData(listaVehiculos);
    sleep(updateList);
  }
}

/* ----------------- Spinner ---------------- */


//Spinner con 1 seg de Delay
function sleep(func) {
  const div = document.getElementById("spinnerContainer");
  const img = document.createElement("img");
  img.src = "./images/wheelspinner.svg";
  const lbl = document.createElement("label");
  lbl.appendChild(document.createTextNode("Loading.."));
  img.className = "spinner";
  div.appendChild(img);
  div.appendChild(lbl);
  setTimeout(() => {
    while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
    }
    if (func) func();
  }, 3000);
}
