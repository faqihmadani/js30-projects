let questions;
let number = 0;
let score = 0;

const menu = document.querySelector("#menu")
const play = document.querySelector("#play")
const loading = document.querySelector("#loading")
const soal = document.querySelector("#soal")
let pertanyaan = document.querySelector("#question")
let daftar = document.querySelector("#daftar")
const nextBtn = document.querySelector("#next")
let nomorSoal = document.querySelector("#nomor")
const finish = document.querySelector("#finish")
const scoreMenu = document.querySelector("#score-menu")
const back = document.querySelector("#back")


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


play.addEventListener("click", async () => {
    menu.classList.add("hidden")
    loading.classList.remove("hidden")

    const response = await fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple")
    const data = await response.json()

    loading.classList.add("hidden")
    soal.classList.remove("hidden")

    nomorSoal.innerHTML = `Question ${number + 1}`

    questions = data;
    pertanyaan.innerHTML = questions.results[number].question
    let pilihan = [questions.results[number].correct_answer, ...questions.results[number].incorrect_answers]
    pilihan = shuffle(pilihan)

    pilihan.forEach(p => {
        const choice = document.createElement("div")
        choice.classList.add("rounded-lg", "text-lg", "border-2", "border-neutral-300", "w-full", "text-center", "py-2", "hover:cursor-pointer", "hover:border-fuchsia-900", "transition-color", "duration-300")
        choice.innerHTML = p
        choice.id = "pilihan"
        daftar.appendChild(choice)
    })

})

daftar.addEventListener("click", (e) => {
    console.log(e.target.innerHTML);

    if (e.target.id === "pilihan") {
        const daftarPilihan = document.querySelectorAll("#pilihan")
        daftarPilihan.forEach((p) => {
            p.classList.remove("hover:cursor-pointer", "hover:border-fuchsia-900", "transition-color", "duration-300")
            p.classList.add("cursor-not-allowed")
        })

        if (e.target.innerHTML === questions.results[number].correct_answer) {
            e.target.classList.add("bg-green-200", "border-green-300")
            e.target.classList.remove("border-neutral-300")
            score += 10
        } else if (e.target.innerHTML !== questions.results[number].correct_answer) {
            e.target.classList.add("bg-red-200", "border-red-300")
            e.target.classList.remove("border-neutral-300")
            daftarPilihan.forEach((p) => {
                if (p.innerHTML === questions.results[number].correct_answer) {
                    p.classList.add("bg-green-200", "border-green-300")
                    p.classList.remove("border-neutral-300")
                }
            })
        }
        if (number <= 8) {
            nextBtn.classList.remove("hidden")
        } else if (number === 9) {
            finish.classList.remove("hidden")
        }
    }

})

nextBtn.addEventListener("click", () => {
    nextBtn.classList.add("hidden")
    number++

    daftar.innerHTML = ""

    nomorSoal.innerHTML = `Question ${number + 1}`

    pertanyaan.innerHTML = questions.results[number].question
    let pilihan = [questions.results[number].correct_answer, ...questions.results[number].incorrect_answers]
    pilihan = shuffle(pilihan)

    pilihan.forEach(p => {
        const choice = document.createElement("div")
        choice.classList.add("rounded-lg", "text-lg", "border-2", "border-neutral-300", "w-full", "text-center", "py-2", "hover:cursor-pointer", "hover:border-fuchsia-900", "transition-color", "duration-300")
        choice.innerHTML = p
        choice.id = "pilihan"
        daftar.appendChild(choice)
    })
})

finish.addEventListener("click", () => {
    finish.classList.add("hidden")
    soal.classList.add("hidden")

    daftar.innerHTML = ""

    scoreMenu.classList.remove("hidden")
    const hasil = document.querySelector("#hasil")
    hasil.innerHTML = score
})

back.addEventListener("click", () => {
    scoreMenu.classList.add("hidden")
    menu.classList.remove("hidden")

    number = 0
    score = 0
})

