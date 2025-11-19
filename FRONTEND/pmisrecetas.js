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


const formReceta = document.getElementById('formulario-receta');

if (formReceta) {
    formReceta.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const apto = document.getElementById('apto').value;
        const imagen = document.getElementById('imagen').value;

        
        const ingredientesTexto = document.getElementById('ingredientes').value;
        const ingredientesArray = ingredientesTexto.split(',')
                                                    .map(item => item.trim())
                                                    .filter(item => item.length > 0);
        
        const pasosTexto = document.getElementById('pasos').value;
        const pasosArray = pasosTexto.split(';')
                                     .map(item => item.trim())
                                     .filter(item => item.length > 0);

        const nuevaReceta = {
            nombre: nombre,
            ingredientes: ingredientesArray,
            pasos: pasosArray,
            categoria: categoria,
            apto: apto,               
            imagen: imagen || 'IMAGENES FRONT/default.png'
        };

        emitEvent('guardarReceta', nuevaReceta, (response) => {
            console.log('Respuesta del servidor:', response);
            if (response && response.success) {
                alert('✅ ¡Receta guardada con éxito!');
                formReceta.reset();  

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