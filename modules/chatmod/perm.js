const permissions = require("../../permissions");

class Loader {
    bot = null
    bool = false;
    g = "";
    constructor(bot) {
        this.bot = bot;
        console.log("perm core enabled");
    }
    toNick(text){
     let bot = this.bot;
     if(text.checking(text.nick).indexOf("*") == -1)return;
     
     let perm = text.perm;

     this.g = "";
     if(text.global) this.g = "!"
     else if(text.m) this.g = "/er "

     if(text.text.split(" ")[0].toLowerCase() === "добавь_ник"){
        if(text.text.split(" ")[3] == null){
            bot.chat(this.g + "добавь_ник ник группа [пермишенс]")
            return;
        }
       
        let perms = text.text.split(" ")[3].split(',')
        
        console.log("|" + text.text.split(" ")[1].trim() + "|" + text.text.split(" ")[2].trim() + "|" + perms)
        perm.adduser(text.text.split(" ")[1].trim(),text.text.split(" ")[2].trim(),perms)
        bot.chat(this.g + "Готово")
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