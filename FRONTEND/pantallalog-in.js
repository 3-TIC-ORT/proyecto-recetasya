let boton1 = document.getElementById("ingresar");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let inisec = document.getElementById("inisec");
let registro1 = document.getElementById("registro1");
let r1 = document.getElementById("r1");
let home = document.getElementById("home");

function cambiarpantallar(){
    window.location.href = "pregistro.html";
}

r1.addEventListener("click", cambiarpantallar);

// Referencias a los elementos del modal
const modal = document.getElementById("custom-modal");
const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close-button");
const okButton = document.getElementById("modal-ok-button");


// ------------------------------------
// FUNCIONALIDAD DEL POP-UP (MODAL)
// ------------------------------------

/**
 * Muestra el pop-up (modal) con el mensaje especificado.
 * @param {string} message - El mensaje a mostrar.
 */
function showCustomModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Cierra el modal al hacer clic en (x)
closeButton.onclick = function() {
    modal.style.display = "none";
    pendingRedirectUrl = null; // Limpiar la redirección pendiente
}

// Cierra el modal al hacer clic en "Aceptar"
okButton.onclick = function() {
    modal.style.display = "none";
    
    // **NUEVA LÓGICA:** Si hay una URL de redirección pendiente (solo si el login fue exitoso), redirige.
    if (pendingRedirectUrl) {
        window.location.href = pendingRedirectUrl;
    }
    
    // Limpiar la variable después de usarla o cerrarla
    pendingRedirectUrl = null; 
}

// Cierra el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        pendingRedirectUrl = null; // Limpiar la redirección pendiente
    }
}

connect2Server();
// ... (La función Logearse no necesita cambios)

function Logearse() {
    var Nombre = document.getElementById('Nombre').value;
    var Contraseña = document.getElementById('Contraseña').value;
    if (!Nombre || !Contraseña) {
        // Reemplazo de alert()
        showCustomModal('Por favor, complete todos los campos.');
        return;
    }
    if (Contraseña.length < 6) {
        // Reemplazo de alert()
        showCustomModal('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (Nombre.length < 4) {
        // Reemplazo de alert()
        showCustomModal('El nombre de usuario debe tener al menos 4 caracteres.');
        return;
    }
    if (Contraseña === Nombre) {
        // Reemplazo de alert()
        showCustomModal('La contraseña no puede ser igual al nombre de usuario.');
        return;
    }
    postEvent("login", { "nombre": Nombre, "contraseña": Contraseña }, login);
}

function login(data) {
  if (data.success) {
    // Reemplazo de alert()
    showCustomModal("Login Exitoso. Bienvenido a RecipEat!!");
    localStorage.setItem("sesion", data.data.Nombre_de_la_Cuenta)
    
    // Para el login exitoso, puedes usar un setTimeout
    // para dar tiempo al usuario de ver el mensaje antes de redirigir.
    setTimeout(() => {
        window.location.href = "RecipEat.html";
    }, 1500); // Redirige después de 1.5 segundos

  } else {
    // Reemplazo de alert()
    showCustomModal("El usuario o la contraseña son incorrectos.");
  }
}

function cambiarpantalla1(){
    window.location.href = "RecipEat.html";
}
home.addEventListener("click", cambiarpantalla1);

