class HomeController{

    async index(req, res){
        res.send("testestesteste");
    }

}

module.exports = new HomeController();