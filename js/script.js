import wordMeanings from './modules/meanings.js';

function showWordInfo(data) {
  const main = document.querySelector('main');
  main.append(wordMeanings(data));
}

async function getWordInfo(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  data.forEach((element) => showWordInfo(element));
}

const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get('word');
if (word) getWordInfo(word);
