import { loginEvent, registroEvent } from "./LogInRegistro";
import { Recetas } from "./Recetas";
import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";

subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("Registro", registroEvent);
    
startServer();