class ChatParser{
    bypass = false;
    check(Nick){
            let data = require("fs").readFileSync("wl.txt", 'utf8')
            
            let date = data.split("\n")
            for(let i = 0;i<date.length;i++){
                console.log("|" + date[i].trim() + "|" + Nick + "|")
                if(date[i].trim() === Nick) return true;             
            }
            return false;
          
        
    }
    parse(message){
        let bypassfun = (timeout) => {
            this.bypass = true;
            setTimeout(() =>{this.bypass = false},Number(timeout))
        }

        try {
            if(this.bypass) return console.log("bypass");
            let array;
            let nick;
            let mess;
            let srav = message.split('❤').join("").trim().split("")[0].trim()
        if(srav === '«') {
            let global = false;
            array = message.split("➥");
            nick = array[0].split(" ")[array[0].split(" ").length - 2]
            mess = array[1];
            if (array[0].split('❤').join("").trim().split(" ")[0].trim() === "«Ⓖ»")
                global = true;
            return {text: mess.trim(), nick: nick.trim(), global: global,m:false,function:bypassfun,checking:this.check,orig:mess.trim()}
        }else if(message.split("")[0].trim() === '['){
            
            array = message.trim().split(" -> я] ");
            nick = array[0].split(" ")[1]
            mess = array[1];

            return {text: mess.trim(), nick: nick.trim(), global: false,m:true,function:bypassfun,checking:this.check,orig:mess.trim()}
        }
        }catch (e){
            return;
        }
    }



}
module.exports = ChatParser