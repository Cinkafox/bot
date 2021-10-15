class permissions{
fs = require('fs');

groupcheck(checked,botnick){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    let userobj;
    if(obj[botnick] == undefined)
        userobj = obj.default;
    else
        userobj = obj[botnick];
    if(userobj.groups[checked] !== undefined)
        return userobj.groups[checked]
    return []
}
nickcheck(checked,botnick){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    let userobj;
    if(obj[botnick] == undefined)
        userobj = obj.default;
    else
        userobj = obj[botnick];
    let ret = []
    let user = userobj.users[checked];
    if(user !== undefined) {
        ret.push(...this.groupcheck(user.group,botnick))
        ret.push(...user.permissions)
        return ret
    }
    else
        return this.groupcheck("user",botnick)
}

adduser(user,group,permissions,botnick){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    let userobj;
    if(obj[botnick] == undefined)
        userobj = obj.default;
    else
        userobj = obj[botnick];
    userobj.users[user] = {
        group:group,
        permissions:permissions
    }
    obj[botnick] = userobj;
    setTimeout(() => {
        this.fs.writeFile('permissions.json', JSON.stringify(obj), 'utf8', console.log);
    },1000)
}

addgroup(group,permissions){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    obj.groups[group] = permissions;
    setTimeout(() => {
    this.fs.writeFile('permissions.json', JSON.stringify(obj), 'utf8', console.log);
   },1000)
}
}
module.exports = permissions;