import fs from 'fs';
fs.writeFileSync("data.txt", "Node Js");
const data=fs.readFileSync("data.txt")
console.log(data.toString());
fs.appendFileSync("data.txt", "\nReact Js");
const newData=fs.readFileSync("data.txt")
console.log(newData.toString());
fs.unlinkSync("data.txt");
console.log("File deleted successfully.");