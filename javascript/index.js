import { taskBtns, createInnerHTML } from "./tasks.js";

// Opens the create task form
export function showDiv() {
    const taskCreator = document.getElementById("taskCreator");
    const taskBtn = document.getElementById('openCreator');
    taskBtn.addEventListener('click', () => {
        taskCreator.classList.add("active");
    })    
}

// Close the create task form
export function closeDiv() {
    const taskCreator = document.getElementById("taskCreator");
    const taskBtn = document.getElementById('closeCreator');
    taskBtn.addEventListener('click', ()=>{
        taskCreator.classList.remove("active");
    })    
}    

// Handles the task form submit
export function submitTaskForm(event){
    const form = document.getElementById('creatorFrom')
    form.addEventListener('submit', (event) => {

        event.preventDefault() //blocks page reloading with form submit
        
        const taskName = document.querySelector('input[name="taskName"]').value.replace(' ', '_');
        const taskDesc = document.querySelector('input[name="taskDesc"]').value.replace(' ', '_');
        const taskDead = document.querySelector('input[name="taskDead"]').value;
        if (taskName == ''){
            console.log('cant create a task with empty name!')
            return
        }
        const listUl = document.querySelector('ol')
        // creates a unique ID for each task
        const taskID = Number(Date.now())
        // adds the task html to the page 
        const taskTitle = `
        <li class='${taskName} ${taskDesc} ${taskDead} Task' id='${taskID}'>`
        const taskInner = createInnerHTML(taskName, taskDesc, taskDead, taskID)
        const taskHTML = taskTitle.concat(taskInner)

        listUl.insertAdjacentHTML('beforeend', taskHTML)
        console.log(taskName, taskDesc, taskDead, taskID)

        taskBtns(taskID)
    })
        return
}    
