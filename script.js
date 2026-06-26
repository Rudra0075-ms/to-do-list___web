const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");
const prioritySelect = document.getElementById("priority");

const counter = document.getElementById("counter");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {

    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    counter.innerHTML =
        `Total: ${tasks.length} | Completed: ${completed} | Pending: ${pending}`;
}

function sortTasks() {

    const order = {
        High:1,
        Medium:2,
        Low:3
    };

    tasks.sort((a,b)=>order[a.priority]-order[b.priority]);

}

function renderTasks(filter="") {

    taskList.innerHTML="";

    sortTasks();

    tasks.forEach((task,index)=>{

        if(
            task.text.toLowerCase().includes(filter.toLowerCase())===false
        ){
            return;
        }

        const li=document.createElement("li");

        li.classList.add(task.priority.toLowerCase());

        const details=document.createElement("div");

        details.className="task-details";

        if(task.completed){

            details.classList.add("completed");

        }

        details.innerHTML=`
        <strong>${task.text}</strong>
        <br>
        <small>Priority : ${task.priority}</small>
        <br>
        <small>${task.date}</small>
        `;

        details.onclick=()=>{

            tasks[index].completed=!tasks[index].completed;

            saveTasks();

            renderTasks(searchInput.value);

        };

        const btnBox=document.createElement("div");

        btnBox.style.display="flex";
        btnBox.style.gap="8px";

        // Edit Button

        const edit=document.createElement("button");

        edit.innerHTML="✏";

        edit.onclick=()=>{

            const updated=prompt("Edit Task",task.text);

            if(updated && updated.trim()!==""){

                tasks[index].text=updated.trim();

                saveTasks();

                renderTasks(searchInput.value);

            }

        };

        // Delete Button

        const del=document.createElement("button");

        del.innerHTML="🗑";

        del.className="delete";

        del.onclick=()=>{

            if(confirm("Delete this task?")){

                tasks.splice(index,1);

                saveTasks();

                renderTasks(searchInput.value);

            }

        };

        btnBox.appendChild(edit);
        btnBox.appendChild(del);

        li.appendChild(details);
        li.appendChild(btnBox);

        taskList.appendChild(li);

    });

    updateCounter();

}

function addTask(){

    const text=taskInput.value.trim();

    if(text===""){

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text:text,

        completed:false,

        priority:prioritySelect.value,

        date:new Date().toLocaleString()

    });

    saveTasks();

    renderTasks(searchInput.value);

    taskInput.value="";

}

addBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        addTask();

    }

});

searchInput.addEventListener("input",()=>{

    renderTasks(searchInput.value);

});

clearCompletedBtn.addEventListener("click",()=>{

    tasks=tasks.filter(task=>!task.completed);

    saveTasks();

    renderTasks(searchInput.value);

});

clearAllBtn.addEventListener("click",()=>{

    if(confirm("Delete ALL tasks?")){

        tasks=[];

        saveTasks();

        renderTasks();

    }

});

renderTasks();
