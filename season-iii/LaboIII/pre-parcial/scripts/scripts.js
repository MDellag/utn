// modularizacion, importo el crearTrabla del otro archivo Js
// para poder Importar es necesario Exportar todo lo que yo quiero usar en otros archivos
import crearTabla from "./tabla.js";
import {Persona, altaPersona, getPersons, saveData, DeleteList, updateList} from "./persona.js";

//#region Json New1
const listJsonNew1 = [
  {
    _id: "5f8b83fe9333e4290e7fec90",
    index: 0,
    isActive: true,
    age: 34,
    name: "Stacey Norton",
    gender: "female",
    email: "staceynorton@zorromop.com",
    phone: "+1 (946) 485-2248",
  },
  {
    _id: "5f8b83fe8134ea0b76a045f1",
    index: 1,
    isActive: false,
    age: 38,
    name: "Sophie Powers",
    gender: "female",
    email: "sophiepowers@zorromop.com",
    phone: "+1 (997) 571-2064",
  },
  {
    _id: "5f8b83fec17d3a33c663065e",
    index: 2,
    isActive: true,
    age: 34,
    name: "Benjamin Dorsey",
    gender: "male",
    email: "benjamindorsey@zorromop.com",
    phone: "+1 (946) 591-2115",
  },
  {
    _id: "5f8b83fe6e719bf088a30156",
    index: 3,
    isActive: true,
    age: 32,
    name: "Althea Gentry",
    gender: "female",
    email: "altheagentry@zorromop.com",
    phone: "+1 (970) 487-3804",
  },
  {
    _id: "5f8b83fe9782225a38432b52",
    index: 4,
    isActive: false,
    age: 25,
    name: "Henry Sutton",
    gender: "male",
    email: "henrysutton@zorromop.com",
    phone: "+1 (917) 508-3612",
  },
  {
    _id: "5f8b83fe170ecb658c0d953d",
    index: 5,
    isActive: true,
    age: 39,
    name: "Pace Ryan",
    gender: "male",
    email: "paceryan@zorromop.com",
    phone: "+1 (815) 457-2139",
  },
  {
    _id: "5f8b83fe17ed607fa2db8e17",
    index: 6,
    isActive: false,
    age: 23,
    name: "Victoria Conrad",
    gender: "female",
    email: "victoriaconrad@zorromop.com",
    phone: "+1 (997) 581-2433",
  },
];
//#endregion
//#region Json ListaPersonas
/* var listaPersonas = [
    {"id":1,"first_name":"Feliza","last_name":"Corser","email":"fcorser0@google.es","gender":"Female"},
    {"id":2,"first_name":"Nial","last_name":"Barnardo","email":"nbarnardo1@wisc.edu","gender":"Male"},
    {"id":3,"first_name":"Tish","last_name":"D'Costa","email":"tdcosta2@miitbeian.gov.cn","gender":"Female"},
    {"id":4,"first_name":"Kiel","last_name":"Switsur","email":"kswitsur3@php.net","gender":"Male"},
    {"id":5,"first_name":"Ashlin","last_name":"Corderoy","email":"acorderoy4@amazonaws.com","gender":"Male"},
    {"id":6,"first_name":"Carline","last_name":"Francisco","email":"cfrancisco5@loc.gov","gender":"Female"},
    {"id":7,"first_name":"Josey","last_name":"Cowl","email":"jcowl6@ycombinator.com","gender":"Female"},
    {"id":8,"first_name":"Kip","last_name":"Serrier","email":"kserrier7@huffingtonpost.com","gender":"Male"},
    {"id":9,"first_name":"Dillie","last_name":"Finnes","email":"dfinnes8@google.com.au","gender":"Male"},
    {"id":10,"first_name":"Alain","last_name":"Daykin","email":"adaykin9@weibo.com","gender":"Male"},
    {"id":11,"first_name":"Diane-marie","last_name":"Hannond","email":"dhannonda@yale.edu","gender":"Female"},
    {"id":12,"first_name":"Korey","last_name":"Tuma","email":"ktumab@macromedia.com","gender":"Male"},
    {"id":13,"first_name":"Jae","last_name":"Hendrick","email":"jhendrickc@aol.com","gender":"Male"},
    {"id":14,"first_name":"Bronnie","last_name":"Kubyszek","email":"bkubyszekd@trellian.com","gender":"Male"},
    {"id":15,"first_name":"Janaya","last_name":"Wilber","email":"jwilbere@fastcompany.com","gender":"Female"},
    {"id":16,"first_name":"Paten","last_name":"Bradburne","email":"pbradburnef@skyrock.com","gender":"Male"},
    {"id":17,"first_name":"Bartlet","last_name":"Beelby","email":"bbeelbyg@cbslocal.com","gender":"Male"},
    {"id":18,"first_name":"Leila","last_name":"Bachelor","email":"lbachelorh@elpais.com","gender":"Female"},
    {"id":19,"first_name":"Findlay","last_name":"Puller","email":"fpulleri@hc360.com","gender":"Male"},
    {"id":20,"first_name":"Worthington","last_name":"Ivanin","email":"wivaninj@techcrunch.com","gender":"Male"}
]; */
//#endregion
//#region Codigo a mano
function pushPersonToList() {
  // cada variable toma el valor asignado en el INPUT del HTML
  let perName = document.getElementById("namePers").value;
  let perLastName = document.getElementById("apellPers").value;
  let perDni = document.getElementById("dniPers").value;
  let perSex = document.getElementById("sexoPers").value;

  //Creamos un objeto JSON asignandole los valores de los INPUT
  const person = {
    name: perName,
    lastName: perLastName,
    dni: perDni,
    sex: perSex,
  };

  //Lo Agregamos a la Lista
  listaPersonas.push(person);
  //Esto es para verificar por consola que cargue apropiadamente
  console.log(listaPersonas);

  personsToTable(person);
}

function personsToTable(persona) {
  let myTable = document.getElementById("tablePersons");

  const trElemt = document.createElement("tr");
  const tdName = document.createElement("td");
  const tdLastname = document.createElement("td");
  const tdDni = document.createElement("td");
  const tdSex = document.createElement("td");

  tdName.innerHTML = persona.name;
  tdLastname.innerHTML = persona.lastName;
  tdDni.innerHTML = persona.dni;
  tdSex.innerHTML = persona.sex;

  trElemt.appendChild(tdName);
  trElemt.appendChild(tdLastname);
  trElemt.appendChild(tdDni);
  trElemt.appendChild(tdSex);

  myTable.appendChild(trElemt);
}
//#endregion

// Atributos/Variables del main
let listPers;
let formPersona;
let btnDelete;
let btnShowList;

let divTabla;

//Con eso hacemos un evento Load de toda la app
window.addEventListener("load", InicializarManejadores);

function InicializarManejadores() {
  //  btnTabl = document.getElementById('btnTabl');
  listPers = getPersons();

  //obtiene el elemento desde el HTML con el ID 'divTabla' y lo guarda en una variable
  divTabla = document.getElementById('divTabla');


  formPersona = document.forms[0]; //no se bien que hace, pero desp se le agrega un manejador de Eventos
  formPersona.addEventListener("submit", (e) => {
    e.preventDefault(); //esto aborta el envio del formulario

        //llamamos al altaPersona (desde './Personas.js') y almacenamos una nueva persona en una constante
        const newPerson = altaPersona(formPersona);
        if(newPerson){ //si newPerson es distinto de NULL
            listPers.push(newPerson); //cargamos el array
            saveData(listPers); //guardamos el array en LocalStorage
            updateList(listPers, divTabla); //actualizamos la pagina
        }

        //#region formas de obtener datos desde HTML
    console.log(formPersona.nombre.value); //busco la etiqueta con el nombre="nombre" y obtengo el valor
    console.log(document.querySelector("#txtApellido").value);
    console.log(document.getElementById("txtEmail").value);
    console.log(formPersona.Gender.value);
    //#endregion
    });

    btnDelete = document.getElementById('btnDeleteList'); //agarramos el elemento con el ID y lo almacenamos en otra variable
    btnDelete.addEventListener("click", (e) => { //un evento 'CLICK'
        e.preventDefault(); //averiguar bien que hace esto
        
        DeleteList(listPers); //borramos la lista
        updateList(listPers, divTabla); //actualizamos todo
    });

    btnShowList = document.getElementById('btnShowList');
    btnShowList.addEventListener('click', (e)=>{ //evento click otra vez
        e.preventDefault();
        updateList(listPers); //solo actualizamos la lista
    });
    
}







/* ---------- Codigo previo ----------  */

/* btnTabl.addEventListener('click', ()=>{
    const divTabla = document.getElementById('divTabla');

    //al div le inserto dentro una tabla que es creada a partir  de una lista de Jsons
    // divTabla.appendChild(crearTabla(listaPersonas));
    ObtenerPersonas(listPers);
    
}); */
