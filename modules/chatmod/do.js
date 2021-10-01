class Loader {
    bot = null
    bool = false;
    echo = false;
    g;
    constructor(bot) {
        this.bot = bot;
        console.log("Doing core enabled");
    }
    toNick(text){
     let bot = this.bot;
    
    this.g = ""
    if(text.global) this.g = "!"
    else if(text.m) this.g = "/er"
    if(text.text.split(":")[0] === "Напиши" && text.nick !== "->") {
        bot.chat(text.text.split(":")[1])
            if(text.text.split(":")[1].split("")[0] === "/")
        this.echo = true;

    }

}
    toMess(text){
       
}
    toOther(text){
        
        if(this.echo){
            this.bot.chat(this.g + ' ' + text);
            this.echo = false;      
        }        
}
    end(){
        this.bool = true
    }
}
module.exports = Loader