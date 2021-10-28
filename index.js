const mineflayer = require('mineflayer');
const fs = require('fs');
//конфиг читаем,так как мы забыли смартфон в туалет
const config = JSON.parse(fs.readFileSync('config.json'));
//этот чел отвечает за спиногрызов,тоесть модулей
const modules = require("./libs/modules");
const {Vec3} = require("vec3");
//ваще серезный чел,думает надо ли логиниться.
const Login = require("./libs/LoginParser");
const Parser = require("./libs/ChatParser");
const permissions  = require('./libs/Permissions');

let minebot = class {
    bot_nick;
    bot;
    err = "bot is ended"
    constructor(bot_nick) {
        this.bot_nick = bot_nick;
        this.bot = mineflayer.createBot({
            host: config.server.host,
            port: config.server.port,
            username: bot_nick
        });
        permissions.setBotNick(bot_nick);
        this.bot.once('spawn',() => {this.loginstage()});
        this.bot.once('kicked', (message) => {
            this.err = JSON.parse(message).text;
            console.log(message);
        });
        this.bot.once('end',() => {
            throw this.err;
        });
    }
    //типа действия в хабе и так далее,если ничего нема то просто пусть this.init();
    OnHub(bot){
        bot.setControlState('forward',true);
        bot.lookAt(new Vec3(-93,60,-675));
        setTimeout(() => {
            bot.setControlState('forward', false);
            this.init();
        },6000);
    }
    //проверяет надо ли логинится или регатся,настраивается в конфиге
    loginstage(){
        let bot = this.bot
        Login.check(bot,() => {this.OnHub(bot)})
    }
    //вот мы и у иницилизации
    init(){
        let moduleses;
        let load = (message) => {this.onChat(message,moduleses);
            for(let i = 0;i<Object.keys(moduleses).length;i++){
                moduleses[Object.keys(moduleses)[i]].toOther(message.toString());
            }
        }
        let loadmod = () => {
            console.log("Modules is loaded!")
            moduleses = modules.load(this.bot.chat,{bot:this.bot,reload:() => {loadmod()}})
        }
        console.log("Готово");
        //загрузка модулей хуйдулей,давая самого бота
        loadmod();
        this.bot.on('message',load);
        }
    onChat(message,modules){
        let text = Parser.parse(message.toString());
        if(text == null) return;
        let chat = text.MESSAGE.split(this.bot.entity.username).join("").trim();
        let player = permissions.readUser(text.NICK);
        let index = chat.split(" ")[0].toLowerCase();
        if(permissions.check(player,chat.split(" ")[0].toLowerCase()))
        if(modules[index] != null){
            if(!(modules[index].woutnick || text.MESSAGE.split(" ")[0].trim() === this.bot.entity.username || text.G === "M")) return;
            text.MESSAGE = chat;
            modules[index].toChat(text);
        }
    }

}

let bot = new minebot("Leofox");
