const form = document.getElementById("taskForm")
const taskInput = document.getElementById("taskInput")
const emailInput = document.getElementById("emailInput")
const taskList = document.getElementById("taskList")

let tasks = []


form.addEventListener("submit", function(e){

e.preventDefault()

addTask()

})

function addTask(){

const taskText = taskInput.value

const li = document.createElement("li")

li.innerHTML =
taskText +
" <button class='edit'>Edit</button>" +
" <button class='delete'>Delete</button>"

taskList.appendChild(li)

tasks.push(taskText)

saveTasks()

taskInput.value=""

}

taskList.addEventListener("click", function(e){

if(e.target.classList.contains("delete")){

e.target.parentElement.remove()

}

if(e.target.classList.contains("edit")){

const li = e.target.parentElement

const newText = prompt("Edit task")

li.firstChild.textContent = newText

}

})

function debounce(fn, delay){

let timer

return function(){

clearTimeout(timer)

timer = setTimeout(fn, delay)

}

}
function validateEmail(){

const email = emailInput.value

const pattern = /\S+@\S+\.\S+/

if(!pattern.test(email)){
console.log("Invalid Email")
}

}

const debouncedValidation = debounce(validateEmail,500)

emailInput.addEventListener("input",debouncedValidation)


function throttle(fn,limit){

let waiting=false

return function(){

if(!waiting){

fn()

waiting=true

setTimeout(function(){

waiting=false

},limit)

}

}

}

const resizeHandler = throttle(function(){

console.log("Layout adjusted")

},2000)

window.addEventListener("resize",resizeHandler)

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks))

}

function loadTasks(){

const saved = localStorage.getItem("tasks")

if(saved){

tasks = JSON.parse(saved)

tasks.forEach(function(task){

const li = document.createElement("li")

li.textContent = task

taskList.appendChild(li)

})

}

}

loadTasks()