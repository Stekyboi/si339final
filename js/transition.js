const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const swup = new Swup();

function handleNavigation(button) {
  const isBack = button.classList.contains('back-button');
  const target = isBack ? document.referrer : button.dataset.target;
  if (!target) return;

  if (prefersReducedMotion) {
    window.location.href = target;
    return;
  }

  const rect = button.getBoundingClientRect();
  const overlay = document.createElement('div');
  overlay.classList.add('transition-overlay');
  overlay.style.left = `${rect.left + rect.width / 2}px`;
  overlay.style.top = `${rect.top + rect.height / 2}px`;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add('expand');
  }, 10);

  setTimeout(() => {
    window.location.href = target;
  }, 600);
}

// Add support for both click and Enter key
document.querySelectorAll('.nav-button').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    handleNavigation(button);
  });

  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleNavigation(button);
    }
  });
});
