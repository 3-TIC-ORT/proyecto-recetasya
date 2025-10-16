let boton1 = document.getElementById("ingresar");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");
let inisec = document.getElementById("inisec") 



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
    alert("Login Exitoso. Bienvenido a RecepEat!!");
    window.location.href = "RecipEat.html";

  } else {
    alert("El usuario o la contraseña son incorrectos.");
  }
}