connect2Server();

let comidas = [];

getEvent("mostrarRecetasDestacadas", data => {
    console.log('Comidas cargadas desde JSON:', data);
    comidas = data.data;
    mostrarComidas(comidas);
  });

const container = document.getElementById('recetas');

function mostrarComidas(lista) {
  container.innerHTML = ""; 

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
    
    </div>
    `;
  });
  favoritos();
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


let home = document.getElementById("home");


function destacar(){
    window.location.href = "precetasdestacadas.html";
}

function destacar2(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", destacar2);

function favoritos() {

  const estrellas = document.querySelectorAll('.estrella');

  estrellas.forEach(estrellaIndividual => {
    estrellaIndividual.addEventListener('click', () => {
      const parent = estrellaIndividual.parentNode;
      const h3 = parent.querySelector('h3');
      const nombre = h3 ? h3.textContent : '';
      
      postEvent('Favoritos', {
        usuario, 
        receta: nombre, 
        favToggle: estrellaIndividual.dataset.fav
      }, (res) => {
        if (res && res.success) {
          if (res.favToggle == '1') {
            estrellaIndividual.src = "IMAGENES FRONT/botonfavoritos.png";
            estrellaIndividual.dataset.fav = '0';
          } else {
            estrellaIndividual.src = "IMAGENES FRONT/botonfavoritoslleno.png";
            estrellaIndividual.dataset.fav = '1';
          }
        } else {
          alert("Error al agregar a favoritos");
        }
      });

    });
  });
}



