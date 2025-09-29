import fs, { readFileSync } from "fs";

var registro = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));

var lista = registro

function registrarse () {

for (var i = 0; i<registro.length; i++) {
    if (mail === registro[i].MAIL) {
        console.log("Este correo electronico ya esta siendo utilizado po otra cuenta");
        var UsuariosExistentes = true
    }
    if (UsuariosExistentes != true) {
        lista.push ({
            "NOMBRE": nombre ,
            "APELLIDO": apellido ,
            "MAIL": mail ,
            "CONTRASENA": contraseña ,
        })
        fs.writeFileSync('Usuarios.json', JSON.stringify(lista));
        console.log("Usuario registrado con exito");
    }
    }
}
export {registrarse};

function registrarse () {}
export {registrarse};

function LogueIn () {
    var nombre = "nombre"
    var mail = "mail"
    var contraseña = "contrasena"
    for (var i = 0; i<registro.length; i++) {
        if (mail === registro[i].MAIL && contraseña === registro[i].CONTRASENA && nombre === registro[i].NOMBRE) {
            console.log ("Has iniciado sesion correctamente");
            var encontrado = true
            var logeado = true
            break
        }
        else if (contraseña != registro[i].CONTRASENA && mail === registro[i].MAIL) {
            console.log ("Contraseña incorrecta");
            var encontrado = true
            var logeado = false
            break
        }
        else if ((nombre != registro[i].NOMBRE || mail != registro[i].MAIL) && contraseña === registro[i].CONTRASENA) {
            console.log ("Usuario incorrecto");
            var encontrado = false
            var logeado = false
            break
        }
    }
}