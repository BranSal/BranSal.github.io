const PIEDRA = "piedra";
const PAPEL = "papel";
const TIJERAS = "tijeras";
const EMPATES = 0;
const GANADOS = 1;
const PERDIDOS = 2;

const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tijerasBtn = document.getElementById("tijeras");
const resultText = document.getElementById("resultText");
const machineImgEl = document.getElementById("machineImg");
const userImgEl = document.getElementById("userImg");

piedraBtn.addEventListener("click", () => {
    play(PIEDRA);
});
papelBtn.addEventListener("click", () => {
    play(PAPEL);
});
tijerasBtn.addEventListener("click", () => {
    play(TIJERAS);
});

// Mostrar la opción elegida por el User
// Y hacer que la CPU seleccione uno (con animación)
function play(userOption) {
    userImgEl.src = "imgs/" + userOption + ".png";
    resultText.innerHTML = "Eligiendo...";

    const interval = setInterval(function () {
        piedraBtn.disabled = true;
        papelBtn.disabled = true;
        tijerasBtn.disabled = true;

        const machineOption = cambiarTipo();
        machineImgEl.src = "imgs/" + machineOption + ".png";
    }, 120);

    setTimeout(function () {
        clearInterval(interval);
        const machineOption = cambiarTipo();
        const result = calcResult(userOption, machineOption);
        machineImgEl.src = "imgs/" + machineOption + ".png";
        switch (result) {
            case EMPATES:
                resultText.innerHTML = "Haz empatado :/";
                break;
            case GANADOS:
                resultText.innerHTML = "¡Has Ganado, enhorabuena! :D";
                break;
            case PERDIDOS:
                resultText.innerHTML = "Has perdido, inténtalo de nuevo ;(";
                break;
        }
        piedraBtn.disabled = false;
        papelBtn.disabled = false;
        tijerasBtn.disabled = false;
    }, 1200);
}


function cambiarTipo() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIJERAS;
    }
}

// Validación para saber quién ganó el partido
function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return EMPATES;
    } else if (userOption === PIEDRA) {
        if (machineOption === PAPEL) return PERDIDOS;
        if (machineOption === TIJERAS) return GANADOS;
    } else if (userOption === PAPEL) {  // Se Agrega esta verificación para PAPEL
        if (machineOption === PIEDRA) return GANADOS;
        if (machineOption === TIJERAS) return PERDIDOS;
    } else if (userOption === TIJERAS) {  // Se Agrega esta verificación para TIJERAS
        if (machineOption === PIEDRA) return PERDIDOS;
        if (machineOption === PAPEL) return GANADOS;
    }
}

