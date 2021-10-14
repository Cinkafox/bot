class Loader {
    bot = null
    bool = false;
    echo = false;
    nick;
    schematic = null;
    constructor(bot) {
        this.bot = bot;
        console.log("Doing core enabled");
        async function b(){
            let fs = require('fs').promises
            let {Schematic} = require('prismarine-schematic');
            let schematic = await Schematic.read(
                await fs.readFile('17043.schem')
                );  
                schematic.forEach((block,pos) => {
                   //console.log(pos);
                })    
            return schematic;    
        }
        this.schematic = b()
    }
    toNick(text){
        let bot = this.bot;
     if(text.checking(text.nick).indexOf("do") == -1)return;
    if(text.text.split(":")[0] === "Напиши" && text.nick !== "->") {
        bot.chat(text.text.split(":")[1])
            if(text.text.split(":")[1].split("")[0] === "/")
        this.echo = true;
        this.nick = text.nick;

    }

    async function give(blockName) {
        let equipBlock = bot.inventory.findInventoryItem(blockName);
        if (!equipBlock) {
            bot.chat("Нема извиняй!")
        }
        //await bot.equip(equipBlock, 'hand');
        await bot.toss(mcData.itemsByName[blockName].id, null, 1,console.log)

    }
    if(text.text.trim() === "Check") {
        console.log(this.schematic)
        
    
    }
}
    toMess(text){
       
}
    toOther(text){
        
        if(this.echo){
            this.bot.chat('/m ' + this.nick + " " + text);
            this.echo = false;      
        }        
}
    end(){
        this.bool = true
    }
}
module.exports = Loader