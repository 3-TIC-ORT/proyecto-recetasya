let home = document.getElementById("home");

connect2Server();

const sesion = JSON.parse(localStorage.getItem("sesionCompleta"));
const nombreUsuario = sesion ? sesion.Nombre_de_la_Cuenta : null;

// Referencias al formulario y al contenedor donde se listan las recetas
const form = document.getElementById("form-receta");
const contCreadas = document.getElementById("lista-creadas");
const contFavoritos = document.getElementById("lista-favoritos");

// ---------- FORM: CREAR NUEVA RECETA ----------

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const ingredientesTexto = document
    .getElementById("ingredientes")
    .value.trim();
  const pasosTexto = document.getElementById("pasos").value.trim();
  const categoria = document.getElementById("categoria").value;
  const apto = document.getElementById("apto").value;
  const imagen = document.getElementById("imagen").value.trim();

  if (!nombre || !ingredientesTexto || !pasosTexto) {
    alert("Completá al menos nombre, ingredientes y pasos.");
    return;
  }

  const receta = {
    nombre: nombre,
    ingredientes: ingredientesTexto.split(",").map((i) => i.trim()),
    pasos: pasosTexto.split("\n").map((p) => p.trim()),
    categoria: categoria,
    apto: apto,
    imagen: imagen || "IMAGENES FRONT/placeholder.png",
  };

  // Enviar al backend para guardar en Usuarios.json → Creadas[]
  postEvent(
    "guardarRecetaCreada",
    {
      usuario: nombreUsuario,
      receta: receta,
    },
    (res) => {
      if (res && res.success) {
        alert(res.message);
        form.reset();
        cargarMisRecetas(); // refrescar listado
      } else {
        alert(res.message || "No se pudo guardar la receta.");
      }
    }
  );
});

// ---------- CARGAR RECETARIO PERSONAL DESDE BACK ----------

function cargarMisRecetas() {
  if (!nombreUsuario) {
    alert("No hay usuario logueado.");
    return;
  }

  postEvent(
    "misRecetas",
    { usuario: nombreUsuario },
    (data) => {
      if (!data || !data.success) {
        alert(data?.message || "No se pudieron cargar tus recetas.");
        return;
      }
      mostrarMisRecetas(data.creadas, data.favoritos);
    }
  );
}

function crearTarjetaReceta(receta) {
  // Mismo diseño que en las otras pantallas
  const card = document.createElement("div");
  card.classList.add("lista5");

  card.innerHTML = `
    <div class="r5" id="${receta.nombre}">
      <div class="img3"> 
        <img class="imgrecetas" src="${receta.imagen}">
      </div>
      <div class="texto3"> 
        <div class="tarr"> 
          <h3>${receta.nombre}</h3>
        </div>
        <div class="tabj"> 
          <p>-Ingredientes: ${Array.isArray(receta.ingredientes) ? receta.ingredientes.join(", ") : receta.ingredientes}</p>
          <h4>- ${receta.categoria}</h4>
          <h4>- ${receta.apto}</h4>
        </div>
      </div>
    </div>
  `;

  // Al hacer click en la tarjeta → ir a la pantalla de detalle
  const tarjeta = card.querySelector(".r5");
  tarjeta.addEventListener("click", () => {
    localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
    window.location.href = "recetaext.html";
  });

  return card;
}

function mostrarMisRecetas(creadas, favoritos) {
  // Limpiamos contenedores
  contCreadas.innerHTML = "";
  contFavoritos.innerHTML = "";

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
}

// Cargar al entrar a la página
cargarMisRecetas();


function mrecetas(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", mrecetas);
