let home = document.getElementById("home");
let favoritos = document.getElementById("Fav");
let creadas = document.getElementById("Creadas");

connect2Server();



  // Creadas por el usuario
  if (creadas && creadas.length > 0) {
    creadas.forEach((receta) => {
      const card = crearTarjetaReceta(receta);
      contCreadas.appendChild(card);
    });
  } else {
    contCreadas.innerHTML = "<p>Todavía no creaste recetas.</p>";
  }

  // Favoritos del usuario
  if (favoritos && favoritos.length > 0) {
    favoritos.forEach((receta) => {
      const card = crearTarjetaReceta(receta);
      contFavoritos.appendChild(card);
    });
  } else {
    contFavoritos.innerHTML = "<p>No tenés recetas en favoritos.</p>";
  }


// Cargar al entrar a la página
cargarMisRecetas();


function mrecetas(){
    window.location.href = "RecipEat.html";
}




home.addEventListener("click", mrecetas);

favoritos.addEventListener("click", AgregarReceta);

creadas.addEventListener("click", GuardarRecetas);