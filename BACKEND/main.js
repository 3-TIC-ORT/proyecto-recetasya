import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { Recetas } from "./Recetas.js";
import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";

subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("registro", registroEvent);

startServer();