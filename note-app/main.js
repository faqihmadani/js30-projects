const openPopUp = document.querySelector("#open-pop-up")
const popUp = document.querySelector("#pop-up")
const close = document.querySelector("#close")
const darkBg = document.querySelector("#dark")
const noteList = document.querySelector("#note-list")
const msgValue = document.querySelector("#message")
const title = document.querySelector("#title")
const add = document.querySelector("#add")
const save = document.querySelector("#save")
const deleteBtn = document.querySelector("#delete")

openPopUp.addEventListener("click", () => {
    add.classList.remove("hidden")
    popUp.classList.remove("hidden")
    save.classList.add("hidden")
    deleteBtn.classList.add("hidden")
})

close.addEventListener("click", () => {
    popUp.classList.add("hidden")
    title.value = ""
    msgValue.value = ""
})

darkBg.addEventListener("click", () => {
    popUp.classList.add("hidden")
})

const addNote = () => {
    const card = document.createElement("div")
    card.classList.add("bg-neutral-50", "p-5", "rounded-xl")

    const cardHeader = document.createElement("div")
    cardHeader.classList.add("mb-5", "flex", "items-center", "justify-between")

    const cardTitle = document.createElement("h1")
    cardTitle.classList.add("text-2xl", "font-bold")
    cardTitle.innerHTML = title.value

    const editButton = document.createElement("button")
    editButton.classList.add("p-4", "transition-all", "duration-200", "rounded-full", "bg-neutral-50", "hover:bg-neutral-200")
    editButton.id = "edit-btn"

    const editImage = document.createElement("img")
    editImage.classList.add("h-5")
    editImage.src = "./images/edit.svg"
    editImage.alt = "edit"
    editImage.id = "edit-img"

    const message = document.createElement("p")
    message.innerHTML = msgValue.value

    editButton.appendChild(editImage)
    cardHeader.appendChild(cardTitle)
    cardHeader.appendChild(editButton)
    card.appendChild(cardHeader)
    card.appendChild(message)

    noteList.appendChild(card)
    popUp.classList.add("hidden")
    title.value = ""
    msgValue.value = ""
    add.classList.add("hidden")
    saveData()
}

let editedCard;

const viewEdit = (e) => {
    // console.log("edit");
    if (e.target.id === "edit-btn") {
        editedCard = e
        add.classList.add("hidden")
        save.classList.remove("hidden")
        deleteBtn.classList.remove("hidden")
        popUp.classList.remove("hidden")
        const editTitle = e.target.previousElementSibling
        const msgEdit = e.target.parentElement.nextElementSibling

        title.value = editTitle.innerHTML
        msgValue.value = msgEdit.innerHTML
    } else if (e.target.id === "edit-img") {
        editedCard = e
        add.classList.add("hidden")
        save.classList.remove("hidden")
        deleteBtn.classList.remove("hidden")
        popUp.classList.remove("hidden")
        const editTitle = e.target.parentElement.previousElementSibling
        const msgEdit = e.target.parentElement.parentElement.nextElementSibling

        title.value = editTitle.innerHTML
        msgValue.value = msgEdit.innerHTML
    }
}

noteList.addEventListener("click", (e) => viewEdit(e))

const saveEdit = () => {
    save.classList.add("hidden")
    deleteBtn.classList.add("hidden")
    popUp.classList.add("hidden")

    if (editedCard.target.id === "edit-btn") {
        const editTitle = editedCard.target.previousElementSibling
        const msgEdit = editedCard.target.parentElement.nextElementSibling

        editTitle.innerHTML = title.value
        msgEdit.innerHTML = msgValue.value
        saveData()
    } else if (editedCard.target.id === "edit-img") {
        const editTitle = editedCard.target.parentElement.previousElementSibling
        const msgEdit = editedCard.target.parentElement.parentElement.nextElementSibling

        editTitle.innerHTML = title.value
        msgEdit.innerHTML = msgValue.value
        saveData()
    }

    title.value = ""
    msgValue.value = ""
    editedCard = ""
}

const deleteNote = () => {
    save.classList.add("hidden")
    deleteBtn.classList.add("hidden")
    popUp.classList.add("hidden")

    if (editedCard.target.id === "edit-btn") {
        editedCard.target.parentElement.parentElement.remove()
        saveData()
    } else if (editedCard.target.id === "edit-img") {
        editedCard.target.parentElement.parentElement.parentElement.remove()
        saveData()
    }
    title.value = ""
    msgValue.value = ""
    editedCard = ""
}

add.addEventListener("click", addNote)
save.addEventListener("click", saveEdit)
deleteBtn.addEventListener("click", deleteNote)

const saveData = () => {
    localStorage.setItem("note", noteList.innerHTML)
}

const showData = () => {
    noteList.innerHTML = localStorage.getItem("note")
}

showData()