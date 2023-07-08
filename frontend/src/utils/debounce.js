const debounce = (func, miliseconds) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(args);
    }, miliseconds);
  };
};

export default debounce;
