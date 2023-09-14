import wordInfo from './modules/word-info.js';
import selectFont from './modules/select-font.js';
import darkModeInint from './modules/dark-mode.js';
import loaderIndicatorInit from './modules/loader-indicator.js';
import { internetConnectionError, dataError } from './modules/catch-errors.js';

function showWordInfo(data) {
  const main = document.querySelector('main');
  wordInfo(data, main);
}

async function getWordInfo(word) {
  try {
    loaderIndicatorInit();
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    if (response.status === 200) data.forEach((item) => showWordInfo(item));
    else dataError(data, response.status);
  } catch (error) {
    console.log(error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get('word');
if (navigator.onLine && word) getWordInfo(word);
else if (!navigator.onLine) internetConnectionError()

selectFont();
darkModeInint();
