export default function loaderIndicator() {
  const main = document.querySelector('main');
  const div = document.createElement('div');
  div.classList.add('spinner');
  div.innerHTML = `<h3><span class="visually-hidden">visuallyhidden</span></h3>`;
  main.appendChild(div);

  const options = { childList: true };
  const observer = new MutationObserver(() => div.remove());
  observer.observe(main, options);
}
