let parse = require('../libs/ChatParser')
class Module {
    modname = "антимат";
    woutnick = false;
    enable = false;
    lastmess = "";
    init(){

    }
    toChat(text){
        if(!this.enable)
            this.bot.chat(text.GM + "Ага!слежу за чатом!")
        else
            this.bot.chat(text.GM + "Ага!перестаю следить за чатом!")
        this.enable = !this.enable;
    }
    toOther(text){
        if(!this.enable)return;
        let txt = parse.parse(text)
        if(txt == null) return;
        let mats = ["блять","гандон","сука","пидр","пидор","хуй","пизд","хуе","бля","пид","конч","еба","ебл","сучк","отье","отъе","долбо","даун","ебу"]
        var a = new RegExp(mats.join('|'), 'gi');

        if(txt.MESSAGE.match(a))
            this.bot.chat(txt.GM + "БА! чертов сапожник с ником " + txt.NICK + ", прошу ТАК НЕ ГОВОРИТЬ!")
        else if(txt.MESSAGE === this.lastmess)
            this.bot.chat(txt.GM + "БА! Черть " + txt.NICK + ", Тебя ВСЕ слышат! какого хрена спамишь?")
        this.print(this.lastmess + " " + txt.MESSAGE)
        this.lastmess = txt.MESSAGE
    }
}
module.exports = Module;
