const navBtns = document.querySelectorAll('.navLink');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const menuIcon = document.querySelector('.menu-icon');
const logoText = document.querySelector('.logo .logo-text');
let mediaMatch = window.matchMedia("(min-width:700px)");

for (let i = 0, length = navBtns.length; i < length; i++) {

  navBtns[i].addEventListener('click', (e) => {

    // if (!mediaMatch.matches) {
    toggleNav();
    // }
  });
}

for (let i = 0, length = allDropdowns.length; i < length; i++) {

  allDropdowns[i].querySelector('.p-dropdown-btn').addEventListener('click', (e) => {

    e.target.classList.toggle('active');
    allDropdowns[i].querySelector('.p-dropdown-content').classList.toggle('active');
  });
}

window.addEventListener('load', toggleLogoText);
window.addEventListener('hashchange', toggleLogoText);

function toggleLogoText() {

  if (location.hash === '' || location.hash === '#home') {
    logoText.style.display = 'none';
  } else {
    logoText.style.display = 'inline-block';
  }
}

menuIcon.addEventListener('click', (e) => {

  e.preventDefault();
  toggleNav();
});

function toggleNav() {

  document.querySelector('header').classList.toggle('nav-open');
  document.querySelector('nav').classList.toggle('nav-open');
}

initHashRouting('sub-page');