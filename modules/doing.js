class Module {
    //Имя модуля ОБЯЗАТЕЛЬНО!!!!
    modname = "напиши";
    //типа ток с упоминанием или ваще в чате
    woutnick = false;
    echo = false;
    lastname = ""
    init(){
        //постиницилизация,тута и обьект бот есть
        //this.bot.chat("hello!");
    }
    toChat(text){
        let mess = text.MESSAGE.split(text.MESSAGE.split(" ")[0]).join("").trim();
        this.bot.chat(mess);
        if(mess.split("")[0] === "/") {setTimeout(() => {this.echo = true;},100); this.lastname = text.NICK}
    }
    toOther(text){
        if(this.echo){
            this.bot.chat("/m " + this.lastname + " " + text.trim());
            this.echo = false;
        }

    }
}
module.exports = Module;
