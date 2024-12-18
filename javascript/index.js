function showdiv() {
    const taskCreator = document.getElementById("taskCreator");
    taskCreator.classList.add("active");
}

function closeDiv() {
    const taskCreator = document.getElementById("taskCreator");
    taskCreator.classList.remove("active");
}

class Task{
    constructor(name, description, deadline){
    this.name = name
    this.description = description
    this.deadline = deadline
    this.status = false
    }   
}

function deleteTask(task){
    const child = document.getElementsByClassName(task)[0]
    const list = document.querySelector('ol')
    list.removeChild(child)
    return
}

function createTaskHTML(taskName, taskDesc, taskDead){
    if (taskDead != ''){
        const nowTime = new Date()
        console.log(typeof(taskDead))
        console.log(nowTime)
        remainingTime = taskDead - nowTime
        console.log(remainingTime)
        const defaultHTMl=
        `<li class='${taskName} ${taskDesc} ${taskDead} Task'>
        ${taskName.replace('_', ' ')} <button class='invis' onclick='changeStatus("${taskName}")'>COMPLETE</button>    <button class='invis' onclick='deleteTask("${taskName}")'>DELETE</button> 
        <p id ='description'>
            ${taskDesc.replace('_', ' ')}
        </p>
        <p id ='deadline'>
            Deadline:  ${taskDead}
        </p>
        </li>`
        return defaultHTMl
    }
    const defaultHTMl = 
    `<li class='${taskName} ${taskDesc} ${taskDead} Task'>
    ${taskName.replace('_', ' ')} <button class='invis' onclick='changeStatus("${taskName}")'>COMPLETE</button>    <button class='invis' onclick='deleteTask("${taskName}")'>DELETE</button> 
    <p id ='description'>
        ${taskDesc.replace('_', ' ')}
    </p>
    <p id ='deadline'>
        ${taskDead}
    </p>
    </li>`
    return defaultHTMl
}

function changeStatus(task){
    taskAtr = document.getElementsByClassName(task)[0].getAttribute('class').split(' ')
    taskName = taskAtr[0]
    taskDesc = taskAtr[1]
    taskDead = taskAtr[2]
    taskStatus = document.getElementsByClassName(task)[0].querySelector('button').innerText
    switch (taskStatus){
        case 'COMPLETE': 
            const completeHTML = 
            `<li id='${taskName} ${taskDesc} ${taskDead} Task'>
            <s>${taskName.replace('_', ' ')}</s> <button class='invis' onclick='changeStatus("${taskName}")'>RESTORE</button> <button class='invis' onclick='deleteTask("${taskName}")'>DELETE</button> 
    <p id ='description'>
            </li>`
            document.getElementsByClassName(task)[0].innerHTML = completeHTML  
            return
        case 'RESTORE':
            const restoreHTML = createTaskHTML(taskName, taskDesc, taskDead)
            document.getElementsByClassName(task)[0].innerHTML = restoreHTML 
            return
    }
    return
}

function changeButton(button){
    const btnId = button.innerHTML
    //console.log(button.innerHTML)
    switch (btnId){
        case 'FALSE':
            console.log('false')
            button.innerHTML = 'TRUE'
            return
        case 'TRUE':
            console.log('true')
            button.innerHTML = 'FALSE'
            return
        }
}

function createTask(event){
    event.preventDefault() //blocks page reloading with form submit

    // taskName will be reassing to be the task object 
    let taskName = document.querySelector('input[name="taskName"]').value.replace(' ', '_');
    const taskDesc = document.querySelector('input[name="taskDesc"]').value.replace(' ', '_');
    const taskDead = document.querySelector('input[name="taskDead"]').value;
    let taskStatus = false
    if (taskName == ''){
        console.log('cant create a task with empty name!')
        return
    }
    console.log(taskName, taskDesc, taskDead)
    const listUl = document.querySelector('ol')
    listUl.insertAdjacentHTML('beforeend', createTaskHTML(taskName, taskDesc, taskDead))
    return
}

