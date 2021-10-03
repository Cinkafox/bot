const { Vec3 } = require("vec3");
const ChatParser = require("../ChatParser");

class Loader {
    bot = null
    bool1 = false;
    constructor(bot) {
        this.bot = bot
        console.log("go core enabled!");
        this.ini()
    }
    
    ini(){
        let bot= this.bot;
        let bool = false;
        let nick;

        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();

        let i =0;
        let names = ["Leofox"];
        let sign = false;

        let go = () => {
            if(this.bool1){
            this.bot.off('message',prin);
            this.bot.off('physicTick',go)
            }
            let player = bot.players[Object.keys(bot.players)[i]]
            if(player != undefined){    
                if(player.entity !== undefined && player.entity !== null){
                    
                    if(names.indexOf(player.username) == -1){
                        if(sign)
                        bot.chat("ТРЕВОГА! БЛ*ТЬ ТРЕВОГА! РЯДОМ БОМЖ С НИКОМ " + player.username)
                        names.push(player.username)
                    }
                }else{
                    if(names.indexOf(player.username) != -1){
                    names.splice(names.indexOf(player.username),1)
                    }
                }
            }
            if(i<Object.keys(bot.players).length-1)
            i++
            else
            i=0;

           if(nick == null || nick.entity == null)  bool = false;
           if(!bool) {
            bot.setControlState('forward',false);
            bot.setControlState('jump', false);
               return;
           }
           bot.lookAt(nick.entity.position.offset(0,1,0))
        }

        let prin = (message) => {
            if(this.bool1)
                this.bot.off('message',prin);
            let text = chat.parse(message.toString().trim())
            if(text === undefined) return;
            if(text.checking(text.nick).indexOf("go"))return;    
            if(text.text.split(" ")[0] === "следуй"){
                if(!chat.check(text.nick)) return;
                //console.log(text.text.split(" ")[1])
                nick = bot.players[text.text.split(" ")[1]]
                if(nick == undefined) return;
                bool = true
                console.log(nick.entity.position)
                bot.setControlState('forward',true);
                bot.setControlState('jump', true);
            }
            
            else if(text.text === "стой"){
                bool = false;
            }

            else if(text.text.toLowerCase() === "сигналка")
                sign = !sign
            
            else if(text.text.split(" ")[0] === "грав"){
                console.log(bot.physics.gravity)
                bot.physics.gravity = Number(text.text.split(" ")[1].trim())
            }
            
            else if(text.text.split(" ")[0] === "следи"){
                if(!chat.check(text.nick)) return;
                console.log(text.text.split(" ")[1])
                nick = bot.players[text.text.split(" ")[1]]
                if(nick == undefined) return;
                bool = true
            }


        }
        bot.on('message',prin);
        bot.on('physicTick',go)
        
       

    }
    end(){
        this.bool1 = true
    }
}
module.exports = Loader