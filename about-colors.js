(function () {
  const states = [
    ['taupe', 'yellow', 'cyan'],
    ['cyan', 'taupe', 'yellow'],
    ['yellow', 'cyan', 'taupe'],
  ];
  let current = 0;
  const boxes = document.querySelectorAll('.about-callout');
  const colorClasses = states[0].map(c => 'about-callout--' + c);

  function cycle() {
    current = (current + 1) % 3;
    boxes.forEach((box, i) => {
      box.classList.remove(...colorClasses);
      box.classList.add('about-callout--' + states[current][i]);
    });
  }

  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  boxes.forEach(box => {
    box.addEventListener(isTouch ? 'click' : 'mouseenter', cycle);
  });
})();
