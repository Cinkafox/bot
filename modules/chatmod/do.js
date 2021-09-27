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
    if(this.echo){
        bot.chat(this.g + ' ' + message.toString().trim());
        this.echo = false;
    }
    let text = message
    

    this.g = ""
    if(text.global) this.g = "!"
    else if(text.m) this.g = "/er"
    if(text.text.split(":")[0] === "Напиши") {
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