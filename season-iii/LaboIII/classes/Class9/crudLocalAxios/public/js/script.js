const ol = document.querySelector(".ol");
const btnTraer = document.getElementById("btnTraer");
const spinner = document.getElementById("spinner");
const lista = document.getElementById("lista");

btnTraer.addEventListener("click", (e) => {
  traerPersonas();

  setTimeout(() => {
    altaPersona();
  }, 2000);
});

function crearSpinner() {
  const img = document.createElement("img");
  img.setAttribute("src", "../images/wheelspinner.svg");
  return img;
}

//buscar bien que hace esto, osea como esta enganchado
const crearItems = (data) => {
  const fragmento = document.createDocumentFragment();

  data.forEach((element) => {
    const item = document.createElement("li");
    item.textContent = `${element.nombre} ${element.email}`;
    fragmento.appendChild(item);
  });
  return fragmento;
};

//#region Traer Personas xhr
/* function traerPersonas(){
    const xhr = new XMLHttpRequest(); // googlear esto

    ol.innerHtml = "";
    spinner.appendChild(crearSpinner())

    xhr.addEventListener('readystatechange', ()=>{
        if (xhr.readyState== 4){
            if (xhr.status >= 200 && xhr.status < 300) {
                let datos = JSON.parse(xhr.responseText)
                ol.appendChild(crearItems(datos))
            }
            else{
                let mensaje = xhr.statusText || "se produjo un error"
                console.warn(`Error: ${xhr.status} ${mensaje}`)
            }
            spinner.innerHtml = ""
        }
    });
} */
//#endregion

//#region nuevo traer Personas con fetch
async function traerPersonas() {
  while (ol.hasChildNodes()) {
    ol.removeChild(ol.firstChild);
  }

  spinner.appendChild(crearSpinner()); //no hace el spinner..

  try {
    const res = await axios.get("http://localhost:3000/personas");

    ol.appendChild(crearItems(res.data));
  } catch (error) {
    console.error(error);
  } finally {
    spinner.innerHTML = "";
  }
}
//#endregion

async function altaPersona() {
  //anda
  const nuevaPersona = {
    nombre: "Cen",
    apellido: "Enana",
    email: "CentEnana@mail",
  };

  ol.innerHTML = "";
  spinner.appendChild(crearSpinner());

  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
    data: JSON.stringify(nuevaPersona),
  };

  // esto simula el Post etc.. por eso se le pasan parametros.. al GET no
  try {
    const resp = await axios(`http://localhost:3000/personas`, config);

    console.log("Modificacion Exitosa", resp.data);

  } catch (error) {
    console.error(error);
  }
  finally{
    spinner.innerHTML = ''
  }
}

async function modificarPersona() {
  //anda
  const nuevaPersona = {
    nombre: "Kumi",
    apellido: "Yon",
    email: "KumiYon@mail",
  };

  ol.innerHTML = "";
  spinner.appendChild(crearSpinner());

  const config = {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(nuevaPersona),
  };

  let id = await prompt("ingrese id");
  //   console.log(id)
  await fetch(`http://localhost:3000/personas/${id}`, config);
}
