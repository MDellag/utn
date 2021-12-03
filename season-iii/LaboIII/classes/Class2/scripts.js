//console.log( document.getElementById("lblNombre") );  //Aca esta en el SCOPE global

window.addEventListener("load", inicio2);
window.addEventListener("load", inicio3);

function inicio(){
    //Esto es el SCOPE de la funcion, solo va a ser llamado el codigo
    // cuando se llame a la funcion
    console.log( document.getElementById("lblNombre") );
}


function inicio2(){ //function () {} es una funcion anonima osea sin nombre.. son validas 

    document.getElementById("botoncitoPiolah").addEventListener("click", function () {
        alert("Me clikeasteh wacho");
    });
}

function inicio3(){     //esto tiene un arrow function, otra forma mas simplificada de hacer una funcion.
    document.getElementById("botoncitoPiolah").addEventListener("click", ()=>{
        alert("Dejah de clikearmejh puto");
    });
}