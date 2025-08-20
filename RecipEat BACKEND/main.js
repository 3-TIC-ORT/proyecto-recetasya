var Usuarios = [
    {
        "Nombre_de_la_Cuenta": "Alejo",
        "Contraseña" : "1234"
    },
    {
        "Nombre_de_la_Cuenta": "Lucho",
        "Contraseña": "4321"
    }
];

function getInfo() {
 
    var correcto = false; 
    var Nombre_de_la_Cuenta = document.getElementById('Nombre de la cuenta').value
    var Contraseña = document.getElementById('Contraseña').value
    for (var i = 0; i< Usuarios.length; i++) {
        if (Nombre_de_la_Cuenta == Usuarios[i].Nombre_de_la_Cuenta && Contraseña == Usuarios[i].Contraseña) {
            correcto = true;
        }
    }
    if (correcto == true){
        alert("Se ingreso correctamente");
    }
    else if (correcto == false){
        alert("El usuario y la contraseña no coinciden");
    }
}