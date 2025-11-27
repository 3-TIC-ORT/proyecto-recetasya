import fs from "fs";
import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { MostrarRecetas, MostrarRecetasDulces, MostrarRecetasSalados, MostrarRecetasBebidas, RecetasDestacadas, GuardarRecetasFavoritos, GuardarRecetaCreada, ObtenerRecetarioPersonal, EliminarRecetaCreada } from "./Recetas.js";
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
subscribePOSTEvent("guardarRecetaCreada", GuardarRecetaCreada);
subscribePOSTEvent("misRecetas", ObtenerRecetarioPersonal);
subscribePOSTEvent("eliminarRecetaCreada", EliminarRecetaCreada);



startServer();