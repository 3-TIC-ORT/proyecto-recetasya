import { loginEvent, registroEvent } from "./LogInRegistro.js";
import {
    subscribeGETEvent,
    subscribePOSTEvent,
    realTimeEvent,
    startServer,
  } from "soquetic";

subscribePOSTEvent("login", loginEvent);
subscribePOSTEvent("registro", registroEvent);

startServer();