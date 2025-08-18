var Usuarios =[
{
    Nombre_de_la_Cuenta : "Alejo",
    Contraseña : "BOWY123"
}, 
{
    Nombre_de_la_Cuenta : "Lucho",
    Contraseña : "MAYA123"
}
]
function getInfo() {
    var Nombre_de_la_Cuenta = document.getElementById('Nombre de la cuenta').value
    var Contraseña = document.getElementById('Contraseña').value
    for (var i = 0; i< Usuarios.Lenght; i++) {
        if (Nombre_de_la_Cuenta == Usuarios[i].Nombre_de_la_Cuenta && Contraseña == Usuarios[i].Contraseña) {
            alert (Nombre_de_la_Cuenta + " se logeo correctamente")
            return
        }
    }
    alert ('Contraseña y/onombre de la cuenta incorrectos')
}