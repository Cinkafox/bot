const ChatParser = require("../ChatParser");

class Loader {
    bot = null
    bool = false;
    echo = false;
    g;
    answer;
    constructor(bot) {
        this.bot = bot
        console.log("who core enabled!");
        this.ini()
    }
    ini(){
        let bot= this.bot;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let str = "";
        let fs = require('fs');
        fs.readFile('qa.txt', 'utf8', function (err, data) {
            if (err) return;
            str = data.split('\n');
        })

        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);

            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;
            this.g = "";
            if(text.global) this.g = "!"
            else if(text.m) this.g = "/er"
            if(text.text.trim() === this.answer && this.echo) {
                if(text.nick === "lewen00") {
                    bot.chat(this.g + " Пошел на тайвань! lewen00")
                    return;
                }
                bot.chat(this.g + " Верно! +500 " + text.nick)
                bot.chat("/pay " + text.nick + " 500")
                this.echo = false
            }

            if(text.text.split(" ")[0].toLowerCase() === "спрашивай") {
                if(text.nick === "lewen00") {
                    bot.chat(this.g + " Пошел на тайвань! lewen00")
                    return;
                }
                let rand = Math.floor(Math.random()*(str.length-1));
                console.log(rand)
                let rawtext = str[rand].split(":");
                bot.chat(this.g + " " + rawtext[0])
                this.answer = rawtext[1].trim();
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