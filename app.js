const input=document.querySelector("#newTask");
const button=document.querySelector("#addButton");
const list=document.querySelector(".taskList");

let task=[];

function addTask(){
    const taskText=input.value;
    if(taskText){
        task.push({Text:taskText,completed:false});
        input.value="";
    }
    displayTask();
    saveTask();
}

function displayTask(){
    list.innerText="";
    task.forEach((task,index)=>{
        const li=document.createElement("li");
        li.innerText=task.Text;
        if(task.completed){
         li.classList.add("completed")   
        }
        li.addEventListener("click",()=>toggleTaskCompltion(index));
        list.appendChild(li);
    })
}

function toggleTaskCompltion(index){
    task[index].completed=!task[index].completed;
    displayTask()
}

function saveTask(){
    localStorage.setItem("task",JSON.stringify(task));
}

function loadTask(){
    const storageTask=JSON.parse(localStorage.getItem("task"));
    if(storageTask){
        task=storageTask;
        displayTask();
    }
}

button.addEventListener("click",addTask);
window.addEventListener("load",loadTask)

