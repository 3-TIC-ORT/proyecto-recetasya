import fs from "fs";

export const MostrarRecetas = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    return { succes: true, data: RecetasArray };
}

export const MostrarRecetasDulces = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    let recetasDulces = [];
    for (let i = 0; i < RecetasArray.length; i++) {
        if (RecetasArray[i].categoria === "dulces"){
            recetasDulces.push(RecetasArray[i])
        }
    }
    return { succes: true, data: recetasDulces };
}

export const MostrarRecetasSalados = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    let recetasSalados = [];
    for (let i = 0; i < RecetasArray.length; i++) {
        if (RecetasArray[i].categoria === "dulces"){
            recetasSalados.push(RecetasArray[i])
        }
    }
    return { succes: true, data: recetasSalados };
}

export const MostrarRecetasBebidas = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    let recetasBebidas = [];
    for (let i = 0; i < RecetasArray.length; i++) {
        if (RecetasArray[i].categoria === "dulces"){
            recetasBebidas.push(RecetasArray[i])
        }
    }
    return { succes: true, data: recetasBebidas };
}

export const GuardarRecetas = (data) => {
    let recetas = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    recetas.push(data);
}