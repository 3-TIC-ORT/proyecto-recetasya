import fs from "fs";

export const Recetas = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    return { succes: true, data: RecetasArray };
}

export const GuardarRecetas = (data) => {
    let recetas = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    
}