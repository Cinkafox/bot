class Loader {
    bot = null
    bool = false;
    g;
    Parser = require('expr-eval').Parser;
    constructor(bot) {
        this.bot = bot;
        console.log("math core enabled");
    }
    toNick(text){
        let bot = this.bot  
        if(text.checking(text.nick,bot.entity.username).indexOf("math") == -1)return;
        if(text.text.split(" ")[0].trim().toLowerCase() === "решай"){
            this.g = "";
             if(text.global) this.g = "!"
             else if(text.m) this.g = "/er "
             try{
              bot.chat(this.g + this.Parser.evaluate(text.text.split(" ")[1].trim()))
              console.log(this.Parser.evaluate(text.text.split(" ")[1].trim()))
             }catch(e){
              bot.chat(this.g + "Ошибка при решении!")
             }
        }

    }

    toMess(){

    }

    toOther(text){
        
    }
    end(){
        this.bool = true
    }
}
module.exports = Loader