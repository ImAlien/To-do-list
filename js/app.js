// CODE EXPLAINED channel
console.log(2);
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
console.log(1);

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let LIST = [], id = 0;
// get item from local 
let data  = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else{
    LIST = [];
    id  = 0;
}
function loadList(array){
    for (x of array){
        addToDo(x.name, x.id, x.done, x.trash);
    }
}
// add item to local
//add to do function

function addToDo(toDo,id, done, trash){
    if(trash) return;
    const DONE = done? CHECK : UNCHECK;
    const LINE = done? LINE_THROUGH : "";
    const text = `
            <li class="item">
                <i class="fa ${DONE} co" job="complete" id = ${id}></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id= ${id}></i>
            </li>
    `
    const position = "beforeend";
    list.insertAdjacentHTML(position,text);
}
document.addEventListener("keyup",function(even){
    //console.log(even.key);
    if(even.key == "Enter"){
        const toDo = input.value;
        console.log(toDo);
        if(toDo){
            addToDo(toDo,id, false, false);
            LIST.push({
                name: toDo,
                id : id,
                done: false,
                trash: false
            });
            id++;
        }
        localStorage.setItem("TODO",JSON.stringify(LIST));
        input.value="";
    }
});

//complete to do

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// 
list.addEventListener("click",function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else{
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
});
// clear localStorage

clear.addEventListener("click",function(event){
    localStorage.clear();
    location.reload();
})