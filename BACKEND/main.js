import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { GuardarRecetas, MostrarRecetas, MostrarRecetasDulces, MostrarRecetasSalados, MostrarRecetasBebidas  } from "./Recetas.js";
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

startServer();