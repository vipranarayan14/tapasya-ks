const SBPreviews = document.querySelectorAll('.sb-preview');
const SBModal = document.querySelector('.sb-modal');
const SBStage = SBModal.querySelector('.sb-stage');
const SBCaption = SBModal.querySelector('.sb-caption');
const SBSlideCount = document.querySelector('.sb-image-count');

let slideIndex = 0;
let slideURL, slideTitle = '';
let slidesLength = SBPreviews.length - 1;

for (let i = 0, l = SBPreviews.length; i < l; i++) {

  SBPreviews[i].addEventListener('click', () => {

    slideIndex = i;
    openModal();
  });
}

SBModal.addEventListener('click', (e) => {

  let targetClass = e.target.classList;

  if (targetClass[0] === 'sb-prev') {

    prevSlide();
  } else if (targetClass[0] === 'sb-next') {

    nextSlide();
  } else {

    closeModal();
  }
});

document.addEventListener('keydown', (e) => {

  if (SBModal.classList.contains('open')) {

    if (e.keyCode === 37) {

      prevSlide();
    } else if (e.keyCode === 39) {

      nextSlide();
    } else if (e.keyCode === 27) {

      closeModal();
    }
  }
});

function closeModal() {
  
  document.documentElement.style.overflow = 'initial';
  document.body.style.overflow = 'initial';
  SBModal.classList.remove('open');
}

function nextSlide() {

  slideIndex = slideIndex + 1;
  openModal();
}

function openModal() {

  if (slideIndex < 0) { slideIndex = slidesLength; }
  if (slideIndex > slidesLength) { slideIndex = 0 }

  slideURL = SBPreviews[slideIndex].style.backgroundImage;
  slideTitle = SBPreviews[slideIndex].getAttribute('title');

  SBSlideCount.innerText = (slideIndex + 1) + ' / ' + (slidesLength + 1);
  SBStage.style.backgroundImage = slideURL;
  SBCaption.innerText = slideTitle;

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  SBModal.classList.add('open');
}

function prevSlide() {

  slideIndex = slideIndex - 1;
  openModal();
}