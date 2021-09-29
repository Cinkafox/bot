class Loader {
    bot = null
    bool = false;
    echo = false;
    g;
    nick;
    constructor(bot) {
        this.bot = bot;
        console.log("pov core enabled");
        this.ini()
    }
    ini(){
        let bot = this.bot;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (mess) => {
            if(this.bool)
                this.bot.off('message',prin);
        
        let message = chat.parse(mess.toString().trim())
        if(message === undefined) return;
       
        this.g = "";
        if(message.global) this.g = "!"
        else if(message.m) this.g = "/er "
        if(message.text.split(" ")[0].trim().toLowerCase() === "повторяй"){
           if(message.text.split(" ")[1] === null) return;
           this.nick = message.text.split(" ")[1].trim(); 
           this.echo = true;
        }

        if(this.echo && message.nick.trim() === this.nick){
            bot.chat(this.g + message.orig)
        }
        if(message.text.split(" ")[0].toLowerCase() === "ищу" || message.text.split(" ")[0].toLowerCase() === "ищю") {
            bot.chat(this.g + "Але тебе никто не даст! перестань искать а?")
         }

         let mats = ["блять","сука","пидр","пидор","хуй","пизд","хуе","бля","пид","конч","еба","ебл","сучк","отье","отъе","долбо"]
        var a = new RegExp(mats.join('|'), 'gi');
         
        if(message.text.match(a)){
            bot.chat(this.g + "Маты это плохо! " + message.nick)
        }
    }
    bot.on('message',prin);

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader