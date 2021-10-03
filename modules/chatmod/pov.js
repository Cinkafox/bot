class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    g;
    constructor(bot) {
        this.bot = bot;
        console.log("pov core enabled");
    }
    toNick(text){
     let bot = this.bot;
     if(text.checking(text.nick).indexOf("pov"))return;
     this.g = "";
        if(text.global) this.g = "!"
        else if(text.m) this.g = "/er "
        if(text.text.split(" ")[0].trim().toLowerCase() === "повторяй"){
           if(text.text.split(" ")[1] === null) return;
           this.nick = text.text.split(" ")[1].trim(); 
           this.echo = true;
        }

        
        if(text.text.toLowerCase() === "выйди")
            bot.quit();
}
    toMess(text){
        let bot = this.bot;
        this.g = "";
        if(text.global) this.g = "!"
        else if(text.m) this.g = "/er "
        if(this.echo && text.nick.trim() === this.nick){
            bot.chat(this.g + text.orig)
        }
        if(text.text.split(" ")[0].toLowerCase() === "ищу" || text.text.split(" ")[0].toLowerCase() === "ищю") {
            bot.chat(this.g + "А мог бы лично к кому то подкатить,а не так вот!")
         }

         let mats = ["блять","гандон","сука","пидр","пидор","хуй","пизд","хуе","бля","пид","конч","еба","ебл","сучк","отье","отъе","долбо","даун","ебу"]
        var a = new RegExp(mats.join('|'), 'gi');
         
        if(text.text.match(a))
            bot.chat(this.g + "Маты это плохо! " + text.nick) 
}

    toOther(text){

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader