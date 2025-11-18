import fs from "fs";
import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { GuardarRecetas, MostrarRecetas, MostrarRecetasDulces, MostrarRecetasSalados, MostrarRecetasBebidas, RecetasDestacadas, GuardarRecetasFavoritos  } from "./Recetas.js";
import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";

subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("registro", registroEvent);
subscribePOSTEvent("Favoritos", GuardarRecetasFavoritos);
subscribeGETEvent("recetas", MostrarRecetas);
subscribeGETEvent("recetasdulces", MostrarRecetasDulces);
subscribeGETEvent("recetassalados", MostrarRecetasSalados);
subscribeGETEvent("recetasbebidas", MostrarRecetasBebidas);
subscribeGETEvent("mostrarRecetasDestacadas", RecetasDestacadas);


startServer();