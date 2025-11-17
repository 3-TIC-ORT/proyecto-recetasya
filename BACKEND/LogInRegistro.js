import fs from "fs";

  
export const loginEvent = (data) => {

    const usuarios = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));
    
    let Encontrado = false;
  
    for (let i = 0; i < usuarios.length; i++) {
  
      let u = usuarios[i];
      if (u.Nombre_de_la_Cuenta === data.nombre && u.Contraseña === data.contraseña) {
        Encontrado = true;
        if (Encontrado == true) { 
          var userIndex = i;
          break;
        }
      }
    }
  
    if (Encontrado === true) {
      return { success: true, msg: "Inicio de sesión exitoso", data: usuario = usuarios[userIndex] };
    } 
    else  if (Encontrado === false) {
      return { success: false, msg: "Usuario o contraseña incorrectos" };
      }
}

export const registroEvent = (data) => {
    let usuarios = [];
    usuarios = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));

    let UsuarioYaExistente = false;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].Nombre_de_la_Cuenta === data.nombre) {
        UsuarioYaExistente = true;
        break;
      }
    }
    if (UsuarioYaExistente === true) {
       return { success: false, message: " El usuario ya existe."}
    }
    else if (UsuarioYaExistente === false)  {
      usuarios.push({ "Nombre_de_la_Cuenta": data.nombre, "Contraseña": data.contraseña, "Favoritos":[
        ""
      ], "Creadas":[
        ""
      ] });
    fs.writeFileSync("Usuarios.json", JSON.stringify(usuarios, null, 2));
    return { success: true, message: " Bienvenido a RecipEat." };
    }
};