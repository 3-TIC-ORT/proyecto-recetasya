const receta = JSON.parse(localStorage.getItem("recetaSeleccionada"));


if (receta) {
    document.getElementById("titulo").textContent = receta.nombre;
    document.getElementById("imagen").src = receta.imagen;
    document.getElementById("ingredientes").textContent =
        "Ingredientes: " + receta.ingredientes;
    document.getElementById("categoria").textContent =
        "Categoría: " + receta.categoria;
    document.getElementById("apto").textContent =
        "Apto: " + receta.apto;
    document.getElementById("pasos").textContent =
        "Pasos: " + receta.pasos;
}

let botonVolver = document.getElementById("boton-volver");
function volverAtras() {
    window.history.back();
}
botonVolver.addEventListener("click", volverAtras);