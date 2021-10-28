const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const {Vec3} = require("vec3");
class Module {
    modname = "следуй";
    woutnick = false;
    mcData
    defaultMove
    go = false;
    init(){
    this.bot.loadPlugin(pathfinder);
        this.mcData = require('minecraft-data')(this.bot.version)
        this.defaultMove = new Movements(this.bot, this.mcData)
        }
    toChat(text){
        if(text.MESSAGE.split(" ").length < 1) return;
        let target = this.bot.players[text.MESSAGE.split(" ")[1].trim()].entity
        if (!target) {
            this.bot.chat(text.GM + "Не вижу его!");
            return;
        }
        let delta = this.bot.entity.position.offset(-target.position.x,-target.position.y,-target.position.z).floor();
        let lastblock =this.traceblock(this.bot.entity.position.offset(-delta.x,-delta.y+1,-delta.z), target.position,this.bot.world);
        console.log(lastblock);
        if(lastblock !== "air") {
            //return;
        }
        const { x: playerX, y: playerY, z: playerZ } = target.position
        this.bot.pathfinder.setMovements(this.defaultMove)
        this.bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1))
    }
    toOther(text){

    }
    traceblock(pos1,pos2,world){
        let { x: x1, y: y1, z: z1 } = pos1;
        let { x: x2, y: y2, z: z2 } = pos2;
        pos1 = [Math.floor(x1),Math.floor(z1)];
        pos2 = [Math.floor(x2),Math.floor(z2)];

        let check = (x,y) =>{
            return world.getBlock(new Vec3(x,y1,y)).name;
        }

        let dx = pos2[0] - pos1[0];
        let dy = pos2[1] - pos1[1];
        let sx = 0
        let sy = 0

        if(dy<0) sy = -1;
        if(dy>0) sy = 1;
        if(dx<0) sx = -1;
        if(dx>0) sx = 1;

        let pdx,pdy,el,es = 0;
        if(dx > dy){
            pdx = sx;
            pdy = 0;
            es = dy;
            el = dx;
        }else {
            pdx = 0;
            pdy = sy;
            es = dx;
            el = dy;
        }
        let x = pos1[0];
        let y = pos1[1];
        let error = el/2;
        let t = 0;
        let temp = check(x,y)
        if(temp !== "air") return temp;
        while (t < el){
            error -= es;
            if(error < 0){
                error += el
                x += sx;
                y += sy;
            }else {
                x += pdx;
                y += pdy;
            }
            t++;
            let temp = check(x,y)
            if(temp !== "air") return temp;
        }
        return "air";
    }
}
module.exports = Module;
