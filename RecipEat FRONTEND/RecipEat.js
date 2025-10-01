let boton1 = document.getElementById("boton1");
let bdulces = document.getElementById("bdulces");
let bbebidas = document.getElementById("bbebidas")
let bst = document.getElementById("bst")
let login = document.getElementById("login")
const bmenu = document.getElementById('bmenu');
const menudesplegable = document.getElementById('menudesplegable');

bmenu.addEventListener('click', () => {
    // Agrega o quita la clase 'open'
    menudesplegable.classList.toggle('open');
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

function cambiarst(){
    window.location.href = "recetas-st.html"
}

function login1(){
    window.location.href = "pantallalog-in.html"
}


boton1.addEventListener("click", cambiarpantalla);
bdulces.addEventListener("click", cambiardulces);
bbebidas.addEventListener("click",cambiarbebidas);
bst.addEventListener("click", cambiarst);
login.addEventListener("click", login1);