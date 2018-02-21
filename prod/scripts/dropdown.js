const dropdowns = document.querySelectorAll('.p-dropdown');
const navBtns = document.querySelectorAll('.navLink');
const menuIcon = document.querySelector('.menu-icon');
const header = document.querySelector('header');

const toggleNav = () => {

  header.classList.toggle('nav-open');

};

menuIcon.addEventListener('click', e => {

  e.preventDefault();

  toggleNav();

});

dropdowns.forEach(dropdown => {

  dropdown.addEventListener('click', e => {

    const isDropdownBtn = e.target.classList.contains('p-dropdown-btn');

    if (isDropdownBtn) {

      dropdown.classList.toggle('open');

    }

  });

});

navBtns.forEach(navBtn => {

  navBtn.addEventListener('click', () => {

    toggleNav();

  });

});
