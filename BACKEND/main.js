import fs from "fs";
import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { GuardarRecetas, MostrarRecetas, MostrarRecetasDulces, MostrarRecetasSalados, MostrarRecetasBebidas, RecetasDestacadas  } from "./Recetas.js";
import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";

subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("registro", registroEvent);
subscribePOSTEvent("recetas", MostrarRecetas);
subscribePOSTEvent("guardarRecetas", GuardarRecetas);
subscribeGETEvent("recetasdulces", MostrarRecetasDulces);
subscribeGETEvent("recetassalados", MostrarRecetasSalados);
subscribeGETEvent("recetasbebidas", MostrarRecetasBebidas);
subscribeGETEvent("mostrarRecetasDestacadas", RecetasDestacadas);

startServer();