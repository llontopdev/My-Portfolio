/*
C = Clubs   = Trebol
D = Diamond = Diamantes
H = Hearts  = Corazones
S = Spades  = Espadas
*/
let baraja = [];
const palos = ["C", "D", "H", "S"];
const especiales = ["J", "Q", "K", "A"]
let puntosJugador = 0, puntosComputador = 0;

// referencia
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputador = document.querySelector("#computador-cartas");

const puntosHTML = document.querySelectorAll(".puntos");

const crearBaraja = () => {
  for (let palo of palos) {
    for (let i = 2; i < 11; i++) {
      baraja.push(i + palo);
    }
    for (let esp of especiales) {
      baraja.push(esp + palo);
    }
  }
  baraja = _.shuffle(baraja); // funcion de underscore
  return baraja;
};

const pedirCarta = () => {
  if (baraja.length === 0) {
    throw "No hay cartas en la baraja"
  };
  const carta = baraja.pop();
  return carta;
};

const valorCarta = (carta) => {
  let valor = carta.substring(0, carta.length - 1);
  return (isNaN(valor)) ?
    (valor === "A") ? 11 : 10
    : valor * 1;
};

const turnoPC = (puntaje) => {
  do {
    const carta = pedirCarta();
    puntosComputador += valorCarta(carta);
    puntosHTML[1].innerHTML = puntosComputador;

    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputador.append(imgCarta);

    if (puntaje > 21) {
      break;
    }
  } while ((puntosComputador < puntaje) && (puntaje <= 21));

  setTimeout(() => {

    if (puntaje > 21) {
      alert("Gano la Computadora");
    } else if ((puntosComputador >= puntaje) && (puntosComputador <= 21)) {
      alert("Gano la Computadora");
    } else alert("Gano el jugador")

  }, 300);
}

crearBaraja();

// eventos
btnNuevo.addEventListener("click", () => {
  puntosJugador = 0;
  puntosComputador = 0;
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  puntosHTML[0].innerHTML = 0;
  puntosHTML[1].innerHTML = 0;
  divCartasJugador.innerHTML = "";
  divCartasComputador.innerHTML = "";
  baraja = [];
  crearBaraja();
});

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosHTML[0].innerHTML = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.classList.add("carta");
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPC(puntosJugador);
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPC(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoPC(puntosJugador);
});

