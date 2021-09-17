class Loader {
    bot = null
    bool = false;
    constructor(bot) {
        this.bot = bot
        console.log("ukraine core enabled!");
        this.ini()
    }
    ini(){
        let nick = {}
        let bot= this.bot;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;
            let g = ""
            if(text.global) g = "!"
            if(text.text === "Слава украине!") {
                console.log(nick[text.nick])
                if(nick[text.nick] === undefined) {
                    bot.chat(g + "Героям слава! " + text.nick)
                    nick[text.nick] = true
                }else {
                    bot.chat(g + "Повторятся не буду те! " + text.nick)
                }
            text.function(2000)
            }

        }
        bot.on('message',prin);

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader