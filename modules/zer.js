let Item;
let mcData;
let { Vec3 } = require("vec3");
class Module {
    modname = "зеркало";
    woutnick = false;
    enable = false
    nick
    pos = new Vec3(0,0,0);
    lastpos = this.pos;
    init(){
        mcData = require('minecraft-data')(this.bot.version)
        Item = require('prismarine-item')(this.bot.version)
    }
    toChat(text){
        if(text.GM === "!") return
        this.pos = new Vec3(0,0,0);
        console.log(text.NICK)
        this.nick = this.bot.players[text.NICK.trim()];
        let temp = this.pos.offset(this.nick.entity.position.x,this.nick.entity.position.y,this.nick.entity.position.z).floor()
        this.pos = this.pos.plus(temp);
        this.bot.chat("/gm 1")
        this.enable = !this.enable
        let tt = async (e) => {
            if (this.nick.username === e.username) {
                await this.bot.once("blockUpdate", async (o, n) => {
                    await this.pl(o, n)
                })
            }
        }
        if(this.enable) {
            this.bot.on("entitySwingArm",tt)
        }else {
            this.bot.off("entitySwingArm",tt)
        }
    }
    toOther(text){

    }

    async pl (o,n){
        if(!this.enable) return;
        if(this.lastpos.minus(n.position).x === 0 && this.lastpos.minus(n.position).y === 0 && this.lastpos.minus(n.position).z ===0) return;
        console.log("start");
        let plLocal = this.nick.entity.position.minus(this.pos);
        let blLocal = n.position.minus(this.pos);
        let dest = this.pos.offset(-plLocal.x, plLocal.y, plLocal.z)
        let bdest = this.pos.offset(-blLocal.x, blLocal.y, blLocal.z).floor()
        await this.bot.creative.flyTo(dest);
        if(n.name === "air") return;
        let equipBlock = this.bot.inventory.findInventoryItem(n.name);
        if (!equipBlock) {
            let item = new Item(mcData.itemsByName[n.name].id, 1);
            await this.bot.creative.setInventorySlot(36, item);
            equipBlock = this.bot.inventory.findInventoryItem(n.name);
        }
        await this.bot.equip(equipBlock, 'hand');
        this.bot._client.write('arm_animation', {hand: 0});
        await this.bot._genericPlace(this.bot.blockAt(bdest.offset(0,-1,0)), new Vec3(0, 1, 0), {})
        this.lastpos = bdest;
        console.log("end")
    }
}
module.exports = Module;
