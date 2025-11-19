let home = document.getElementById("home");
let favoritos = document.getElementById("Fav");
let creadas = document.getElementById("Creadas");

connect2Server();

function AgregarReceta(){
    postEvent ("agregarRecetas", {
        Nombre: localStorage.getItem("Nombre_de_la_Cuenta"),
        Tipo: "Favorito",
        Receta: localStorage.getItem("RecetaActual")
    });
}
function GuardarRecetas(){
    postEvent ("guardarRecetas", {
        Nombre: localStorage.getItem("Nombre_de_la_Cuenta"),
        Tipo: "Creadas",
        Receta: localStorage.getItem("RecetaActual")
    });
}



// --- DEFINICIÓN DUMMY DE postEvent ---
if (typeof postEvent === 'undefined') {
    window.postEvent = function(eventName, data) {
        console.log(`[SIMULACIÓN] Evento: ${eventName}`, data);
    };
}

// 1. DATOS INICIALES
const recetasBase = []; 

let imagenActualBase64 = null;
const IMAGEN_POR_DEFECTO = "https://placehold.co/600x400?text=RecipEat&font=roboto";
let indexParaBorrar = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarRecetas();
});

// --- MANEJO DE IMAGEN ---
const imagenInput = document.getElementById('imagenInput');
const imagenPreview = document.getElementById('imagenPreview');
const previewText = document.getElementById('previewText');

imagenInput.addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function(e) {
            imagenActualBase64 = e.target.result;
            imagenPreview.src = imagenActualBase64;
            imagenPreview.style.display = 'block';
            previewText.style.display = 'none';
        };
        lector.readAsDataURL(archivo);
    } else {
        imagenActualBase64 = null;
        imagenPreview.style.display = 'none';
        previewText.style.display = 'block';
    }
});

// --- FUNCIONES DE ELIMINACIÓN ---
window.eliminarReceta = function(index) {
    indexParaBorrar = index;
    document.getElementById('modalConfirmacionBorrar').style.display = 'flex';
};

window.cerrarConfirmacionBorrar = function() {
    indexParaBorrar = null;
    document.getElementById('modalConfirmacionBorrar').style.display = 'none';
}

window.confirmarEliminacion = function() {
    if (indexParaBorrar !== null) {
        let recetasGuardadas = JSON.parse(localStorage.getItem('misRecetasNuevas')) || [];
        
        recetasGuardadas.splice(indexParaBorrar, 1);
        localStorage.setItem('misRecetasNuevas', JSON.stringify(recetasGuardadas));
        
        cargarRecetas();
        cerrarConfirmacionBorrar();
    }
}

// --- MOSTRAR RECETAS Y GESTIONAR ESTADO VACÍO ---
function cargarRecetas() {
    const container = document.getElementById('recetasContainer');
    const emptyState = document.getElementById('emptyState');
    const tituloContador = document.getElementById('tituloContador');

    container.innerHTML = ''; 

    // AGREGAR LLAMADO AL BACK PARA QUE DEVUELVA RECETAS CREADAS

    const recetasGuardadas = JSON.parse(localStorage.getItem('misRecetasNuevas')) || [];
    const todasLasRecetas = [...recetasGuardadas, ...recetasBase];
    
    // ACTUALIZAR CONTADOR
    const cantidad = todasLasRecetas.length;
    tituloContador.textContent = `Recetas (${cantidad})`;

    // LÓGICA DE ESTADO VACÍO
    if (cantidad === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'flex';
    } else {
        container.style.display = 'flex';
        emptyState.style.display = 'none';

        todasLasRecetas.forEach((receta, index) => {
            const card = document.createElement('div');
            card.className = 'r2';

            let ingPreview = receta.ingredientes.slice(0, 3).join(', ');
            if(receta.ingredientes.length > 3) ingPreview += '...';

            let botonEliminarHTML = '';
            // Solo permitimos eliminar las creadas (las que están en localStorage)
            if (index < recetasGuardadas.length) {
                botonEliminarHTML = `<button class="btn-eliminar-card" onclick="eliminarReceta(${index})">Eliminar</button>`;
            }

            card.innerHTML = `
                <div class="img2">
                    <img src="${receta.imagen}" alt="${receta.nombre}" onerror="this.src='${IMAGEN_POR_DEFECTO}'">
                </div>
                <div class="texto2">
                    <div class="textoarriba">
                        <span>${receta.nombre}</span>
                    </div>
                    <div class="textoabajo">
                        <strong>Categoría:</strong> ${receta.categoria} | <strong>Apto:</strong> ${receta.apto}<br>
                        <strong>Ingredientes:</strong> ${ingPreview}
                    </div>
                    ${botonEliminarHTML}
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// --- GESTIÓN MODALES ---
const modal = document.getElementById('modalForm');
const modalAdvertencia = document.getElementById('modalAdvertenciaImagen');
const popup = document.getElementById('popupExito');

window.abrirModal = function() { modal.style.display = 'flex'; }
window.cerrarModal = function() {
    modal.style.display = 'none';
    document.getElementById('formReceta').reset();
    imagenPreview.src = "";
    imagenPreview.style.display = 'none';
    previewText.style.display = 'block';
    imagenActualBase64 = null;
    imagenInput.value = "";
}
window.cerrarAdvertenciaImagen = function() { modalAdvertencia.style.display = 'none'; }
window.cerrarPopup = function() { popup.style.display = 'none'; }

window.onclick = function(event) {
    if (event.target == modal) cerrarModal();
    if (event.target == modalAdvertencia) cerrarAdvertenciaImagen();
    if (event.target == popup) cerrarPopup();
    if (event.target == document.getElementById('modalConfirmacionBorrar')) cerrarConfirmacionBorrar();
}

// --- GUARDADO FINAL ---
const form = document.getElementById('formReceta');

function guardarRecetaFinal(urlImagen) {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const apto = document.getElementById('apto').value;
    const ingText = document.getElementById('ingredientes').value;
    const pasosText = document.getElementById('pasos').value;

    const ingredientes = ingText.split(/\n|,/).map(item => item.trim()).filter(item => item !== "");
    const pasos = pasosText.split(/\n|,/).map(item => item.trim()).filter(item => item !== "");

    const nuevaReceta = {
        nombre,
        imagen: urlImagen, 
        categoria,
        apto,
        ingredientes,
        pasos,
        creada: true
    };

    const recetasGuardadas = JSON.parse(localStorage.getItem('misRecetasNuevas')) || [];
    recetasGuardadas.unshift(nuevaReceta);
    localStorage.setItem('misRecetasNuevas', JSON.stringify(recetasGuardadas));

    postEvent("GuardarRecetas", nuevaReceta);
    

    cerrarModal();
    cargarRecetas(); 
    popup.style.display = 'block';
}

window.confirmarGuardarSinImagen = function() {
    cerrarAdvertenciaImagen();
    guardarRecetaFinal(IMAGEN_POR_DEFECTO);
}

form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    if (!imagenActualBase64) {
        modalAdvertencia.style.display = 'flex';
    } else {
        guardarRecetaFinal(imagenActualBase64);
    }
});

document.getElementById("home").addEventListener("click", function() {
});


function mrecetas(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", mrecetas);

favoritos.addEventListener("click", AgregarReceta);

creadas.addEventListener("click", GuardarRecetas);