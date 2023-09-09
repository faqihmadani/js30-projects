const todo = document.querySelector("#todo")
const btn = document.querySelector("#btn")
const container = document.querySelector("#container")

const addTodo = () => {
    if (todo.value === "") {
        alert("Write something please!")
    } else {
        let li = document.createElement("li")
        li.classList.add("flex", "items-center", "gap-2")
        container.appendChild(li)

        let unchecked = document.createElement("div")
        unchecked.setAttribute("id", "unchecked")
        unchecked.classList.add("h-6", "w-6", "rounded-full", "border-2", "border-neutral-400", "cursor-pointer")
        li.appendChild(unchecked)

        let checked = document.createElement("div")
        checked.setAttribute("id", "checked")
        checked.classList.add("p-1", "hidden", "bg-green-500", "rounded-full", "border-2", "border-green-500", "cursor-pointer")
        li.appendChild(checked)
        let mark = document.createElement("img")
        mark.src = "./images/mark.png"
        mark.id = "mark"
        mark.classList.add("h-3", "w-3")
        checked.appendChild(mark)

        let list = document.createElement("h1")
        list.classList.add("text-lg", "font-medium")
        list.innerHTML = todo.value
        li.appendChild(list)

        let trash = document.createElement("img")
        trash.src = "./images/trash.svg"
        trash.id = "trash"
        trash.classList.add("h-5", "w-5", "ml-auto", "cursor-pointer")
        li.appendChild(trash)
    }

    todo.value = ""
    saveData()
}

container.addEventListener("click", (e) => {
    if (e.target.id === "unchecked") {
        const checked = e.target.nextElementSibling
        checked.classList.remove("hidden")
        const list = checked.nextElementSibling
        list.classList.add("line-through")
        e.target.classList.add("hidden")
        saveData()
    } else if (e.target.id === "checked") {
        const unchecked = e.target.previousElementSibling
        unchecked.classList.remove("hidden")
        const list = e.target.nextElementSibling
        list.classList.remove("line-through")
        e.target.classList.add("hidden")
        saveData()
    } else if (e.target.id === "mark") {
        const checked = e.target.parentElement
        const unchecked = checked.previousElementSibling
        unchecked.classList.remove("hidden")
        const list = checked.nextElementSibling
        list.classList.remove("line-through")
        checked.classList.add("hidden")
        saveData()
    } else if (e.target.id === "trash") {
        e.target.parentElement.remove()
        saveData()
    }
})

todo.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        btn.click()
    }
})

const saveData = () => {
    localStorage.setItem("data", container.innerHTML)
}

const showData = () => {
    container.innerHTML = localStorage.getItem("data")
}

showData()