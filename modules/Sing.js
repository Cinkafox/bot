const ChatParser = require("../ChatParser");


class Loader {
    bot = null
    bool = false;
    constructor(bot) {
        this.bot = bot
        console.log("sing enabled!");
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
            let g = ""
            if(text.global) g = "!"
            if(text.text === "Спой")
                this.sign(3500,g)

        }
        bot.on('message',prin);
    }

    sign(delay,g) {
        function translit(word){
            var answer = '';
            var converter = {
                'a':'а','b':'б','c':'ц','d':'д','e':'е','f':'ф','g':'г',
                'h':'х','i':'и','j':'дж','k':'к','l':'л','m':'м','n':'н',
                'o':'о','p':'п','q':'ку','r':'р','s':'с','t':'т','u':'у',
                'v':'в','w':'в','x':'х','y':'у','z':'з'
            };

            for (var i = 0; i < word.length; ++i ) {
                if (converter[word[i].toLowerCase()] === undefined){
                    answer += word[i];
                } else {
                    answer += converter[word[i].toLowerCase()];
                }
            }

            return answer;
        }
        let bot = this.bot;
        let fs = require('fs');
        fs.readFile('text.txt', 'utf8', function (err, data) {
            if (err) return;
            let str = data.split('\n');
            for (let i = 0; i < str.length; i++) {
                setTimeout(() => {
                    bot.chat(g + translit(str[i]).trim());
                }, delay * i);
            }
        });
    }
    end(){
        this.bool = true
    }

}
module.exports = Loader