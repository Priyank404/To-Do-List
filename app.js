const input=document.querySelector("#newTask");
const button=document.querySelector("#addButton");
const list=document.querySelector(".taskList");

let task=[];

function addTask(){
    const taskText=input.value.trim();
    if(taskText){
        task.push({Text:taskText,completed:false});
        // console.log(task);
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
        li.addEventListener("click",()=>toggleTaskCompletion(index));
        const deleteButton=document.createElement("button");
        deleteButton.innerText="delete";
        deleteButton.style.marginLeft="50px";
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click",(e)=>{
            e.stopPropagation();
            deleteTask(index);
        })
        
        li.appendChild(deleteButton);
        list.appendChild(li);
    })
}

function toggleTaskCompletion(index){
    task[index].completed=!task[index].completed;
    displayTask();
    saveTask();
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
window.addEventListener("load",loadTask);

function deleteTask(index){
    task.splice(index,1);
    displayTask();
    saveTask();
}
