let home = document.getElementById("home");

connect2Server();

window.onload = () => {
  };
  
  function mostrarRecetas(data) {
    console.log("Datos recibidos del backend:", data);
  
    if (data && data.success && Array.isArray(data.data)) {
      const recetas = data;
  
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

getEvent("recetassalados", data => {
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

mostrarComidas

const filtroingredientes = document.getElementById('filtroingredientes');
const filtroapto = document.getElementById('filtroapto');

// ==== REFERENCIAS A LOS FILTROS ====
// (usamos nombres estándar, aunque los id del HTML son diferentes)
const filtroCategoria = document.getElementById('filtroingredientes'); // tu HTML usa este id
const filtroProvincia = document.getElementById('filtroapto'); // tu HTML usa este id

// ==== EVENTOS DE LOS FILTROS ====
filtroCategoria.addEventListener('change', aplicarFiltros);
filtroProvincia.addEventListener('change', aplicarFiltros);

// ==== FUNCION DE FILTRADO ====
function aplicarFiltros() {
  const categoriaSeleccionada = filtroCategoria.value.toLowerCase();
  const provinciaSeleccionada = filtroProvincia.value.toLowerCase();

  const comidasFiltradas = comidas.filter(receta => {
    const coincideCategoria =
      categoriaSeleccionada === '' || receta.ingredientes === categoriaSeleccionada;
    const coincideProvincia =
      provinciaSeleccionada === '' || receta.apto === provinciaSeleccionada;
    
    return coincideCategoria && coincideProvincia;
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