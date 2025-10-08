// js/main.js
import Header from './ui/Header.js';

async function loadFooter() {
  const el = document.querySelector('#footer');
  if (!el) return;
  const res = await fetch('./components/footer.html');
  el.innerHTML = await res.text();
}

document.addEventListener('DOMContentLoaded', async () => {
  const headerContainer = document.getElementById('header');
  const header = new Header(headerContainer);
  await header.render();      // <-- внутри render вызывается initMenu()

  loadFooter();
});
