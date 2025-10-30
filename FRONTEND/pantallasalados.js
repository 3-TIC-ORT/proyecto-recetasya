import { error } from "console";

let home = document.getElementById("home");

function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", cambiarpantalla1);

let recetas = [];

fetch(`./BACKEND/comidas.json`)
    .then(response => response.json())
    .then(data => {
        console.log('Comidas cargadas desde json')
        console.log(data);
        recetas = data;
        mostrarecetas()
    })


    .catch(error => {
        console.error('Error al leer', error);
    });

const container = document.getElementById('recetas');

function mostrarecetas(){
    recetas.forEach(receta =>{
        container.innerHTML+= `
            <div class ="tarjeta">
                <h3>${receta.nombre}</h3>
                <h4>${receta.categoria}</h4>
                <h4>${receta.provincia}</h4>
                <p>${receta.ingredientes}</p
            <div>

        `;
    });
}