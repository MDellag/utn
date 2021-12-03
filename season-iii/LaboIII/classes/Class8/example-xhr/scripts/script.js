const ol = document.querySelector(".ol");
const btnTraer = document.getElementById('btnTraer');

btnTraer.addEventListener("click", (e)=>{

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status < 300) {
                let datos = JSON.parse(xhr.responseText)
                console.log(datos)
                ol.appendChild(crearItems(datos));
            }
            else{
            console.log(`Error: ${xhr.status} - ${xhr.statusText} `);
            }
        }
    });

    xhr.open('GET', "http://jsonplaceholder.typicode.com/users")
    xhr.send();
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