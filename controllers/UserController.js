//separar a logica da programação
var User = require("../models/User");//caminho para o modelo responsavel por todos os dados 
class UserController{
   
    async index(req, res){
        var users = await User.findAll();//retorna um array
    
        res.json(users);
    }

    //metodo achar usuario
   async findUserName(req, res){
        var name = req.params.name
        var user = await User.findByName(name);
        if(user == undefined){
            res.status(404);
            res.json("404 não encontrado");
    }else{
        res.status(200);
        res.json(user);

    }
}

//metodo achar por id
    async findUserId(req, res){
        var id = req.params.id
        var user = await User.findById(id);
        if(user == undefined){
        res.status(404);
        res.json("404 não encontrado");
         }else{
        res.status(200);
        res.json(user);

    }
}

    async create (req, res){ //metodo responsavel para pegar o corpo da requisição do usuário(criar usuarios)
        var {email,name,password} = req.body;//jses(6) (7) (8)
        
        if(email == undefined){
            res.status(400); //Bad request
            res.json({err: "E-mail inválido!"})//mostra o erro para o usuário
            return;

        }
        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406)
            res.json({err : "O E-mail já esta cadastrado"})
            return;
        }
        

        await User.create(email,password,name);// o await garante que o codigo abaixo só será executado se essa linha estiver totalmente completa e OK

        res.status(200);
        res.send("E-mail validado com sucesso!");

    }
    async edit(req, res){
        var {id, name, email, cargo} = req.body;
        var result = await User.update(id,name,email,cargo)//atualiza um usuario que possui essa id, esse nome, esse email e esse cargo
        if(result != undefined){
            if(result.status){//verifica o status criado em uptade na pasta User.js
                res.send("tudo ok");
                res.status(200);
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servido!");
        }

    }
    async delete(req,res){
        var id = req.params.id;

       var result = await User.delete(id);
       if(result.status){
        res.status(200);
        res.send("Tudo OK!");
       }else{
        res.status(406);
        res.send(result.err);
       }
    }
}

module.exports = new UserController(); //exportando o metodo do controller para usar em outro arquivo