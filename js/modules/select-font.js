import outsideClick from './outside-click.js';

const selected = document.querySelector('.font-style__selected');
const selectMenu = document.querySelector('.font-style__buttons');
const selectButtons = document.querySelectorAll('.font-style__button');

export default function selectFont() {
  if (!localStorage.getItem('font')) localStorage.setItem('font', 'Serif');
  changeSelectedFont(localStorage.getItem('font'));

  selected.addEventListener('click', () => {
    selectMenu.classList.add('active');
    outsideClick(selectMenu, ['click'], () =>
      selectMenu.classList.remove('active')
    );
  });

  selectButtons.forEach((button) => {
    button.addEventListener('click', changeSelectedFont);
  });
}

function changeSelectedFont(event) {
  let fontType = event;
  if (typeof event !== 'string') {
    fontType = event.currentTarget.value;
    localStorage.setItem('font', fontType);
  }

  selectButtons.forEach((button) => {
    button.classList.remove('active');
    if (button.value === fontType) button.classList.add('active');
  });

  selected.innerText = fontType;
  changeFont(fontType);
}

function changeFont(font) {
  if (font === 'Serif') document.body.style.fontFamily = "'Lora', serif";
  else if (font === 'Sans Serif')
    document.body.style.fontFamily = "'Inter', sans-serif";
  else document.body.style.fontFamily = "'Inconsolata', monospace";
}
