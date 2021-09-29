const { Vec3 } = require("vec3");
const ChatParser = require("../ChatParser");

class Loader {
    bot = null
    bool = false;
    constructor(bot) {
        this.bot = bot
        console.log("go core enabled!");
        this.ini()
        //this.afk()
    }
    
    afk(){
        this.bot.setControlState('jump',true);
        setTimeout(() => {
            this.bot.setControlState('jump',false);
        },100)
        setTimeout(afk,200000)
    }

    ini(){
        let bot= this.bot;
        let bool = false;
        let nick;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        chat.check("");
       
        let go = () => {
           if(nick == null || nick.entity == null)  bool = false;
           if(!bool) {
            bot.setControlState('forward',false);
            bot.setControlState('jump', false);
               return;
           }
           //console.log(nick.entity.position.offset(0,1,0))
           bot.lookAt(nick.entity.position.offset(0,1,0))
           //console.log(bot.physics.gravity)
           
        }

        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;
            if(text.text.split(" ")[0] === "следуй"){
                if(!chat.check(text.nick)) return;
                console.log(text.text.split(" ")[1])
                nick = bot.players[text.text.split(" ")[1]]
                if(nick == undefined) return;
                bool = true
                console.log(nick.entity.position)
                bot.setControlState('forward',true);
                bot.setControlState('jump', true);
            }else if(text.text === "стой"){
                bool = false;
            }else if(text.text.split(" ")[0] === "грав"){
                console.log(bot.physics.gravity)
                bot.physics.gravity = Number(text.text.split(" ")[1].trim())
            }


        }
        bot.on('message',prin);
        bot.on('physicsTick',go)

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader