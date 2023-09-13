import wordInfo from './modules/word-info.js';
import selectFont from './modules/select-font.js';
import darkModeInint from './modules/dark-mode.js';
import loaderIndicatorInit from './modules/loader-indicator.js';

function showWordInfo(data) {
  const main = document.querySelector('main');
  wordInfo(data, main);
}

async function getWordInfo(word) {
  loaderIndicatorInit();
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  data.forEach((element) => showWordInfo(element));
}

const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get('word');
if (word) getWordInfo(word);

selectFont();
darkModeInint();
