function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
let intervalId = null;

stopBtnEl.addEventListener('click', onClickStop);
startBtnEl.addEventListener('click', onClickStart);

function onClickStart() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
}

function onClickStop() {
  clearInterval(intervalId);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
}
