const hexaColors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const btnGenerar = document.getElementById("btn-generar");
const frmColorRandom = document.getElementById("frm-ColorRandom");
const colorGen = document.getElementById("color-gen");

function getRandomHexa(arreglo) {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += arreglo[Math.floor(Math.random() * arreglo.length)]
  }
  return color
}

btnGenerar.addEventListener("click", function () {
  let random = getRandomHexa(hexaColors);
  frmColorRandom.style.backgroundColor = random;
  colorGen.innerHTML = random;
});