//Ебанный реджекс! мучался пол дня этим!
const regex = /«(?<G>.*)» \| (.(.*?).){0,1} .(.*?). (?<Nick>.*?) ➥ (?<Chat>.*)|\[.*? (?<NickL>.*?) -> я\] (?<ChatL>.*)/gm;
//какой знак у глобала тама,и у локального сообщения
let global = "Ⓖ";
let parse = (rawtext) => {
    let m = rawtext.matchAll(regex)
    m = Array.from(m)[0];
    if(m == null) return;
    if(m.groups["G"] == null)
        return {G:'M',NICK:m.groups["NickL"],MESSAGE:m.groups["ChatL"],GM:'/er '} //возращаем то что было в лс
    let G = "L";
    let GM = "";
    if(m.groups["G"] === global){ G = "G"; GM = "!"}
    return {G:G,NICK:m.groups["Nick"],MESSAGE:m.groups["Chat"].trim(),GM:GM}
    //G - global L - local M - message
    //GM типа для чата тама типа если локал то /er если глобал то !


}
module.exports.parse = parse;