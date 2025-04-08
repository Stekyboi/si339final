const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const swup = new Swup();

document.querySelectorAll('.nav-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const isBack = button.classList.contains('back-button');
    const target = isBack ? document.referrer : button.dataset.target;
    if (!target) return;

    if (prefersReducedMotion) {
        // Just go to the next page without animation
        window.location.href = target;
        return;
    }

    const rect = button.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.classList.add('transition-overlay');
    overlay.style.left = `${rect.left + rect.width / 2}px`;
    overlay.style.top = `${rect.top + rect.height / 2}px`;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('expand');
    });

    setTimeout(() => {
      window.location.href = target;
    }, 600);
  });
});
