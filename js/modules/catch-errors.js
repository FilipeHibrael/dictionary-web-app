const main = document.querySelector('main');
const div = document.createElement('div');
const span = document.createElement('span');
const h2 = document.createElement('h2');
const p = document.createElement('p');
div.classList.add('error');
div.append(span, h2, p);

export function internetConnectionError() {
  span.innerHTML = '&#128225';
  h2.innerText = 'No internet access';
  p.innerText =
    "We couldn't complete your request at the moment." +
    ' Please check your connection or try again later.';
  main.appendChild(div);
}

export function dataError(data, status) {
  if (status === 404) {
    span.innerHTML = '&#128549';
    h2.innerText = data.title;
    p.innerText = data.message;
  } else {
    span.innerHTML = '&#128549';
    h2.innerText = 'Server erro';
    p.innerText =
      "Sorry, we couldn't connect to the server. Please try again later.";
  }
  main.appendChild(div);
}
