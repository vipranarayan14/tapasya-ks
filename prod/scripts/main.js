const navBtns = document.querySelectorAll('.navLink');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const menuIcon = document.querySelector('.menu-icon');
const logoText = document.querySelector('.logo .logo-text');

// /********* Comman *********/

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

HashRouter.init({
  defaultNavPageID: 'home',
  navPageSelector: 'sub-page',
  navLinkSelector: 'navLink',
  navPagesToGet: [
    {
      navPageID: 'gallery',
      urlToGet: 'gallery/index.html',
      rsrcsToInject: {
        scripts: ['gallery/scripts.min.js'],
        styles: ['gallery/styles.min.css']
      },
      onSuccess: function () {
        ShowBox.init();
      }
    }
  ]
});

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