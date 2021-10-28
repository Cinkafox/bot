class Module {
    modname = "правда";
    woutnick = false;
    truefalse = ["Агась!","Неа!","Точно нет!","Наверн да","Естественно!","Ясень пень!","хз лол!","Лучше не!","Ясное дело!","Капец! тычо куку? нет конечн!","Ты чооооо! естественно да!"]
    init(){
        //постиницилизация,тута и обьект бот есть
        //this.bot.chat("hello!");
    }
    toChat(text){
        this.bot.chat(text.GM + this.truefalse[Math.floor(Math.random()*this.truefalse.length -1)])
    }
    toOther(text){

    }
}
module.exports = Module;
