/**
 * #region Эта хуетень отвечает
 * за те модули,использующие
 * #endregion только чат
 */
class Loader {
    modulesmy = []
    bot = null
    bool = false;
    normalizedPath = require('path').join(__dirname, "chatmod");
    constructor(bot) {
        this.bot = bot
        console.log("chatcontroller core enabled!");
        this.ini()
    }
    ini(){
        let bot= this.bot;
        //Загрузка подмодулей
        this.moduleload()
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            //отвечает за остальные сообщение
            setTimeout(() => {
                for(let i = 0;i<this.modulesmy.length;i++){
                    this.modulesmy[i].toOther(message)
                }
            },0)
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;
            //отвечает за сообщение в чате и в лс
            setTimeout(() => {
                for(let i = 0;i<this.modulesmy.length;i++){
                 this.modulesmy[i].toMess(text)
                }
            },0)

            if(text.text.trim().split(" ")[0].trim() !== bot.entity.username && !text.m && text.text.trim().split(" ")[0].trim().toLowerCase() !== "все") return; 
                text.text = text.text.split(bot.entity.username).join("").trim()
            //if(text.nick.trim() === "SUKA" || text.nick.trim() === "assassin1234") return;
            //тоже самое но с упониманием ника бота и ваще ассасин лох
            setTimeout(() => {
                for(let i = 0;i<this.modulesmy.length;i++){
                    this.modulesmy[i].toNick(text)
                }
            },0)

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
                if(file.split(".")[1] !== "js") return;
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