let boton1 = document.getElementById("boton1");
let bdulces = document.getElementById("bdulces");
let bbebidas = document.getElementById("bbebidas")
let log = document.getElementById("log")
let destacados = document.getElementById("destacados")
const bmenu = document.getElementById('bmenu');
const menudesplegable = document.getElementById('menudesplegable');
const cerrar = document.getElementById("cerrar");
let btlr = document.getElementById("tlr");
let recetario = document.getElementById("recetario");

bmenu.addEventListener('click', () => {
    menudesplegable.classList.toggle('open');
});

cerrar.addEventListener('click', () => {
    menudesplegable.classList.remove('open');
});


function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}

function cambiardulces(){
    window.location.href = "pdulces.html";
}

function cambiarbebidas(){
    window.location.href = "pbebidas.html"
}


function login1(){
    window.location.href = "pantallalog-in.html"
}


function destacar(){
    window.location.href = "precetasdestacadas.html"
}

function recetas(){
    window.location.href = "ptodaslasrecetas.html"
}

function mrecetas(){
    window.location.href = "pmisrecetas.html"
}


btlr.addEventListener("click", recetas);
boton1.addEventListener("click", cambiarpantalla);
bdulces.addEventListener("click", cambiardulces);
bbebidas.addEventListener("click",cambiarbebidas);
log.addEventListener("click", login1);
destacados.addEventListener("click", destacar);
recetario.addEventListener("click", mrecetas);