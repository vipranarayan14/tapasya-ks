(function (window) {
  'use strict';

  let callback;

  function initIntersectionObserver(query, threshold, entryTrigger) {

    callback = entryTrigger;

    const intObsOptions = {
      rootMargin: '0px',
      threshold: threshold
    }
    const observer = new IntersectionObserver(onEntry, intObsOptions);
    const elements = document.querySelectorAll(query);


    elements.forEach(element => {

      observer.observe(element);;
    });
  }

  function onEntry(entries, observer) {

    entries.forEach(entry => {

      if (entry.intersectionRatio > 0) {

        callback(entry);
        observer.unobserve(entry.target);
      }
    });
  }

  window.initIntersectionObserver = initIntersectionObserver;

})(window);
