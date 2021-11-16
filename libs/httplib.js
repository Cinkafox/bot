const http = require('http');
const fs = require('fs');
const path = require("path");
const normalizedPath = path.join(__dirname, "../modules");
let bot;
let getbot = (bot1) =>{
    bot=bot1;
}
let botarr = {};
let logs = {};
const type = {
    html:"text/html",
    css:"text/css",
    js:"text/js",
    png:"image/png",
}
let host = '0.0.0.0';
const port = process.env.PORT || 80;

const requestListener = function (req, res) {
    let index = req.url.split("/");
    if (req.method === 'GET') {
        let data;
        let temp;
        let ch = 200;
        //console.log(index)
        switch (index[1]){
            case "":
                data = fs.readFileSync('./http/index.html').toString();
                temp = "";
                Object.keys(botarr).map(function(objectKey, index) {
                    temp = temp + "<p id=\"silka\" onclick='window.location.href = \"/bot/" + botarr[objectKey].bot_nick + "\"'>" + botarr[objectKey].bot_nick +"</p> \n";
                });
                let mods = "";
                fs.readdirSync(normalizedPath).forEach(function (file) {
                    let files = file.split(".")[0]
                    mods = mods + "<p id=\"silka\" onclick='window.location.href = \"/edit/" + files + "\"'>" + files +"</p> \n";
                });
                res.setHeader("Content-Type", type["html"]);
                res.writeHead(ch);
                res.end(data.split("{bots}").join(temp).split("{list}").join(mods));
                break;

            case "bot":
                data = "bot not found";
                if(botarr[index[2]] !== undefined){
                    if(index[3] === "raw")
                        data = botarr[index[2]].logs
                    else
                        data = fs.readFileSync('./http/control.html').toString().split("{Botname}").join(botarr[index[2]].bot_nick);
                }else if(logs[index[2]] !== undefined){
                    data = "<meta charset=\"UTF-8\" /> \n" + logs[index[2]];
                }else
                    ch = 404
                res.setHeader("Content-Type", type["html"]);
                res.writeHead(ch);
                res.end(data);
                break;
            case "edit":
                try{
                    temp = fs.readFileSync('./modules/' + index[2] + ".js").toString();
                }catch{
                    temp = fs.readFileSync('./modtemplate/modtemplate.js').toString();
                }
                data = fs.readFileSync("./http/coding.html").toString().split("{code}").join(temp).split("{name}").join(index[2]);
                res.setHeader("Content-Type", type["html"]);
                res.writeHead(ch);
                res.end(data);
                break;

            default:
                try {
                    data = fs.readFileSync('./http' + req.url);
                } catch {
                    data = "Not found"
                }
                if(type[req.url.split(".")[req.url.split(".").length - 1]] !== undefined)
                    res.setHeader("Content-Type", type[req.url.split(".")[req.url.split(".").length - 1]]);
                else
                    ch = 404;
                res.writeHead(ch);
                res.end(data);
                break;
        }
    }else {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let response = (JSON.parse(body))
            console.log(response);

                if (response.newbot !== undefined){
                    console.log(response.newbot);
                    let tempbot = new bot(response.newbot);
                    tempbot.bot.once('end',() => {
                        logs[response.newbot] = botarr[response.newbot].logs;
                        delete botarr[response.newbot];
                    });
                    botarr[response.newbot] = tempbot}
                if(response.command !== undefined && response.name !== undefined){
                    if(botarr[response.name] !== undefined){
                        if(response.command[0]==="#")
                            botarr[response.name].onChat("[Mr. Console -> я] " + response.command.split("#").join(""))
                        else
                            botarr[response.name].bot.chat(response.command)
                    }
                }
                if(response.saving !== undefined && response.savename !==undefined){
                    fs.writeFileSync("./modules/" + response.savename + ".js",response.saving);
                }
            res.end('ok');
        });
    }
};





const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`робит на http://${host}:${port}`);
});

module.exports = getbot;