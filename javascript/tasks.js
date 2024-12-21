export function taskBtns(taskID){
    const task = document.getElementById(taskID)
    const btn = task.querySelectorAll('button')
    const deleteBtn = btn[1]
    const completeBtn = btn[0]

    deleteBtn.addEventListener('click', () => { 
        console.log(`${taskID} delete btn clicked`)
        deleteTask(taskID)
    })
    completeBtn.addEventListener('click', () => {
        console.log(`${taskID} complete btn clicked`)
        changeStatus(taskID)
        // Gambiarra mas funciona. 
        taskBtns(taskID)
    })
}    

export function createInnerHTML(taskName, taskDesc, taskDead){
    let deadString = ''
    if (taskDead != ''){
        const nowTime = new Date()
        taskDead =  new Date(taskDead)
        taskDead.setDate(taskDead.getDate() + 1 )
        const remainingTime = (taskDead - nowTime)
        // Converts miliseconds in days 
        const daysLeft = Math.floor(remainingTime /( 1000 * 60 * 60 * 24))
        
        if (daysLeft < 0){
            deadString = `
            <p id ='deadline'>
                Deadline: ${intWeekday(taskDead.getDay())}, ${intMonth(taskDead.getMonth())} ${taskDead.getDate()}, ${taskDead.getFullYear()}
            </p>
            <p>
                Over the deadline.
                </p>    `
            }
            else{
                deadString = `
                <p id ='deadline'>
                Deadline: ${intWeekday(taskDead.getDay())}, ${intMonth(taskDead.getMonth())} ${taskDead.getDate()}, ${taskDead.getFullYear()}
                </p>
                <p>
                ${daysLeft} days left.
                </p>    
                `
            }
    }    
    const defaultHTMl=
    `    ${taskName.replace('_', ' ')} <button class='invis'>COMPLETE</button> <button class='invis'>DELETE</button> 
        <p id ='description'>
            ${taskDesc.replace('_', ' ')}
        </p>    
        ${deadString}  
        </li>`    
        return defaultHTMl
}    
    
function intMonth(month){
        const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthsList[month]
}
    
function intWeekday(day){
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdays[day]
}

function deleteTask(taskID){
        const child = document.getElementById(taskID)
        const parent = document.querySelector('ol')
    parent.removeChild(child)
}

function changeStatus(taskID){
    const task = document.getElementById(taskID)
    const taskAtr = task.getAttribute('class').split(' ')
    const taskName = taskAtr[0]
    const taskDesc = taskAtr[1]
    const taskDead = taskAtr[2]
    const taskStatus = task.querySelector('button').innerText

    switch (taskStatus){
        case 'COMPLETE':
            console.log('case false')
            const completeHTML = 
            `<s>${taskName.replace('_', ' ')}</s> <button class='invis'>RESTORE</button> <button class='invis'>DELETE</button>` 
            task.innerHTML = completeHTML
            task.setAttribute('class', `${taskName} ${taskDesc} ${taskDead} Task`)
            return
        case 'RESTORE': 
            console.log('case true')
            const restoreHTML = createInnerHTML(taskName, taskDesc, taskDead)
            task.innerHTML = restoreHTML
            return
    }        
}
    
