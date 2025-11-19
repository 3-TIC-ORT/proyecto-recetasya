console.log("🔍 Script pbebidas.js cargado");

let home = document.getElementById("home");
let recetario = document.getElementById("recetario");

console.log("🔍 Botón home:", home);
console.log("🔍 Botón recetario:", recetario);

// Verificar si connect2Server existe
if (typeof connect2Server === 'function') {
    console.log("✅ connect2Server existe");
    connect2Server();
} else {
    console.error("❌ connect2Server NO existe - verifica que SoqueTIC esté cargado");
}

let comidas = [];
const usuario = localStorage.getItem('sesion');
console.log("🔍 Usuario en sesión:", usuario);

const container = document.getElementById('recetas'); 
console.log("🔍 Container encontrado:", container);

// Verificar si getEvent existe
if (typeof getEvent === 'function') {
    console.log("✅ getEvent existe, solicitando recetas...");
    
    getEvent("recetasbebidas", data => {
        console.log("✅ Respuesta recibida del servidor:");
        console.log('📦 Data completa:', data);
        console.log('📦 Data.data:', data.data);
        
        if (data && data.data) {
            comidas = data.data;
            localStorage.setItem("comidas", JSON.stringify(comidas));
            console.log(`✅ ${comidas.length} bebidas cargadas`);
            aplicarFiltros(); 
        } else {
            console.error("❌ No hay datos en la respuesta del servidor");
        }
    });
} else {
    console.error("❌ getEvent NO existe - verifica que SoqueTIC esté cargado");
}

function mostrarComidas(lista) {
    console.log(`🔍 mostrarComidas llamado con ${lista.length} recetas`);
    
    if (!container) {
        console.error("❌ Container no encontrado");
        return;
    }
    
    container.innerHTML = "";

    if (lista.length === 0) {
        console.warn("⚠️ No hay recetas para mostrar");
        container.innerHTML = "<p style='margin-left: 1rem;'>No se encontraron recetas</p>";
        return;
    }

    lista.forEach((receta, index) => {
        console.log(`📝 Creando tarjeta ${index + 1}:`, receta.nombre);
        
        const card = document.createElement("div");
        card.classList.add("lista5");

        card.innerHTML = `
            <div class="r5" id="${receta.nombre}">
                <div class="img3"> 
                    <img class="imgrecetas" src="${receta.imagen}" onerror="console.error('Error cargando imagen:', this.src)">
                </div>
                <div class="texto3"> 
                    <div class="tarr"> 
                        <h3>${receta.nombre}</h3>
                        <img src="IMAGENES FRONT/botonfavoritos.png" 
                        data-fav="0"
                        class="estrella"
                        onerror="console.error('Error cargando estrella')">
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
            console.log("⭐ Click en estrella:", receta.nombre);
            
            const parent = estrella.parentNode;
            const h3 = parent.querySelector('h3');
            const nombre = h3 ? h3.textContent : '';
            
            if (typeof postEvent === 'function') {
                postEvent('Favoritos', {
                    usuario, 
                    receta: nombre, 
                    favToggle: estrella.dataset.fav
                }, (res) => {
                    console.log("📩 Respuesta de favoritos:", res);
                    
                    if (res && res.success) {
                        if (res.favToggle == '1') {
                            estrella.src = "IMAGENES FRONT/botonfavoritos.png";
                            estrella.dataset.fav = '0';
                        } else {
                            estrella.src = "IMAGENES FRONT/botonfavoritoslleno.png";
                            estrella.dataset.fav = '1';
                        }
                        console.log("✅ Favorito actualizado");
                    } else {
                        console.error("❌ Error del servidor:", res);
                        alert("Error al agregar a favoritos");
                    }
                });
            } else {
                console.error("❌ postEvent NO existe");
                alert("Error: postEvent no está disponible");
            }
        });

        const tarjeta = card.querySelector('.r5');
        tarjeta.addEventListener("click", () => {
            console.log("🔗 Click en tarjeta:", receta.nombre);
            localStorage.setItem("recetaSeleccionada", JSON.stringify(receta));
            window.location.href = "recetaext.html";
        });
    });
    
    console.log("✅ Todas las tarjetas creadas");
}

const filtroingredientes = document.getElementById('filtroingredientes');
const filtroapto = document.getElementById('filtroapto');
const buscador = document.getElementById('buscador');

console.log("🔍 Filtros encontrados:", {
    ingredientes: !!filtroingredientes,
    apto: !!filtroapto,
    buscador: !!buscador
});

if (filtroingredientes) filtroingredientes.addEventListener('change', aplicarFiltros);
if (filtroapto) filtroapto.addEventListener('change', aplicarFiltros);
if (buscador) buscador.addEventListener('input', aplicarFiltros);

function aplicarFiltros() {
    console.log("🔍 Aplicando filtros...");
    
    const ingredienteSeleccionado = filtroingredientes ? filtroingredientes.value.toLowerCase() : '';
    const aptoSeleccionado = filtroapto ? filtroapto.value.toLowerCase() : ''; 
    const textoBusqueda = buscador ? buscador.value.toLowerCase() : '';

    console.log("🔍 Filtros:", {
        ingrediente: ingredienteSeleccionado,
        apto: aptoSeleccionado,
        busqueda: textoBusqueda,
        totalComidas: comidas.length
    });

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

    console.log(`✅ Filtrados: ${comidasFiltradas.length} de ${comidas.length} recetas`);
    mostrarComidas(comidasFiltradas);
}

function obtenerIngredientesSeleccionados() {
    const selectElement = document.getElementById('filtroingredientes');
    const ingredientesSeleccionados = [];
    
    if (!selectElement) return ingredientesSeleccionados;
    
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

function cambiarpantalla(){
    console.log("🔗 Navegando a pantallasalados.html");
    window.location.href = "pantallasalados.html";
}

function cambiarpantalla1(){
    console.log("🔗 Navegando a RecipEat.html");
    window.location.href = "RecipEat.html";
}

function mrecetas(){
    console.log("🔗 Navegando a pmisrecetas.html");
    window.location.href = "pmisrecetas.html"
}

if (home) {
    home.addEventListener("click", cambiarpantalla1);
    console.log("✅ Event listener agregado a home");
} else {
    console.error("❌ Botón home no encontrado");
}

if (recetario) {
    recetario.addEventListener("click", mrecetas);
    console.log("✅ Event listener agregado a recetario");
} else {
    console.error("❌ Botón recetario no encontrado");
}

console.log("✅ Script pbebidas.js completamente cargado");
