const navBtns = document.querySelectorAll('.navLink');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const menuIcon = document.querySelector('.menu-icon');
const logoText = document.querySelector('.logo .logo-text');

/********* Comman *********/

window.addEventListener('load', triggerHashBasedEvents);
window.addEventListener('hashchange', triggerHashBasedEvents);

function triggerHashBasedEvents() {

  toggleLogoText();
}

// Hide Logo-text in '#home' page
function toggleLogoText() {

  if (location.hash === '' || location.hash === '#home') {

    logoText.classList.add('w3-hide');
  } else {

    logoText.classList.remove('w3-hide');
  }
}

// Open dropdown after closing others
for (let i = 0, length = allDropdowns.length; i < length; i++) {

  allDropdowns[i].addEventListener('click', () => {
    
    closeAllDropdowns();
    allDropdowns[i].classList.add('open');
  });
}

function closeAllDropdowns() {

  for (let i = 0, length = allDropdowns.length; i < length; i++) {

    allDropdowns[i].classList.remove('open');
  }
}

HashRouter.init('sub-page');

/**************************/



/********* Mobile *********/

menuIcon.addEventListener('click', (e) => {

  e.preventDefault();
  toggleNav();
});

for (let i = 0, length = navBtns.length; i < length; i++) {

  navBtns[i].addEventListener('click', (e) => {

    closeAllDropdowns();
    toggleNav();
  });
}

function toggleNav() {

  document.querySelector('header').classList.toggle('nav-open');
}

/**************************/