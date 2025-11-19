connect2Server();

let comidas = [];
const usuario = localStorage.getItem("sesion");
const container = document.getElementById('recetas');

// Esperar a que SoqueTIC cargue completamente
function esperarSocket() {
    if (typeof getEvent !== "function") {
        setTimeout(esperarSocket, 100);
        return;
    }

    getEvent("recetas", data => {
        if (data?.data) {
            console.log('Comidas cargadas desde JSON:', data);
            comidas = data.data;
            localStorage.setItem("comidas", JSON.stringify(comidas));
            aplicarFiltros(); // Llama a aplicarFiltros después de cargar las comidas
        }
    });
}

esperarSocket();

function mostrarComidas(lista) {
  if (!container) return;
  container.innerHTML = ""; 

  if (lista.length === 0) {
      container.innerHTML = "<p style='margin-left: 1rem;'>No se encontraron recetas</p>";
      return;
  }

  lista.forEach(receta => {
    const card = document.createElement("div");
    card.classList.add("lista5");

    // NOTA: Asumimos que la estrella inicialmente tiene 'data-fav="0"' y src de no favorito
    card.innerHTML = `
      <div class="r5" id="${receta.nombre}"> 
        <div class= "img3"> 
          <img class="imgrecetas" src="${receta.imagen}">
        </div>
        <div class="texto3"> 
          
          <div class="tarr"> 
            <h3>${receta.nombre}</h3>
            <img 
              src="IMAGENES FRONT/botonfavoritos.png"
              data-fav="0"
              class="estrella">
          </div>
          <div class="tabj"> 
            <p>- Ingredientes: ${receta.ingredientes || ''}</p>
            <h4>- ${receta.categoria}</h4>
            <h4>- ${receta.apto}</h4>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(card);
    
    // Configurar listeners después de que el elemento se ha añadido al DOM
    const tarjeta = card.querySelector(".r5");
    tarjeta.addEventListener("click", () => {
        localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
        window.location.href = "recetaext.html";
    });

    const estrella = card.querySelector('.estrella');
    if (estrella) {
        estrella.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            const h3 = estrella.closest('.tarr')?.querySelector('h3');
            const nombre = h3 ? h3.textContent : '';

            
            
            // Enviamos la solicitud de toggle al backend.
            postEvent('Favoritos', {
                usuario, 
                receta: nombre, 
            }, (res) => {
                if (res && res.success) {
                    // Usamos el estado devuelto por el backend (res.estadoFavorito)
                    if (res.estadoFavorito === true) { // Fue agregado
                        estrella.src = "IMAGENES FRONT/botonfavoritoslleno.png";
                        estrella.dataset.fav = '1';
                    } else { // Fue eliminado
                        estrella.src = "IMAGENES FRONT/botonfavoritos.png";
                        estrella.dataset.fav = '0';
                    }
                } else {
                    alert("Error al guardar a favoritos");
                }
            });
        });
    }

  });
}


const filtroingredientes = document.getElementById('filtroingredientes');
const filtroapto = document.getElementById('filtroapto');
const buscador = document.getElementById('buscador');

if (filtroingredientes) filtroingredientes.addEventListener("change", aplicarFiltros);
if (filtroapto) filtroapto.addEventListener("change", aplicarFiltros);
if (buscador) buscador.addEventListener("input", aplicarFiltros);


function aplicarFiltros() {
    const ingredienteSeleccionado = filtroingredientes?.value.toLowerCase() || '';
    const aptoSeleccionado = filtroapto?.value.toLowerCase() || '';
    const textoBusqueda = buscador?.value.toLowerCase() || '';

    const comidasFiltradas = comidas.filter(receta => {
        // Verificar ingredientes (si la receta.ingredientes es un array)
        const coincideIngredientes =
            ingredienteSeleccionado === '' ||
            (Array.isArray(receta.ingredientes) && 
             receta.ingredientes.some(i => String(i).toLowerCase().includes(ingredienteSeleccionado)));

        const coincideApto =
            aptoSeleccionado === '' ||
            (receta.apto && String(receta.apto).toLowerCase() === aptoSeleccionado);

        const coincideNombre =
            textoBusqueda === '' || String(receta.nombre).toLowerCase().includes(textoBusqueda);
        
        return coincideIngredientes && coincideApto && coincideNombre;
    });

    mostrarComidas(comidasFiltradas);
}

// Lógica de Navegación
let home = document.getElementById("home");
let recetario = document.getElementById("recetario");


function cambiarpantalla1() {
    window.location.href = "RecipEat.html";
}

function mrecetas() {
    window.location.href = "pmisrecetas.html";
}

if (home) home.addEventListener("click", cambiarpantalla1);
if (recetario) recetario.addEventListener("click", mrecetas);