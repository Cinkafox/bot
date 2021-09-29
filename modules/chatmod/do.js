class Loader {
    bot = null
    bool = false;
    echo = false;
    g;
    constructor(bot) {
        this.bot = bot;
        console.log("Doing core enabled");
    }
    ini(message){
     let bot = this.bot;
     let text = message
    if(this.echo){
        setTimeout(() => {
        bot.chat(this.g + ' ' + text.text.toString().trim());
        },10)
        this.echo = false;
        
    }
    
    

    this.g = ""
    if(text.global) this.g = "!"
    else if(text.m) this.g = "/er"
    if(text.text.split(":")[0] === "Напиши" && text.nick !== "->") {
        bot.chat(text.text.split(":")[1])
        if(text.text.split(":")[1].split("")[0] === "/")
        this.echo = true;

    }
}
    end(){
        this.bool = true
    }
}
module.exports = Loader