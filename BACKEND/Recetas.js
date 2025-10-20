import fs from "fs";

const Recetas = (data) => {
    let RecetasArray = JSON.parse(fs.readFileSync("recetas.json", "utf-8"));
    console.log(RecetasArray)
}