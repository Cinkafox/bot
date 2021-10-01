class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    g;
    constructor(bot) {
        this.bot = bot;
        console.log("pov core enabled");
    }
    toNick(message){
     let bot = this.bot;
     this.g = "";
        if(message.global) this.g = "!"
        else if(message.m) this.g = "/er "
        if(message.text.split(" ")[0].trim().toLowerCase() === "повторяй"){
           if(message.text.split(" ")[1] === null) return;
           this.nick = message.text.split(" ")[1].trim(); 
           this.echo = true;
        }

        
        if(message.text.toLowerCase() === "выйди")
            bot.quit();
}
    toMess(message){
        let bot = this.bot;
        this.g = "";
        if(message.global) this.g = "!"
        else if(message.m) this.g = "/er "
        if(this.echo && message.nick.trim() === this.nick){
            bot.chat(this.g + message.orig)
        }
        if(message.text.split(" ")[0].toLowerCase() === "ищу" || message.text.split(" ")[0].toLowerCase() === "ищю") {
            bot.chat(this.g + "Але тебе никто не даст! перестань искать а?")
         }

         let mats = ["блять","гандон","сука","пидр","пидор","хуй","пизд","хуе","бля","пид","конч","еба","ебл","сучк","отье","отъе","долбо"]
        var a = new RegExp(mats.join('|'), 'gi');
         
        if(message.text.match(a)){
            bot.chat(this.g + "Маты это плохо! " + message.nick)
        }
}

    toOther(text){

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader