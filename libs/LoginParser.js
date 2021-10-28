const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json"));
let login_req = config.LoginStage.login_req;
let reg_req = config.LoginStage.reg_req;
let wait = config.LoginStage.wait;
function check(bot,success) {
    bot.once('message',(message) =>{
        let text = message.toString();
        console.log("Login:" + text)
        switch (text){
            case login_req:
                bot.chat("/l 12341")
                break;
            case reg_req:
                bot.chat("/reg 12341 12341")
                break;
            case wait:
                check(bot,success);
                return;
        }
        setTimeout(success,500);
    })

}
module.exports.check = check;