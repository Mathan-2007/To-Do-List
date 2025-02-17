function abc(){
    var inp = document.getElementById("add-task").value;
    var date=document.getElementById("date").value;
    if(inp==''||date==''){
        alert("please enter new task and date")}
    else{
    var div2=document.getElementById("ul")
var out =document.createElement("tr");
out.innerHTML='<td class="tablee">'+inp +'</td id="d">'+'<td>'+date+'</td>'+'<td id="td2">'+'<button class="del" onclick="del(event)">Delete</button>'+'</td>'+'<td id="td3">'+'<button  class="com" onclick="com(event)">Complete</button>'+'</td>'; 
div2.append(out);
document.getElementById("add-task").value = '';
    date='';}
}
function del (event){
   event.target.parentElement.parentElement.remove()
}
function com(event){
   
    var task = event.target.parentElement.parentElement;
    task.style.textDecoration = "line-through"; 
    
}
function cl(){

}
