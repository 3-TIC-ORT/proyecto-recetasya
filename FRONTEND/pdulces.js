
connect2Server();

let comidas = [];

getEvent("recetasdulces", data => {
    console.log('Comidas cargadas desde JSON:', data);
    comidas = data.data;
    mostrarComidas(comidas);
  });

const container = document.getElementById('recetas');

function mostrarComidas(lista) {
  container.innerHTML = ""; // Limpia antes de mostrar

  lista.forEach(receta => {
    container.innerHTML += `
    <div class="lista5"> 
      <div class="r5"> 
        <div class= "img3"> 
          <img class="imgrecetas" src="${receta.imagen}">
        </div>
        <div class="texto3"> 
          
          <div class="tarr"> 
            <h3>${receta.nombre}</h3>
            <img src="IMAGENES FRONT/botonfavoritos.png" 
            id="favoritos"
            class="estrella">
          </div>
          <div class="tabj"> 
            <p>${receta.ingredientes || ''}</p>
            <h4>- ${receta.categoria}</h4>
            <h4>- ${receta.apto}</h4>
          </div>
        </div>


        </div>
    
    </div>
    `;
  });
}

// Nota: 'mostrarComidas' es la función que debe llamarse. 
// La línea 'mostrarComidas' sin paréntesis solo referencia la función, no la ejecuta.
// Pero la eliminaremos, ya que la ejecución inicial se hará desde 'aplicarFiltros'.


const filtroingredientes = document.getElementById('filtroingredientes');
const filtroapto = document.getElementById('filtroapto');
const buscador = document.getElementById('buscador');

// ==== EVENTOS DE LOS FILTROS ====
filtroingredientes.addEventListener('change', aplicarFiltros);
filtroapto.addEventListener('change', aplicarFiltros);
buscador.addEventListener('input', aplicarFiltros);


// ==== FUNCION DE FILTRADO CORREGIDA ====
// ==== FUNCION DE FILTRADO CORREGIDA para ingredientes (asumiendo ARRAY) ====
function aplicarFiltros() {
    const ingredienteSeleccionado = filtroingredientes.value.toLowerCase();
    const aptoSeleccionado = filtroapto.value.toLowerCase(); 
    const textoBusqueda = buscador.value.toLowerCase();


    const comidasFiltradas = comidas.filter(receta => {
        
        // 1. FILTRO DE INGREDIENTES CORREGIDO (Asumiendo que receta.ingredientes es un ARRAY)
        const coincideIngredientes =
            ingredienteSeleccionado === '' || 
            (Array.isArray(receta.ingredientes) && // Verifica que sea un array
             receta.ingredientes.some(ingredienteReceta => 
                 // Convierte cada ingrediente a minúsculas y verifica si incluye el filtro.
                 ingredienteReceta.toLowerCase().includes(ingredienteSeleccionado)
             ));


        // 2. FILTRO APTO PARA CELÍACOS (TACC) - Lógica anterior mantenida
        const coincideApto =
            aptoSeleccionado === '' || 
            (receta.apto && receta.apto.toLowerCase() === aptoSeleccionado);

        const coincideNombre =
            textoBusqueda === '' || receta.nombre.toLowerCase().includes(textoBusqueda);
        
        return coincideIngredientes && coincideApto && coincideNombre;
    });

    mostrarComidas(comidasFiltradas);
}


let home = document.getElementById("home");
let recetario = document.getElementById("recetario");
const imagenestrella = document.getElementById("favoritos");
let esfavorita = false;


function cambiardulces(){
    window.location.href = "pdulces.html";
}

function cambiardulces2(){
    window.location.href = "RecipEat.html";
}

function mrecetas(){
    window.location.href = "pmisrecetas.html"
}


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

home.addEventListener("click", cambiardulces2);
recetario.addEventListener("click", mrecetas);
