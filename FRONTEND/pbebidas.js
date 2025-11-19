connect2Server();

let comidas = [];
let usuarioActual = null; // Necesitás obtener esto del login
let favoritosUsuario = new Set(); // Set con nombres de recetas favoritas

// Obtener usuario actual (asumiendo que lo guardaste en sessionStorage al hacer login)
usuarioActual = sessionStorage.getItem('usuarioActual');

if (!usuarioActual) {
  alert('Debe iniciar sesión primero');
  window.location.href = 'login.html'; // Redirigir al login
}

// Cargar recetas de bebidas
emit("MostrarRecetasBebidas", {}, data => {
  if (data.succes) {
    console.log('Bebidas cargadas:', data.data);
    comidas = data.data;
    cargarFavoritosUsuario(); // Cargar favoritos antes de mostrar
  } else {
    console.error('Error al cargar bebidas');
  }
});

// Cargar favoritos del usuario actual
function cargarFavoritosUsuario() {
  emit("ObtenerFavoritos", { Nombre: usuarioActual }, response => {
    if (response.success && response.favoritos) {
      favoritosUsuario = new Set(response.favoritos.filter(f => f !== ""));
      mostrarComidas(comidas);
    } else {
      mostrarComidas(comidas);
    }
  });
}

const container = document.getElementById('recetas');

function mostrarComidas(lista) {
  container.innerHTML = ""; 

  lista.forEach(receta => {
    const esFavorita = favoritosUsuario.has(receta.nombre);
    const imagenEstrella = esFavorita 
      ? "IMAGENES FRONT/botonfavoritoslleno.png" 
      : "IMAGENES FRONT/botonfavoritos.png";

    container.innerHTML += `
    <div class="lista5"> 
      <div class="r5"> 
        <div class="img3"> 
          <img class="imgrecetas" src="${receta.imagen}" alt="${receta.nombre}">
        </div>
        <div class="texto3"> 
          <div class="tarr"> 
            <h3>${receta.nombre}</h3>
            <img src="${imagenEstrella}" 
                 class="estrella" 
                 data-receta="${receta.nombre}"
                 alt="Favorito">
          </div>
          <div class="tabj"> 
            <p>- Ingredientes: ${receta.ingredientes.join(', ')}</p>
            <h4>- ${receta.categoria}</h4>
            <h4>- ${receta.apto}</h4>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  // Agregar event listeners a todas las estrellas
  agregarEventListenersEstrellas();
}

function agregarEventListenersEstrellas() {
  const estrellas = document.querySelectorAll('.estrella');
  
  estrellas.forEach(estrella => {
    estrella.addEventListener('click', function() {
      const nombreReceta = this.getAttribute('data-receta');
      toggleFavorito(nombreReceta, this);
    });
  });
}

function toggleFavorito(nombreReceta, elementoEstrella) {
  const esFavorita = favoritosUsuario.has(nombreReceta);
  
  if (esFavorita) {
    // Quitar de favoritos
    emit("QuitarFavorito", {
      Nombre: usuarioActual,
      receta: nombreReceta,
      Tipo: "Favoritos"
    }, response => {
      if (response.success) {
        favoritosUsuario.delete(nombreReceta);
        elementoEstrella.src = "IMAGENES FRONT/botonfavoritos.png";
        console.log(`${nombreReceta} quitada de favoritos`);
      } else {
        alert('Error al quitar de favoritos');
      }
    });
  } else {
    // Agregar a favoritos
    emit("GuardarRecetas", {
      Nombre: usuarioActual,
      receta: nombreReceta,
      Tipo: "Favoritos"
    }, response => {
      if (response.success) {
        favoritosUsuario.add(nombreReceta);
        elementoEstrella.src = "IMAGENES FRONT/botonfavoritoslleno.png";
        console.log(`${nombreReceta} agregada a favoritos`);
      } else {
        alert('Error al guardar en favoritos');
      }
    });
  }
}

// Filtros
const filtroingredientes = document.getElementById('filtroingredientes');
const filtroapto = document.getElementById('filtroapto');
const buscador = document.getElementById('buscador');

filtroingredientes.addEventListener('change', aplicarFiltros);
filtroapto.addEventListener('change', aplicarFiltros);
buscador.addEventListener('input', aplicarFiltros);

function aplicarFiltros() {
  const ingredienteSeleccionado = filtroingredientes.value.toLowerCase();
  const aptoSeleccionado = filtroapto.value.toLowerCase(); 
  const textoBusqueda = buscador.value.toLowerCase();

  const comidasFiltradas = comidas.filter(receta => {
    const coincideIngredientes =
      ingredienteSeleccionado === '' || 
      (Array.isArray(receta.ingredientes) && 
       receta.ingredientes.some(ingredienteReceta => 
         ingredienteReceta.toLowerCase().includes(ingredienteSeleccionado)
       ));

    const coincideApto =
      aptoSeleccionado === '' || 
      (receta.apto && receta.apto.toLowerCase() === aptoSeleccionado);

    const coincideNombre =
      textoBusqueda === '' || receta.nombre.toLowerCase().includes(textoBusqueda);
    
    return coincideIngredientes && coincideApto && coincideNombre;
  });

  mostrarComidas(comidasFiltradas);
}

// Navegación
let home = document.getElementById("home");
let recetario = document.getElementById("recetario");

home.addEventListener("click", () => {
  window.location.href = "RecipEat.html";
});

recetario.addEventListener("click", () => {
  window.location.href = "pmisrecetas.html";
});

