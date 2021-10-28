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
            case "группа":
                if(splited[2].toLowerCase() === "ник"){
                    perms.writeUser(splited[3],splited[4],splited[5].split(','));
                }
                break;
        }
    }
    toOther(text){

    }
}
module.exports = Module;
