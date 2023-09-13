const toggleButton = document.querySelector('.header__dark-mode');

export default function darkModeInint() {
  toggleButton.addEventListener('click', toggleDarkMode);
  if (localStorage.getItem('dark-mode')) toggleDarkMode();
}

function toggleDarkMode() {
  const body = document.querySelector('body');
  toggleButton.classList.toggle('active');
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode'))
    localStorage.setItem('dark-mode', 'active');
  else localStorage.removeItem('dark-mode');
}
