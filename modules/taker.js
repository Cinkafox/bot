const ChatParser = require("../ChatParser");

class Loader {
    bot = null
    bool = false;
    constructor(bot) {
        this.bot = bot
        console.log("taker core enabled!");
        this.ini()
    }
    ini(){
        let bot= this.bot;
        let ChatParser = require('../ChatParser');
        let chat = new ChatParser();
        let prin = (message) => {
            if(this.bool)
                this.bot.off('message',prin);
            this.taker(message.toString())


        }
        bot.on('message',prin);

    }
    end(){
        this.bool = true
    }
    taker(response){
        let bot = this.bot;
        let mcData = require('minecraft-data')(bot.version);;
        async function give(blockName) {
            let equipBlock = bot.inventory.findInventoryItem(blockName);
            if (!equipBlock) {
                bot.chat("Нема извиняй!")
            }
            //await bot.equip(equipBlock, 'hand');
            await bot.toss(mcData.itemsByName[blockName].id, null, 1,console.log)

        }
        let arr =response.split("получено от игрока");
        if(arr.length > 1) {
            if(arr[0] !== "$10 ")
                this.bot.chat("! " + arr[1].split(" ")[2].split(".").join("") + " спс за " + arr[0].split(".").join(" целых ").split("$").join("") + " Денге" );
            else
                give('potion');

        }
    }
}
module.exports = Loader