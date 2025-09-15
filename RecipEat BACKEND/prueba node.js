import fs from "fs";

const data = fs.readFileSync("Usurios.json", "utf-8");
let array = JSON.parse(data);

for(let i = 0; i<Usurios.length; i++) {
    console.log(Usurios[i]);
}