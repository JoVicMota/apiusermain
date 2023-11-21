//service(model) nome do arquivo
const { UTF8 } = require("mysql2/lib/constants/charsets");
var knex = require("../database/connection");//puxando o arquivo de conexão do knex que está na pasta connections
var bcrypt = require("bcrypt");// encriptar a senha

class User{
    //metodo para achar usuarios
    async findAll(){
        try{
       var result = await knex.select(["id","name","email","cargo"]).table("usuarios");
            return result;
    }catch(err){
        console.log(err);
        return[];
            console.log();
        }
    }
    //metodo filtrar pelo nome
    async findByName(name){
        try{
            var result = await knex.select(["id","name","email","cargo"]).where({name : name }).table("usuarios");
                 return result;
         }catch(err){
             console.log(err);
             return[];
                 console.log();
             }
         }
    
    //metodo filtrar por id
    async findById(id){
        try{
            var result = await knex.select(["id","name","email","cargo"]).where({id: id}).table("usuarios");
            return result;
    }catch(err){
        console.log(err);
        return undefined;
            console.log();
        }
    }
    async create(email,password,name){
        try{//try cath se der erro ele vai printar o erro

        var hash = await bcrypt.hash(password, 10)//(esse codigo gera um hash para a senha)chama uma função hash que vai receber uma senha(linha 6) o numero declarado nesse codigo é a quantidade de vezes que ele vai "hashear"(uma forma de criptografia) a senha o resultado hasheado será declarado na variavel declarada aqui nesta linha

            
         
            await knex.insert({email,password : hash ,name,cargo: 0}).table("usuarios")//o usuarios se refere a o nome do banco de dados
        }catch(err){
            console.log(err);
        }
    }
    //metodo que acha um email cadastrado ESTE METODO SO SERVE PARA IDENTIFICAR SE UM EMAIL JA EXISTE OU NAO
    // procura um email e se retornar falso é porque o email não existe
    async findEmail(email){// pesquisa um email e verifica se ele ja existe dentro do banco de dados baseado na query result se existir ele me retorna um array com 1 ou  mais resultado se o tamanho do array for maior que 0 siginfica que eu achei um usuario que ja tem esse email(mostra um email ja cadastrado e retorna true)
        try{
        var result = await knex.select("*").from("usuarios").where({email: email});//(o * significa todos )pesquisa na tabela "usuarios"se existe algum email igual ao email passado por este parametro
    
            if(result.length > 0){ // se for maior que 0 tem algo dentro do array
                return true;
            
            }else{return false;} // = 0

        }catch(err){
            console.log(err);
            return false;
        }
    }

//edição de usuarios
    async update(id,name,email,cargo){
        var user = await this.findById(id);//verifica se o usuario existe procurando pelo id
            if(user != undefined){ //se usuario existe, tudo ok!

                var editUser = {};

                if(email != undefined){ //se o email é diferente de undefined
                    if(email != user.email){ // verifica se o email informado é diferente do email cadastrado atual do usuario, o email será alterado
                        var result = await this.findEmail(email)//passa o email para ser ediato. Passando query para o banco de dados
                      if(result == false){// se o email que o usuário quer editar não for igual ao email atual e não estiver registrado no banco de dados
                            editUser.email = email; //email recebe o email para a edição
                        }else{//se não existe mostra um "erro" informa que o email ja esta cadastrado
                            return { status: false,err: "O e-mail ja esta cadastrado"}//mostra que o email ja esta cadastrado. isso é uma forma de comunicar o model com o controller
                        }
                    }
                }
                if (name != undefined){
                    editUser.name = name;
                }
                if (cargo != undefined){
                    editUser.cargo = cargo;
                }
               try{ //opreação asincrona sempre bom botar no trycatch
                await knex.update(editUser).where({id: id}).table("usuarios");//atualiza com as novas informações o id não pode ser diferente e nem atualizado para a atualização funcionar so altere o nome email e cargo 
                return { status : true}// informa ao controller que a operação deu certo
                }catch(err){
                return {status: false,err:err}
               }
            }else{
                return{status: false,err: "O usuário não existe!"}
            }     
    }
    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){
          
          try {
            await knex.delete().where({id : id}).table("usuarios");
            return{status:true};
          } catch (err) {
            return{status:false,err : err}
          }
            
        }else{
            return{status:false,err:"não é possivel remover um usuário inexistente"}
        }        
    }
}

module.exports = new User();//exportando o modulo(novo objeto de user)