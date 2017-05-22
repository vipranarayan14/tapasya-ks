const navBtns = document.querySelectorAll('nav .w3-bar-item');
const allSections = document.querySelectorAll('section');
const allSubpages = document.querySelectorAll('.sub-page');

for (let i = 0, length = navBtns.length; i < length; i++) {

  navBtns[i].addEventListener('click', (e) => {

    e.preventDefault();
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