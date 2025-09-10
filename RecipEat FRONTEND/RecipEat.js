let boton1 = document.getElementById("boton1");
let bdulces = document.getElementById("bdulces")

function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}

function cambiardulces(){
    window.location.href = "pdulces.html";
}


boton1.addEventListener("click", cambiarpantalla);
bdulces.addEventListener("click", cambiardulces)