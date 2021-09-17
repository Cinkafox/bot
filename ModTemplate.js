const ChatParser = require("../ChatParser");

class Loader {
    bot = null
    bool = false;
    constructor(bot) {
        this.bot = bot
        console.log("chtoto core enabled!");
        this.ini()
    }
    ini(){
        let bot= this.bot;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;


        }
        bot.on('message',prin);

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader