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
        
        // 1. DATOS INICIALES Y CONSTANTES
        const IMAGEN_POR_DEFECTO = "https://placehold.co/600x400?text=RecipEat&font=roboto";

        // Datos de prueba para que siempre haya algo clickeable
        const recetasBase = [
        ]; 

        let imagenActualBase64 = null;
        let indexParaBorrar = null;

        document.addEventListener('DOMContentLoaded', () => {
            cargarRecetas();
        });

        // --- FUNCIÓN DE NAVEGACIÓN (USANDO window.location.href) ---
        window.navegarAReceta = function(receta) {
            console.log("Navegando a receta:", receta.nombre);
            // 1. Guardamos la receta en localStorage para que la siguiente página pueda cargarla
            localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
            
            // 2. Navegación directa a la página de detalle
            window.location.href = "recetaext.html";
        };

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
            // CRUCIAL: Detiene el evento de click de la tarjeta para que no navegue
            event.stopPropagation(); 
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
                
                // indexParaBorrar es el índice DENTRO de recetasGuardadas, ya que solo permite eliminar las primeras N recetas
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

            const recetasGuardadas = JSON.parse(localStorage.getItem('misRecetasNuevas')) || [];
            // Las recetas guardadas por el usuario van primero, para que el índice de eliminación sea correcto
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
                    card.className = 'r2'; // La clase correcta de la tarjeta

                    let ingPreview = receta.ingredientes.slice(0, 3).join(', ');
                    if(receta.ingredientes.length > 3) ingPreview += '...';

                    let botonEliminarHTML = '';
                    // Permitimos eliminar solo las recetas que están en la parte 'guardada' del array combinado
                    if (index < recetasGuardadas.length) {
                        // El botón de eliminar llama a eliminarReceta y usa event.stopPropagation() dentro para no navegar
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
                    
                    // --- AÑADIMOS EL EVENTO CLICK A TODA LA TARJETA ---
                    card.addEventListener("click", () => {
                        // Aquí pasamos el objeto receta para que la función de navegación sepa qué guardar
                        navegarAReceta(receta);
                    });
                    
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

            if (typeof postEvent !== 'undefined') {
                postEvent("GuardarNuevaRecetaGlobal", nuevaReceta);
            }

            cerrarModal();
            cargarRecetas(); 
            document.getElementById('mensajeExitoTitulo').textContent = "¡Receta Guardada!";
            document.getElementById('popupExito').querySelector('p').textContent = "Tu receta se ha creado correctamente.";
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
            // Reemplazado alert() para seguir las normas:
            document.getElementById('mensajeExitoTitulo').textContent = "Volviendo al inicio";
            document.getElementById('popupExito').querySelector('p').textContent = "Has simulado volver a la pantalla principal.";
            document.getElementById('popupExito').style.display = 'block';
        });

document.getElementById("home").addEventListener("click", function() {
});


function mrecetas(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", mrecetas);

favoritos.addEventListener("click", AgregarReceta);

creadas.addEventListener("click", GuardarRecetas);