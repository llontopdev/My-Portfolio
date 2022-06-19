/*
C = Clubs   = Trebol
D = Diamond = Diamantes
H = Hearts  = Corazones
S = Spades  = Espadas
*/

(() => {
  'use strict'
  let baraja = [], puntos = [];
  const palos = ["C", "D", "H", "S"], especiales = ["J", "Q", "K", "A"];

  // referencia
  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener");

  const divCartas = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll(".puntos");

  // funciones
  const inicializarJuego = (numJugadores = 1) => {
    crearBaraja();
    puntos = [];
    for (let i = 0; i <= numJugadores; i++) {
      puntos.push(0);
      puntosHTML[i].innerHTML = 0;
      divCartas[i].innerHTML = "";
    }
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  }
  const crearBaraja = () => {
    baraja = [];
    for (let palo of palos) {
      for (let i = 2; i < 11; i++) {
        baraja.push(i + palo);
      }
      for (let esp of especiales) {
        baraja.push(esp + palo);
      }
    }
    baraja = _.shuffle(baraja); // funcion de underscore
  };

  const determinarGanador = () => {
    const [ptosJugador, ptosPC] = puntos;
    setTimeout(() => {
      if (ptosJugador > 21) {
        alert("Gano la Computadora");
      } else if ((ptosPC >= ptosJugador) && (ptosPC <= 21)) {
        alert("Gano la Computadora");
      } else alert("Gano el jugador")
    }, 300);
  }

  const pedirCarta = () => {
    if (baraja.length === 0) {
      throw "No hay cartas en la baraja"
    };
    return baraja.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
      (valor === "A") ? 11 : 10
      : valor * 1;
  };

  const acumPuntos = (carta, turno) => {
    puntos[turno] += valorCarta(carta);
    puntosHTML[turno].innerHTML = puntos[turno];
    return puntos[turno];
  };

  const mostrarCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartas[turno].append(imgCarta);
  }

  const turnoPC = (puntaje) => {
    do {
      const carta = pedirCarta();
      acumPuntos(carta, puntos.length - 1);
      mostrarCarta(carta, puntos.length - 1);
    } while ((puntos[puntos.length - 1] < puntaje) && (puntaje <= 21));
    determinarGanador();
  }

  // eventos
  btnNuevo.addEventListener("click", () => inicializarJuego());

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    acumPuntos(carta, 0);
    mostrarCarta(carta, 0);

    if (puntos[0] >= 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoPC(puntos[0]);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoPC(puntos[0]);
  });

  //play
  inicializarJuego();  

})();
