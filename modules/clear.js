const { Vec3 } = require("vec3");

class Module {
    modname = "чисти";
    woutnick = false;
    init(){
       
    }
    toChat(text){
        this.bot.chat("/gm 1");
        let indexes = text.MESSAGE.split(" ");
        let from = this.bot.entity.position.floored();
        let to = new Vec3(indexes[1].split(',')[0],indexes[1].split(',')[1],indexes[1].split(',')[2]);
        let deist = async () =>{
            await this.bot.creative.flyTo(from.offset(0,to.y+2,0));
            for(let y = to.y;y>=0;y--){
                for(let x = 0;x<to.x;x++){
                  for(let z = 0;z<to.x;z++){
                        let block = this.bot.blockAt(from.offset(x,y-1,z));
                        if(block === null || block.name === "air") continue;
                        //if ((z + 4) % 4 === 0)
                        await this.bot.creative.flyTo(from.offset(x,y,z));
                        process.stdout.write("\r" + block.name);
                        await this.bot.dig(block,true,new Vec3(0,1,0));
                    }
            }
        }}
        deist();
    }
    toOther(text){

    }
}
module.exports = Module;
