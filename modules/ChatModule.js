class Loader {
    modulesmy = []
    bot = null
    bool = false;
    normalizedPath = require('path').join(__dirname, "chatmod");
    constructor(bot) {
        this.bot = bot
        console.log("chat core enabled!");
        this.ini()
    }
    ini(){
        let bot= this.bot;
        this.moduleload()
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;
            if(text.text.trim().split(" ")[0].trim() !== bot.entity.username && !text.m && text.text.trim().split(" ")[0].trim().toLowerCase() !== "все") return; 
            text.text = text.text.split(bot.entity.username).join("").trim()

            if(text.nick.trim() === "SUKA" || text.nick.trim() === "assassin1234") return;
            for(let i = 0;i<this.modulesmy.length;i++){
                this.modulesmy[i].ini(text)
            }

        }
        bot.on('message',prin);

    }
    end(){
        this.bool = true
    }
    moduleload(){
        let nocache = (module) => {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})};
        let pp = [];
        let bot = this.bot;
        for (let i = 0;i<this.modulesmy.length;i++){
            this.modulesmy[i].end();
            delete this.modulesmy[i].instance
        }
        require("fs").readdirSync(this.normalizedPath).forEach(function(file) {
            try {
                nocache("./chatmod/" + file);
                let Loader = require("./chatmod/" + file);
                pp.push(new Loader(bot));
            }catch (e){
                bot.chat('/m CinemaFoxProd Ошибка ' + e.name + ":" + e.message)
                console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack)
            }

        });
        this.modulesmy = pp;
    }
}
module.exports = Loader