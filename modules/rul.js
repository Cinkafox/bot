let perms = require("../libs/Permissions");
class Module {
    modname = "контроль";
    woutnick = false;
    init(){
        perms.setBotNick(this.bot.entity.username);
    }
    toChat(text){
        let splited = text.MESSAGE.split(" ");
        switch (splited[1].trim().toLowerCase()){
            case "релоад":
                console.log("Reload")
                this.reload()
                break;
            //Nick контроль права ник bebra user bob,s,su
            case "права":
                if(splited[2].toLowerCase() === "ник"){
                    perms.writeUser(splited[3],splited[4],splited[5].split(','));
                }
                if(splited[2].toLowerCase() === "читать"){
                    this.bot.chat(text.GM + "Права у " + splited[3].toString() + " такие " + perms.readUser(splited[3].toString()).join(' '));
                }
                break;
        }
    }
    toOther(text){

    }
}
module.exports = Module;
