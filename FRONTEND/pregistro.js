let cuenta = document.getElementById("cuenta");

connect2Server();

function Registrarse() {
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
  postEvent("registro", { "nombre": Nombre, "contraseña": Contraseña }, Registro);
}

function Registro(data) {
  if (data.success === true) {
    alert("Se ha guardado el usuario con exito.");
    window.location.href = "RecipEat.html";
  } else if (data.success === false) {
    alert("No se ha podido guardar el usuario correctamente." + data.message);
  }
}




cuenta.addEventListener("click", Registro);