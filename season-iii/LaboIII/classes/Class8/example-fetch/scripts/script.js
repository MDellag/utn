const ol = document.querySelector(".ol");
const btnTraer = document.getElementById('btnTraer');

btnTraer.addEventListener("click", (e)=>{

   fetch("http://jsonplaceholder.typicode.com/user")
    .then((res)=>{
        return !res.ok?  Promise.reject(): res.json();
        //el !res.ok es como si fuese un IF con el ? y le paso 2 argumentos
        // o devuelvo Promise.reject() : o en res.json();
    })
    .then(function(data){
        ol.appendChild(crearItems(data))
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{
        
    })
});

const crearItems = (data)=>{
    const fragment = document.createDocumentFragment();
    data.forEach(element => {
        const item = document.createElement('li');
        item.textContent = `${element.name} -- ${element.email}`;
        fragment.appendChild(item);
        
    });
    return fragment;
}