const fs = require('fs');
let nick;
//опа права епта!
let setNick = (nick1) => {nick = nick1};
let readFile = () => {
    //читаем что в джончике!
    let obj = JSON.parse(fs.readFileSync('permissions.json'));
    if(obj[nick] == null) return obj.default;
    return obj[nick];
}
let writeFile = (obj) => {
    let objo = JSON.parse(fs.readFileSync('permissions.json'));
    objo[nick] = obj;
    setTimeout(() => {
        //пишем хуйню
        fs.writeFileSync("permissions.json",JSON.stringify(objo));
    },300)
}
let readUser = (nick) => {
    let obj = readFile();
    let player = obj.users[nick];
    if(player == null) player = obj.users.default;
    return player.perms.concat(readGroup(player.group).perms);
}
let readGroup = (group) => {
    let obj = readFile();
    let Grp = obj.groups[group];
    if(Grp == null) Grp = obj.groups.nil
    if(Grp.parent !=null)
    Grp.perms = Grp.perms.concat(readGroup(Grp.parent).perms);
    return Grp;
}

let writeUser = (nick, group = "user", perms = []) => {
    let obj = readFile();
    obj.users[nick] = {
        group: group,
        perms: perms
    }
    writeFile(obj)
}

let check = (arr,elem) =>{
    return (arr.indexOf(elem) !== -1);
}
module.exports.setBotNick = setNick;
module.exports.readGroup = readGroup;
module.exports.readUser = readUser;
module.exports.writeUser = writeUser;
module.exports.check = check;
