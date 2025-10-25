// Import SoqueTIC client functions as an ES module from the CDN so they're available here.
import { getEvent, postEvent, subscriberealTimeEvent, connect2Server } from 'https://cdn.jsdelivr.net/gh/JZylber/SoqueTIC-Client@v1.4.2/soquetic-client.js';

let boton1 = document.getElementById("ingresar");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let inisec = document.getElementById("inisec");
let registro1 = document.getElementById("registro1");
let r1 = document.getElementById("r1");

// Inicializar conexión (si la función está disponible desde el import)
if (typeof connect2Server === 'function') {
  connect2Server();
} else {
  console.warn('connect2Server no está disponible. Revisa la importación del cliente SoqueTIC.');
}

function Logearse() {
    var Nombre = document.getElementById('Nombre').value;
    var Contraseña = document.getElementById('Contraseña').value;
    if (!Nombre || !Contraseña) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    if (Contraseña.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    if (Nombre.length < 4) {
        alert('El nombre de usuario debe tener al menos 4 caracteres.');
        return;
    }
    if (Contraseña === Nombre) {
        alert('La contraseña no puede ser igual al nombre de usuario.');
        return;
    }
    if (typeof postEvent === 'function') {
      postEvent("login", { "nombre": Nombre, "contraseña": Contraseña }, login);
    } else {
      console.error('postEvent no está definido.');
      alert('Error interno: no se pudo iniciar sesión (función postEvent no disponible).');
    }
}

function login(data) {
  if (data.success) {
    alert("Login Exitoso. Bienvenido a RecepEat!!");
    window.location.href = "RecipEat.html";

  } else {
    alert("El usuario o la contraseña son incorrectos.");
  }
}


function registrar1(){
  window.location.href = "pregistro.html";
}

// Conectar botones solo si existen en esta página
if (r1) {
  r1.addEventListener("click", registrar1);
}

if (inisec) {
  // Si el botón existe, conectar el handler del módulo (evita onclick inline que falla en módulos)
  inisec.addEventListener('click', Logearse);
}