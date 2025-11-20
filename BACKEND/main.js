import fs from "fs";
import { loginEvent, registroEvent } from "./LogInRegistro.js";
import { MostrarRecetas, MostrarRecetasDulces, MostrarRecetasSalados, MostrarRecetasBebidas, RecetasDestacadas, GuardarRecetasFavoritos, ObtenerFavoritos, GuardarRecetaCreada, ObtenerRecetarioPersonal } from "./Recetas.js";
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
subscribeGETEvent("ObtenerFavoritos", ObtenerFavoritos);
subscribePOSTEvent("guardarRecetaCreada", GuardarRecetaCreada);
subscribePOSTEvent("misRecetas", ObtenerRecetarioPersonal);



startServer();