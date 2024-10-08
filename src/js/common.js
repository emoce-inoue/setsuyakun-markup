document.addEventListener('DOMContentLoaded', () => {
  const targetElems = document.querySelectorAll('.js-count-number');
  const from = 0;

  const startCountUp = (targetElem, to, duration) => {
    const startTime = performance.now();
    const countUp = () => {
      const elapsed = performance.now() - startTime;
      const countValue = from + ((elapsed / duration) * (to - from));
      if (elapsed >= duration) {
        targetElem.innerText = to.toLocaleString();
      } else {
        targetElem.innerText = Math.floor(countValue).toLocaleString();
        requestAnimationFrame(countUp);
      }
    };
    requestAnimationFrame(countUp);
  };

  const countUpObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElem = entry.target;
        const to = parseInt(targetElem.getAttribute('data-count-to'), 10);
        const duration = parseInt(targetElem.getAttribute('data-duration'), 10) || 1000;
        startCountUp(targetElem, to, duration);
        countUpObserver.unobserve(targetElem);
      }
    });
  });

  targetElems.forEach(targetElem => {
    countUpObserver.observe(targetElem);
  });
});
