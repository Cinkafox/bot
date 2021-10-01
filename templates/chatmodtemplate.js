class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    g;
    constructor(bot) {
        this.bot = bot;
        console.log("other core enabled");
    }
    toNick(message){
     let bot = this.bot;
}
    toMess(message){
     let bot = this.bot;      
}
    toOther(text){

    }
    end(){
        this.bool = true
    }
}
module.exports = Loader