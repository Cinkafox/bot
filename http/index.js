let pos = 0;
let textarea = document.getElementById('text');
let ppp = document.getElementById('cheeee');
ppp.height = document.body.height;
let ch = () => {
  ppp.innerText = ""
  for (var i =0;i<textarea.value.split("\n").length;i++) {
    ppp.innerText = ppp.innerText + i + "\n";
  }
}
ch()
document.addEventListener('keyup',(s) => {
  if(s.key !== "Backspace" && s.key !== "Shift"){
      check(textarea.value.split(""),"(",")","");
      check(textarea.value.split(""),"{","}"," \n  \n")
}
  pos = textarea.selectionStart;
  ch()
});
let check = (str,start,end,ee) => {
  textarea.rows = textarea.value.split("\n").length;
  let i1 = 0;
  for(let i =0;i<str.length;i++){
    if(str[i] === start) i1++
    if(str[i] === end) i1--
  }
  console.log(i1);
  if(i1 > 0){
    textarea.value = textarea.value.substring(0,textarea.selectionStart) + ee + end + textarea.value.substring(textarea.selectionStart,textarea.value.length);
    
    console.log("||||" + textarea.selectionStart)
    textarea.selectionStart=pos+ee.length;
    textarea.selectionEnd=pos+ee.length;
    check(textarea.value.split(""));
  }
}
