import crearTabla from './tabla.js'

export class Persona {
  constructor(id, nombre, apellido, email, sexo) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.sexo = sexo;
  }
}

//atributo
let nextId;

export function getPersons() {
  //si Json.parse() devulve null entonces me trae un array vacio
  return JSON.parse(localStorage.getItem("gente")) || [];
}

export function getId() {
  return JSON.parse(localStorage.getItem("nextID")) || 0;
}


//Alta de una Persona. Usamos el Constructor, le pasamos los parametros, y retornamos la persona creada
export function altaPersona(frm) {

  nextId = getId();
  const persona = new Persona(
    nextId,
    frm.nombre.value,
    frm.apellido.value,
    frm.email.value,
    frm.Gender.value
  );
  console.log("entro al alta");
  return persona;
}

// guardamos a lista de personas en localStorage y el prox Id
export function saveData(listPers){
    localStorage.setItem('gente', JSON.stringify(listPers));
    localStorage.setItem('nextID', nextId++);
}

export function updateList(listPers, divTabla){

    while(divTabla.firstChild){ //Este codigo elimina todos los child dentro del Div para recrearlos de 0
        divTabla.removeChild(divTabla.firstChild);
    }
    divTabla.appendChild(crearTabla(listPers));
}



export function DeleteList(listPers){
    localStorage.removeItem('gente');
    localStorage.removeItem('nextID');
    listPers = getPersons();
    nextId = getId();
    console.log('Se ha borrado el local Storage');
}


export function DeletePerson(id){
   const listaP = getPersons();

   for(const per in listaP){
     if(per.id === id)
     {
       listaP.filter(per);
       break;
     }
   }

   saveData(listaP);
   updateList(listaP);
}
