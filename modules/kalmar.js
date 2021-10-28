const {Vec3} = require("vec3");

class Module {
    modname = "кальмар";
    woutnick = false;
    rungame = false;
    init(){

    }
    toChat(text){
        this.rungame = !this.rungame;
        let timer;
        if(this.rungame) {
            this.bot.chat("Игра начинается!");

            let setpos = () => {
                let obj = {};
                for(let i = 0;i<Object.keys(this.bot.players).length;i++){
                    let temp = this.bot.players[Object.keys(this.bot.players)[i]];
                    if(temp.entity !== undefined && temp.entity.position !== undefined) {
                        obj[temp.username] = new Vec3(Math.floor(temp.entity.position.x),Math.floor(temp.entity.position.y),Math.floor(temp.entity.position.z));

                    }
            }
                return obj;
            }

            let vibil = [];
            vibil.push(this.bot.entity.username);

            let check = (ch) => {
                return vibil.indexOf(ch) === -1;
            }
            timer = setInterval(()=>{
                if(!this.rungame) clearInterval(timer);
                this.bot.chat("Тише едешь")
                setTimeout(()=>{this.bot.chat("Дальше будешь");
                    let pos = setpos();
                    console.log(pos)
                    let i =0;
                    let b = setInterval(()=>{
                            let temp = this.bot.players[Object.keys(this.bot.players)[i]];
                            if(temp.entity !== undefined && pos[temp.username] !== undefined) {
                                if(check(temp.username)){
                                console.log(new Vec3(Math.floor(temp.entity.position.x),Math.floor(temp.entity.position.y),Math.floor(temp.entity.position.z)) + " " + temp.username + " " + pos[temp.username]);
                                if(pos[temp.username] !== new Vec3(Math.floor(temp.entity.position.x),Math.floor(temp.entity.position.y),Math.floor(temp.entity.position.z))){
                                    console.log(temp.username + " Выбил!")
                                    pos[temp.username] = undefined;
                                }
                                }
                            }
                        i=(i+1)%Object.keys(this.bot.players).length
                    },10);
                    setTimeout(()=>{clearInterval(b)},5000)
                    },4000)
            },10000)
        }else {
            this.bot.chat("Ст о п игра!");
        }

    }
    toOther(text){

    }
}
module.exports = Module;
