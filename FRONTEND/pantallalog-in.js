let boton1 = document.getElementById("ingresar");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let inisec = document.getElementById("inisec");
let registro1 = document.getElementById("registro1");
let r1 = document.getElementById("r1");


connect2Server();

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
    postEvent("login", { "nombre": Nombre, "contraseña": Contraseña }, login);
}

function login(data) {
  if (data.success) {
    alert("Login Exitoso. Bienvenido a RecipEat!!");
    localStorage.setItem("sesion", data.data.Nombre_de_la_Cuenta)
    window.location.href = "RecipEat.html";

  } else {
    alert("El usuario o la contraseña son incorrectos.");
  }
}


function registrar1(){
  window.location.href = "pregistro.html";
}

r1.addEventListener("click", registrar1);