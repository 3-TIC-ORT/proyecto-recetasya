let home = document.getElementById("home");
const imagenestrella = document.getElementById("favoritos");
let esfavorita = false;


function cambiarbebidas(){
    window.location.href = "pbebidas.html";
}

function cambiarbebidas2(){
    window.location.href = "RecipEat.html";
}

home.addEventListener("click", cambiarbebidas2);


function cambiarimagen(){
    if (esfavorita){
        imagenestrella.src = "IMAGENES FRONT/botonfavoritos.png";
        esfavorita = false
    }
    else{
        imagenestrella.src = "IMAGENES FRONT/botonfavoritoslleno.png";
        esfavorita = true
    }
}

addEventListener("click", cambiarimagen);
