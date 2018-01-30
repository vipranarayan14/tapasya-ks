const navBtns = document.querySelectorAll('.navLink');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const menuIcon = document.querySelector('.menu-icon');
const bullentin = document.querySelector('#bulletin');
const bullentinOpener = document.querySelector('.bulletin-opener');
const bullentinHasArticle = bullentin.querySelector('article');
// /********* Comman *********/

// Loading .banner background-images only when it comes into view

initIntersectionObserver('.banner:not(#home-banner)', 0.5, entry => {

  const target = entry.target;
  const imgUrl = target.getAttribute('data-bg-src');

  if (imgUrl) {

    target.style.backgroundImage = 'url(' + imgUrl + ')';

  }

});

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

// HashRouter config
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

// Bullentin
function showBulletin() {

  bullentin.classList.add('bulletin-open');

}

window.addEventListener('load', () => {

  if (bullentinHasArticle) {

    showBulletin();
  }
});

bullentinOpener.addEventListener('click', (e) => {

  e.preventDefault();

  showBulletin();
});

bullentin.addEventListener('click', () => {

  if (event.target == event.currentTarget) {

    bullentin.classList.remove('bulletin-open');

  }

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