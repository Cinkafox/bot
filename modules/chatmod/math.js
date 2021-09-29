class Loader {
    bot = null
    bool = false;
    g;
    Parser = require('expr-eval').Parser;
    constructor(bot) {
        this.bot = bot;
        console.log("math core enabled");
    }
    ini(message){
        let bot = this.bot  
        
        if(message.text.split(" ")[0].trim().toLowerCase() === "решай"){
            this.g = "";
             if(message.global) this.g = "!"
             else if(message.m) this.g = "/er "
             try{
              bot.chat(this.g + this.Parser.evaluate(message.text.split(" ")[1].trim()))
              console.log(this.Parser.evaluate(message.text.split(" ")[1].trim()))
             }catch(e){
              bot.chat(this.g + "Ошибка при решении!")
             }
        }

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader