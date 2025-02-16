function abc(){
    var inp = document.getElementById("add-task").value;
    var div2=document.getElementById("ul")
var out =document.createElement("li");
out.innerHTML=inp +'<button class="del" onclick="del(event)">Delete</button>' +'<button class="com">Complete</complete>'; 
div2.append(out);
document.getElementById("add-task").value = '';
}
function del (event){
   event.target.parentElement.remove()
}
function com(){
    
}