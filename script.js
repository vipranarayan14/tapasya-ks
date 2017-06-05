const navBtns = document.querySelectorAll('header a');
const allSections = document.querySelectorAll('.page');
const allSubpages = document.querySelectorAll('.sub-page');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const menuIcon = document.querySelector('.menu-icon');
const hiliteClass = "w3-green";

for (let i = 0, length = navBtns.length; i < length; i++) {

  navBtns[i].addEventListener('click', (e) => {

    e.preventDefault();
    highlightNavBtn(navBtns[i]);
    showElement(navBtns[i].getAttribute('href'));

    if (!window.matchMedia("(min-width:700px)").matches) {
      toggleNav();
    }
  });
}

for (let i = 0, length = allDropdowns.length; i < length; i++) {

  allDropdowns[i].querySelector('.p-dropdown-btn').addEventListener('click', (e) => {

    e.preventDefault();
    // resetAllDDs();
    e.target.classList.toggle('active');
    allDropdowns[i].querySelector('.p-dropdown-content').classList.toggle('active');
  });
}
menuIcon.addEventListener('click', (e) => {
  e.preventDefault();
  toggleNav();
});

function toggleNav() {
  document.querySelector('header').classList.toggle('nav-open');
  document.querySelector('nav').classList.toggle('nav-open');
}
function showElement(eleId) {

  const ele = document.querySelector(eleId);

  if (ele) {

    hideAllPagesAndSubpages();

    const eleParent = ele.parentElement;

    if (eleParent.nodeName === 'SECTION' && eleParent.style.display === 'none') {

      eleParent.style.display = 'block';
    }

    ele.style.display = 'block';
  }
}

function hideAllPagesAndSubpages() {

  for (let i = 0, length = allSections.length; i < length; i++) {

    allSections[i].style.display = 'none';
  }

  for (let i = 0, length = allSubpages.length; i < length; i++) {

    allSubpages[i].style.display = 'none';
  }
}

function highlightNavBtn(ele) {

  const headerActiveLinks = document.querySelectorAll('header .' + hiliteClass);

  for (let i = 0, length = headerActiveLinks.length; i < length; i++) {

    headerActiveLinks[i].classList.remove(hiliteClass);
  }

  if (!ele.classList.contains('logo-text')) {

    ele.classList.add(hiliteClass);

    for (let i = 0, length = allDropdowns.length; i < length; i++) {

      const isActive = allDropdowns[i].querySelector('.' + hiliteClass) !== null;

      if (isActive) {

        allDropdowns[i].querySelector('.p-dropdown-btn').classList.add(hiliteClass);
      }

    }
  }
}