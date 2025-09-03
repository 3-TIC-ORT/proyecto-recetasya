let pantalla1 = document.getElementById("pantalla1");
let pantalla2 = document.getElementById("pantalla2");
let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");

function cambiarPantalla (pantallaocultar, pantallamostrar){
    pantallaocultar.style.display = "none";
    pantallamostrar.style.display  = "block;"
}

boton1.addEventListener("click",function()
{cambiarPantalla(pantalla1, pantalla2)});

boton2.addEventListener("click" ,function()
{cambiarPantalla(pantalla2, pantalla1)});