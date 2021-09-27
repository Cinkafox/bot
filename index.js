const socks = require('socks').SocksClient
const minecraft = {host: "grand-play.su", port: 25565};
const proxyur = "72.206.181.105:64935"
const proxy = {host: proxyur.split(":")[0], port: Number(proxyur.split(":")[1])};
const mineflayer = require('mineflayer');
const mineflayerViewer = require('prismarine-viewer').mineflayer
const {Vec3} = require("vec3");

let normalizedPath = require('path').join(__dirname, "modules");

let bott = class {
    bot;
    name;
    deist;
    modulesmy = [];
    enableproxy = false;
    constructor(name, deist) {
        this.name = name;
        this.deist = deist;
        if(this.enableproxy === true) {
            this.bot = mineflayer.createBot({
                username: name,

                connect: (client) => {
                    socks.createConnection({
                        proxy: {
                            host: proxy.host,
                            port: proxy.port,
                            type: 5
                        },
                        command: 'connect',
                        destination: {
                            host: minecraft.host,
                            port: minecraft.port
                        }
                    }, (err, info) => {
                        if (err) {
                            console.log(err)
                            return
                        }

                        client.setSocket(info.socket)
                        client.emit('connect')
                    })
                }
            })
        }else {
            this.bot = mineflayer.createBot({
                host: minecraft.host,
                port: minecraft.port,
                username: name
            });
        }
        this.bot.on('kicked', console.log)
        this.bot.on('error', console.log)
        this.init()
    }

    init(){
        let bot = this.bot
        setTimeout(() =>{
            bot.chat(this.deist)
            setTimeout(() => {
            bot.setControlState('forward',true);
            bot.lookAt(new Vec3(-93,60,-675));
            setTimeout(() => {
                bot.setControlState('forward', false);
                this.main()
            },10000);
        },100);
        },10000)
    }

    main() {
        this.moduleload()
        let bot = this.bot;
        let name = this.name;
        let ChatParser = require('./ChatParser')
        let chat = new ChatParser()
        console.log("Я тута!")
        //mineflayerViewer(bot, { port: 8080, firstPerson: true })

        this.bot.on('message', (message) => {
               let fs = require("fs")
               //console.log(message.toString())
               let text = chat.parse(message.toString())
               if(text === undefined) return;
               console.log(name + "|" + text.text + "|" + text.nick + "|")
               if(text.text === "Релоад модули" && text.nick === "CinemaFoxProd") {
                   this.moduleload()
                   bot.chat("/m CinemaFoxProd Готово")
               }
               if(text.text.split(":")[0] === "создай" && text.nick === "CinemaFoxProd"){
                   new bott(text.text.split(":")[1],text.text.split(":")[2])
               }
               if(text.text.split(":")[0] === "Добавь" && text.nick === "CinemaFoxProd"){
                fs.appendFileSync("wl.txt","\n" + text.text.split(":")[1])
            }
            


        });


    }


    moduleload(){
        let nocache = (module) => {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})};
        let pp = [];
        let bot = this.bot;
        for (let i = 0;i<this.modulesmy.length;i++){
            this.modulesmy[i].end();
            delete this.modulesmy[i].instance
        }
        require("fs").readdirSync(normalizedPath).forEach(function(file) {
            try {
                if(file.split(".")[1] !== "js") return;
                nocache("./modules/" + file);
                let Loader = require("./modules/" + file);
                pp.push(new Loader(bot));
            }catch (e){
                bot.chat('/m CinemaFoxProd Ошибка ' + e.name + ":" + e.message)
                console.log('Ошибка ' + e)
            }

        });
        this.modulesmy = pp;
    }

}
    let bottt = new bott("Leofox","/l 12341")
    //let bot1 = new bott("Dashe4ka","/l 12341")
