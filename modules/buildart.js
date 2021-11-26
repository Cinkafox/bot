const path = require('path')
const fs = require('fs').promises
const { Schematic } = require('prismarine-schematic')
const { Vec3 } = require('vec3')
let Item;
let mcData;
class Module {
    modname = "арт";
    woutnick = false;
    wait (ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
    init(){
        mcData = require('minecraft-data')(this.bot.version)
        Item = require('prismarine-item')(this.bot.version)
    }
    toChat(text){
        let indexes = text.MESSAGE.split(" ");
        console.log(indexes[1] + Number(indexes[2]));
        let asu = async () => {
            this.bot.chat("/gm 1")
            const schematic = await Schematic.read(await fs.readFile(path.resolve(__dirname, '../schematics/' + indexes[1] + '.schematic')), this.bot.version)
            while (!this.bot.entity.onGround) {
                await this.wait(100)
            }
            const at = this.bot.entity.position.floored();
            console.log(this.bot.entity.position.offset(1, -1, 0))
            await this.bot.creative.flyTo(at.offset(Number(indexes[2]), 2, 0))
            for (let x = schematic.start().x + 1 + Number(indexes[2]); x < schematic.end().x; x++) {
                if ((x + 1) % 2 === 0) {
                    for (let z = schematic.start().z; z < schematic.end().z; z++) {
                        if ((z + 4) % 4 === 0)
                            await this.bot.creative.flyTo(at.offset(x+1, 2, z));
                        let blockName = schematic.getBlock(new Vec3(x, 2, z)).name
                        if (blockName === "air") continue;
                        let equipBlock = this.bot.inventory.findInventoryItem(blockName);
                        if (!equipBlock) {
                            let item = new Item(mcData.itemsByName[blockName].id, 1);
                            await this.bot.creative.setInventorySlot(36, item);
                            equipBlock = this.bot.inventory.findInventoryItem(blockName);
                        }
                        await this.bot.equip(equipBlock, 'hand');
                        let cht =  x/128*100;
                        process.stdout.write("\r" + blockName + "Заверш:" + Math.floor(cht) + "%");
                        this.bot._client.write('arm_animation', {hand: 0});
                        await this.bot._genericPlace(this.bot.blockAt(at.offset(x, -1, z)), new Vec3(0, 1, 0), {})
                    }
                } else {
                    for(let z=schematic.end().z;z>=schematic.start().z;z--){
                        if ((z + 4) % 4 === 0)
                            await this.bot.creative.flyTo(at.offset(x+2.5, 1.5, z-3));
                        let blockName = schematic.getBlock(new Vec3(x, 2, z)).name
                        if (blockName === "air") continue;
                        let equipBlock = this.bot.inventory.findInventoryItem(blockName);
                        if (!equipBlock) {
                            let item = new Item(mcData.itemsByName[blockName].id, 1);
                            await this.bot.creative.setInventorySlot(36, item);
                            equipBlock = this.bot.inventory.findInventoryItem(blockName);
                        }
                        await this.bot.equip(equipBlock, 'hand');
                        let cht =  x/128*100;
                        process.stdout.write("\r" + blockName + "Заверш:" + Math.floor(cht) + "%");
                        this.bot._client.write('arm_animation', {hand: 0});
                        await this.bot._genericPlace(this.bot.blockAt(at.offset(x, -1, z)), new Vec3(0, 1, 0), {})
                    }
                }
            }
        }
        asu();
    }
    toOther(text){

    }
}
module.exports = Module;

