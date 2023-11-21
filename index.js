// inicia o servidor
var bodyParser = require('body-parser') //modulo body parser recebe dados via json
var express = require("express") // 
var app = express()
var router = require("./routes/routes")
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router); //arquivo de roteamento

app.listen(8686,() => {
    console.log("Servidor rodando")
});
