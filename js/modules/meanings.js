export default function wordMeanings(data) {
  const meaningSection = newElement('section', 'meaning', null);

  const meanings = data.meanings;
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

  return meaningSection
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
    const location = window.location.toString()
    a.href = location.replace(/=(.*)/, `=${a.innerText}`)
    li.appendChild(a);
    ul.appendChild(li);
  });

  div.append(h4, ul);

  return div;
}
