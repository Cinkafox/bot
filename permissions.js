class permissions{
fs = require('fs');

groupcheck(checked){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    if(obj.groups[checked] !== undefined)
        return obj.groups[checked]
    return []
}
nickcheck(checked){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    let ret = []
    let user = obj.users[checked];
    if(user !== undefined) {
        ret.push(...this.groupcheck(user.group))
        ret.push(...user.permissions)
        return ret
    }
    else
        return this.groupcheck("user")
}

adduser(user,group,permissions){
    let obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));
    obj.users[user] = {
        group:group,
        permissions:permissions
    }
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