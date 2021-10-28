class Module {
    //Имя модуля ОБЯЗАТЕЛЬНО!!!!
    modname = "кто";
    woutnick = false;
    who1 = ["Зеленый","Мудрый","Вкусный","Приятный","Злой","Добрый","Старый","Молодой","Гендерфлюидный","Жирный","Худой","Мелкий","Русский","Украинский"]
    who2 = ["Пацанчик","Эльф","Бутерброд","Хрен","Симпл димпл","Кролик","Инопланетянин","Мадам","Вертосексуал","Боба","Биба","Писькогрыз","Фея","Депутат","Собака","Кальмар","Крыса","Свинья"]

    init(){
        //постиницилизация,тута и обьект бот есть
        //this.bot.chat("hello!");
    }
    toChat(text){
        let bot = this.bot;
        let message = text.MESSAGE.split(" ");

        if(message[1] == null){
            bot.chat(text.GM + "Что кто?")
            return;
        }
        let naz = text.MESSAGE.replace(/кто /gi,"").split("?").join("").trim();
        if(message[1].split("?").join("") === "я")
            naz = "ты"
        if(bot.players[naz] != null || naz === "ты")
            bot.chat(text.GM + "Я думаю что " + naz + " " + this.who1[Math.floor(Math.random()*this.who1.length)] + " " + this.who2[Math.floor(Math.random()*this.who2.length)])
        else
            bot.chat(text.GM + "Думаю что " + naz + " у нас " + bot.players[Object.keys(bot.players)[Math.floor(Math.random()*Object.keys(bot.players).length)]].username)
    }
    toOther(text){

    }
}
module.exports = Module;