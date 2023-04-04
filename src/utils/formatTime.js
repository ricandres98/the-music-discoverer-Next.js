const formatter = (number) => {
  if (number >= 10) {
    return number;
  } else {
    return `0${number}`;
  }
};

const formatTime = (time) => {
  if (time / 60 >= 1) {
    const minutes = Math.floor(time / 60);
    const timeLeft = time / 60 - minutes;
    const seconds = Math.round(timeLeft * 60);
    return `${formatter(minutes)}:${formatter(seconds)}`;
  } else {
    const minutes = 0;
    const seconds = Math.round(time);
    return `${formatter(minutes)}:${formatter(seconds)}`;
  }
};

export default formatTime;
