let home = document.getElementById("home");
let recetario = document.getElementById("recetario");


connect2Server();




let comidas = [];
const container = document.getElementById('recetas'); // Definido fuera de la función

getEvent("recetassalados", data => {
    console.log('Comidas cargadas desde JSON:', data);
    comidas = data.data;
    // Llama a aplicarFiltros al cargar para mostrar TODAS las recetas inicialmente
    // y asegurarte de que los filtros iniciales (aunque sean vacíos) se apliquen.
    aplicarFiltros(); 
});


function mostrarComidas(lista) {
    container.innerHTML = ""; // Limpia antes de mostrar

    lista.forEach(receta => {
        // Asegúrate de que 'receta.apto' contenga 'SinTACC' o 'ConTACC' (o lo que uses)
        container.innerHTML += `
        <div class="lista5"> 
            <div class="r5"> 
                <div class= "img3"> 
                    <img class="imgrecetas" src="${receta.imagen}">
                </div>
                <div class="texto3"> 
                    
                    <div class="tarr"> 
                        <h3>${receta.nombre}</h3>
                    </div>
                    <div class="tabj"> 
                        <p> -Ingredientes: ${receta.ingredientes || ''}</p>
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

function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}

function mrecetas(){
    window.location.href = "pmisrecetas.html"
}



home.addEventListener("click", cambiarpantalla1);
recetario.addEventListener("click", mrecetas);
