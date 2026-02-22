// --- CONFIGURACIÓN Y ESTADO ---
const imagenesBase = [
    "/static/games/assets/images/circulo_lila.png",
    "/static/games/assets/images/cruz_azul.png",
    "/static/games/assets/images/cuadrado.png",
    "/static/games/assets/images/Estrella_amarilla.png",
    "/static/games/assets/images/heart_corazon.png",
    "/static/games/assets/images/triangulo.png",
    "/static/games/assets/images/rombo_naranja.png",
    "/static/games/assets/images/media_luna_rosa.png",
    "/static/games/assets/images/Hexagono.png"
];

let estado = {
    primeraCarta: null,
    segundaCarta: null,
    bloqueado: false,
    puntaje: 0,
    nivelActual: 1,
    parejasActuales: 0,
    parejasEncontradas: 0,
    tiempo: 0,
    temporizador: null
};

// --- MOTOR ---

window.iniciarJuego = function(parejasIniciales) {
    estado.nivelActual = 1;
    estado.parejasActuales = parejasIniciales;
    estado.puntaje = 0;
    
    if (parejasIniciales === 3) estado.tiempo = 60;
    else if (parejasIniciales === 6) estado.tiempo = 90;
    else if (parejasIniciales === 9) estado.tiempo = 150;

    const winSound = document.getElementById("winSound");
    if (winSound) {
        winSound.play().then(() => {
            winSound.pause();
            winSound.currentTime = 0;
        }).catch(e => console.log("Audio esperando interacción"));
    }

    document.getElementById("pantallaFinal").classList.add("hidden");
    document.getElementById("inicio").classList.add("hidden");
    document.getElementById("juego").classList.remove("hidden");

    actualizarUI();
    iniciarTemporizador();
    generarTablero();
};

function generarTablero() {
    const tablero = document.getElementById("tablero");
    tablero.innerHTML = ""; 
    estado.parejasEncontradas = 0;
    estado.bloqueado = true; 

    const imagenes = imagenesBase.slice(0, estado.parejasActuales);
    const cartas = [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);

    // --- LÓGICA DE DIMENSIONES ---
    // Si es nivel 3 (9 parejas = 18 cartas), usamos 6 columnas de 85px para que no se desborde
    let columnas, cardSize;
    
    if (estado.parejasActuales === 9) {
        columnas = 6;
        cardSize = "85px"; 
    } else if (estado.parejasActuales === 6) {
        columnas = 4;
        cardSize = "110px";
    } else {
        columnas = 3;
        cardSize = "120px";
    }

    tablero.style.gridTemplateColumns = `repeat(${columnas}, ${cardSize})`;
    tablero.style.width = "fit-content"; 
    tablero.style.margin = "0 auto"; 

    cartas.forEach(src => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.style.width = cardSize;
        card.style.height = cardSize;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"><img src="${src}" style="width: 80%; height: 80%;"></div>
                <div class="card-back"></div>
            </div>
        `;
        card.addEventListener("click", () => voltearCarta(card, src));
        tablero.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll(".card").forEach(c => c.classList.add("flip"));
        setTimeout(() => {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("flip"));
            estado.bloqueado = false;
        }, 2000);
    }, 300);
}
function voltearCarta(card, src) {
    if (estado.bloqueado || card.classList.contains("flip")) return;

    const flipSound = document.getElementById("flipSound");
    if (flipSound) {
        flipSound.currentTime = 0;
        flipSound.play();
    }

    card.classList.add("flip");

    if (!estado.primeraCarta) {
        estado.primeraCarta = { card, src };
        return;
    }

    estado.segundaCarta = { card, src };
    estado.bloqueado = true;

    if (estado.primeraCarta.src === estado.segundaCarta.src) {
        estado.puntaje += 150;
        estado.parejasEncontradas++;
        
        aplicarBrilloPistacho();
        const matchSound = document.getElementById("matchSound");
        if (matchSound) matchSound.play();

        if (estado.parejasEncontradas === estado.parejasActuales) {
            setTimeout(() => {
                siguienteNivel(); 
            }, 1000); 
        } else {
            resetSeleccion();
        }
    } 
    else {
        const errorSound = document.getElementById("errorSound");
        if (errorSound) {
            errorSound.volume = 0.5;
            errorSound.play().catch(e => console.log("Error al sonar:", e));
        }

        estado.primeraCarta.card.classList.add("shake");
        estado.segundaCarta.card.classList.add("shake");

        setTimeout(() => {
            estado.primeraCarta.card.classList.remove("flip", "shake");
            estado.segundaCarta.card.classList.remove("flip", "shake");
            resetSeleccion();
            actualizarUI(); 
        }, 1000); 
    }
    actualizarUI();
}
// --- UTILIDADES ---

function aplicarBrilloPistacho() {
    const scoreBox = document.getElementById("puntaje").parentElement;
    scoreBox.style.boxShadow = "0 0 30px #C9FF8A"; 
    scoreBox.style.backgroundColor = "rgba(188, 245, 120, 0.6)";

    setTimeout(() => {
        scoreBox.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
        scoreBox.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; 
    }, 500);
}

function iniciarTemporizador() {
    clearInterval(estado.temporizador);
    estado.temporizador = setInterval(() => {
        estado.tiempo--;
        actualizarUI();
        if (estado.tiempo <= 0) finalizarJuego();
    }, 1000);
}

function actualizarUI() {
    document.getElementById("puntaje").textContent = `Puntaje: ${estado.puntaje}`;
    document.getElementById("tiempo").textContent = `Tiempo: ${estado.tiempo}`;

    const timeBox = document.getElementById("tiempo").parentElement;
    if (estado.tiempo <= 10){
        timeBox.style.color = "#FF2121";
        timeBox.style.animation = "pulse 1s infinite";
    } else {
        timeBox.style.color = "white";
        timeBox.style.animation = "none";
    }
}

function resetSeleccion() {
    estado.primeraCarta = null;
    estado.segundaCarta = null;
    estado.bloqueado = false;
}

window.siguienteNivel = function() {
    estado.nivelActual++;

    if (estado.nivelActual === 2) {
        estado.parejasActuales = 6;
    } else if (estado.nivelActual === 3) {
        estado.parejasActuales = 9;
    } else {
        finalizarJuego();
        return;
    }

    estado.tiempo += 30; 
    generarTablero();
};

window.volverMenu = function() {
    clearInterval(estado.temporizador);
    document.getElementById("juego").classList.add("hidden");
    document.getElementById("pantallaFinal").classList.add("hidden");
    document.getElementById("inicio").classList.remove("hidden");
    
    estado.puntaje = 0;
    estado.nivelActual = 1;
    actualizarUI();
};

function finalizarJuego() {
    clearInterval(estado.temporizador);
    const winSound = document.getElementById("winSound");
    if (winSound) {
        winSound.volume = 1.0;
        winSound.play().catch(e => console.log("Error de audio final"));
    }
    document.getElementById("pantallaFinal").classList.remove("hidden");
}