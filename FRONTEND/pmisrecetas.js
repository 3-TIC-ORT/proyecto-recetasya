const IMAGEN_POR_DEFECTO = "https://placehold.co/600x400?text=RecipEat&font=roboto";

let imagenActualBase64 = null;
let indexParaBorrar = null;
let nombreRecetaParaBorrar = null; // ← NUEVO: guardar el nombre de la receta
let tabActual = "favoritos";
let recetasFavoritos = [];
let recetasCreadas = [];

connect2Server();

document.addEventListener('DOMContentLoaded', () => {
    inicializarEventos();
    cargarRecetasDelBackend();
});

function inicializarEventos() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', cambiarTab);
    });

    document.getElementById('home').addEventListener('click', () => {
        window.location.href = "RecipEat.html";
    });

    document.getElementById('btnAgregar').addEventListener('click', abrirModal);

    document.getElementById('closeModal').addEventListener('click', cerrarModal);
    document.getElementById('btnVolverSubir').addEventListener('click', cerrarAdvertenciaImagen);
    document.getElementById('btnCancelarBorrar').addEventListener('click', cerrarConfirmacionBorrar);
    document.getElementById('btnCerrarPopup').addEventListener('click', cerrarPopup);

    document.getElementById('btnPublicarSinFoto').addEventListener('click', confirmarGuardarSinImagen);
    document.getElementById('btnConfirmarBorrar').addEventListener('click', confirmarEliminacion);

    document.getElementById('formReceta').addEventListener('submit', manejarSubmitFormulario);

    document.getElementById('imagenInput').addEventListener('change', manejarCambioImagen);

    window.addEventListener('click', manejarClickFueraModal);
}

function cambiarTab(event) {
    const tabSeleccionada = event.target.dataset.tab;
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    tabActual = tabSeleccionada;
    mostrarRecetasSegunTab();
}

function cargarRecetasDelBackend() {
    const usuario = localStorage.getItem('sesion');
    
    if (!usuario) {
        console.log('No hay usuario logueado');
        window.location.href = 'pantallalog-in.html';
        return;
    }

    postEvent("misRecetas", { usuario: usuario }, (response) => {
        if (response.success) {
            recetasCreadas = response.creadas || [];
            recetasFavoritos = response.favoritos || [];
            
            mostrarRecetasSegunTab();
        } else {
            console.log('Error al cargar recetas del backend');
            mostrarEstadoVacio("Error al cargar las recetas");
        }
    });
}

function mostrarRecetasSegunTab() {
    const recetas = tabActual === "favoritos" ? recetasFavoritos : recetasCreadas;
    
    if (recetas.length === 0) {
        const mensaje = tabActual === "favoritos" 
            ? "No tenés recetas en favoritos aún"
            : "No has creado recetas todavía";
        mostrarEstadoVacio(mensaje);
    } else {
        mostrarRecetas(recetas);
    }
}

function mostrarRecetas(listaRecetas) {
    const container = document.getElementById('recetasContainer');
    const emptyState = document.getElementById('emptyState');
    
    emptyState.style.display = 'none';
    container.style.display = 'flex';
    container.innerHTML = '';

    listaRecetas.forEach((receta, index) => {
        const card = crearTarjetaReceta(receta, index);
        container.appendChild(card);
    });
}

function crearTarjetaReceta(receta, index) {
    const card = document.createElement('div');
    card.className = 'r5';

    const ingPreview = receta.ingredientes.slice(0, 3).join(', ') + 
                       (receta.ingredientes.length > 3 ? '...' : '');

    const botonEliminar = tabActual === "creadas" 
        ? `<button class="btn-eliminar-card" data-index="${index}">Eliminar</button>`
        : '';

    card.innerHTML = `
        <div class="img3">
            <img class="imgrecetas" src="${receta.imagen || IMAGEN_POR_DEFECTO}" 
                 alt="${receta.nombre}" 
                 onerror="this.src='${IMAGEN_POR_DEFECTO}'">
        </div>
        <div class="texto3">
            <div class="tarr">
                <h3>${receta.nombre}</h3>
                <img src="IMAGENES FRONT/botonfavoritos.png" 
                     class="estrella" 
                     data-nombre="${receta.nombre}"
                     style="display: none;">
            </div>
            <div class="tabj">
                <p><strong>Ingredientes:</strong> ${ingPreview}</p>
                <h4><strong>Categoría:</strong> ${receta.categoria}</h4>
                <h4><strong>Apto:</strong> ${receta.apto}</h4>
            </div>
            ${botonEliminar}
        </div>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-eliminar-card')) {
            navegarAReceta(receta);
        }
    });

    const btnEliminar = card.querySelector('.btn-eliminar-card');
    if (btnEliminar) {
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation();
            // Usar directamente el nombre de la receta del closure
            eliminarReceta(index, receta.nombre);
        });
    }

    return card;
}

function mostrarEstadoVacio(mensaje) {
    const container = document.getElementById('recetasContainer');
    const emptyState = document.getElementById('emptyState');
    const emptySubtitle = document.getElementById('emptySubtitle');
    
    container.style.display = 'none';
    emptyState.style.display = 'flex';
    emptySubtitle.textContent = mensaje;
}

function navegarAReceta(receta) {
    localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
    window.location.href = "recetaext.html";
}

function abrirModal() {
    document.getElementById('modalForm').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalForm').style.display = 'none';
    document.getElementById('formReceta').reset();
    document.getElementById('imagenPreview').style.display = 'none';
    document.getElementById('previewText').style.display = 'block';
    imagenActualBase64 = null;
}

function cerrarAdvertenciaImagen() {
    document.getElementById('modalAdvertenciaImagen').style.display = 'none';
}

function cerrarConfirmacionBorrar() {
    document.getElementById('modalConfirmacionBorrar').style.display = 'none';
    indexParaBorrar = null;
    nombreRecetaParaBorrar = null; // ← NUEVO: limpiar el nombre
}

function cerrarPopup() {
    document.getElementById('popupExito').style.display = 'none';
}

function manejarClickFueraModal(event) {
    const modales = ['modalForm', 'modalAdvertenciaImagen', 'modalConfirmacionBorrar', 'popupExito'];
    modales.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function manejarCambioImagen(event) {
    const archivo = event.target.files[0];
    const imagenPreview = document.getElementById('imagenPreview');
    const previewText = document.getElementById('previewText');
    
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
}

function manejarSubmitFormulario(e) {
    e.preventDefault();
    
    if (!imagenActualBase64) {
        document.getElementById('modalAdvertenciaImagen').style.display = 'flex';
    } else {
        guardarRecetaFinal(imagenActualBase64);
    }
}

function confirmarGuardarSinImagen() {
    cerrarAdvertenciaImagen();
    guardarRecetaFinal(IMAGEN_POR_DEFECTO);
}

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
        pasos
    };

    const usuario = localStorage.getItem('sesion');

    if (!usuario) {
        alert('Debes iniciar sesión para crear recetas');
        window.location.href = 'pantallalog-in.html';
        return;
    }

    postEvent("guardarRecetaCreada", 
        { usuario: usuario, receta: nuevaReceta }, 
        (response) => {
            if (response.success) {
                cerrarModal();
                cargarRecetasDelBackend();
                
                document.getElementById('mensajeExitoTitulo').textContent = "¡Receta Guardada!";
                document.getElementById('mensajeExitoTexto').textContent = response.message;
                document.getElementById('popupExito').style.display = 'block';
            } else {
                alert('Error al guardar la receta: ' + response.message);
            }
        }
    );
}

// ← MODIFICADA: ahora recibe el nombre de la receta
function eliminarReceta(index, nombreReceta) {
    console.log('Eliminando receta:', nombreReceta, 'index:', index);
    indexParaBorrar = index;
    nombreRecetaParaBorrar = nombreReceta;
    document.getElementById('modalConfirmacionBorrar').style.display = 'flex';
}

// ← MODIFICADA: ahora envía la solicitud al backend
function confirmarEliminacion() {
    console.log('Confirmar eliminación - Index:', indexParaBorrar, 'Nombre:', nombreRecetaParaBorrar, 'Tab:', tabActual);
    
    if (indexParaBorrar !== null && nombreRecetaParaBorrar && tabActual === "creadas") {
        const usuario = localStorage.getItem('sesion');
        
        console.log('Usuario:', usuario);
        
        if (!usuario) {
            alert('Debes iniciar sesión');
            window.location.href = 'pantallalog-in.html';
            return;
        }

        console.log('Enviando postEvent eliminarRecetaCreada...');
        
        // ← NUEVO: enviar solicitud al backend
        postEvent("eliminarRecetaCreada", 
            { 
                usuario: usuario, 
                nombreReceta: nombreRecetaParaBorrar 
            }, 
            (response) => {
                console.log('Respuesta del backend:', response);
                
                if (response.success) {
                    cerrarConfirmacionBorrar();
                    
                    // Recargar las recetas desde el backend
                    cargarRecetasDelBackend();
                    
                    document.getElementById('mensajeExitoTitulo').textContent = "Receta Eliminada";
                    document.getElementById('mensajeExitoTexto').textContent = response.message;
                    document.getElementById('popupExito').style.display = 'block';
                } else {
                    console.error('Error al eliminar:', response.message);
                    alert('Error al eliminar la receta: ' + response.message);
                    cerrarConfirmacionBorrar();
                }
            }
        );
    } else {
        console.error('Condiciones no cumplidas para eliminar');
        console.log('indexParaBorrar:', indexParaBorrar);
        console.log('nombreRecetaParaBorrar:', nombreRecetaParaBorrar);
        console.log('tabActual:', tabActual);
    }
}