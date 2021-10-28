class Module {
    modname = "выбери";
    woutnick = false;
    init(){

    }
    toChat(text){
        let vibor = text.MESSAGE.replace(/выбери /gi,"").split("?").join("").trim().split("или");
        this.bot.chat(text.GM + "Я выбираю " + vibor[Math.floor(Math.random()*vibor.length)]);
    }
    toOther(text){

    }
}
module.exports = Module;
