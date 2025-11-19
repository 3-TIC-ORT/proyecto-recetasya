let home = document.getElementById("home");
let favoritos = document.getElementById("Fav");
let creadas = document.getElementById("Creadas");

function AgregarReceta(){
    postEvent ("agregarRecetas", {
        Nombre: localStorage.getItem("Nombre_de_la_Cuenta"),
        Tipo: "Favorito",
        Receta: localStorage.getItem("RecetaActual")
    });
}
function GuardarRecetas(){
    postEvent ("guardarRecetas", {
        Nombre: localStorage.getItem("Nombre_de_la_Cuenta"),
        Tipo: "Creadas",
        Receta: localStorage.getItem("RecetaActual")
    });
}




function mrecetas(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", mrecetas);

favoritos.addEventListener("click", AgregarReceta);

creadas.addEventListener("click", GuardarRecetas);