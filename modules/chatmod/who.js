class Loader {
    bot = null
    bool = false;
    echo = false;
    g;
    answer;
    Item;
    constructor(bot) {
        this.bot = bot;
        this.Item = require("prismarine-item")(bot.version);
        console.log("who core enabled");
    }
    toNick(message){
        let bot = this.bot;
        let who1 = ["Зеленый","Мудрый","Вкусный","Приятный","Злой","Добрый","Старый","Молодой","Гендерфлюидный"]
            let who2 = ["Пацанчик","Эльф","Бутерброд","Хрен","Симпл димпл","Кролик","Инопланетянин","Мадам","Вертосексуал"]
            
            let text = message
            let str = require("fs").readFileSync("qa.txt", 'utf8').split("\n")
            
            
            this.g = "";
            if(text.global) this.g = "!"
            else if(text.m) this.g = "/er "
            if(text.text.trim().toLowerCase() === this.answer && this.echo) {
                bot.chat(this.g + " Верно! +500 " + text.nick)
                bot.chat("/pay " + text.nick + " 500")
                this.echo = false
            }

            if(text.text.split(" ")[0].toLowerCase() === "спрашивай") {
                if(!message.checking(text.nick)) return;
                let rand = Math.floor(Math.random()*(str.length-1));
                console.log(rand)
                let rawtext = str[rand].split(":");
                bot.chat(this.g + " " + rawtext[0])
                this.answer = rawtext[1].trim();
                this.echo = true;
            }

            if(text.text.split(" ")[0].toLowerCase() === "кто") {
                if(text.text.split(" ")[1] == null){
                    bot.chat(this.g + "Что кто?")
                    return;
                }
                let naz = text.text.trim().replace(/кто /gi,"").split("?").join("")
                if(text.text.split(" ")[1].toLowerCase().split("?").join("") === "я")
                naz = "ты"
                if(bot.players[naz] != null || naz === "ты")
                bot.chat(this.g + "Я думаю что " + naz + " " + who1[Math.floor(Math.random()*who1.length)] + " " + who2[Math.floor(Math.random()*who2.length)])
                else
                bot.chat(this.g + "Думаю что " + naz + " у нас " + bot.players[Object.keys(bot.players)[Math.floor(Math.random()*Object.keys(bot.players).length)]].username)
            }
            if(text.text.split(" ")[0].toLowerCase() === "инфа") {
               bot.chat(this.g + "Где то " + Math.floor(Math.random()*100) + "%")
            }
            if(text.text.toLowerCase() === "подбирайка"){
                setTimeout(() => {
                  prepare("filled_map",bot,this.Item)
                },10)
            }
            async function prepare(blockName,bot,Item) {
                let mcData = require('minecraft-data')(bot.version);
                
                let item = new Item(mcData.itemsByName[blockName].id,2,3);
                console.log(item.metadata)
                await bot.creative.setInventorySlot(35, item,console.log);
                
                await bot.toss(mcData.itemsByName[blockName].id, null, 1)
        }

            

    }

    toMess(){

    }

    toOther(text){
        
    }

    end(){
        this.bool = true
    }
}
module.exports = Loader