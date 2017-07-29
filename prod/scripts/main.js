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

for (let i = 0, length = allDropdowns.length; i < length; i++) {

  allDropdowns[i].querySelector('.p-dropdown-btn').addEventListener('click', (e) => {

    e.target.classList.toggle('active');
    allDropdowns[i].querySelector('.p-dropdown-content').classList.toggle('active');
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