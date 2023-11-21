//pasta que define as rotas
var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require ("../controllers/UserController");
const User = require("../models/User");

router.get('/', HomeController.index); //basicamente escreve a função index em outro arquivo(o metodo index esta no HomeController) chama uma função chamada index dentro de um controller(controla fluxo de dados)
router.post('/user', UserController.create); //(criação de usuario)rota de cadastro do usuario (post "posta" dentro do DB)
router.get('/user',UserController.index)// chama o metodo "index" do user controller(achar o usuario )
router.get('/user/:name',UserController.findUserName)//
router.get('/user/:id/:name',UserController.findUserId,UserController.findUserName)
router.put('/user',UserController.edit)//aponta para o metodo edit do controller
router.delete('/user/:id',UserController.delete)
module.exports = router;


//essa arquitetura divide o roteador do controller(homecontroller)