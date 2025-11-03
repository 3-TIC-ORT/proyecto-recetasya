let home = document.getElementById("home");

connect2Server();

window.onload = () => {
    getEvent("recetassalados", mostrarRecetas);
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

fetch('../BACKEND/recetas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {
    console.log('Comidas cargadas desde JSON:', data);
    comidas = data;
    mostrarComidas(comidas);
  })
  .catch(error => {
    console.error('Error al leer el archivo JSON:', error);
  });

const container = document.getElementById('recetas');

function mostrarComidas(lista) {
  container.innerHTML = ""; // Limpia antes de mostrar

  lista.forEach(receta => {
    container.innerHTML += `
      <div class="tarjeta">
        <h3>${receta.nombre}</h3>
        <h4>${receta.categoria}</h4>
        <h4>${receta.provincia}</h4>
        <p>${receta.ingredientes || ''}</p>
      </div>
    `;
  });
}

mostrarComidas


function cambiarpantalla(){
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", cambiarpantalla1);