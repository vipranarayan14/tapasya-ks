const navBtns = document.querySelectorAll('header a:not(.logo)');
const allSections = document.querySelectorAll('.page');
const allSubpages = document.querySelectorAll('.sub-page');
const allDropdowns = document.querySelectorAll('.p-dropdown');
const hiliteClass = "w3-green";

for (let i = 0, length = navBtns.length; i < length; i++) {

  navBtns[i].addEventListener('click', (e) => {

    e.preventDefault();
    highlightNavBtn(navBtns[i]);
    showElement(navBtns[i].getAttribute('href'));
  })
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

  ele.classList.add(hiliteClass);

  for (let i = 0, length = allDropdowns.length; i < length; i++) {

    const isActive = allDropdowns[i].querySelector('.' + hiliteClass) !== null;

    if(isActive) {

      allDropdowns[i].querySelector('.p-dropdown-btn').classList.add(hiliteClass);
    }
    
  }
}