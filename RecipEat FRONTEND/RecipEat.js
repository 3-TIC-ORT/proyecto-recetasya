let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");

function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat";
}

if(boton1){
    boton1.addEventListener("click", cambiarpantalla);
}

if(boton2){
    boton1.addEventListener("click", cambiarpantalla1);
}

boton1.addEventListener("click", cambiarpantalla);
boton2.addEventListener("click", cambiarpantalla1);