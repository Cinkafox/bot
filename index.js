const socks = require('socks').SocksClient
const minecraft = {host: "grand-play.su", port: 25565};
const proxyur = "72.206.181.105:64935"
const proxy = {host: proxyur.split(":")[0], port: Number(proxyur.split(":")[1])};
const mineflayer = require('mineflayer');
const mineflayerViewer = require('prismarine-viewer').mineflayer
const {Vec3} = require("vec3");

let normalizedPath = require('path').join(__dirname, "modules");

let bots = [];

let bott = class {
    bot;
    name;
    deist;
    log;
    modulesmy = [];
    //enableproxy если true то будет использованна прокси
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
        this.bot.on('kicked', (message) => {
           console.log(message)
           if(message === '{"text":"Вы были кикнуты за нахождение более 6 минут в AFK."}')
          {
            
          }
        })
        this.bot.on('error', console.log)
        this.bot.on('end',() => {
            for (let i = 0;i<this.modulesmy.length;i++){
                this.modulesmy[i].end();
                delete this.modulesmy[i].instance
            }
            console.log(bots.indexOf(this));
            bots.splice(bots.indexOf(this));
        })
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
        },500);
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
        //в чем плюс 28 летних девушек? их 20!
         
        let fun = (message) => {
            let fs = require("fs")
            this.log = this.log + message.toString() + " {sl}";
            let text = chat.parse(message.toString())
            if(text === undefined) return;
            console.log(name + "|" + text.text + "|" + text.nick + "|")
            if(text.text === "Релоад модули" && (text.checking(text.nick).indexOf("*") != -1)){
                this.moduleload()
                bot.chat("/m CinemaFoxProd Готово")
            }
            if(text.text.split(":")[0] === "создай" && (text.checking(text.nick).indexOf("*") != -1)){
                bots.push(new bott(text.text.split(":")[1],text.text.split(":")[2]))
            }
            if(text.text.split(":")[0] === "Добавь" && (text.checking(text.nick).indexOf("*") != -1)){
             fs.appendFileSync("wl.txt","\n" + text.text.split(":")[1])
         }
         


     }
        this.bot.on('message', fun);



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

    getbot(){
        return this.bot;
    }
}

const http = require("http");
const fs = require("fs");
//let bottt = new bott("Nick","/l 12341")

const host = {
    host:'localhost',
    port:8080
}

let type = {
    html:"text/html",
    css:"text/css",
    js:"text/js",
    png:"image/png"
}

let primer = fs.readFileSync("./http/onebot.html").toString();

const requestListener = function (req, res) {
    try{
        let data;
    switch(req.url.trim().toLowerCase().split("/")[1]){
        case "":
            data = fs.readFileSync('./http/index.html');
            let biba;
            bots.forEach(element => {
                if(biba != undefined){
                biba = biba + primer.split("{bot}").join(element.name) + "\n";
                }else{
                    biba = primer.split("{bot}").join(element.name) + "\n";
                }
            });
            let test = data.toString().split("{begining}").join(biba);
            res.setHeader("Content-Type", type["html"]);
            res.writeHead(200);
            res.end(test);
            break;
        case "bot":
            let bot;
            let index = req.url.trim().toLowerCase().split("/")[2];
            bots.forEach(element => {
                if(element.name.toLowerCase() === index){
                    bot = element
                }
            })
            if(bot == undefined){
                res.writeHead(404);
                res.end("Not found bot!");
                return;
            }
            let log;
            if(bot.log == undefined){
                res.setHeader("Content-Type", type["html"]);
                res.writeHead(404);
                res.end("Не готово пока");
                return
            }
            bot.log.split("{sl}").forEach(element => {
                if(log == undefined)
                log = "<h3>" + element + "</h3> \n"
                else
                log = log + "<h3>" + element + "</h3> \n"
            });

            if(req.url.trim().toLowerCase().split("/")[3] === "raw"){
                res.setHeader("Content-Type", type["html"]);
                 res.writeHead(200);
                res.end(log);
                return;
            }
            data = fs.readFileSync('./http/console.html').toString().split("{log}").join(log).split("{botname}").join(bot.name);
            
            res.setHeader("Content-Type", type["html"]);
            res.writeHead(200);
            res.end(data);
            break;
        case "command":
            let boti;
            let indexi = req.url.trim().toLowerCase().split("/")[2];
            bots.forEach(element => {
                if(element.name.toLowerCase() === indexi){
                    boti = element
                }
            })
            if(boti == undefined){
                res.writeHead(404);
                res.end("Not found bot!");
                return;
            }
            if(req.method == 'GET'){
            res.setHeader("Content-Type", type["html"]);
            res.writeHead(200);
            res.end("Тебе сюды не надо!");
            }else{
                let body = '';
                req.on('data', chunk => {
                   body += chunk.toString();
                 });
                req.on('end', () => {
                    console.log(body);
                    let params = {
                        command:body.split("&")[0].split("=")[1],
                    };
                    boti.bot.chat(decodeURIComponent(params.command).split("+").join(" "));
                    res.end('ok');
                });
            }
            break;
        case "create":
            if(req.method == 'GET'){
            data = fs.readFileSync('./http/botcreate.html');
            
            res.setHeader("Content-Type", type["html"]);
            res.writeHead(200);
            res.end(data);
            }else{
                let body = '';
                req.on('data', chunk => {
                   body += chunk.toString();
                 });
                req.on('end', () => {
                    console.log(body);
                    let params = {
                        nick:body.split("&")[0].split("=")[1],
                        do:body.split("&")[1].split("=")[1]
                    };
                    console.log(params.nick + "|" + params.do.split("+").join(" "));
                    bots.push(new bott(params.nick,"/" + params.do.split("+").join(" ")))
                    res.end('ok');
                });
            }
            break;
        default:        
            data = fs.readFileSync('./http' + req.url);
            res.setHeader("Content-Type", type[req.url.split(".")[req.url.split(".").length -1]]);
            res.writeHead(200);
            res.end(data);
            break;
    }
    }catch(e){
        res.writeHead(404);
        res.end("Pizdec");
        console.log("|" + req.url.trim().toLowerCase() + "|" + e)
    }
};

const server = http.createServer(requestListener);
server.listen(host.port, host.host, () => {
    console.log(`Server is running on http://${host.host}:${host.port}`);
});