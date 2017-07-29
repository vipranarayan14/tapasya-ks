const navBtns = document.querySelectorAll('.navLink');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const menuIcon = document.querySelector('.menu-icon');
const logoText = document.querySelector('.logo .logo-text');

menuIcon.addEventListener('click', (e) => {

  e.preventDefault();
  toggleNav();
});

for (let i = 0, length = navBtns.length; i < length; i++) {

  navBtns[i].addEventListener('click', (e) => {

    toggleNav();
  });
}

// Hide Logo-text in '#home' page
window.addEventListener('load', toggleLogoText);
window.addEventListener('hashchange', toggleLogoText);

function toggleLogoText() {

  if (location.hash === '' || location.hash === '#home') {
    logoText.classList.add('w3-hide');
  } else {
    logoText.classList.remove('w3-hide');
  }
}

function toggleNav() {

  document.querySelector('header').classList.toggle('nav-open');
  document.querySelector('nav').classList.toggle('nav-open');
}

initHashRouting('sub-page');