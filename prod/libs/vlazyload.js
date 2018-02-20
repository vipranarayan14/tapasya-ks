const setImages = targetsSelector => () => {

  const targets = document.querySelectorAll(targetsSelector);

  targets.forEach(target => {

    const imgUrl = target.getAttribute('data-bg-src');

    if (imgUrl) {

      target.style.backgroundImage = `url(${ imgUrl })`;

    }

  });

};

export const vLazyLoad = targetsSelector => {

  window.addEventListener('load', setImages(targetsSelector));

};
