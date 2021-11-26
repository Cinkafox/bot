const mineflayer = require('mineflayer');
const fs = require('fs');
const print = require('./libs/ToConsole');
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
    moduleses;
    err;
    logs = "";
    constructor(bot_nick) {
        this.bot_nick = bot_nick;
        print(bot_nick)
        this.bot = mineflayer.createBot({
            host: config.server.host,
            port: config.server.port,
            username: bot_nick
        });
        permissions.setBotNick(bot_nick);
        this.bot.once('spawn',() => {this.loginstage()});
        this.bot.once('kicked', (message) => {
            this.err = message
            print(message);
            this.logs = this.logs + "\n" + this.err;
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

        let load = (message) => {this.onChat(message);
            for(let i = 0;i<Object.keys(this.moduleses).length;i++){
                this.moduleses[Object.keys(this.moduleses)[i]].toOther(message.toString());
            }
        }
        let loadmod = () => {
            print("Modules is loaded!")
            this.moduleses = modules.load(this.bot.chat,{bot:this.bot,reload:() => {loadmod()},print:print})
        }
        print("Готово");
        //загрузка модулей хуйдулей,давая самого бота
        loadmod();
        this.bot.on('message',load);
        }
    onChat(message){
        this.logs = '<p>' + this.logs + message + '</p>';
        let text = Parser.parse(message.toString());
        if(text == null) return;
        let chat = text.MESSAGE.split(this.bot.entity.username).join("").trim();
        let player = permissions.readUser(text.NICK);
        let index = chat.split(" ")[0].toLowerCase();
        if(permissions.check(player,chat.split(" ")[0].toLowerCase()))
        if(this.moduleses[index] != null){
            if(!(this.moduleses[index].woutnick || text.MESSAGE.split(" ")[0].trim() === this.bot.entity.username || text.G === "M")) return;
            text.MESSAGE = chat;
            this.moduleses[index].toChat(text);
        }
    }
    end(err){
        return err;
    }

}
new minebot("Leofox");
//require('./libs/httplib')(minebot);

