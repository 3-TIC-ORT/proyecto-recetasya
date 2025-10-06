import fs from "fs";
import { suscribeGETEvent, suscribePOSTEvent, reallTimeEvent, startServer } from "soquetic";

function login (data) {
    let Usuario = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
    let correcto = false;
    for (let i = 0; i<Usuario.lenght; i++) {
        if (data.mail === Usuario[i].mail && data.contraseña === Usuario[i].contraseña) {
            correcto = true;
        }
    }
    return correcto
}

suscribePOSTEvent ("iniciodesesion", login);
startServer();