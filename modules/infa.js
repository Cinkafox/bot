class Module {
    modname = "инфа";
    woutnick = true;
    init(){

    }
    toChat(text){
    this.bot.chat(text.GM + "Где то " + Math.floor(Math.random()*100) + "%")
    }
    toOther(text){

    }
}
module.exports = Module;