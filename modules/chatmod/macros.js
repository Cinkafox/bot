class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    g;
    fs = require('fs');
    constructor(bot) {
        this.bot = bot;
        console.log("macros mod enabled");
    }
    toNick(text){
     let bot = this.bot;
     let str = text.text.toLowerCase().trim();
     let obj = JSON.parse(this.fs.readFileSync('macros.json', 'utf8'));
     if(obj[bot.entity.username] == undefined) obj[bot.entity.username] = {};
     let botobj = obj[bot.entity.username];
     if(text.checking(text.nick,bot.entity.username).indexOf("macros") == -1)return;
     
     let replace = (texta) => {
        return texta.split("{nick}").join(text.nick).split("{bot}").join(bot.entity.username)
     }
    
     if(botobj !=undefined && botobj[str] != undefined){
        bot.chat(replace(botobj[str]));
     }

     if(text.checking(text.nick,bot.entity.username).indexOf("macrosedit") == -1)return;
     if(text.text.toLowerCase().split(" ")[0] === "миникоманды"){
         if(text.text.toLowerCase().split(" ")[1] === "добавить"){
           botobj[text.text.split(" ")[2]] = text.text.split("миникоманды добавить " + text.text.split(" ")[2]).join("").trim();
           obj[bot.entity.username] = botobj;
           setTimeout(() => {
            this.fs.writeFile('macros.json', JSON.stringify(obj), 'utf8', console.log);
            },1000)
            let g = ""
            if(text.global) g = "!"
            bot.chat(
                g + "Готовенько!"
            )
         }
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
