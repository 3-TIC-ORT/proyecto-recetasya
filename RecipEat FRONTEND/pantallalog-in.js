let boton1 = document.getElementById("ingresar");
let usuario = document.getElementById("usuario");
let contraseña = document.getElementById("contraseña");

function login2(){
    window.location.href = "RecipEat.html";
}

boton1.addEventListener("click", function(){
    if(usuario.value == "alejo" && contraseña.value == "recetas"){
        login2();
    }
    else{
        alert("los datos ingresados no son válidos");
    }
})


