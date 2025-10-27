import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { Recetas, GuardarRecetas } from "./Recetas.js";
import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";

subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("registro", registroEvent);
subscribePOSTEvent("recetas", Recetas);
subscribePOSTEvent("guardarRecetas", GuardarRecetas);

startServer();