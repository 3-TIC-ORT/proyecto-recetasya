let home = document.getElementById("home");
let recetario = document.getElementById("recetario");


connect2Server();




let comidas = [];
const usuario = localStorage.getItem('sesion');
const container = document.getElementById('recetas'); 
getEvent("recetasbebidas", data => {
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
                        <img src="IMAGENES FRONT/botonfavoritos.png" 
                        data-fav="0"
                        class="estrella">
                    </div>
                    <div class="tabj"> 
                        <p> -Ingredientes: ${receta.ingredientes || ''}</p>
                        <h4>- ${receta.categoria}</h4>
                        <h4>- ${receta.apto}</h4>
                    </div>
                </div>
            </div>
        `;

        
        container.appendChild(card);

        
        const estrella = card.querySelector('.estrella');
        
        
        estrella.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            const parent = estrella.parentNode;
            const h3 = parent.querySelector('h3');
            const nombre = h3 ? h3.textContent : '';
            
            postEvent('Favoritos', {
                usuario, 
                receta: nombre, 
                favToggle: estrella.dataset.fav
            }, (res) => {
                if (res && res.success) {
                    if (res.estadoFavorito === true) {
                        estrella.src = "IMAGENES FRONT/botonfavoritos.png";
                        estrella.dataset.fav = '0';
                    } else {
                        estrella.src = "IMAGENES FRONT/botonfavoritoslleno.png";
                        estrella.dataset.fav = '1';
                    }
                } else {
                    alert("Error al agregar a favoritos");
                }
            });
        });

        
        const tarjeta = card.querySelector('.r5');
        tarjeta.addEventListener("click", () => {
            localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
            window.location.href = "recetaext.html";
        });
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
 
  const selectElement = document.getElementById('filtroingredientes');
  
  
  const ingredientesSeleccionados = [];
  
  
  for (let i = 0; i < selectElement.options.length; i++) {
    const option = selectElement.options[i];
    
    
    if (option.selected) {
      const valor = option.value;
      
      
      if (valor !== "") { 
        ingredientesSeleccionados.push(valor);
      }
    }
  }
  
  
  return ingredientesSeleccionados;
}


const filtrosActivos = obtenerIngredientesSeleccionados();
console.log(filtrosActivos); 

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
