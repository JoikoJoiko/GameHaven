export default class Header {
  constructor(container) {
    this.container = container;
    this.isLoggedIn = false;
  }

  async render() {
    try {
      const res = await fetch('./components/header.html');
      const html = await res.text();
      this.container.innerHTML = html;

      // ждём, пока DOM обновится
      setTimeout(() => {
        this.initMenu();
        this.updateAuthState();
      }, 0);
    } catch (err) {
      console.error('Ошибка при загрузке header.html:', err);
    }
  }

  initMenu() {
    const toggle = this.container.querySelector('#menu-toggle');
    const dropdown = this.container.querySelector('#dropdown-menu');

    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      const isInside = dropdown.contains(e.target) || toggle.contains(e.target);
      if (!isInside) dropdown.classList.remove('active');
    });
  }

  updateAuthState() {
    const authList = this.container.querySelector('#auth-links');
    if (!authList) return;

    authList.innerHTML = '';

    if (this.isLoggedIn) {
      authList.innerHTML = `
        <li><a href="user.html">Profile</a></li>
        <li><a href="cart.html">Cart</a></li>
        <li><a href="#logout" id="logout-btn">Exit</a></li>
      `;
    } else {
      authList.innerHTML = `
        <li><a href="auth.html" class="auth-button">Sign in | Sign up</a></li>
      `;
    }
  }
}
