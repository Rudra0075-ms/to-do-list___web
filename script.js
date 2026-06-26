const taskInput=document.getElementById("taskInput");

const addBtn=document.getElementById("addBtn");

const taskList=document.getElementById("taskList");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function renderTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        const details=document.createElement("div");

        details.className="task-details";

        if(task.completed){

            details.classList.add("completed");

        }

        details.innerHTML=`
        <strong>${task.text}</strong>
        <small>${task.date}</small>
        `;

        details.onclick=()=>{

            tasks[index].completed=!tasks[index].completed;

            saveTasks();

            renderTasks();

        };

        const del=document.createElement("button");

        del.innerHTML="🗑";

        del.className="delete";

        del.onclick=()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

        };

        li.appendChild(details);

        li.appendChild(del);

        taskList.appendChild(li);

    });

}

function addTask(){

    const text=taskInput.value.trim();

    if(text===""){

        alert("Please enter a task");

        return;

    }

    const date=new Date().toLocaleString();

    tasks.push({

        text,

        date,

        completed:false

    });

    saveTasks();

    renderTasks();

    taskInput.value="";

}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        addTask();

    }

});

renderTasks();
