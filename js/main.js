import Header from './ui/Header.js';

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header');
  const header = new Header(headerContainer);
  header.render();
});
