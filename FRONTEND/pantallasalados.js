let home = document.getElementById("home");
let recetario = document.getElementById("recetario");


connect2Server();




let comidas = [];
const container = document.getElementById('recetas'); 
getEvent("recetassalados", data => {
    console.log('Comidas cargadas desde JSON:', data);
    comidas = data.data;
    localStorage.setItem("comidas", JSON.stringify(comidas));
    const comidaStorage = localStorage.getItem("comidas");
    aplicarFiltros(); 
});

function mostrarComidas(lista) {
    container.innerHTML = "";

    lista.forEach(receta => {
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
                        <p> -Ingredientes: ${receta.ingredientes || ''}</p>
                        <h4>- ${receta.categoria}</h4>
                        <h4>- ${receta.apto}</h4>
                    </div>
                </div>
            </div>
        `;

        // 👉 HACER CLICKEABLE LA TARJETA
        card.addEventListener("click", () => {
            localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
            window.location.href = "recetaext.html"; // página donde mostrarás la receta
        });

        container.appendChild(card);
    });
}


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

function obtenerIngredientesSeleccionados() {
  // 1. Obtener el elemento select
  const selectElement = document.getElementById('filtroingredientes');
  
  // 2. Crear un array para almacenar los valores seleccionados
  const ingredientesSeleccionados = [];
  
  // 3. Iterar sobre todas las opciones del menú
  for (let i = 0; i < selectElement.options.length; i++) {
    const option = selectElement.options[i];
    
    // 4. Verificar si la opción está seleccionada
    if (option.selected) {
      const valor = option.value;
      
      // 5. Omitir la opción "Todas" si tiene valor vacío, 
      //    o simplemente agregarlo si deseas que un filtro 'Todas' se pueda pasar
      //    pero es mejor no incluirlo en el array de filtros
      if (valor !== "") { 
        ingredientesSeleccionados.push(valor);
      }
    }
  }
  
  // 6. Si no se seleccionó nada (o solo "Todas"), devolvemos un array vacío,
  //    lo que indicaría mostrar todos los resultados.
  return ingredientesSeleccionados;
}

// Ejemplo de uso:
const filtrosActivos = obtenerIngredientesSeleccionados();
console.log(filtrosActivos); 
// Ejemplo de salida: ["agua", "azúcar", "limón"]
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
