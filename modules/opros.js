class Module {
    //Имя модуля ОБЯЗАТЕЛЬНО!!!!
    modname = "опрос";
    //типа ток с упоминанием или ваще в чате
    woutnick = false;
    bool = false;
    arr = []
    vivod = {};
    init(){
        //постиницилизация,тута и обьект бот есть
        //this.bot.chat("hello!");
    }
    toChat(text){
        let splited = text.MESSAGE.split(" ");
        let col
        try{
            col = Number(splited[1])
        }catch {
            return;
        }
        this.arr = splited.splice(2,splited.length).join(" ").split(" или ");
        console.log(this.arr)
        this.arr.forEach((elem)=>{
            this.vivod[elem] = -1;
        })
        this.bool = true;
        setTimeout(()=>{this.bool = false;
            let temp = ""
            this.arr.forEach((elem) =>{
            temp = temp + elem + " - " + this.vivod[elem] + " "
            })
            console.log(temp);
            this.bot.chat(text.GM + "Выводы у нас " + temp)},col*1000);
    }
    toOther(text){
        if(!this.bool) return;
        this.arr.forEach((elem) => {
            if(text.toLowerCase().indexOf(elem) !== -1){
                console.log(elem);
                this.vivod[elem] = this.vivod[elem] + 1;
            }
        })
    }
}
module.exports = Module;
