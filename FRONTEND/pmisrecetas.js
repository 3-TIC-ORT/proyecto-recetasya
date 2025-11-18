let home = document.getElementById("home");
let favoritos = document.getElementById("Fav");
let creadas = document.getElementById("Creadas");

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


// ==== LÓGICA DEL FORMULARIO DE CREACIÓN DE RECETAS ====

const formReceta = document.getElementById('formulario-receta');

if (formReceta) {
    formReceta.addEventListener('submit', function(e) {
        e.preventDefault(); // Detiene el envío normal del formulario

        // 1. Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const apto = document.getElementById('apto').value;
        const imagen = document.getElementById('imagen').value;

        // 2. Procesar Ingredientes y Pasos
        // NOTA: Es crucial que tu backend sepa cómo manejar este formato (string separado)
        // o que se encargue de convertirlo a Array si es necesario.
        
        // Convertir ingredientes separados por coma en un array de strings limpio
        const ingredientesTexto = document.getElementById('ingredientes').value;
        const ingredientesArray = ingredientesTexto.split(',')
                                                    .map(item => item.trim())
                                                    .filter(item => item.length > 0);
        
        // Convertir pasos separados por punto y coma en un array de strings limpio
        const pasosTexto = document.getElementById('pasos').value;
        const pasosArray = pasosTexto.split(';')
                                     .map(item => item.trim())
                                     .filter(item => item.length > 0);

        // 3. Crear el objeto de la nueva receta
        const nuevaReceta = {
            nombre: nombre,
            categoria: categoria,
            apto: apto,
            ingredientes: ingredientesArray, // Enviamos como Array
            pasos: pasosArray,               // Enviamos como Array
            imagen: imagen || 'IMAGENES FRONT/default.png' // Valor por defecto si no hay URL
            // Puedes agregar más campos (porciones, dificultad, etc.)
        };

        // 4. Enviar la nueva receta al backend usando emitEvent
        // ASUMIMOS que tu backend maneja el evento 'guardarReceta'
        emitEvent('guardarReceta', nuevaReceta, (response) => {
            console.log('Respuesta del servidor:', response);
            if (response && response.success) {
                alert('✅ ¡Receta guardada con éxito!');
                formReceta.reset(); // Limpiar el formulario
                
                // Opcional: Recargar la lista de recetas si es necesario
                // emitEvent('recetassalados', {}, (data) => { /* ... */ }); 

            } else {
                alert('❌ Error al guardar la receta: ' + (response.message || 'Verifica la conexión o el formato de datos.'));
            }
        });
    });
}

function mrecetas(){
    window.location.href = "RecipEat.html";
}


home.addEventListener("click", mrecetas);

favoritos.addEventListener("click", AgregarReceta);

creadas.addEventListener("click", GuardarRecetas);