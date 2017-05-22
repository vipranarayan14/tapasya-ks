const navBtns = document.querySelectorAll('header a');
const allSections = document.querySelectorAll('section');
const allSubpages = document.querySelectorAll('.sub-page');
const allDropdowns = document.querySelectorAll('.w3-dropdown-hover');

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

  const headerActiveLinks = document.querySelectorAll('header .w3-green');

  for (let i = 0, length = headerActiveLinks.length; i < length; i++) {

    headerActiveLinks[i].classList.remove('w3-green');
  }

  ele.classList.add('w3-green');

  for (let i = 0, length = allDropdowns.length; i < length; i++) {

    const isActive = allDropdowns[i].querySelector('.w3-green') !== null;

    if(isActive) {

      allDropdowns[i].querySelector('button').classList.add('w3-green');
    }
    
  }
}