import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";
  import fs from "fs";
  import { log } from "console";
  
const loginEvent = (data) => {
    const usuarios = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));
    
    let Encontrado = false;
  
    for (let i = 0; i < usuarios.length; i++) {
      const u = usuarios[i];
      if (u.Nombre_de_la_Cuenta === data.nombre && u.Contraseña === data.contraseña) {
        Encontrado = true;
        break;
      }
    }
  
    if (Encontrado === true) {
      return { success: true, msg: "Inicio de sesión exitoso" };
    } 
    else  if (Encontrado === false) {
      return { success: false, msg: "Usuario o contraseña incorrectos" };
      }
  }

const registroEvent = (data) => {
    const usuarios = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));
  
    usuarios.forEach(usuario => {
      if (usuario.Nombre_de_la_Cuenta == data.nombre) {
       return { success: false, message: " El usuario ya existe."}
      }
    })
    // let UsuarioYaExistente = false;
    // for (let i = 0; i < usuarios.length; i++) {
    //   if (usuarios[i].Nombre_de_la_cuenta === data.Nombre) {
    //     UsuarioYaExistente = true;
    //     break;
    //   }
    // }
    // if (UsuarioYaExistente === true) {
    //    return { success: false, message: " El usuario ya existe."}
    // }
    usuarios.push({ "Nombre_de_la_cuenta": data.nombre, "Contraseña": data.contraseña });
    fs.writeFileSync("Usuarios.json", JSON.stringify(usuarios, null, 2));
    return { success: true };
  }
  
subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("Registro", registroEvent);
  
startServer();