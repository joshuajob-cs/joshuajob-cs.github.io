(function () {
  const states = [
    ["taupe", "yellow", "cyan"],
    ["cyan", "taupe", "yellow"],
    ["yellow", "cyan", "taupe"],
  ];
  let current = 0;
  const boxes = document.querySelectorAll(".about-callout");
  const colorClasses = states[0].map((c) => "about-callout--" + c);

  function applyState(stateIndex) {
    current = stateIndex;
    boxes.forEach((box, i) => {
      box.classList.remove(...colorClasses);
      box.classList.add("about-callout--" + states[stateIndex][i]);
    });
  }

  function cycle() {
    applyState((current + 1) % 3);
  }

  const isTouch = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  if (isTouch) {
    boxes.forEach((box) => box.addEventListener("click", cycle));
  } else {
    boxes.forEach((box, i) => {
      box.addEventListener("mouseenter", () => applyState((i + 1) % 3));
    });
  }
})();
