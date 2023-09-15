import wordInfo from './word-info.js';
import loaderIndicator from './loader-indicator.js';
import { internetConnectionError, dataError } from './catch-errors.js';

export default function dictonaryApiInit() {
  const urlParams = new URLSearchParams(window.location.search);
  const word = urlParams.get('word');
  if (navigator.onLine && word) getWordInfo(word);
  else if (!navigator.onLine) internetConnectionError();

  async function getWordInfo(word) {
    try {
      loaderIndicator();
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      if (response.status === 200) data.forEach((item) => wordInfo(item));
      else dataError(data, response.status);
    } catch (error) {
      console.log(error);
    }
  }
}
