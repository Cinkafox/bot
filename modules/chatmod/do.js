class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    constructor(bot) {
        this.bot = bot;
        console.log("Doing core enabled");
    }
    toNick(text){
        let bot = this.bot;
     console.log(text.checking(text.nick).indexOf("do"))
     if(text.checking(text.nick).indexOf("do") == -1)return;
    if(text.text.split(":")[0] === "Напиши" && text.nick !== "->") {
        bot.chat(text.text.split(":")[1])
            if(text.text.split(":")[1].split("")[0] === "/")
        this.echo = true;
        this.nick = text.nick;

    }

}
    toMess(text){
       
}
    toOther(text){
        
        if(this.echo){
            this.bot.chat('/m ' + this.nick + " " + text);
            this.echo = false;      
        }        
}
    end(){
        this.bool = true
    }
}
module.exports = Loader