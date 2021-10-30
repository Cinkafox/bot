class Module {
    //Имя модуля ОБЯЗАТЕЛЬНО!!!!
    modname = "вера";
    //типа ток с упоминанием или ваще в чате
    woutnick = false;
    init(){

    }
    toChat(text){
        this.bot.chat(text.GM + "Syndicate_OC а вы все таки верите в " + text.MESSAGE.split(" ").splice(1,text.MESSAGE.split(" ").length).join(" ") + "?")
    }
    toOther(text){

    }
}
module.exports = Module;
