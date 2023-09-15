export default function wordInfo(data) {
  const meanings = wordMeanings(data);
  const keyword = keywordSection(data);
  const main = document.querySelector('main')
  main.append(keyword, meanings);
}

function keywordSection(data) {
  if (!document.querySelector('.keyword')) {
    const keywordSection = newElement('section', 'keyword', null);
    const div = newElement('div', 'keyword__text', null);
    const h1 = newElement('h1', 'keyword__title', data.word);
    const span = newElement('span', 'keyword__phonetic', null);
    div.append(h1, span);
    const button = newElement('button', 'keyword__button', null);
    const audioElement = newElement('audio', 'keyboard__audio');
    button.appendChild(audioElement);

    data.phonetics.forEach((phonetic) => {
      if (phonetic.audio && phonetic.text) {
        span.innerText = phonetic.text;
        audioElement.setAttribute('src', phonetic.audio);
        button.addEventListener('click', () => audioElement.play());
      }
    });

    keywordSection.append(div, button);
    return keywordSection;
  }
  return '';
}

function wordMeanings(data) {
  const meanings = data.meanings;
  const meaningSection = newElement('section', 'meaning', null);

  meanings.forEach((meaning) => {
    const div = newElement('div', 'meaning__item', null);
    const h2 = newElement(
      'h2',
      'meaning__part-of-speech',
      meaning.partOfSpeech
    );
    const h3 = newElement('h3', 'meaning__title', 'Meaning');
    const ul = createDefinitionList(meaning.definitions);

    div.append(h2, h3, ul);

    if (meaning.synonyms.length) {
      const synonyms = createSimilarWordsList('synonyms', meaning.synonyms);
      div.appendChild(synonyms);
    }
    if (meaning.antonyms.length) {
      const antonyms = createSimilarWordsList('antonyms', meaning.antonyms);
      div.appendChild(antonyms);
    }

    meaningSection.appendChild(div);
  });
  meaningSection.appendChild(wordSourceUrl(data));

  return meaningSection;
}

function wordSourceUrl(data) {
  const sourceUrl = data.sourceUrls;
  const div = newElement('div', 'source-url', null);
  const h4 = newElement('h4', 'source-url__title', 'Source');
  const ul = newElement('ul', 'source-url__links', null);

  sourceUrl.map((url) => {
    const li = newElement('li', 'source-url__link', null);
    const a = newElement('a', null, url);
    a.href = sourceUrl[0];
    a.setAttribute('target', '_blank');
    li.appendChild(a);
    ul.appendChild(li);
  });

  div.append(h4, ul);

  return div;
}

function newElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className !== null) element.classList.add(className);
  if (content !== null) element.innerText = content;

  return element;
}

function createDefinitionList(definitions) {
  const ul = newElement('ul', 'definitions', null);

  definitions.forEach((element) => {
    const li = document.createElement('li');

    const text = newElement('p', 'definitions__text', element.definition);
    li.appendChild(text);
    if (element.example) {
      const example = newElement('p', 'definitions__example', element.example);
      li.appendChild(example);
    }

    ul.appendChild(li);
  });

  return ul;
}

function createSimilarWordsList(title, wordsList) {
  const div = newElement('div', title, null);
  const h4 = newElement('h4', null, title);
  const ul = newElement('ul', title + '__list', null);

  wordsList.forEach((word) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerText = word;
    const location = window.location.toString();
    a.href = location.replace(/=(.*)/, `=${a.innerText}`);
    li.appendChild(a);
    ul.appendChild(li);
  });

  div.append(h4, ul);

  return div;
}
