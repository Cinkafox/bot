const fs = require("fs");
const path = require("path");
const normalizedPath = path.join(__dirname, "../modules");
function load(eventlistener,requestitems) {
    let templist = {}
    // nocache типа тама очищает всякий остаток,типа как за собакой говно убирает
    let nocache = (module) => {
        fs.watchFile(path.resolve(module), () => {
            delete require.cache[require.resolve(module)]
        })
    };
    fs.readdirSync(normalizedPath).forEach(function (file) {
        try {
            //если файл не расширения js то пойдет нахуй!
            if (file.split(".")[1] !== "js") return;
            nocache("../modules/" + file);
            let Module = require("../modules/" + file);
            let classtemp = new Module();
            //суем в модуль все необходимое говно! типа сам бот
            classtemp = Object.assign(classtemp,requestitems);
            //постиницилизация с блек джеком и ботами
            classtemp.init();
            templist[classtemp.modname] = classtemp;
        } catch (e) {
            //ой блять тут обосрались
            eventlistener('Ошибка ' + e.name + ":" + e.message)
            console.log('Ошибка ' + e)
        }
    });
    return templist;
}
module.exports.load = load;