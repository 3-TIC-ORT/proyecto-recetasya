let home = document.getElementById("home");

connect2Server();

window.onload = () => {
    // Si necesitas hacer algo al cargar la ventana, hazlo aquí.
    // Por ejemplo, podrías querer aplicar los filtros por defecto.
};

// Esta función parece ser del backend y no la usas en la práctica de los filtros.
// La dejo como estaba, asumiendo que 'recetas' es tu contenedor.
function mostrarRecetas(data) {
    console.log("Datos recibidos del backend:", data);

    if (data && data.success && Array.isArray(data.data)) {
        const recetas = data.data; // Corregido: debería ser data.data
        const container = document.getElementById('recetas'); // Obtener 'container' aquí si es necesario

        container.innerHTML = "";

        recetas.forEach((receta) => {
            const recetaDiv = document.createElement("div");
            recetaDiv.classList.add("tarjeta");

            recetaDiv.innerHTML = `
                <h3>${receta.nombre}</h3>
                <h4>Categoría: ${receta.categoria}</h4>
                <p><strong>Ingredientes:</strong> ${receta.ingredientes.join(", ")}</p>
                <p><strong>Pasos:</strong> ${receta.pasos.join(", ")}</p>
                <p><strong>Porciones:</strong> ${receta.porciones}</p>
                <p><strong>Dificultad:</strong> ${receta.dificultad}</p>
            `;

            container.appendChild(recetaDiv);
        });
    } else {
        alert("No se encontraron recetas saladas.");
    }
}


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

// ==== EVENTOS DE LOS FILTROS ====
filtroingredientes.addEventListener('change', aplicarFiltros);
filtroapto.addEventListener('change', aplicarFiltros);

// ==== FUNCION DE FILTRADO CORREGIDA ====
// ==== FUNCION DE FILTRADO CORREGIDA para ingredientes (asumiendo ARRAY) ====
function aplicarFiltros() {
    const ingredienteSeleccionado = filtroingredientes.value.toLowerCase();
    const aptoSeleccionado = filtroapto.value.toLowerCase(); 

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
        
        return coincideIngredientes && coincideApto;
    });

    mostrarComidas(comidasFiltradas);
}

function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", cambiarpantalla1);