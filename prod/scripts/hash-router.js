const navLinks = document.querySelectorAll('.navLink');
const navPages = document.querySelectorAll('.navPage');

const showClass = 'open';

function changeView() {

  let navPageToShow = getNavPageToShow();

  if (navPageToShow) {

    hideAllNavPages();
    showNavPage(navPageToShow);
  }
}

function getNavPageToShow() {

  let navPageToShow = '', hashVal = location.hash;

  if (hashVal) { navPageToShow = document.querySelector(hashVal); }

  if (!hashVal || !navPageToShow) {

    navPageToShow = document.querySelector('.navPage.open');

    if (!navPageToShow) {

      navPageToShow = document.querySelector('.navPage');
    }
  }

  return navPageToShow;
}

function initStyles() {

  const style = document.createElement("style");

  style.id = 'hash-router-styles';
  style.appendChild(document.createTextNode("")); //WebKit Hack
  document.head.appendChild(style);

  const styleSheet = style.sheet;

  styleSheet.insertRule('.navPage { display: none }', 0);
  styleSheet.insertRule('.navPage.' + showClass + '{ display: block }', 0);

}

function initEventListeners() {

  window.addEventListener('load', changeView);
  window.addEventListener('hashchange', changeView);
}

function hideAllNavPages() {

  for (let i = 0, len = navPages.length; i < len; i++) {

    if (navPages[i].classList.contains(showClass)) {

      navPages[i].classList.remove(showClass);
    }
  }
}

function initHashRouting() {

  initStyles();
  initEventListeners();
}

function showNavPage(navPageToShow) {

  navPageToShow.classList.add(showClass);
}

initHashRouting();