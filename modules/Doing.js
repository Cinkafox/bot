
class Loader {
    bot = null
    bool = false;
    echo = false;
    g;
    constructor(bot) {
        this.bot = bot
        console.log("doing core enabled!");
        this.ini()
    }
    ini(){
        let bot= this.bot;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            if(this.echo){
                bot.chat(this.g + ' ' + message.toString().trim());
                this.echo = false;
            }
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;

            this.g = ""
            if(text.global) this.g = "!"
            else if(text.m) this.g = "/er"
            if(text.text.split(":")[0] === "Напиши") {
                bot.chat(text.text.split(":")[1])
                if(text.text.split(":")[1].split("")[0] === "/")
                this.echo = true;
            }

        }
        bot.on('message',prin);

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader