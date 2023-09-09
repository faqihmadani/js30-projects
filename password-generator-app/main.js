let range = document.querySelector('#range');
let length = document.querySelector("#length")

range.addEventListener("input", (e) => {
    length.innerHTML = e.target.value
})

let lowercase = document.querySelector("#lowercase")
let uppercase = document.querySelector("#uppercase")
let number = document.querySelector("#number")
let symbol = document.querySelector("#symbol")
const btn = document.querySelector("#btn")
const copy = document.querySelector("#copy")
const error = document.querySelector("#error")
const displayPassword = document.querySelector("#password")

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ["!", "@", "#", "$", "%", "_", "&", "*"]
const charactersNum = Array.from(Array(26)).map((_, i) => i + 97)
const lowercaseAlphabets = charactersNum.map((num) => String.fromCharCode(num))
const uppercaseAlphabets = lowercaseAlphabets.map((a) => a.toUpperCase())

const generatePassword = (length, hasNumber, hasSymbol, hasLowercase, hasUppercase) => {
    const allCharacters = [
        ...(hasNumber ? numbers : []),
        ...(hasSymbol ? symbols : []),
        ...(hasLowercase ? lowercaseAlphabets : []),
        ...(hasUppercase ? uppercaseAlphabets : []),
    ]

    const checkPassword = (password, hasNumber, hasSymbol, hasLowercase, hasUppercase) => {
        const arrayPw = password.split("")
        let result = true
        if (hasNumber) {
            if (result) {
                result = arrayPw.some((a) => numbers.join().split(",").includes(a))
            }
        }

        if (hasSymbol) {
            if (result) {
                result = arrayPw.some((a) => symbols.includes(a))
            }
        }

        if (hasLowercase) {
            if (result) {
                result = arrayPw.some((a) => lowercaseAlphabets.includes(a))
            }
        }

        if (hasUppercase) {
            if (result) {
                result = arrayPw.some((a) => uppercaseAlphabets.includes(a))
            }
        }

        return result
    }

    let pw = "";
    let finished = false

    while (!finished) {
        pw = ""
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * allCharacters.length)
            pw += allCharacters[index]
        }
        finished = checkPassword(pw, hasNumber, hasSymbol, hasLowercase, hasUppercase)
    }

    return pw;
}

btn.addEventListener("click", () => {
    if (lowercase.checked === false && uppercase.checked === false &&
        number.checked === false && symbol.checked === false) {
        error.classList.remove("hidden")
    } else {
        error.classList.add("hidden")
        displayPassword.innerHTML = generatePassword(range.value, number.checked, symbol.checked, lowercase.checked, uppercase.checked)
        myPass = displayPassword.innerHTML.toString()
    }
})

let myPass = "YourPassword"

copy.addEventListener("click", () => {
    navigator.clipboard.writeText(myPass)
})


