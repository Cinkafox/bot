class permissions{
fs = require('fs');
obj = JSON.parse(this.fs.readFileSync('permissions.json', 'utf8'));

groupcheck(checked){
    if(this.obj.groups[checked] !== undefined)
        return this.obj.groups[checked]
    return []
}
nickcheck(checked){
    let ret = []
    let user = this.obj.users[checked];
    if(user !== undefined) {
        ret.push(...this.groupcheck(user.group))
        ret.push(...user.permissions)
        return ret
    }
    else
        return this.groupcheck("user")
}

adduser(user,group,permissions){
    this. obj.users[user] = {
        group:group,
        permissions:permissions
    }
    this.fs.writeFile('permissions.json', JSON.stringify(this.obj), 'utf8', console.log);
}

addgroup(group,permissions){
    this.obj.groups[group] = permissions;
    this.fs.writeFile('permissions.json', JSON.stringify(this.obj), 'utf8', console.log);
}
}
module.exports = permissions;