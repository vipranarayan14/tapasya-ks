const ShowBox = {};

let slidesLength = 0,
  slideIndex = 0,
  SBPreviews = [],
  slideURL = '',
  slideTitle = '',
  SBSlideCount = '',
  SBModal = '',
  SBStage = '',
  SBCaption = '';

function initVariables() {

  SBPreviews = document.querySelectorAll('.sb-preview');
  SBModal = document.querySelector('.sb-modal');
  SBStage = SBModal.querySelector('.sb-stage');
  SBCaption = SBModal.querySelector('.sb-caption');
  SBSlideCount = document.querySelector('.sb-image-count');

  ShowBox.slidesLength = slidesLength = SBPreviews.length;

}

function initEventListeners() {

  for (let i = 0, l = SBPreviews.length; i < l; i + 1) {

    SBPreviews[i].addEventListener('click', () => {

      slideIndex = i + 1;
      showSlide(slideIndex);

    });

  }

  SBModal.addEventListener('click', e => {

    const targetClass = e.target.classList;

    if (targetClass[0] === 'sb-prev') {

      prevSlide();

    } else if (targetClass[0] === 'sb-next') {

      nextSlide();

    } else {

      closeModal();

    }

  });

  document.addEventListener('keydown', e => {

    if (SBModal.classList.contains('open')) {

      triggerAction(`keyCode=${e.keyCode}`)();

    }

  });

}

const triggerAction = trigger => ({

  'keyCode=27': closeModal,
  'keyCode=37': prevSlide,
  'keyCode=39': nextSlide,
  'targetClass=sb-next': nextSlide,
  'targetClass=sb-prev': prevSlide

}[trigger]);

function initShowBox() {

  initVariables();
  initEventListeners();

}

function closeModal() {

  document.documentElement.style.overflow = 'initial';
  document.body.style.overflow = 'initial';
  SBModal.classList.remove('open');

}

function nextSlide() {

  slideIndex += 1;

  if (slideIndex > slidesLength) {

    slideIndex = 1;

  }

  showSlide(slideIndex);

}

function prevSlide() {

  slideIndex -= 1;

  if (slideIndex < 1) {

    slideIndex = slidesLength;

  }

  showSlide(slideIndex);

}

function showSlide(slideNo) {

  ShowBox.currentSlide = slideNo;
  slideNo -= 1;

  setSlideURLandTitle(slideNo);
  setSlideCount(slideNo);

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  SBModal.classList.add('open');

}

function setSlideURLandTitle(slideNo) {

  slideURL = SBPreviews[slideNo].style.backgroundImage;
  slideTitle = SBPreviews[slideNo].getAttribute('title');

  SBStage.style.backgroundImage = slideURL;
  SBCaption.innerText = slideTitle;

}

function setSlideCount(slideNo) {

  SBSlideCount.innerText = `${slideNo + 1} / ${slidesLength}`;

}

ShowBox.init = initShowBox;
ShowBox.showSlide = showSlide;
ShowBox.prevSlide = prevSlide;
ShowBox.nextSlide = nextSlide;
ShowBox.slidesLength = 0;
ShowBox.currentSlide = 0;

window.ShowBox = ShowBox;
