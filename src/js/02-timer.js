import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('.timer-btn');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let selectedDate;

btnStartEl.addEventListener('click', onClick)
btnStartEl.disabled = true;

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0]) {
      btnStartEl.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future')
    } else {
      btnStartEl.disabled = false;
      selectedDate = selectedDates[0]
    }
  },
});


function onClick (event) {
event.preventDefault();
btnStartEl.disabled = true;
inputEl.disabled = true;

const intervalId = setInterval(() => {
  const currentDate = Date.now();
  const countdownTimer = selectedDate.getTime() - currentDate;
  if (countdownTimer <= 0) {
    clearInterval(intervalId)
    btnStartEl.disabled = false;
inputEl.disabled = false;
    return;
}
const { days, hours, minutes, seconds } = convertMs(countdownTimer);
daysEl.textContent = `${days}`
hoursEl.textContent = `${hours}`; 
minutesEl.textContent = `${minutes}`; 
secondsEl.textContent = `${seconds}`;
    }, 1000);
   }

function pad (value){
  return String(value).padStart(2,'0')
};   

function convertMs(ms) {
const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
  }
  
