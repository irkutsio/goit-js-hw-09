import Notiflix from 'notiflix';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay =  Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount =  Number(formEl.amount.value);
  for (let i = 0; i < amount; i+=1) {
    const position = i + 1;
    const promiseDelay = delay + step * i;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

  }
}