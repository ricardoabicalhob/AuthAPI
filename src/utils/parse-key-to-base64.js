const fs = require("fs")

const base64 = fs.readFileSync("public.pem").toString("base64") 
console.log(base64)