class ChatParser{
    bypass = false;
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
            return {text: mess.trim(), nick: nick.trim(), global: global,m:false,function:bypassfun}
        }else if(message.split("")[0].trim() === '['){
            array = message.trim().split("]");
            nick = array[0].split(" ")[1]
            mess = array[1];
            return {text: mess.trim(), nick: nick.trim(), global: false,m:true,function:bypassfun}
        }
        }catch (e){
            return;
        }
    }

}
module.exports = ChatParser