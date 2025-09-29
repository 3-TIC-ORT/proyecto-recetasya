import fs, { readFileSync } from "fs";

var registro = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));

var lista = registro

function registrarse () {

for (var i = 0; i<registro.length; i++) {
    if (gmail === registro[i].GMAIL) {
        console.log("Este correo electronico ya esta siendo utilizado po otra cuenta");
        var UsuariosExistentes = true
    }
    if (UsuariosExistentes != true) {
        lista.push ({
            "NOMBRE": nombre ,
            "APELLIDO": apellido ,
            "GMAIL": gmail ,
            "CONTRASENA": contraseña ,
        })
        fs.writeFileSync('Usuarios.json', JSON.stringify(lista));
        console.log("Usuario registrado con exito");
    }
    }
}