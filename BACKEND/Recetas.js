import fs from "fs";

export const MostrarRecetas = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("Recetas.json", "utf-8"));
    return { succes: true, data: RecetasArray };
}

export const MostrarRecetasDulces = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("Recetas.json", "utf-8"));
    let recetasDulces = [];
    for (let i = 0; i < RecetasArray.length; i++) {
        if (RecetasArray[i].categoria === "Dulce") {
            recetasDulces.push(RecetasArray[i])
        }
    }
    return { succes: true, data: recetasDulces };
}

export const MostrarRecetasSalados = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("Recetas.json", "utf-8"));
    let recetasSalados = [];
    for (let i = 0; i < RecetasArray.length; i++) {
        if (RecetasArray[i].categoria === "Salado") {
            recetasSalados.push(RecetasArray[i])
        }
    }
    return { succes: true, data: recetasSalados };
}

export const MostrarRecetasBebidas = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("Recetas.json", "utf-8"));
    let recetasBebidas = [];
    for (let i = 0; i < RecetasArray.length; i++) {
        if (RecetasArray[i].categoria === "Bebida") {
            recetasBebidas.push(RecetasArray[i])
        }
    }
    return { succes: true, data: recetasBebidas };
}


export const GuardarRecetas = (data) => {
    let Usuarios = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));

    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].Nombre_de_la_Cuenta === data.Nombre) {
            if (data.Tipo === "Creadas") {
                Usuarios[i].Creadas.push(data.receta);
            }
            if (data.Tipo === "Favoritos") {
                Usuarios[i].Favoritos.push(data.receta);
            }
        }
    }
    fs.writeFileSync("Usuarios.json", JSON.stringify(Usuarios, null, 2), "utf-8");
    return { success: true, message: "Receta guardada correctamente" };
};

export const GuardarRecetasFavoritos = (data) => {
    const { usuario, receta } = data;

    let Usuarios = JSON.parse(fs.readFileSync("Usuarios.json", "utf-8"));
    let Recetas = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));

    try {
        const usuarioIndex = Usuarios.findIndex(
            (user) => user.Nombre_de_la_Cuenta === usuario
        );

        if (usuarioIndex === -1) {
            return { success: false, message: "Usuario no encontrado" };
        }

        const recetaIndex = Recetas.findIndex(
            (recipe) => recipe.nombre === receta
        );

        if (recetaIndex === -1) {
            return { success: false, message: "Receta no encontrada" };
        }

        let favs = Usuarios[usuarioIndex].Favoritos;

        const yaExiste = favs.some((r) => r.nombre === receta);

        if (yaExiste) {
            const idx = favs.findIndex((r) => r.nombre === receta);
            favs.splice(idx, 1);

            fs.writeFileSync("Usuarios.json", JSON.stringify(Usuarios, null, 2));

            return {
                success: true,
                message: "Receta eliminada de favoritos",
                estadoFavorito: false   // ahora NO está en favoritos
            };
        }

        // ------------------------------------------------------------------
        // SI NO EXISTE => AGREGAR
        // ------------------------------------------------------------------
        favs.push(Recetas[recetaIndex]);

        fs.writeFileSync("Usuarios.json", JSON.stringify(Usuarios, null, 2));

        return {
            success: true,
            message: "Receta agregada a favoritos",
            estadoFavorito: true      // ahora SÍ está en favoritos
        };

    } catch (error) {
        console.error("Error en GuardarRecetasFavoritos:", error);
        return { success: false, message: "Error interno" };
    }
};

export const RecetasDestacadas = (data) => {
    let recetas = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    let recetasDestacadas = []
    for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].nombre === "Chocotorta") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Milanesa napolitana") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Choripán") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Lemon pie") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Papas a la crema") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Agua mineral") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Cappelletinis de carne") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Pionono de Oreo") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Ravioles de ricota con salsa de tomate fresco") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Empanadas de carne") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Volcán de Chocolate") {
            recetasDestacadas.push(recetas[i]);
        }
        if (recetas[i].nombre === "Jugo de naranja") {
            recetasDestacadas.push(recetas[i]);
        }
    }
    return { succes: true, data: recetasDestacadas };
}