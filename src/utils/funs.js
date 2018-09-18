export const throttle = (fn, wait) => {
  var lastTime = 0;

  return function () {
    var now = +new Date();
    var arg = arguments
    if (now - lastTime > wait) {
      fn(...arg)
      lastTime = now
    }
  }

}