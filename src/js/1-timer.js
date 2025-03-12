import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const inputDate = document.querySelector("#datetime-picker");
const saveButton = document.querySelector("button");
saveButton.disabled = true;

const timerDay = document.querySelector(`[data-days]`);
const timerHour = document.querySelector(`[data-hours]`);
const timerMinute = document.querySelector(`[data-minutes]`);
const timerSecond = document.querySelector(`[data-seconds]`);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], // Власні скорочення
        longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] // Повні назви
    }
},
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        console.log(selectedDate);
        const now = new Date();

        if (!selectedDate || selectedDate < now) {
            saveButton.disabled = true;
            iziToast.show({
              message: "Please choose a date in the future",
              messageColor: `#fff`,
              messageSize: '16px',
              messageLineHeight: '1.5',
              backgroundColor: '#ef4040',
              closeOnClick: true,
              position: `topRight`,
              progressBarColor: `#B51B1B`,
              class: "custom-toast",
              timeout: 500000,
            });  
        } else {
            userSelectedDate = selectedDate;
            saveButton.disabled = false;
        }
      },
    };


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000));
  console.log(convertMs(140000));
  console.log(convertMs(24140000));

  function startTimer(userSelectedDate) {
    inputDate.disabled = true;
    saveButton.disabled = true;
    const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = userSelectedDate - currentTime;
  
      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        timerDay.textContent = "00";
        timerHour.textContent = "00";
        timerMinute.textContent = "00";
        timerSecond.textContent = "00";
        inputDate.disabled = false;
        return;
      };

      const { days, hours, minutes, seconds } = convertMs(timeRemaining);

      timerDay.textContent = days < 10 ? `0${days}` : days;
      timerHour.textContent = hours < 10 ? `0${hours}` : hours;
      timerMinute.textContent = minutes < 10 ? `0${minutes}` : minutes;
      timerSecond.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }, 1000); 
  };

saveButton.addEventListener("click", () => {
    if (userSelectedDate) {
    startTimer(userSelectedDate);
    }
});

  
flatpickr(inputDate, options);


