const path = require('path')
const fs = require('fs').promises
const { builder, Build } = require('mineflayer-builder')
const { Schematic } = require('prismarine-schematic')
const { pathfinder } = require('mineflayer-pathfinder')
const { Vec3 } = require('vec3')
let Item;
let mcData;
class Module {
    modname = "строй";
    woutnick = false;
    wait (ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
    init(){
        mcData = require('minecraft-data')(this.bot.version)
        Item = require('prismarine-item')(this.bot.version)
        this.bot.loadPlugin(pathfinder);
        this.bot.loadPlugin(builder);
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
            const build = new Build(schematic, this.bot.world, at)
            await this.bot.builder.build(build)
        }
        asu();
        console.log("test")
    }
    toOther(text){

    }
}
module.exports = Module;