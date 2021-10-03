class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    g = "";
    constructor(bot) {
        this.bot = bot;
        console.log("wiki core enabled");
    }
    toNick(text){
        var request = require("request");
     let bot = this.bot;
     if(text.checking(text.nick).indexOf("wiki"))return;
     this.g = "";
     if(text.global) this.g = "!"
     else if(text.m) this.g = "/er "
     if(text.text.split(" ")[0].toLowerCase() === "чтоза"){
        if(text.text.split(" ")[1] == null){
            bot.chat(this.g + "Что хотел узнать то??")
            return;
        }
        
        let onvet;
            var url = "https://ru.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles="+ encodeURIComponent(text.text.split(" ")[1].trim()) +"&format=json";

            request({
                url: url,
                json: true
            }, function (error, response, body) {
            console.log(response.statusCode)
           if (!error && response.statusCode === 200) {
             //console.log(body)
             //console.log("sssss")
             try{
             onvet = body.query.pages[Object.keys(body.query.pages)[Object.keys(body.query.pages).length - 1]].revisions[0]['*'].split("—")[1]; //Print the json response
             }catch(e){
            
             }
            }
        });
        setTimeout(() => {
        if(onvet == null){
            console.log(url)
            bot.chat(this.g + " Знать не знаю!!")
            return;
        }
        bot.chat(this.g + onvet.trim().toString().replace(/([^А-Яа-я\- ])/gi,''))
        console.log(onvet.trim())
    },300)
     }
}
    toMess(text){
     let bot = this.bot;      
}
    toOther(text){

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader