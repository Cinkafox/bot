const http = require('https');
const fs = require('fs');
const path = require("path");
const normalizedPath = path.join(__dirname, "../schematics");
class Module {
    
    modname = "схема";
    
    woutnick = false;
    init(){

    }
    toChat(text){
        let index = text.MESSAGE.split(" ");
        switch(index[1].toLowerCase()){
            case "список":
                let output = "";
                fs.readdirSync(normalizedPath).forEach(function (file) {
                    output = output + file + " и ";
                });
                this.bot.chat(text.GM + "Файлы в схемах - " + output);
                break;
            case "скачать":
                var bot = this.bot;
                var file = fs.createWriteStream(normalizedPath + "/" + index[2] + ".schematic");
                var request = http.get(index[3], function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                        bot.chat(text.GM + "Готово");
                        file.close();
                      });

                });
            
                break;
        }
    }
    toOther(text){

    }
}
module.exports = Module;
